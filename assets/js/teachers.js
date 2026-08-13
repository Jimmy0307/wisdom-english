import { teachers } from './teachers-data.js';
import claireRaw from '../images/teachers/claire.svg?raw';
import christopherRaw from '../images/teachers/christopher.svg?raw';
import demianRaw from '../images/teachers/demian.svg?raw';
import edgardoRaw from '../images/teachers/edgardo.svg?raw';
import ejRaw from '../images/teachers/ej.svg?raw';
import frankRaw from '../images/teachers/frank.svg?raw';
import garyRaw from '../images/teachers/gary.svg?raw';
import jasonRaw from '../images/teachers/jason.svg?raw';
import judyRaw from '../images/teachers/judy.svg?raw';
import kyleRaw from '../images/teachers/kyle.svg?raw';
import lindaRaw from '../images/teachers/linda.svg?raw';
import michelleRaw from '../images/teachers/michelle.svg?raw';
import ninaRaw from '../images/teachers/nina.svg?raw';
import sammyRaw from '../images/teachers/sammy.svg?raw';
import sharonRaw from '../images/teachers/sharon.svg?raw';
import tiffanyRaw from '../images/teachers/tiffany.svg?raw';
import timotheeRaw from '../images/teachers/timothee.svg?raw';

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

const extractRasterDataUrl = raw => {
  const match = raw.match(/(?:href|xlink:href)=["'](data:image\/(?:jpeg|jpg|png|webp);base64,[^"']+)["']/i);
  return match?.[1] || '';
};

const portraitSources = {
  claire: extractRasterDataUrl(claireRaw),
  christopher: extractRasterDataUrl(christopherRaw),
  demian: extractRasterDataUrl(demianRaw),
  edgardo: extractRasterDataUrl(edgardoRaw),
  ej: extractRasterDataUrl(ejRaw),
  frank: extractRasterDataUrl(frankRaw),
  gary: extractRasterDataUrl(garyRaw),
  jason: extractRasterDataUrl(jasonRaw),
  judy: extractRasterDataUrl(judyRaw),
  kyle: extractRasterDataUrl(kyleRaw),
  linda: extractRasterDataUrl(lindaRaw),
  michelle: extractRasterDataUrl(michelleRaw),
  nina: extractRasterDataUrl(ninaRaw),
  sammy: extractRasterDataUrl(sammyRaw),
  sharon: extractRasterDataUrl(sharonRaw),
  tiffany: extractRasterDataUrl(tiffanyRaw),
  timothee: extractRasterDataUrl(timotheeRaw),
};

const portrait = teacher => {
  const src = portraitSources[teacher.slug];
  if (!src) {
    return `<div class="teacher-photo-fallback" aria-label="${esc(teacher.name)} 老師">${esc(teacher.name.slice(0, 1))}</div>`;
  }
  return `<img src="${src}" alt="${esc(teacher.name)} 老師照片" loading="lazy" decoding="async">`;
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
      <div class="pill-list">
        ${teacher.specialties.map(tag => `<span class="pill">${esc(tag)}</span>`).join('')}
      </div>
    </div>
  </div>

  <div class="teacher-modal-sections">
    <section class="teacher-detail-card">
      <div class="teacher-detail-label">EDUCATION</div>
      <h3>學歷</h3>
      ${list(teacher.education)}
    </section>
    <section class="teacher-detail-card">
      <div class="teacher-detail-label">CERTIFICATIONS</div>
      <h3>證照與專業經歷</h3>
      ${list(teacher.certificates, '履歷未另外列示證照')}
    </section>
    <section class="teacher-detail-card teacher-detail-wide">
      <div class="teacher-detail-label">TEACHING EXPERIENCE</div>
      <h3>教學經歷</h3>
      ${list(teacher.experience)}
    </section>
  </div>

  <p class="teacher-source-note">資料依老師提供之正式履歷整理。</p>
`;

let lastTrigger = null;

function openTeacher(slug, trigger) {
  const teacher = teachers.find(item => item.slug === slug);
  if (!teacher || !modal || !modalPanel) return;

  lastTrigger = trigger || null;
  const content = modal.querySelector('[data-modal-content]');
  content.innerHTML = modalTemplate(teacher);
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

closeButtons.forEach(button => button.addEventListener('click', closeTeacher));

modal?.addEventListener('click', event => {
  if (event.target === modal) closeTeacher();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeTeacher();
});
