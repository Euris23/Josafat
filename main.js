/* =============================================
   JOSAFAT — Cinematic JS v2
   Navigation + Preacher Guide + Particles
   ============================================= */
(function () {
  'use strict';

  const TOTAL = 17;
  let current = 1;
  let transitioning = false;
  let guideOpen = false;

  /* ---- DOM ---- */
  const progressBar   = document.getElementById('progressBar');
  const sceneCounter  = document.getElementById('sceneCounter');
  const chapterTag    = document.getElementById('chapterTag');
  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');
  const keyHint       = document.getElementById('keyHint');
  const preacherPanel = document.getElementById('preacherPanel');
  const preacherText  = document.getElementById('preacherText');
  const preacherRef   = document.getElementById('preacherRef');
  const guideToggle   = document.getElementById('guideToggle');
  const panelClose    = document.getElementById('panelClose');

  /* ---- Transition overlay ---- */
  const overlay = document.createElement('div');
  overlay.className = 'transition-overlay';
  document.body.appendChild(overlay);

  /* ---- Init ---- */
  function init() {
    showSlide(1, true);
    updateNav();
    spawnClosingParticles();
    // Fade key hint after 5s
    setTimeout(() => { keyHint.style.opacity = '0'; }, 5000);
  }

  /* ---- Show slide ---- */
  function showSlide(n, instant) {
    if (transitioning) return;
    if (n < 1 || n > TOTAL) return;
    transitioning = true;

    const prevSlide = document.getElementById('slide-' + current);
    const nextSlide = document.getElementById('slide-' + n);
    if (!nextSlide) { transitioning = false; return; }

    if (instant) {
      if (prevSlide) prevSlide.classList.remove('active');
      nextSlide.classList.add('active');
      current = n;
      updateUI();
      transitioning = false;
      return;
    }

    overlay.classList.add('active');
    setTimeout(() => {
      if (prevSlide) prevSlide.classList.remove('active');
      nextSlide.classList.add('active');
      current = n;
      updateUI();
      setTimeout(() => {
        overlay.classList.remove('active');
        transitioning = false;
      }, 80);
    }, 300);
  }

  /* ---- Update UI ---- */
  function updateUI() {
    // Progress
    progressBar.style.width = ((current / TOTAL) * 100) + '%';
    // Counter
    sceneCounter.textContent = current + ' / ' + TOTAL;
    // Chapter tag
    const slide = document.getElementById('slide-' + current);
    if (slide) {
      const ch = slide.dataset.chapter || '';
      chapterTag.textContent = ch;
      chapterTag.style.opacity = ch ? '1' : '0';
    }
    // Cierra el panel de comentarios al cambiar de slide
    if (guideOpen) closeGuide();
    // Nav
    updateNav();
  }

  function updateNav() {
    prevBtn.disabled = current <= 1;
    nextBtn.disabled = current >= TOTAL;
  }

  /* ---- Navigation ---- */
  function goNext() { if (!transitioning && current < TOTAL) showSlide(current + 1, false); }
  function goPrev() { if (!transitioning && current > 1)     showSlide(current - 1, false); }

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  /* ---- Keyboard ---- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (guideOpen) closeGuide();
      return;
    }
    if (guideOpen) return; // bloquea navegacion mientras el panel esta abierto
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault(); goNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); goPrev();
    } else if (e.key === 'p' || e.key === 'P') {
      toggleGuide();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  /* ---- Touch / Swipe ---- */
  let touchX = 0;
  document.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) > 48) {
      if (dx < 0) goNext(); else goPrev();
    }
  }, { passive: true });

  /* ---- Preacher Guide ---- */
  function loadGuideContent() {
    const slide = document.getElementById('slide-' + current);
    if (!slide) return;
    preacherText.textContent = slide.dataset.guide || '';
    const ref = slide.dataset.chapter || '';
    preacherRef.textContent = ref;
  }

  function openGuide() {
    guideOpen = true;
    loadGuideContent();
    preacherPanel.classList.add('open');
    guideToggle.textContent = '✕ CERRAR';
  }
  function closeGuide() {
    guideOpen = false;
    preacherPanel.classList.remove('open');
    guideToggle.innerHTML = '&#128172; COMENTARIOS';
  }
  function toggleGuide() {
    if (guideOpen) closeGuide(); else openGuide();
  }

  guideToggle.addEventListener('click', toggleGuide);
  panelClose.addEventListener('click', closeGuide);

  /* ---- Fullscreen ---- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
  document.addEventListener('dblclick', toggleFullscreen);

  /* ---- Closing particles (slide 16) ---- */
  function spawnClosingParticles() {
    const container = document.getElementById('closingParticles');
    if (!container) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'particleKf';
    styleEl.textContent = `
      @keyframes pdrift {
        0%   { transform:translateY(0) translateX(0); opacity:0; }
        15%  { opacity:1; }
        85%  { opacity:1; }
        100% { transform:translateY(-80px) translateX(var(--px,0px)); opacity:0; }
      }
    `;
    document.head.appendChild(styleEl);

    for (let i = 0; i < 70; i++) {
      const p = document.createElement('div');
      const isGold = Math.random() > 0.45;
      const size = Math.random() * 3 + 1;
      const x = (Math.random() - 0.5) * 50;
      p.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        background:${isGold
          ? 'rgba(200,169,78,' + (Math.random() * 0.55 + 0.25) + ')'
          : 'rgba(255,255,255,' + (Math.random() * 0.25 + 0.08) + ')'};
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        --px:${x}px;
        animation:pdrift ${5 + Math.random() * 10}s ease-in-out ${Math.random() * 8}s infinite;
      `;
      container.appendChild(p);
    }
  }

  /* ---- Boot ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
