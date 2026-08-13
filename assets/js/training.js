const gallery = document.querySelector('[data-training-gallery]');

const driveImage = id => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;

// Google Drive「師訓照片」：260812 = 2026-08-12，依原始相簿序號排序。
const trainingPhotos = [
  [20, '1Ldnh-uhW4rci1MJ56yS_NSjLFDX5cXPv'],
  [24, '1jg0DpH1De5b4u4ASoVf4j21UPMkGl3Gh'],
  [26, '1wmeqQOK10yLRbSPZKvJ2jErtCysQs9U1'],
  [28, '130C1cI1iiYf9dCvxhCIQ41y1TmpkYiNE'],
  [31, '1VzevRG4vU2i5kAlvCgqziZI8fh25daFM'],
  [41, '1H5TI1PK3fWQCF7_9GIPaUI2stWIyraq5'],
  [48, '1HaeDqcOeKIUViIXl4hLKZH6R5IaXVvOq'],
  [69, '1B_nVGA8jk5Yq-vVzyLSXibNWNQ4ne0pr'],
  [74, '1HDLHZXXKvY5tl6_NAim3b4PqKN6e3Ad-'],
  [81, '1xUMq7evdpEs3gmOxNDTVtGTm1iiBJWQX'],
  [95, '19XKFyViV-XN-LSa5QFv-50KYnsBFgIgK'],
  [100, '1GvWWJ3tjsLMKHEgVHc34gCNjHuvM83kq'],
  [101, '1bzStigTP0pRoo2D8KOfgZ2CgFAw2J9jv'],
  [104, '1RhefcT135owP_qs5oGFLoKmS5dmBJ3Ar'],
  [108, '1MWPODvV-DdMg1XdPgeMzmKaBE3-PQ78f'],
  [116, '1GNZIP3WPWHS60hK016ti2Kw_ZUGO50xE'],
  [118, '1mM0CUn_90fiRwMgPDM6aHtiGtt4x8sec'],
  [123, '1ug1Kn8vl2IdKkKYsd39lGN3yvAk-8QEh'],
  [127, '1LqW_qaFiB8wOX8079Y7rERRNEXXOU_3Y'],
  [129, '1dQe97t7kKMmPKVel-foLX1z3zPUHUQsM'],
  [130, '1lc_inFBAIrBe0paeb_huaJ9IGre5VWk7'],
  [152, '1BCfOH_ZerVb1-8P-5kST0NXog5AiLkNv'],
  [153, '1Jk6NBCiOwQUyqxaK9ZHFYQ1pgTROA3oS'],
  [162, '10xz_KbKQLfdDT-2weevX-epRrIxU7GUW'],
  [163, '1KLbnUZ4G11yUKcJ5Bdc9IrEwYdsC5shu'],
  [165, '1evs-PJ5H-fLkdtu4sgLEktCNj8HaAug2'],
  [166, '1Fkj1nHBywzjLq-RHHR5po6ujxAUndsM5'],
  [171, '13qUlbP2rX0zCtUD6LGM2jImKL_Mvlk6v'],
].sort((a, b) => a[0] - b[0]);

if (gallery) {
  gallery.innerHTML = trainingPhotos.map(([seq, id]) => `
    <figure class="training-shot">
      <div class="training-shot-media">
        <img data-training-photo src="${driveImage(id)}" alt="2026 年 8 月 12 日唯思英文師資培訓紀錄 ${seq}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        <div class="training-shot-fallback" hidden>WISDOM<br>TEACHER TRAINING</div>
      </div>
    </figure>`).join('');
}

document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.matches('[data-training-photo]')) return;
  image.hidden = true;
  const fallback = image.parentElement?.querySelector('.training-shot-fallback');
  if (fallback) fallback.hidden = false;
}, true);
