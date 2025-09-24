import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export class SubjectAreaManager {
  constructor() {
    this.experienceData = null;
    this.projectsData = null;
    this.areas = null;
    this.pageContainer = document.querySelector('#section-page');
    this.landingContainer = document.querySelector('.landing-container');
    this.currentArea = null;
    this.engagementStartTime = null;
    
    // Initialize card data structure
    this.cardData = {
      fintech: { title: 'Fintech', icon: '🏦', content: [] },
      media: { title: 'Media', icon: '📺', content: [] },
      hobbies: { title: 'Hobbies', icon: '🎯', content: [] }
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
        this.handleInitialRoute();
      });
    } else {
      this.initializeCards();
      this.handleInitialRoute();
    }
  }

  handleInitialRoute() {
    // Check if we're on a section page initially (direct URL access)
    const path = window.location.pathname;
    const match = path.match(/\/vincent-virovac-portfolio\/([^\/]+)$/);
    
    if (match && this.cardData[match[1]]) {
      // Show the section directly without animation
      this.showContent(match[1], false);
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
          technologies: exp.skills || [],
          images: exp.images || null
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
          github: project.links?.code,
          images: project.images || null
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

    // Page navigation buttons
    const backButton = document.querySelector('.back-button');

    if (backButton) {
      backButton.addEventListener('click', () => {
        this.navigateToHome();
      });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.section) {
        this.showContent(e.state.section, false); // Don't push state again
      } else {
        this.navigateToHome(false); // Don't push state again
      }
    });

    // ESC key to go back
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentArea) {
        this.navigateToHome();
      }
    });
  }

  handleAreaHover(area, action) {
    // Track hover analytics
    if (window.gtag) {
      window.gtag('event', 'hover', {
        section_name: area,
        action: action,
        event_category: 'engagement'
      });
    }

    // Add subtle animation on hover
    const card = document.querySelector(`[data-subject="${area}"]`);
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

    this.navigateToSection(area);
  }

  navigateToSection(area) {
    const data = this.cardData[area];
    if (!data) return;

    // Update URL
    const newPath = `/vincent-virovac-portfolio/${area}`;
    history.pushState({ section: area }, data.title, newPath);

    this.showContent(area, true);
  }

  showContent(area, animate = true) {
    const data = this.cardData[area];
    if (!data) return;

    const sectionTitle = document.querySelector('#section-title');
    const sectionBody = document.querySelector('#section-body');

    if (!this.pageContainer || !sectionTitle || !sectionBody) return;

    // Update content with special Media effect
    if (area === 'media') {
      sectionTitle.innerHTML = this.getMediaAnimatedTitle();
    } else {
      sectionTitle.textContent = data.title;
    }
    sectionBody.innerHTML = this.renderContent(data.content);

    // Show page with animation
    this.pageContainer.style.display = 'block';
    
    if (animate) {
      // Animate out landing page and in section page
      gsap.to(this.landingContainer, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (this.landingContainer) {
            this.landingContainer.style.display = 'none';
          }
        }
      });

      gsap.fromTo(this.pageContainer, 
        { opacity: 0, x: 100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.4, 
          ease: 'power2.out', 
          delay: 0.1,
          onComplete: () => {
            if (area === 'media') {
              setTimeout(() => this.initMediaAnimation(), 200);
            }
          }
        }
      );
    } else {
      // Instant show (for back/forward navigation)
      if (this.landingContainer) {
        this.landingContainer.style.display = 'none';
      }
      this.pageContainer.style.opacity = '1';
      this.pageContainer.style.transform = 'translateX(0)';
      
      if (area === 'media') {
        setTimeout(() => this.initMediaAnimation(), 300);
      }
    }

    this.pageContainer.classList.add('active');
  }

  navigateToHome(updateHistory = true) {
    if (updateHistory) {
      history.pushState(null, 'Vincent Virovac Portfolio', '/vincent-virovac-portfolio/');
    }

    // Animate out section page and in landing page
    gsap.to(this.pageContainer, {
      opacity: 0,
      x: 100,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.pageContainer.style.display = 'none';
        this.pageContainer.classList.remove('active');
      }
    });

    if (this.landingContainer) {
      this.landingContainer.style.display = 'flex';
      gsap.fromTo(this.landingContainer,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    }

    // Track engagement duration
    if (this.engagementStartTime && window.gtag) {
      const duration = Date.now() - this.engagementStartTime;
      window.gtag('event', 'engagement_time', {
        section_name: this.currentArea,
        duration: duration,
        event_category: 'engagement'
      });
    }

    this.currentArea = null;
    this.engagementStartTime = null;
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
          ${exp.images?.logo ? `<div class="company-logo">
            <img src="${exp.images.logo}" alt="${exp.company} logo" />
          </div>` : ''}
          <div class="header-text">
            <h3>${exp.title}</h3>
            <p class="company">${exp.company} • ${exp.duration}</p>
          </div>
        </div>
        <p class="description">${exp.description}</p>
        ${exp.achievements && exp.achievements.length > 0 ? `
          <div class="achievements">
            <h4>Key Achievements</h4>
            <ul>
              ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${exp.technologies && exp.technologies.length > 0 ? `
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
          ${project.images?.logo ? `<div class="company-logo">
            <img src="${project.images.logo}" alt="${project.title} logo" />
          </div>` : ''}
          <div class="header-text">
            <h3>${project.title}</h3>
            <div class="project-links">
              ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener">Live Demo</a>` : ''}
              ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
            </div>
          </div>
        </div>
        <p class="description">${project.description}</p>
        ${project.technologies && project.technologies.length > 0 ? `
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

  getMediaAnimatedTitle() {
    return `
      <div class="media-stage">
        <div class="media-content">
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red">MEDIA</span>
              <span class="media-name media-name--blue">MEDIA</span>
            </span>
          </h1>
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red">MEDIA</span>
              <span class="media-name media-name--blue">MEDIA</span>
            </span>
          </h1>
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red">MEDIA</span>
              <span class="media-name media-name--blue">MEDIA</span>
            </span>
          </h1>
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red">MEDIA</span>
              <span class="media-name media-name--blue">MEDIA</span>
            </span>
          </h1>
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red">MEDIA</span>
              <span class="media-name media-name--blue">MEDIA</span>
            </span>
          </h1>
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red">MEDIA</span>
              <span class="media-name media-name--blue">MEDIA</span>
            </span>
          </h1>
          <h1 class="media-band">
            <span class="media-names">
              <span class="media-name media-name--red media-name__end media-name__end--red">MEDIA</span>
              <span class="media-name media-name--blue media-name__end media-name__end--blue">MEDIA</span>
            </span>
          </h1>
        </div>
      </div>
    `;
  }

  initMediaAnimation() {
    // Use imported SplitText for character-by-character animation
    let mediaST = new SplitText('.media-name', {
      type: "chars", 
      charsClass: "mediaChar", 
      position: "absolute"
    });

    // Initial setup
    gsap.set('.media-stage', { autoAlpha: 1 });
    gsap.set('.media-content', { rotate: -15 });

    this.mediaIntro();
    this.mediaLoop();
  }

  mediaIntro() {
    let tl = gsap.timeline({
      delay: 0.5,
      defaults: {
        duration: 1.5,
        ease: 'power4'
      }
    });
    
    tl.from('.media-names', {
      x: function(i) {
        if (i % 2 == 0) {
          return 800;
        }
        return -800;
      },
      stagger: 0.1
    });
    
    return tl;
  }

  mediaLoop() {
    let tl = gsap.timeline({
      repeat: -1,
      delay: 2
    });
    
    tl.to('.media-names', {
      y: -120,
      duration: 4,
      ease: 'none'
    })
    .from('.media-name__end--red .mediaChar', {
      y: 140,
      duration: 2.5,
      ease: 'power4',
      stagger: 0.04
    }, 0.8)
    .from('.media-name__end--blue .mediaChar', {
      y: 140,
      duration: 2.5,
      ease: 'power4',
      stagger: 0.04
    }, 1.1)
    .from('.media-band:nth-of-type(4) .media-name--blue .mediaChar', {
      y: -140,
      duration: 1.8,
      ease: 'power4.inOut',
      stagger: -0.04
    }, 0)
    .to('.media-band:nth-of-type(5) .media-name--blue .mediaChar', {
      y: 140,
      duration: 1.8,
      ease: 'power4.inOut',
      stagger: -0.04
    }, 0);
    
    return tl;
  }


}