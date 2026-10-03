// Captions describe the supplied photographs, without treating repeated views as new awards.
const MEDIA_COLLECTIONS = [
  {
    id: 'awards', title: 'Awards & recognition',
    description: 'A closer look at the recognition displayed at Atharva Ortho Care.',
    photos: [
      ['gallery/awards-effatha-recognition.png', 'Effatha award & community recognition', 'Effatha Excellence Award for Best Ortho Surgeon, alongside a Kannada-language recognition presented to Dr. Ajeya A. Deshpande.'],
      ['gallery/awards-fitness-appreciation.png', 'Recognition & professional appreciation', 'The Effatha trophy, Fit Muscle Premium Fitness plaque, and a certificate of appreciation for participation in an osteoarthritis advisory board meeting.'],
      ['gallery/clinic-photo-6.jpg', 'The clinic recognition display', 'The existing gallery photograph brings together the Effatha trophy and certificate, Kannada-language recognition, and Fit Muscle plaque.'],
      ['gallery/awards-effatha-detail.png', 'Another view of the award certificates', 'An additional photograph of the same Effatha certificate and Kannada-language recognition.']
    ]
  },
  {
    id: 'certificates', title: 'Fellowship & certificates',
    description: 'Training, academic contributions, and documents displayed at the clinic.',
    photos: [
      ['gallery/fellowship-speaker-certificates.png', 'Fellowship & guest speaker appreciation', 'Hip & Knee Arthroplasty fellowship certificate from Ramaiah University and Johnson & Johnson Institute, alongside SVCE appreciation for the Dr. M. Sreedhar Memorial 7th Lecture Series.'],
      ['gallery/clinic-certificates.png', 'Professional appreciation & clinic registrations', 'An osteoarthritis advisory board appreciation certificate, Karnataka State Pollution Control Board biomedical-waste authorization, and a Karnataka Department of Labour establishment registration.']
    ]
  },
  {
    id: 'doctor-portraits', title: 'Meet the doctor',
    description: 'Portraits and moments from the consultation room with Dr. Ajeya Deshpande.',
    portrait: true,
    photos: [
      ['IMG_0210.JPG.jpeg', 'Dr. Ajeya Deshpande in his white coat', 'The original Atharva Ortho Care doctor portrait.'],
      ['doctor-media/doctor-photo-2.jpg', 'In the operating theatre', 'Dr. Ajeya Deshpande during orthopaedic care.'],
      ['doctor-media/doctor-photo-3.jpg', 'At Atharva Ortho Care', 'The original clinic portrait from the website.'],
      ['doctor-media/doctor-portrait.jpg', 'Dr. Ajeya Deshpande', 'Consultant Orthopaedic Surgeon and Founder of Atharva Ortho Care.'],
      ['doctor-media/doctor-shoulder-explanation.jpg', 'Making joint anatomy easier to understand', 'Explaining the shoulder with an anatomical model in the consultation room.'],
      ['doctor-media/doctor-at-desk.jpg', 'At the consultation desk', 'Dr. Ajeya Deshpande at Atharva Ortho Care.'],
      ['doctor-media/doctor-writing.jpg', 'Attention to every consultation', 'A moment at the desk with joint models used for patient education.'],
      ['doctor-media/doctor-standing.jpg', 'A personal introduction', 'A portrait of Dr. Ajeya Deshpande at the clinic.'],
      ['doctor-media/doctor-demonstration.jpg', 'Understanding the shoulder', 'Demonstrating shoulder anatomy using a model.']
    ]
  }
];

function recognitionGallery() {
  return `${MEDIA_COLLECTIONS.map(group => `<section class="section media-collection" id="${group.id}">
    <div class="shell panel collection-panel">
      <div class="section-head"><div><span class="badge">${group.portrait ? 'Doctor gallery' : 'Clinic gallery'}</span><h2 class="title section mt-3">${group.title}</h2></div><p>${group.description} Select a photograph to see the full image.</p></div>
      <div class="media-grid ${group.portrait ? 'portrait-grid' : ''}">${group.photos.map(([src, title, caption]) => `<figure class="media-card">
        <button class="photo-open" type="button" data-photo="${src}" data-caption="${title}" aria-label="View full photograph: ${title}"><img src="${src}" alt="${title}" loading="lazy" decoding="async" width="${group.portrait ? 1200 : 1280}" height="${group.portrait ? 1600 : 960}"><span class="photo-enlarge" aria-hidden="true">View photo ↗</span></button>
        <figcaption><h3>${title}</h3><p>${caption}</p></figcaption>
      </figure>`).join('')}</div>
    </div>
  </section>`).join('')}
  <dialog class="photo-viewer" aria-labelledby="photo-caption"><div class="photo-viewer-toolbar"><p id="photo-caption"></p><button type="button" class="photo-close" aria-label="Close photograph">Close ✕</button></div><img class="photo-full" alt=""><a class="photo-original" target="_blank" rel="noopener">Open original image ↗</a></dialog>`;
}

function initPhotoViewer() {
  const dialog = document.querySelector('.photo-viewer');
  if (!dialog) return;
  const full = dialog.querySelector('.photo-full');
  const caption = dialog.querySelector('#photo-caption');
  const original = dialog.querySelector('.photo-original');
  let opener;
  document.querySelectorAll('.photo-open').forEach(button => button.addEventListener('click', () => {
    opener = button;
    full.src = button.dataset.photo;
    full.alt = button.dataset.caption;
    caption.textContent = button.dataset.caption;
    original.href = button.dataset.photo;
    dialog.showModal();
    document.body.classList.add('photo-viewer-open');
  }));
  dialog.querySelector('.photo-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('photo-viewer-open');
    opener?.focus();
  });
}

function initNavigation() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-navigation');
  if (!button || !nav) return;
  const close = () => { button.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { close(); button.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) close(); });
  window.matchMedia('(min-width: 1280px)').addEventListener('change', close);
}

function initDoctorSlides() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.doctor-carousel').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.doctor-slide')];
    let current = 0;
    let paused = reducedMotion.matches;
    let timer;
    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === current);
        slide.setAttribute('aria-hidden', String(i !== current));
      });
    };
    const sync = () => {
      window.clearInterval(timer);
      if (!paused && !document.hidden) timer = window.setInterval(() => show(current + 1), 5000);
    };
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; sync(); });
    sync();
  });
}
