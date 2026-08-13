# Training Gallery Drive Sync

This is an internal maintenance contract. It is not linked from the public website.

## Source of truth

Google Drive folder:

- `師訓照片`
- Folder ID: `1JaMJdynOVUD5FhHevrCLVRuZ4xJUtCm5`

Each training event must be a direct child folder named with ISO date format:

- `YYYY-MM-DD`
- Example: `2026-08-12`

Place the event photos directly inside that date folder. Supported public website media are image MIME types such as JPG, PNG and WebP.

## Ordering

- Albums: newest date first.
- Photos inside an album: numeric suffix in the filename first, then natural filename order.
- Example: `..._20.jpg`, `..._24.jpg`, `..._100.jpg`.

## Automatic publication

`.github/workflows/sync-training-gallery.yml` checks the Drive folder hourly and can also be run manually.

The workflow executes `scripts/sync-training-drive.mjs`, regenerates `assets/data/training-gallery.json`, and commits the manifest to `main` only when the Drive contents changed. That commit triggers the existing GitHub Pages deployment workflow.

The public `training.html` only renders the generated manifest. It exposes no upload, sync, credential, or administration controls.

## One-time repository configuration

Add the GitHub Actions repository secret:

- `GOOGLE_DRIVE_API_KEY`

The Google Cloud project behind this key must have Google Drive API enabled. Keep the key in GitHub Actions Secrets; never commit it to the repository or expose it in front-end JavaScript.

Until the secret exists, the scheduled workflow exits cleanly without changing the website. The current manifest remains valid and the gallery continues to render.

## Future client operation

1. Open Google Drive → `師訓照片`.
2. Create a new folder named `YYYY-MM-DD`.
3. Upload photos into that folder.
4. Keep the folder under `師訓照片` so it inherits the existing public-read policy.
5. Wait for the next hourly sync, or run `Sync training gallery from Google Drive` manually in GitHub Actions.

No public-site administration UI is required.
