/**
 * ============================================================================
 * CODE WITH ASHOK - PROJECTS DATA & FILTERING MODULE (projects.js)
 * Clean, modular Vanilla JS for category filtering, live searching,
 * responsive rendering, and accessible state management.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. PROJECT DATA REPOSITORY
  // --------------------------------------------------------------------------
  /**
   * ==========================================================================
   * HOW TO ADD OR EDIT A PROJECT (Effortless Future Edits):
   * Simply duplicate an object below and customize the fields:
   *  - id: Unique string identifier (e.g. 'my-project')
   *  - title: Official project name
   *  - category: 'fullstack' | 'frontend' | 'ai' | 'python' | 'cpp'
   *  - badge: Top-right card pill label (e.g. 'Voice AI', 'Flagship', 'Realtime')
   *  - description: 1-2 sentence overview of the application
   *  - image: Path to screenshot or SVG mockup in assets/images/
   *  - technologies: Array of technologies used
   *  - liveDemoUrl: Target URL for the Live Demo button
   *  - githubUrl: Target URL for the GitHub repository
   *  - featured: Set true to display on the Home page (index.html)
   * ==========================================================================
   */
  const PROJECTS_DATA = [
    {
      id: 'rechat',
      title: 'Rechat — Modern Realtime Communication Suite',
      category: 'fullstack',
      badge: 'Collab w/ CodeWithRepswal',
      description: 'A high-performance real-time messaging application engineered in collaborative development with @codewithrepswal, featuring responsive chat rooms, instant message delivery, multimedia sharing, online presence tracking, and dark/light UI modes.',
      image: 'assets/images/project-rechat.svg',
      technologies: ['🤝 Collab w/ Repswal', 'HTML5', 'CSS3', 'JavaScript ES6+', 'WebSockets'],
      liveDemoUrl: 'https://github.com/CodeWithAshokk',
      githubUrl: 'https://github.com/CodeWithAshokk/rechat',
      featured: true
    },
    {
      id: 'vidhimitra',
      title: 'VidhiMitra / BolAdhikar — Voice AI Legal Rights Assistant',
      category: 'ai',
      badge: 'Voice AI / Legal-Tech',
      description: 'An accessible, voice-enabled AI legal assistance platform ("Bol Adhikar") empowering citizens to speak queries regarding Indian constitutional rights, legal literacy, and public justice procedures in regional languages.',
      image: 'assets/images/project-vidhimitra.svg',
      technologies: ['Web Speech API', 'Speech Synthesis', 'JavaScript', 'REST AI APIs', 'Glassmorphism'],
      liveDemoUrl: 'https://github.com/CodeWithAshokk',
      githubUrl: 'https://github.com/CodeWithAshokk/vidhimitra-voice-ai',
      featured: true
    },
    {
      id: 'qrcode-studio',
      title: 'QR Code Studio — Pro Generator & Customizer',
      category: 'frontend',
      badge: 'Interactive Web Tool',
      description: 'An interactive client-side QR generation studio enabling dynamic data encoding, custom color palettes, brand logo badge embedding, and high-resolution SVG/PNG downloads with zero server dependencies.',
      image: 'assets/images/project-qrcode.svg',
      technologies: ['HTML5 Canvas', 'CSS Grid', 'Vanilla JavaScript', 'SVG Export', 'Client-Side'],
      liveDemoUrl: 'https://github.com/CodeWithAshokk',
      githubUrl: 'https://github.com/CodeWithAshokk/qr-code-studio',
      featured: true
    }
  ];

  // --------------------------------------------------------------------------
  // 2. TEMPLATE GENERATOR FOR PROJECT CARD
  // --------------------------------------------------------------------------
  function createProjectCardHTML(project) {
    const techTags = project.technologies
      .map(tech => `<span class="project-tag">${escapeHTML(tech)}</span>`)
      .join('');

    return `
      <article class="project-card reveal-on-scroll revealed" data-category="${project.category}">
        <div class="project-thumb">
          <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} Thumbnail" loading="lazy" width="600" height="360" />
          <span class="project-badge">${escapeHTML(project.badge)}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHTML(project.title)}</h3>
          <p class="project-desc">${escapeHTML(project.description)}</p>
          <div class="project-tags">
            ${techTags}
          </div>
          <div class="project-actions">
            <a href="${escapeHTML(project.liveDemoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" aria-label="View live demo of ${escapeHTML(project.title)}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Live Demo
            </a>
            <a href="${escapeHTML(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="View GitHub source code of ${escapeHTML(project.title)}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // Safe HTML Escaping against XSS
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 3. RENDER FEATURED PROJECTS (For Home Page index.html)
  // --------------------------------------------------------------------------
  function renderFeaturedProjects() {
    const featuredContainer = document.getElementById('featured-projects-container');
    if (!featuredContainer) return;

    const featuredList = PROJECTS_DATA.filter(p => p.featured);
    featuredContainer.innerHTML = featuredList.map(createProjectCardHTML).join('');
    
    // Ensure all featured cards are instantly visible and animated
    const revealElements = featuredContainer.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => el.classList.add('revealed'));

    if (typeof window.initScrollReveal === 'function') {
      window.initScrollReveal();
    }
  }

  // --------------------------------------------------------------------------
  // 4. MAIN PROJECTS SHOWCASE (For projects.html)
  // --------------------------------------------------------------------------
  function initProjectsShowcase() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const countDisplay = document.getElementById('projects-count');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function filterAndRender() {
      const filtered = PROJECTS_DATA.filter(project => {
        // Category check (Supports 'all', 'flagship', 'ai', 'fullstack', 'frontend', 'python', 'cpp')
        let matchesCategory = false;
        if (currentCategory === 'all') {
          matchesCategory = true;
        } else if (currentCategory === 'flagship') {
          matchesCategory = project.featured === true;
        } else if (currentCategory === 'ai') {
          matchesCategory = project.category === 'ai' || project.badge.toLowerCase().includes('ai');
        } else {
          matchesCategory = project.category === currentCategory;
        }

        // Search check (title, description, badge, or tech stack)
        const term = currentSearchTerm.toLowerCase().trim();
        const matchesSearch = !term ||
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.badge.toLowerCase().includes(term) ||
          project.technologies.some(t => t.toLowerCase().includes(term));

        return matchesCategory && matchesSearch;
      });

      // Update counter
      if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} of ${PROJECTS_DATA.length} projects`;
      }

      // Render cards or empty state
      if (filtered.length === 0) {
        projectsContainer.innerHTML = `
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">No matching projects found</h3>
            <p style="color: var(--text-muted); max-width: 420px; margin: 0 auto 1.5rem;">
              We couldn't find any projects matching "${escapeHTML(currentSearchTerm)}". Try searching for "Rechat", "Voice AI", "QR Code", "Python", or "C++".
            </p>
            <button id="reset-filter-btn" class="btn btn-secondary btn-sm">Reset Filters</button>
          </div>
        `;

        const resetBtn = document.getElementById('reset-filter-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearchTerm = '';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            filterButtons.forEach(btn => {
              btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
            });
            filterAndRender();
          });
        }
      } else {
        projectsContainer.innerHTML = filtered.map(createProjectCardHTML).join('');
      }

      // Re-trigger scroll reveal for newly added cards
      const newRevealElements = projectsContainer.querySelectorAll('.reveal-on-scroll');
      newRevealElements.forEach(el => el.classList.add('revealed'));
    }

    // Filter Button Event Listeners
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-filter') || 'all';
        filterAndRender();
      });
    });

    // Search Input Listener with instant response
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.style.display = currentSearchTerm.length > 0 ? 'flex' : 'none';
        }
        filterAndRender();
      });
    }

    // Clear Search Button
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        clearSearchBtn.style.display = 'none';
        currentSearchTerm = '';
        filterAndRender();
      });
    }

    // Initial render
    filterAndRender();
  }

  // --------------------------------------------------------------------------
  // 5. INITIALIZE ON DOM READY
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProjects();
    initProjectsShowcase();
  });

})();
