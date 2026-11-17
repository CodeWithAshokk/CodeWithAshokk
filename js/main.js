/**
 * ============================================================================
 * CODE WITH ASHOK - MASTER JAVASCRIPT (main.js)
 * High-performance Vanilla JS: UI interactions, theme toggle, mobile nav,
 * scroll observers, animations, and accessibility.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE (Dark / Light Theme with LocalStorage Persistence)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  // Sun & Moon SVGs
  const moonIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  const sunIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;

  function initTheme() {
    const savedTheme = localStorage.getItem('cwa_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark as requested

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = moonIconSvg;
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeToggleBtn.setAttribute('title', 'Switch to dark theme');
    } else {
      themeIcon.innerHTML = sunIconSvg;
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      themeToggleBtn.setAttribute('title', 'Switch to light theme');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cwa_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER & ACCESSIBILITY
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (!mobileNavDrawer || !hamburgerBtn) return;
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNavDrawer.classList.add('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNavDrawer || !hamburgerBtn) return;
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNavDrawer.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn && hamburgerBtn.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // --------------------------------------------------------------------------
  // 3. STICKY NAVBAR SCROLL EFFECT
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK DETECTION
  // --------------------------------------------------------------------------
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const linkFile = href.split('/').pop();
      if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. CURRENT COPYRIGHT YEAR IN FOOTER
  // --------------------------------------------------------------------------
  function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // --------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  // Expose globally for dynamic renders
  window.initScrollReveal = initScrollReveal;

  // --------------------------------------------------------------------------
  // 8. ANIMATED STAT COUNTERS
  // --------------------------------------------------------------------------
  function initStatCounters() {
    const counterElements = document.querySelectorAll('.metric-number[data-target]');
    if (!counterElements.length) return;

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetEl = entry.target;
            const target = parseInt(targetEl.getAttribute('data-target'), 10);
            const duration = 1800; // ms
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                targetEl.textContent = target + (targetEl.getAttribute('data-suffix') || '');
                clearInterval(timer);
              } else {
                targetEl.textContent = Math.floor(current) + (targetEl.getAttribute('data-suffix') || '');
              }
            }, stepTime);

            observer.unobserve(targetEl);
          }
        });
      }, { threshold: 0.3 });

      counterElements.forEach(el => counterObserver.observe(el));
    } else {
      counterElements.forEach(el => {
        el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
      });
    }
  }

  // --------------------------------------------------------------------------
  // 9. ANIMATED SKILL PROGRESS BARS (Skills Page & Overview)
  // --------------------------------------------------------------------------
  function initSkillProgressBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    if ('IntersectionObserver' in window) {
      const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const bar = card.querySelector('.progress-bar-fill');
            if (bar) {
              const targetWidth = bar.getAttribute('data-width') || '80%';
              bar.style.width = targetWidth;
            }
            observer.unobserve(card);
          }
        });
      }, { threshold: 0.2 });

      skillCards.forEach(card => skillObserver.observe(card));
    } else {
      skillCards.forEach(card => {
        const bar = card.querySelector('.progress-bar-fill');
        if (bar) bar.style.width = bar.getAttribute('data-width') || '80%';
      });
    }
  }

  // --------------------------------------------------------------------------
  // 10. FAQ ACCORDION (Community & About Page)
  // --------------------------------------------------------------------------
  function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. INITIALIZATION ON DOM READY
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    highlightActiveNavLink();
    setCurrentYear();
    handleNavbarScroll();
    initScrollReveal();
    initStatCounters();
    initSkillProgressBars();
    initFaqAccordions();
    initTypewriter();
    initTerminalTabs();
  });

  // --------------------------------------------------------------------------
  // 12. HERO LIVE TYPEWRITER EFFECT
  // --------------------------------------------------------------------------
  function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = [
      'Full Stack Web Developer',
      'Voice AI Explorer',
      'Creator of VidhiMitra Voice AI',
      'Rechat Collaborator (w/ Repswal)',
      'Clean Code Architect',
      'Community Tech Mentor'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 75;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1900; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 350; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // --------------------------------------------------------------------------
  // 13. HERO DUAL-TAB TERMINAL SWITCHER
  // --------------------------------------------------------------------------
  function initTerminalTabs() {
    const tabs = document.querySelectorAll('.terminal-tab');
    const panes = document.querySelectorAll('.terminal-pane');
    if (!tabs.length || !panes.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPane = document.getElementById(target);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

})();
