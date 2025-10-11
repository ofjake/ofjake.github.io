document.addEventListener("DOMContentLoaded", () => {
  const ease = "power4.inOut";

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Check if the link has the "no-action" class
      if (link.classList.contains("no-action")) {
        console.log("Bypassed universal handler for:", link.href);
        return; // Skip the universal behavior
      }

      event.preventDefault();
      const href = link.getAttribute("href");

      // Check if the link is not a hash link or the current pathname
      if (href && !href.startsWith("#") && href !== window.location.pathname) {
        animateTransition().then(() => {
          window.location.href = href;
        });
      }
    });
  });

  // Initial reveal transition
  revealTransition().then(() => {
    gsap.set(".block", { visibility: "hidden" });
  });

  // Reveal transition function
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

  // Animate transition function
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


// mouse scroll slowdown

document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault(); // Prevent default scrolling behavior

    // Adjust the multiplier to speed up scrolling
    const scrollSpeed = 3; // Higher value = faster scrolling

    // Smooth scrolling effect
    window.scrollBy({
      top: event.deltaY * scrollSpeed, // Multiply scroll distance
      behavior: "smooth", // Smooth scrolling
    });
  },
  { passive: false } // Required for preventDefault to work
);
