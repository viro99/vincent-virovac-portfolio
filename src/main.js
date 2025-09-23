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
    console.log('App: Starting initialization');
    
    // Initialize analytics
    this.analytics.init();
    
    // Initialize name wheel animation
    this.nameWheel.init();
    
    // Initialize subject areas with higher priority (async)
    setTimeout(async () => {
      console.log('App: Initializing subject areas');
      await this.subjectAreas.init();
    }, 100);
    
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
    // Animate tagline immediately (no delay)
    gsap.fromTo('.tagline', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
      }
    );

    // Note: subject cards are animated in subjectAreas.js when created
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});