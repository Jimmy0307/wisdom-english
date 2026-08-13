import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const outputPath = resolve(repoRoot, 'assets/data/training-gallery.json');

const ROOT_FOLDER_ID = process.env.TRAINING_DRIVE_ROOT_FOLDER_ID || '1JaMJdynOVUD5FhHevrCLVRuZ4xJUtCm5';
const API_KEY = process.env.GOOGLE_DRIVE_API_KEY || '';
const ACCESS_TOKEN = process.env.GOOGLE_DRIVE_ACCESS_TOKEN || '';
const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const DATE_FOLDER = /^\d{4}-\d{2}-\d{2}$/;
const collator = new Intl.Collator('zh-Hant', { numeric: true, sensitivity: 'base' });

if (!API_KEY && !ACCESS_TOKEN) {
  console.warn('[training-sync] No Drive credential configured. Set GOOGLE_DRIVE_API_KEY or GOOGLE_DRIVE_ACCESS_TOKEN.');
  process.exit(0);
}

async function listChildren(parentId) {
  const all = [];
  let pageToken = '';

  do {
    const url = new URL(DRIVE_API);
    url.searchParams.set('q', `'${parentId}' in parents and trashed = false`);
    url.searchParams.set('fields', 'nextPageToken,files(id,name,mimeType,modifiedTime)');
    url.searchParams.set('pageSize', '1000');
    url.searchParams.set('orderBy', 'name_natural');
    url.searchParams.set('supportsAllDrives', 'true');
    url.searchParams.set('includeItemsFromAllDrives', 'true');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    if (API_KEY) url.searchParams.set('key', API_KEY);

    const response = await fetch(url, {
      headers: ACCESS_TOKEN ? { Authorization: `Bearer ${ACCESS_TOKEN}` } : {},
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Drive API ${response.status}: ${body}`);
    }

    const data = await response.json();
    all.push(...(data.files || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  return all;
}

function photoOrder(name) {
  const match = String(name).match(/_(\d+)(?:\.[^.]+)?$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

async function buildManifest() {
  const rootChildren = await listChildren(ROOT_FOLDER_ID);
  const dateFolders = rootChildren
    .filter(item => item.mimeType === FOLDER_MIME && DATE_FOLDER.test(item.name))
    .sort((a, b) => b.name.localeCompare(a.name));

  const albums = [];

  for (const folder of dateFolders) {
    const children = await listChildren(folder.id);
    const photos = children
      .filter(item => String(item.mimeType).startsWith('image/'))
      .map(item => ({
        id: item.id,
        name: item.name,
        order: photoOrder(item.name),
      }))
      .sort((a, b) => a.order - b.order || collator.compare(a.name, b.name));

    albums.push({
      date: folder.name,
      folderId: folder.id,
      photos,
    });
  }

  return {
    schemaVersion: 1,
    source: {
      provider: 'google-drive',
      rootFolderId: ROOT_FOLDER_ID,
    },
    albums,
  };
}

const manifest = await buildManifest();
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const photoCount = manifest.albums.reduce((sum, album) => sum + album.photos.length, 0);
console.log(`[training-sync] ${manifest.albums.length} album(s), ${photoCount} photo(s) synced.`);
