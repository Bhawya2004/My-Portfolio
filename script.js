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

  // ==========================================================================
  // Resume Chatbot
  // ==========================================================================
  const chatToggle = document.getElementById("chatbotToggle");
  const chatWindow = document.getElementById("chatbotWindow");
  const chatClose = document.getElementById("chatbotClose");
  const chatMessages = document.getElementById("chatbotMessages");
  const chatInput = document.getElementById("chatbotInput");
  const chatSend = document.getElementById("chatbotSend");

  // Toggle open/close
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("open");
  });

  // Close chatbot on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow.classList.contains("open")) {
      chatWindow.classList.remove("open");
    }
  });

  // Add suggestion chips to the welcome message
  const firstBotMsg = chatMessages.querySelector(".chat-bubble");
  if (firstBotMsg) {
    const chips = document.createElement("div");
    chips.className = "chat-chips";
    chips.innerHTML = `
      <span class="chat-chip" data-q="What are your skills?">Skills</span>
      <span class="chat-chip" data-q="Tell me about your projects">Projects</span>
      <span class="chat-chip" data-q="What is your education?">Education</span>
      <span class="chat-chip" data-q="What certificates do you have?">Certificates</span>
      <span class="chat-chip" data-q="What are your achievements?">Achievements</span>
    `;
    firstBotMsg.appendChild(chips);

    chips.querySelectorAll(".chat-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const q = chip.getAttribute("data-q");
        chatInput.value = q;
        handleSend();
      });
    });
  }

  // Resume knowledge base
  const resumeKB = [
    {
      keywords: ["skill", "language", "tech", "stack", "technology", "know", "proficient", "tools", "framework"],
      answer: `<strong>Languages:</strong> C++, Python<br><br>
<strong>Frameworks:</strong> HTML & CSS, NumPy, Pandas, Scikit-Learn, Matplotlib, Seaborn, Streamlit<br><br>
<strong>Tools/Platforms:</strong> Git, GitHub, Postman, Linux Basic<br><br>
<strong>Soft Skills:</strong> Problem-Solving, Team Player, Adaptability`
    },
    {
      keywords: ["project", "work", "built", "develop", "portfolio", "made", "create"],
      answer: `Bhawya has worked on <strong>3 major projects</strong>:<br><br>
<strong>1. Student Dropout Predictor</strong> (Oct 2025 – Jan 2026)<br>
Binary classification using LightGBM with 93% accuracy. FastAPI backend, Streamlit frontend, Dockerized.<br><br>
<strong>2. Employee Attrition Predictor</strong> (Jun – Sep 2025)<br>
Random Forest model to predict employee churn with data cleaning, feature engineering, and comprehensive evaluation.<br><br>
<strong>3. Function Approximation with PSO</strong> (Mar – May 2025)<br>
Web-based tool using Particle Swarm Optimization to train a neural network. Deployed on Vercel.<br><br>
<strong>4. Bangalore Home Price Prediction</strong> (Dec 2025 – Jan 2026)<br>
ML model predicting real estate prices using Linear Regression, Flask API, and responsive frontend.`
    },
    {
      keywords: ["education", "college", "university", "degree", "school", "study", "cgpa", "gpa", "qualification", "lpu"],
      answer: `<strong>B.Tech in CSE (AI & ML)</strong><br>
Lovely Professional University, Jalandhar, Punjab<br>
Since Aug 2023 • CGPA: 7.62<br><br>
<strong>Intermediate (12th)</strong><br>
St Clare's Senior Secondary School, Agra<br>
Apr 2022 – Mar 2023 • Percentage: 67%<br><br>
<strong>Matriculation (10th)</strong><br>
St Clare's Senior Secondary School, Agra<br>
Apr 2020 – Mar 2021 • Percentage: 85%`
    },
    {
      keywords: ["certificate", "certification", "certified", "course", "coursera", "infosys", "cipher"],
      answer: `Bhawya holds <strong>9 certificates</strong>:<br><br>
• <strong>Algo University</strong> — Graph Theory Camp (Feb 2026)<br>
• <strong>ChatGPT-4 Prompt Engineering</strong> — Infosys Springboard (Aug 2025)<br>
• <strong>Build Generative AI Apps</strong> — Infosys Springboard (Aug 2025)<br>
• <strong>Master Generative AI & Tools</strong> — Infosys Springboard (Aug 2025)<br>
• <strong>Computational Theory</strong> — Infosys Springboard (Aug 2025)<br>
• <strong>ML with Data Science</strong> — Cipher School (Jun 2025)<br>
• <strong>Peer-to-Peer Protocols</strong> — Coursera (Oct 2024)<br>
• <strong>Bits and Bytes of Computer Network</strong> — Coursera (Sep 2024)<br>
• <strong>Fundamentals of Computer Network</strong> — Coursera (Sep 2024)`
    },
    {
      keywords: ["achievement", "hackathon", "leetcode", "coding", "competition", "award", "accomplish"],
      answer: `<strong>100+ Coding Questions</strong> (Jan 2026)<br>
Solved 100+ problems on LeetCode with a 50+ day streak.<br><br>
<strong>University Level Hackathon</strong> (Mar 2025)<br>
Participated in LPU Hackathon.<br><br>
<strong>National Level Hackathon</strong> (Feb 2024)<br>
Participated in Advitya at IIT Ropar.`
    },
    {
      keywords: ["training", "cipher", "machine learning", "data science", "ml"],
      answer: `<strong>Cipher School — ML with Data Science</strong> (May – Jul 2025)<br><br>
Completed extensive training covering data science, Python for data science, data visualization, Power BI, statistics, data preprocessing, and major ML algorithms. Developed skills in data analysis, model implementation, and visualization.`
    },
    {
      keywords: ["contact", "email", "phone", "reach", "hire", "connect", "linkedin", "github"],
      answer: `📧 <strong>Email:</strong> bhawyagulati33@gmail.com<br>
📱 <strong>Phone:</strong> +91-7037443867<br>
💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/bhawya-gulati/" target="_blank">linkedin.com/in/bhawya-gulati/</a><br>
🐙 <strong>GitHub:</strong> <a href="https://github.com/Bhawya2004" target="_blank">github.com/Bhawya2004</a>`
    },
    {
      keywords: ["who", "about", "name", "introduction", "introduce", "yourself", "tell me about", "summary", "overview"],
      answer: `<strong>Bhawya Gulati</strong> is a B.Tech student in Computer Science (AI & ML) at Lovely Professional University with a CGPA of 7.62. He's skilled in C++, Python, and ML frameworks, and has built projects involving predictive modeling, neural networks, and web applications. He holds 9 certificates in areas like Generative AI, ML, and networking.`
    },
    {
      keywords: ["gender", "boy", "girl", "male", "female", "man", "woman"],
      answer: `Bhawya is <strong>Male</strong>.`
    },
    {
      keywords: ["language", "speak", "preferred language", "talk"],
      answer: `Bhawya's preferred languages are <strong>English</strong> and <strong>Hindi</strong>.`
    },
    {
      keywords: ["bangalore", "price", "real estate", "home", "house", "bangalore feature"],
      answer: `<strong>Bangalore Home Price Prediction</strong> (Dec 2025 – Jan 2026)<br><br>
• Predicts real estate prices in Bangalore based on location, sq. ft., BHK, and bathrooms<br>
• Trained Linear Regression model served via Flask API<br>
• Responsive HTML/CSS/JavaScript frontend<br>
<strong>Key Features:</strong><br>
- Area-based dynamic pricing<br>
- Interactive property configuration (BHK, baths, sqft)<br>
- Real-time price estimation<br>
• Tech: Python, Flask, Scikit-Learn, HTML, CSS, JavaScript`
    },
    {
      keywords: ["dropout", "student dropout", "lightgbm", "predictor", "dropout feature"],
      answer: `<strong>Student Dropout Predictor</strong> (Oct 2025 – Jan 2026)<br><br>
• Built a binary classification model using LightGBM to predict student dropout risk<br>
• Exposed prediction via FastAPI, tested APIs using Postman<br>
• Integrated a Streamlit frontend and containerized with Docker<br>
• Achieved <strong>93% accuracy</strong><br>
<strong>Key Features:</strong><br>
- Risk assessment based on academic & demographic data<br>
- Interactive Streamlit dashboard for data input<br>
- Fast and scalable REST API using FastAPI<br>
- Containerized deployment<br>
• Tech: Python, Pandas, NumPy, Scikit-Learn, FastAPI, Docker, Postman`
    },
    {
      keywords: ["attrition", "employee", "churn", "random forest", "attrition feature"],
      answer: `<strong>Employee Attrition Predictor</strong> (Jun – Sep 2025)<br><br>
• Built and trained a Random Forest model to predict employee churn<br>
• Implemented data cleaning, feature engineering, imputation, and label encoding<br>
• Validated with accuracy, classification report, and confusion matrix<br>
<strong>Key Features:</strong><br>
- Identifies key factors leading to employee turnover<br>
- Provides actionable insights for HR retention strategies<br>
- Automated data preprocessing pipeline<br>
• Tech: Python, Pandas, Scikit-Learn, Matplotlib`
    },
    {
      keywords: ["pso", "particle swarm", "function approximation", "neural network", "vercel", "pso feature"],
      answer: `<strong>Function Approximation with PSO Neural Network</strong> (Mar – May 2025)<br><br>
• Web-based tool using Particle Swarm Optimization to train a neural network<br>
• Interactive UI to configure model parameters and visualize results<br>
• Automated MSE and R² Score display for immediate feedback<br>
• Deployed on Vercel for live demonstration<br>
<strong>Key Features:</strong><br>
- Visual plotting of true vs. approximated functions in real-time<br>
- Adjustable PSO hyperparameters (swarm size, iterations)<br>
- Live performance tracking (MSE/R² calculations)<br>
• Tech: HTML, CSS, Python`
    },
    {
      keywords: ["experience", "internship", "job", "work experience"],
      answer: `Bhawya is currently a <strong>B.Tech student</strong> (since Aug 2023) and doesn't list any internship or job experience yet. However, he has strong project experience and multiple certifications in ML, AI, and networking.`
    },
    {
      keywords: ["resume", "cv", "download"],
      answer: `You can <strong>download Bhawya's resume</strong> by clicking the "Resume" button in the navigation bar, or directly from the resume preview modal on this portfolio!`
    },
    {
      keywords: ["python", "c++", "programming"],
      answer: `Bhawya is proficient in <strong>C++</strong> and <strong>Python</strong>. He uses Python extensively for machine learning projects with libraries like NumPy, Pandas, Scikit-Learn, Matplotlib, Seaborn, and Streamlit.`
    },
    {
      keywords: ["hi", "hello", "hey", "sup", "good morning", "good evening"],
      answer: `Hey there! 👋 I'm Bhawya's resume assistant. Feel free to ask me about his skills, projects, education, certificates, or achievements!`
    }
  ];

  // Find the best matching response
  function getResponse(input) {
    const lower = input.toLowerCase().trim();

    if (!lower) return "Please type a question to get started! 😊";

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of resumeKB) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (lower.includes(kw)) {
          score += kw.length; // Longer keyword matches = more specific
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.answer;
    }

    return `I can answer questions about Bhawya's <strong>skills</strong>, <strong>projects</strong>, <strong>education</strong>, <strong>certificates</strong>, <strong>achievements</strong>, and <strong>contact info</strong>. Try asking something like "What are your skills?" or "Tell me about your projects"!`;
  }

  // Add a message to the chat
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = `<div class="chat-bubble">${text}</div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show typing indicator, then respond
  function botReply(input) {
    // Show typing indicator
    const typing = document.createElement("div");
    typing.className = "chat-msg bot";
    typing.innerHTML = `<div class="chat-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate thinking delay
    setTimeout(() => {
      chatMessages.removeChild(typing);
      const response = getResponse(input);
      addMessage(response, "bot");
    }, 800 + Math.random() * 600);
  }

  // Handle sending a message
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";
    botReply(text);
  }

  chatSend.addEventListener("click", handleSend);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
