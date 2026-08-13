import { teachers } from './teachers-data.js';

const grid = document.querySelector('[data-teacher-grid]');
const modal = document.querySelector('[data-teacher-modal]');
const modalPanel = modal?.querySelector('.teacher-modal-panel');
const closeButtons = modal?.querySelectorAll('[data-modal-close]') || [];
const body = document.body;

const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[ch]));

const list = (items, empty = '履歷未列示') => {
  if (!items?.length) return `<p class="teacher-empty">${esc(empty)}</p>`;
  return `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
};

// Google Drive「老師形象照」：檔名與老師名稱一一對應。
const portraitFileIds = {
  christopher: '1q7k_5EyJe5Q4whL56nzT_NdF9QE4RUER',
  claire: '1Hp9JedUQHKN4XRTll73FoIxkKT26iOm9',
  demian: '1yTB1H07cwjYCz-ROar8um6EV1JfasRWN',
  edgardo: '1QpTkPFoQ5xyCGC8Q5sHYt-_GBimXHjgr',
  ej: '187Oj23eyYtrzfIltHaC77B5qMAqdXHaE',
  frank: '1V5RWwzfCiVSyMtTeyXdFlI1byr7VwOiO',
  gary: '1kCqJ2KxUfTPjWi86-Pt_GIwTrbhYuajy',
  jason: '1Xd0mhDQoy1EKyhVT-yBDRdGgGcWX_jrH',
  judy: '1bSKKVJC1xTQJDr37ztR48UmnYgitH6jW',
  kyle: '19EEr8YDqUzrGmiP3taqk3dIP0HNNMFnB',
  linda: '1Prm0Nfec7lSbJXi1AGlliLhuoJrJ5e6I',
  michelle: '1Zzzqm_OxFMcjkx6OblarUW1pa7MXzIxp',
  nina: '1rnfzhsfAOKjA-Qi-z9qisAi4lwC8FCRa',
  sammy: '19mujB9MHNSUTeK0rHJdfczH5Zb5R6obD',
  sharon: '10NK1vPWHge-g4DKiBj9zKtEnc9Q1Odw2',
  tiffany: '19RKWuSiO2Z_1cu4LlyQD4aN1SJA6nANC',
  timothee: '1ocEkDDHytDfyKt6iIRqCcY0V0Yz6zMXh',
};

const driveImage = id => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;

const portrait = teacher => {
  const id = portraitFileIds[teacher.slug];
  if (!id) return `<div class="teacher-photo-fallback" aria-label="${esc(teacher.name)} 老師">${esc(teacher.name.slice(0, 1))}</div>`;
  return `<img data-teacher-portrait src="${driveImage(id)}" alt="${esc(teacher.name)} 老師形象照" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
};

const cardTemplate = teacher => `
  <article class="teacher-card" data-teacher-card="${esc(teacher.slug)}">
    <button class="teacher-card-trigger" type="button" data-open-teacher="${esc(teacher.slug)}" aria-label="查看 ${esc(teacher.name)} 老師履歷">
      <div class="teacher-card-photo">
        ${portrait(teacher)}
        <span class="teacher-card-view">查看履歷</span>
      </div>
      <div class="teacher-card-body">
        <span class="teacher-card-kicker">WISDOM FACULTY</span>
        <h2>${esc(teacher.name)}</h2>
        <div class="teacher-card-cn">${esc(teacher.chineseName)}</div>
        <p>${esc(teacher.summary)}</p>
        <div class="teacher-card-tags">
          ${teacher.specialties.slice(0, 3).map(tag => `<span>${esc(tag)}</span>`).join('')}
        </div>
      </div>
    </button>
  </article>`;

const modalTemplate = teacher => `
  <div class="teacher-modal-hero">
    <div class="teacher-modal-photo">${portrait(teacher)}</div>
    <div class="teacher-modal-heading">
      <span class="eyebrow">TEACHER PROFILE</span>
      <h2 id="teacher-modal-title">${esc(teacher.name)}</h2>
      <div class="teacher-modal-cn">${esc(teacher.chineseName)}</div>
      <div class="teacher-modal-role">${esc(teacher.role)}</div>
      <p>${esc(teacher.summary)}</p>
      <div class="pill-list">${teacher.specialties.map(tag => `<span class="pill">${esc(tag)}</span>`).join('')}</div>
    </div>
  </div>
  <div class="teacher-modal-sections">
    <section class="teacher-detail-card"><div class="teacher-detail-label">EDUCATION</div><h3>學歷</h3>${list(teacher.education)}</section>
    <section class="teacher-detail-card"><div class="teacher-detail-label">CERTIFICATIONS</div><h3>證照與專業經歷</h3>${list(teacher.certificates, '履歷未另外列示證照')}</section>
    <section class="teacher-detail-card teacher-detail-wide"><div class="teacher-detail-label">TEACHING EXPERIENCE</div><h3>教學經歷</h3>${list(teacher.experience)}</section>
  </div>
  <p class="teacher-source-note">資料依老師提供之正式履歷整理。</p>`;

let lastTrigger = null;

function openTeacher(slug, trigger) {
  const teacher = teachers.find(item => item.slug === slug);
  if (!teacher || !modal || !modalPanel) return;
  lastTrigger = trigger || null;
  modal.querySelector('[data-modal-content]').innerHTML = modalTemplate(teacher);
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('open'));
  body.classList.add('modal-open');
  modalPanel.scrollTop = 0;
  modalPanel.focus();
}

function closeTeacher() {
  if (!modal) return;
  modal.classList.remove('open');
  body.classList.remove('modal-open');
  window.setTimeout(() => {
    modal.hidden = true;
    const content = modal.querySelector('[data-modal-content]');
    if (content) content.innerHTML = '';
    lastTrigger?.focus();
    lastTrigger = null;
  }, 180);
}

if (grid) {
  grid.innerHTML = teachers.map(cardTemplate).join('');
  grid.addEventListener('click', event => {
    const trigger = event.target.closest('[data-open-teacher]');
    if (trigger) openTeacher(trigger.dataset.openTeacher, trigger);
  });
}

// Never leave a broken-image icon on screen if Drive permission changes.
document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.matches('[data-teacher-portrait]')) return;
  const fallback = document.createElement('div');
  fallback.className = 'teacher-photo-fallback';
  fallback.textContent = image.alt?.trim()?.[0] || 'W';
  image.replaceWith(fallback);
}, true);

closeButtons.forEach(button => button.addEventListener('click', closeTeacher));
modal?.addEventListener('click', event => { if (event.target === modal) closeTeacher(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal && !modal.hidden) closeTeacher(); });
