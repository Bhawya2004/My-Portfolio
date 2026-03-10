document.addEventListener("DOMContentLoaded", () => {
  // --- Navigation Highlights & Scroll Background ---
  const header = document.getElementById("navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // Add shadow to header on scroll
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  const resumeBtn = document.querySelector(".resume-btn");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("nav-active");
    if (navMenu.classList.contains("nav-active")) {
      navMenu.style.display = "flex";
    } else {
      navMenu.style.display = "none";
    }
  });

  // Close mobile menu when link clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("nav-active");
        navMenu.style.display = "none";
      }
    });
  });

  // Reset layout on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.style.display = "flex";
      navMenu.classList.remove("nav-active");
    } else if (!navMenu.classList.contains("nav-active")) {
      navMenu.style.display = "none";
    }
  });

  // --- Scroll Reveal Animations ---
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
      }
    }
  };

  window.addEventListener("scroll", revealOnScroll);

  // Trigger once on load to show elements already in viewport
  setTimeout(revealOnScroll, 100);

  // --- Theme Toggle (Dark / Light) ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
          themeIcon.className = 'fas fa-moon';
      } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          themeIcon.className = 'fas fa-sun';
      }
  });

  // --- Floating Background Shapes ---
  const shapesContainer = document.getElementById('floatingShapes');
  const shapeColors = [
      'rgba(108, 99, 255, 0.7)',    // purple
      'rgba(255, 107, 107, 0.6)',   // coral
      'rgba(99, 179, 255, 0.6)',    // sky blue
      'rgba(255, 183, 77, 0.55)',   // amber
      'rgba(129, 236, 236, 0.55)',  // teal
  ];

  function randomBetween(min, max) {
      return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < 25; i++) {
      const shape = document.createElement('div');
      shape.classList.add('floating-shape');

      const size = randomBetween(20, 80);
      const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];

      // Random start position
      shape.style.width = size + 'px';
      shape.style.height = size + 'px';
      shape.style.background = color;
      shape.style.left = randomBetween(0, 100) + '%';
      shape.style.top = randomBetween(0, 100) + '%';

      // Random float path via CSS custom properties
      shape.style.setProperty('--dx1', randomBetween(-120, 120) + 'px');
      shape.style.setProperty('--dy1', randomBetween(-120, 120) + 'px');
      shape.style.setProperty('--dx2', randomBetween(-150, 150) + 'px');
      shape.style.setProperty('--dy2', randomBetween(-150, 150) + 'px');
      shape.style.setProperty('--dx3', randomBetween(-120, 120) + 'px');
      shape.style.setProperty('--dy3', randomBetween(-120, 120) + 'px');

      // Random animation duration for organic feel
      shape.style.animationDuration = randomBetween(15, 35) + 's';
      shape.style.animationDelay = randomBetween(0, 10) + 's';

      // Some shapes are not circles
      if (Math.random() > 0.5) {
          shape.style.borderRadius = randomBetween(20, 50) + '%';
      }

      shapesContainer.appendChild(shape);
  }

  // --- Resume Modal ---
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
  });

  closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
  });

  // Close on overlay click
  resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
          resumeModal.classList.remove('open');
          document.body.style.overflow = '';
      }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
          resumeModal.classList.remove('open');
          document.body.style.overflow = '';
      }
  });
});
