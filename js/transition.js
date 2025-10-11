document.addEventListener("DOMContentLoaded", () => {
  const ease = "power4.inOut";

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.classList.contains("no-action")) {
        console.log("Bypassed universal handler for:", link.href);
        return;
      }

      event.preventDefault();
      const href = link.getAttribute("href");

      if (href && !href.startsWith("#") && href !== window.location.pathname) {
        animateTransition().then(() => {
          window.location.href = href;
        });
      }
    });
  });

  revealTransition().then(() => {
    gsap.set(".block", { visibility: "hidden" });
  });

  function revealTransition() {
    return new Promise((resolve) => {
      gsap.set(".block", { scaleY: 1 });
      gsap.to(".block", {
        scaleY: 0,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "start",
          grid: "auto",
          axis: "x",
        },
        ease: ease,
        onComplete: resolve,
      });
    });
  }

  function animateTransition() {
    return new Promise((resolve) => {
      gsap.set(".block", { visibility: "visible", scaleY: 0 });
      gsap.to(".block", {
        scaleY: 1,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "start",
          grid: [2, 3],
          axis: "x",
        },
        ease: ease,
        onComplete: resolve,
      });
    });
  }
});

(function () {
  const isMobileTouch = (typeof window !== 'undefined') && (
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
    window.innerWidth <= 900
  );

  if (isMobileTouch) return; 

  function wheelHandler(event) {
    const tag = event.target && event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) return;

    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;

    event.preventDefault(); 

    const scrollSpeed = 3; 

    window.scrollBy({
      top: event.deltaY * scrollSpeed, 
      behavior: 'smooth', 
    });
  }

  document.addEventListener('wheel', wheelHandler, { passive: false });
})();
