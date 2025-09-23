import { gsap } from 'gsap';

export class SubjectAreaManager {
  constructor() {
    this.experienceData = null;
    this.projectsData = null;
    this.areas = null;
    this.modalOverlay = document.querySelector('.modal-overlay');
    this.currentArea = null;
    this.engagementStartTime = null;
    
    // Initialize card data structure
    this.cardData = {
      fintech: { title: 'Fintech', icon: '🏦', description: 'Building the future of finance', content: [] },
      media: { title: 'Media', icon: '📺', description: 'Creating engaging digital experiences', content: [] },
      hobbies: { title: 'Hobbies', icon: '🎯', description: 'Passion projects and interests', content: [] }
    };
  }

  async loadData() {
    try {
      // Load JSON data using fetch with correct base path
      const [experienceRes, projectsRes] = await Promise.all([
        fetch('/vincent-virovac-portfolio/data/experience.json'),
        fetch('/vincent-virovac-portfolio/data/projects.json')
      ]);

      this.experienceData = await experienceRes.json();
      this.projectsData = await projectsRes.json();
      
      // Update card content with real data
      this.cardData.fintech.content = this.prepareContentData('fintech');
      this.cardData.media.content = this.prepareContentData('media');  
      this.cardData.hobbies.content = this.prepareContentData('hobbies');
      
      console.log('SubjectAreaManager: Data loaded successfully');
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  async init() {
    console.log('SubjectAreaManager: Starting initialization');
    
    // Load data first
    await this.loadData();
    
    // Then initialize cards
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeCards();
      });
    } else {
      this.initializeCards();
    }
  }

  initializeCards() {
    try {
      console.log('SubjectAreaManager: Starting card initialization');
      this.createCards();
      this.setupEventListeners();
      console.log('SubjectAreaManager: Cards initialized successfully');
    } catch (error) {
      console.error('SubjectAreaManager initialization failed:', error);
      // Fallback: try again after a short delay
      setTimeout(() => {
        console.log('SubjectAreaManager: Retrying initialization');
        this.createCards();
        this.setupEventListeners();
      }, 500);
    }
  }

  prepareContentData(category) {
    if (!this.experienceData || !this.projectsData) {
      return [];
    }

    const content = [];

    // Add relevant work experience
    if (this.experienceData.workExperience) {
      const relevantExperience = this.experienceData.workExperience.filter(exp => {
        // You can customize these filters based on your data structure
        const description = exp.description?.toLowerCase() || '';
        const skills = exp.skills?.join(' ').toLowerCase() || '';
        
        if (category === 'fintech') {
          return description.includes('fintech') || description.includes('crypto') || 
                 description.includes('financial') || skills.includes('blockchain');
        } else if (category === 'media') {
          return description.includes('media') || description.includes('content') || 
                 description.includes('interview') || description.includes('video');
        }
        return false;
      });

      relevantExperience.forEach(exp => {
        content.push({
          type: 'experience',
          title: exp.position,
          company: exp.company,
          duration: `${exp.startDate} - ${exp.endDate || 'Present'}`,
          description: exp.description,
          achievements: exp.achievements || [],
          technologies: exp.skills || []
        });
      });
    }

    // Add relevant projects
    if (this.projectsData.projects) {
      const relevantProjects = this.projectsData.projects.filter(project => {
        const description = project.description?.toLowerCase() || '';
        const category_field = project.category?.toLowerCase() || '';
        
        if (category === 'media') {
          return description.includes('media') || category_field.includes('media') ||
                 description.includes('video') || description.includes('content');
        } else if (category === 'fintech') {
          return description.includes('crypto') || description.includes('financial') ||
                 category_field.includes('fintech');
        }
        return category === 'hobbies'; // Show all projects in hobbies for now
      });

      relevantProjects.forEach(project => {
        content.push({
          type: 'project',
          title: project.title,
          description: project.description,
          technologies: project.technologies || project.tags || [],
          link: project.links?.demo,
          github: project.links?.code
        });
      });
    }

    return content;
  }

  createCards() {
    const container = document.querySelector('.subject-areas');
    if (!container) {
      console.error('SubjectAreaManager: .subject-areas container not found');
      return;
    }

    // Clear any existing cards first
    container.innerHTML = '';
    console.log('SubjectAreaManager: Creating cards for container', container);

    Object.entries(this.cardData).forEach(([key, data]) => {
      const card = this.createCard(key, data);
      container.appendChild(card);
      console.log(`SubjectAreaManager: Created ${key} card`);
    });

    // Update areas selector after cards are created
    this.areas = document.querySelectorAll('.subject-card');
    console.log(`SubjectAreaManager: Found ${this.areas.length} cards after creation`);

    // Ensure cards are visible first, then animate
    gsap.set('.subject-card', { opacity: 1, y: 0 });
    
    // Animate cards in with a slight delay to ensure they're rendered
    requestAnimationFrame(() => {
      gsap.fromTo('.subject-card', {
        opacity: 0,
        y: 30,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    });
  }

  createCard(key, data) {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.dataset.subject = key;

    card.innerHTML = `
      <div class="card-icon">${data.icon}</div>
      <h3 class="card-title">${data.title}</h3>
      <p class="card-description">${data.description}</p>
    `;

    return card;
  }

  setupEventListeners() {
    // Get fresh reference to cards
    this.areas = document.querySelectorAll('.subject-card');
    
    if (!this.areas || this.areas.length === 0) {
      console.error('SubjectAreaManager: No subject cards found for event listeners');
      return;
    }

    console.log(`SubjectAreaManager: Setting up event listeners for ${this.areas.length} cards`);

    // Area card interactions
    this.areas.forEach((area, index) => {
      const subject = area.dataset.subject;
      if (!subject) {
        console.error(`SubjectAreaManager: Card ${index} missing data-subject attribute`);
        return;
      }

      area.addEventListener('mouseenter', (e) => {
        this.handleAreaHover(subject, 'hover_start');
      });

      area.addEventListener('mouseleave', (e) => {
        this.handleAreaHover(subject, 'hover_end');
      });

      area.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAreaClick(subject);
      });
    });

    // Modal close buttons
    const backButton = document.querySelector('.back-button');
    const closeButton = document.querySelector('.close-button');

    if (backButton) {
      backButton.addEventListener('click', () => {
        this.closeContent();
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeContent();
      });
    }

    // Click outside modal to close
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeContent();
        }
      });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentArea) {
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
    if (window.gtag) {
      window.gtag('event', 'section_view', {
        section_name: area,
        event_category: 'engagement'
      });
    }

    this.showContent(area);
  }

  showContent(area) {
    const data = this.cardData[area];
    if (!data) return;

    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalBody = document.querySelector('.modal-body');

    if (!this.modalOverlay || !modalTitle || !modalDescription || !modalBody) return;

    // Update content
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalBody.innerHTML = this.renderContent(data.content);

    // Show modal with animation
    this.modalOverlay.classList.add('active');
  }

  renderContent(content) {
    return content.map(item => {
      if (item.type === 'experience') {
        return this.renderExperience(item);
      } else if (item.type === 'project') {
        return this.renderProject(item);
      } else if (item.type === 'hobby') {
        return this.renderHobby(item);
      }
    }).join('');
  }

  renderExperience(exp) {
    return `
      <div class="content-item experience-item">
        <div class="item-header">
          <h3>${exp.title}</h3>
          <p class="company">${exp.company} • ${exp.duration}</p>
        </div>
        <p class="description">${exp.description}</p>
        ${exp.achievements ? `
          <div class="achievements">
            <h4>Key Achievements</h4>
            <ul>
              ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${exp.technologies ? `
          <div class="technologies">
            ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  renderProject(project) {
    return `
      <div class="content-item project-item">
        <div class="item-header">
          <h3>${project.title}</h3>
          <div class="project-links">
            ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener">Live Demo</a>` : ''}
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
          </div>
        </div>
        <p class="description">${project.description}</p>
        ${project.technologies ? `
          <div class="technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  renderHobby(hobby) {
    return `
      <div class="content-item hobby-item">
        <h3>${hobby.title}</h3>
        <p class="description">${hobby.description}</p>
        <p class="detail">${hobby.detail}</p>
      </div>
    `;
  }

  closeContent() {
    // Track engagement duration
    if (this.engagementStartTime && window.gtag) {
      const duration = Date.now() - this.engagementStartTime;
      window.gtag('event', 'engagement_time', {
        section_name: this.currentArea,
        duration: duration,
        event_category: 'engagement'
      });
    }

    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('active');
    }

    setTimeout(() => {
      this.currentArea = null;
      this.engagementStartTime = null;
    }, 300);
  }
}