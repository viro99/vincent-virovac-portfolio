import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { NameWheelAnimation } from './js/nameWheel.js';
import { SubjectAreaManager } from './js/subjectAreas.js';
import { AnalyticsManager } from './js/analytics.js';
import { ContactForm } from './js/contactForm.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

class App {
  constructor() {
    this.analytics = new AnalyticsManager();
    this.nameWheel = new NameWheelAnimation();
    this.subjectAreas = new SubjectAreaManager();
    this.contactForm = new ContactForm();
    
    this.init();
  }

  init() {
    // Initialize analytics
    this.analytics.init();
    
    // Initialize name wheel animation
    this.nameWheel.init();
    
    // Initialize subject areas
    this.subjectAreas.init();
    
    // Initialize contact form
    this.contactForm.init();
    
    // Set up global animations
    this.setupScrollAnimations();
    
    // Track initial page load
    this.analytics.trackEvent('page_view', {
      page_title: 'Landing Page',
      page_location: window.location.href
    });
  }

  setupScrollAnimations() {
    // Animate tagline on scroll
    gsap.fromTo('.tagline', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        delay: 2,
        ease: 'power2.out'
      }
    );

    // Animate area cards
    gsap.fromTo('.area-card', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.2,
        delay: 2.5,
        ease: 'power2.out'
      }
    );
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});