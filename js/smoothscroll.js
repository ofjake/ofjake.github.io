  const container = document.getElementById('scroll-container');
  let current = 0;
  let target = 0;
  let ease = 0.1;
  const EXTRA_HEIGHT = 100;

function smoothScroll() {
  const content = container ? (container.firstElementChild || container) : null;
  const maxScroll = content ? (content.scrollHeight + EXTRA_HEIGHT - window.innerHeight) : 0;
  target = window.scrollY || window.pageYOffset;
  target = Math.max(0, Math.min(target, maxScroll));

  current += (target - current) * ease;
  current = clampTranslate(current);
  container.style.transform = `translateY(${-current}px)`;
  requestAnimationFrame(smoothScroll);
}

  function setBodyHeight() {
  if (!container) return;
  const footer = document.querySelector('footer');
  const content = container.firstElementChild || container;
  const contentHeight = content ? content.scrollHeight : container.scrollHeight;
  const desired = Math.max(contentHeight + EXTRA_HEIGHT, window.innerHeight);

  if (desired <= window.innerHeight) {
    const spacer = document.getElementById('scroll-spacer');
    if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
    container.style.position = '';
    container.style.top = '';
    container.style.left = '';
    container.style.right = '';
    container.style.willChange = '';
    document.body.style.minHeight = '';
    return;
  }

  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.right = '0';
  container.style.willChange = 'transform';

  let spacer = document.getElementById('scroll-spacer');
  if (!spacer) {
    spacer = document.createElement('div');
    spacer.id = 'scroll-spacer';
    spacer.style.width = '1px';
    spacer.style.opacity = '0';
    spacer.style.pointerEvents = 'none';
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(spacer, footer);
    } else if (container.parentNode) {
      container.parentNode.insertBefore(spacer, container.nextSibling);
    }
  }
  const newHeight = `${desired}px`;
  if (spacer.style.height !== newHeight) spacer.style.height = newHeight;
  }

  function clampTranslate(value) {
    const content = container ? (container.firstElementChild || container) : null;
    const maxTranslate = content ? Math.max(0, content.scrollHeight + EXTRA_HEIGHT - window.innerHeight) : 0;
    return Math.max(0, Math.min(value, maxTranslate));
  }

  window.addEventListener('resize', setBodyHeight);
  window.addEventListener('load', () => {
    setBodyHeight();
    smoothScroll();
  });