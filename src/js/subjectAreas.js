import { gsap } from 'gsap';
import { DataProcessor } from './dataProcessor.js';

export class SubjectAreaManager {
  constructor() {
    this.areas = document.querySelectorAll('.area-card');
    this.contentDisplay = document.querySelector('.content-display');
    this.closeButton = document.querySelector('.close-content');
    this.dataProcessor = new DataProcessor();
    this.currentArea = null;
    this.engagementStartTime = null;
  }

  init() {
    this.setupEventListeners();
    this.loadData();
  }

  async loadData() {
    try {
      await this.dataProcessor.loadAllData();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  setupEventListeners() {
    // Area card interactions
    this.areas.forEach(area => {
      area.addEventListener('mouseenter', (e) => {
        this.handleAreaHover(e.target.dataset.area, 'hover_start');
      });

      area.addEventListener('mouseleave', (e) => {
        this.handleAreaHover(e.target.dataset.area, 'hover_end');
      });

      area.addEventListener('click', (e) => {
        this.handleAreaClick(e.target.dataset.area);
      });
    });

    // Close content
    this.closeButton.addEventListener('click', () => {
      this.closeContent();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.contentDisplay.classList.contains('active')) {
        this.closeContent();
      }
    });
  }

  handleAreaHover(area, action) {
    // Track hover analytics
    if (window.app && window.app.analytics) {
      window.app.analytics.trackSubjectAreaEngagement(area, action);
    }

    // Add subtle animation on hover
    const card = document.querySelector(`[data-area="${area}"]`);
    if (action === 'hover_start') {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  handleAreaClick(area) {
    this.engagementStartTime = Date.now();
    this.currentArea = area;
    
    // Track click analytics
    if (window.app && window.app.analytics) {
      window.app.analytics.trackSubjectAreaEngagement(area, 'click');
    }

    this.showContent(area);
  }

  showContent(area) {
    const content = this.dataProcessor.getContentForArea(area);
    this.renderContent(area, content);
    
    // Animate content display
    gsap.set(this.contentDisplay, { display: 'block' });
    gsap.to(this.contentDisplay, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        this.contentDisplay.classList.add('active');
      }
    });

    // Animate content container
    gsap.fromTo('.content-container',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );
  }

  renderContent(area, content) {
    const title = this.contentDisplay.querySelector('.content-title');
    const description = this.contentDisplay.querySelector('.content-description');
    const body = this.contentDisplay.querySelector('.content-body');

    // Set title and description
    title.textContent = content.title;
    description.textContent = content.description;

    // Render body content
    body.innerHTML = this.generateContentHTML(area, content);

    // Track content view
    if (window.app && window.app.analytics) {
      window.app.analytics.trackContentView(area, 'detailed_view');
    }
  }

  generateContentHTML(area, content) {
    let html = '';

    // Experience section
    if (content.experiences.length > 0) {
      html += `
        <section class="content-section">
          <h3>Experience</h3>
          <div class="experiences-grid">
            ${content.experiences.map(exp => `
              <div class="experience-card">
                <h4>${exp.position}</h4>
                <p class="company">${exp.company} • ${exp.location}</p>
                <p class="duration">${exp.startDate} - ${exp.endDate || 'Present'}</p>
                <p class="description">${exp.description}</p>
                ${exp.achievements ? `
                  <ul class="achievements">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                  </ul>
                ` : ''}
                <div class="skills-tags">
                  ${exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // Projects section
    if (content.projects.length > 0) {
      html += `
        <section class="content-section">
          <h3>Projects</h3>
          <div class="projects-grid">
            ${content.projects.map(project => `
              <div class="project-card">
                <div class="project-icon">${project.icon}</div>
                <h4>${project.title}</h4>
                <p class="project-year">${project.year} • ${project.company}</p>
                <p class="description">${project.description}</p>
                <div class="skills-tags">
                  ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // Blog posts section (for hobbies)
    if (area === 'hobbies' && content.blogPosts) {
      html += `
        <section class="content-section">
          <h3>Blog & Experiments</h3>
          <div class="blog-grid">
            ${content.blogPosts.map(post => `
              <div class="blog-card">
                <h4>${post.title}</h4>
                <p class="blog-date">${post.date}</p>
                <p class="description">${post.excerpt}</p>
                ${post.image ? `<div class="blog-image"><img src="${post.image}" alt="${post.title}"></div>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    return html;
  }

  closeContent() {
    // Track engagement duration
    if (this.engagementStartTime && window.app && window.app.analytics) {
      const duration = Date.now() - this.engagementStartTime;
      window.app.analytics.trackSubjectAreaEngagement(
        this.currentArea, 
        'close', 
        duration
      );
    }

    gsap.to(this.contentDisplay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.contentDisplay.classList.remove('active');
        gsap.set(this.contentDisplay, { display: 'none' });
      }
    });

    this.currentArea = null;
    this.engagementStartTime = null;
  }
}