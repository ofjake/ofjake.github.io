let targetScroll = 0;
let currentScroll = 0;
const ease = 0.1; // smaller = smoother

function updateScroll() {
  currentScroll += (targetScroll - currentScroll) * ease;
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(updateScroll);
}

function onWheel(e) {
  e.preventDefault();
  targetScroll += e.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
}

function onTouchMove(e) {
  e.preventDefault();
  targetScroll += (startY - e.touches[0].clientY) * 1.5;
  targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
  startY = e.touches[0].clientY;
}

// Touch support
let startY = 0;
function onTouchStart(e) {
  startY = e.touches[0].clientY;
}

window.addEventListener('wheel', onWheel, { passive: false });
window.addEventListener('touchstart', onTouchStart, { passive: false });
window.addEventListener('touchmove', onTouchMove, { passive: false });

updateScroll();
