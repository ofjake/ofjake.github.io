const container = document.getElementById('scroll-container');
let current = 0;
let target = 0;
const ease = 0.075;

function getViewportHeight() {
  // Use visualViewport on mobile to avoid jumps from toolbar changes
  return window.visualViewport ? window.visualViewport.height : window.innerHeight;
}

function smoothScroll() {
  const maxScroll = container.scrollHeight - getViewportHeight();

  // Actual scroll position
  target = window.scrollY || window.pageYOffset;
  target = Math.max(0, Math.min(target, maxScroll));

  // Ease toward target
  current += (target - current) * ease;
  current = Math.max(0, Math.min(current, maxScroll)); // Clamp

  container.style.transform = `translateY(${-current}px)`;
  requestAnimationFrame(smoothScroll);
}

function setBodyHeight() {
  document.body.style.height = `${container.scrollHeight}px`;
}

// Events to recalc height
window.addEventListener('resize', setBodyHeight);
window.addEventListener('orientationchange', setBodyHeight);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', setBodyHeight);
}

// On load
window.addEventListener('load', () => {
  setBodyHeight();
  smoothScroll();
});

// Recalc after DOM and late-loading content
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(setBodyHeight, 100);
});
