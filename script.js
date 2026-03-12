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

  // --- Scroll Reveal Animations (non-timeline elements only) ---
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
      // Skip timeline items — they are handled by the checkpoint system
      if (reveals[i].classList.contains("tl-item")) continue;

      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
        reveals[i].classList.add("visible");
      }
    }
  };

  window.addEventListener("scroll", revealOnScroll);
  setTimeout(revealOnScroll, 100);

  // --- Timeline Checkpoint System ---
  const tlLine = document.querySelector(".tl-line");
  const timeline = document.querySelector(".timeline");
  const tlItems = document.querySelectorAll(".tl-item");

  const animateTimeline = () => {
    if (!tlLine || !timeline || tlItems.length === 0) return;

    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    const windowHeight = window.innerHeight;

    // How far the viewport bottom has scrolled past the timeline top
    const scrolled = windowHeight - timelineTop;

    // Clamp line height
    let lineHeight = 0;
    if (scrolled <= 0) {
      lineHeight = 0;
    } else if (scrolled >= timelineHeight) {
      lineHeight = timelineHeight;
    } else {
      lineHeight = scrolled;
    }
    tlLine.style.height = lineHeight + "px";

    // For each timeline item, check if the line has reached its dot position
    tlItems.forEach((item) => {
      // Dot position relative to the timeline container
      const itemTop = item.offsetTop;
      const dotOffset = itemTop + 35; // roughly where the dot sits (top: 2.2rem)

      if (lineHeight >= dotOffset) {
        // Line has reached this dot — pop it in
        if (!item.classList.contains("dot-active")) {
          item.classList.add("dot-active");

          // After dot pops in, slide in the card
          setTimeout(() => {
            item.classList.add("visible");
          }, 300);
        }
      }
    });
  };

  window.addEventListener("scroll", animateTimeline);
  window.addEventListener("resize", animateTimeline);
  setTimeout(animateTimeline, 150);

  // --- Prevent cert flip when hovering View Certificate link ---
  document.querySelectorAll(".cert-link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const flipCard = link.closest(".cert-flip");
      if (flipCard) flipCard.classList.add("no-flip");
    });
    link.addEventListener("mouseleave", () => {
      const flipCard = link.closest(".cert-flip");
      if (flipCard) flipCard.classList.remove("no-flip");
    });
  });

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
      'rgba(254, 217, 183, 0.8)',   // peach (#fed9b7)
      'rgba(224, 122, 95, 0.6)',    // terra cotta
      'rgba(129, 178, 154, 0.6)',   // sage green
      'rgba(244, 162, 97, 0.6)',    // golden sand
      'rgba(211, 153, 140, 0.55)',  // muted rose
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
