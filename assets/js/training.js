import manifest from '../data/training-gallery.json';

const albumsHost = document.querySelector('[data-training-albums]');
const driveImage = id => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;

const formatDate = date => {
  const [year, month, day] = String(date).split('-');
  if (!year || !month || !day) return date;
  return `${year}.${month}.${day}`;
};

const safeAlbums = Array.isArray(manifest?.albums)
  ? [...manifest.albums]
      .filter(album => album?.date && Array.isArray(album.photos))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  : [];

if (albumsHost) {
  albumsHost.innerHTML = safeAlbums.map(album => {
    const photos = [...album.photos].sort((a, b) => {
      const ao = Number.isFinite(Number(a.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
      const bo = Number.isFinite(Number(b.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;
      return ao - bo || String(a.name || '').localeCompare(String(b.name || ''), 'zh-Hant', { numeric: true });
    });

    return `
      <section class="training-album" data-training-date="${album.date}">
        <div class="training-album-head">
          <div class="training-album-title">
            <span class="training-album-kicker">TEACHER TRAINING</span>
            <h3>師資培訓紀錄</h3>
          </div>
          <div class="training-date">${formatDate(album.date)}</div>
        </div>
        <div class="training-gallery">
          ${photos.map((photo, index) => `
            <figure class="training-shot">
              <div class="training-shot-media">
                <img data-training-photo src="${driveImage(photo.id)}" alt="${formatDate(album.date)} 唯思英文師資培訓紀錄 ${index + 1}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
                <div class="training-shot-fallback" hidden>WISDOM<br>TEACHER TRAINING</div>
              </div>
            </figure>`).join('')}
        </div>
      </section>`;
  }).join('');
}

document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.matches('[data-training-photo]')) return;
  image.hidden = true;
  const fallback = image.parentElement?.querySelector('.training-shot-fallback');
  if (fallback) fallback.hidden = false;
}, true);
