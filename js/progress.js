// Select the progress bar element
const progressBar = document.getElementById('progress');

// Function to update the progress bar
function updateProgressBar() {
  const scrollTop = window.scrollY; // Amount of scroll from the top
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
  const scrollPercentage = (scrollTop / documentHeight) * 100; // Calculate scroll percentage

  // Update the width of the progress bar
  progressBar.style.width = `${scrollPercentage}%`;
}

// Attach the updateProgressBar function to the scroll event
window.addEventListener('scroll', updateProgressBar);
