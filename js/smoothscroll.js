  const container = document.getElementById('scroll-container');
  let current = 0;
  let target = 0;
  let ease = 0.075;

function smoothScroll() {
  const maxScroll = container.offsetHeight - window.innerHeight;
  target = window.scrollY || window.pageYOffset;
  target = Math.max(0, Math.min(target, maxScroll));

  current += (target - current) * ease;
  container.style.transform = `translateY(${-current}px)`;
  requestAnimationFrame(smoothScroll);
}

  function setBodyHeight() {
    document.body.style.height = `${container.offsetHeight}px`;
  }

  window.addEventListener('resize', setBodyHeight);
  window.addEventListener('load', () => {
    setBodyHeight();
    smoothScroll();
  });