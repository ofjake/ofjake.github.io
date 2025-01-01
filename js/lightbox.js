document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  const triggers = document.querySelectorAll('.lightbox-trigger');

  // Show lightbox with high-res image
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const largeSrc = trigger.getAttribute('data-large') || trigger.src; // Get high-res image source
      lightboxImg.src = largeSrc; // Set it as the lightbox image
      lightbox.classList.add('show'); // Add 'show' class for animation
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('show'); // Remove 'show' class
    setTimeout(() => {
      lightboxImg.src = ''; // Clear the image after fade-out
    }, 500); // Match the fade-out duration
  };

  closeBtn.addEventListener('click', closeLightbox);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
