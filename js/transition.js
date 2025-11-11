// Page to page Transition

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

// Mouse scroll slowdown

document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const scrollSpeed = 3;

    window.scrollBy({
      top: event.deltaY * scrollSpeed,
      behavior: "smooth",
    });
  },
  { passive: false }
);

// Homepage logo animate

const full = "JakeRMiller";
const short = "JRM";
const logo = document.getElementById("logo");

function eraseText(str, onComplete) {
  let i = str.length;
  let interval = setInterval(() => {
    logo.textContent = str.slice(0, i--);
    if (i < 0) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 19);
}

function type(str, onComplete) {
  let i = 0;
  let interval = setInterval(() => {
    logo.textContent = str.slice(0, i++);
    if (i > str.length) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 83); 
}

logo.textContent = full;

setTimeout(() => {
  eraseText(full, () => {
    type(short);
  });
}, 2000);


