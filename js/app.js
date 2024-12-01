document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navList = document.querySelector('#navbar__list');
  const scrollToTopButton = document.querySelector('#scroll-to-top');

  // Generate navigation dynamically
  sections.forEach(section => {
    const navItem = document.createElement('li');
    navItem.innerHTML = `<a href="#${section.id}" aria-label="Scroll to ${section.dataset.nav}">${section.dataset.nav}</a>`;
    navList.appendChild(navItem);
  });

  const navLinks = document.querySelectorAll('#navbar__list a');

  // Smooth scrolling
  navList.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.tagName === 'A') {
      const targetId = event.target.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Highlight active section
  document.addEventListener('scroll', () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        navLinks.forEach(a => a.classList.remove('active'));
        document.querySelector(`a[href="#${section.id}"]`).classList.add('active');
      }
    });

    // Show or hide scroll-to-top button
    scrollToTopButton.classList.toggle('hidden', window.scrollY < 200);
  });

  // Scroll-to-top functionality with slower scrolling
  scrollToTopButton.addEventListener('click', () => {
    let scrollDuration = 1500; // Scroll duration in milliseconds (adjust to make slower/faster)
    let scrollDistance = window.scrollY;
    let startTime = null;

    // Function to scroll slowly
    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = timestamp - startTime;
      let percentage = Math.min(progress / scrollDuration, 1);
      window.scrollTo(0, scrollDistance - (scrollDistance * percentage));

      if (progress < scrollDuration) {
        requestAnimationFrame(scrollStep);
      }
    }

    // Start the slow scroll animation
    requestAnimationFrame(scrollStep);
  });
});
