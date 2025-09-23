export class AnalyticsManager {
  constructor() {
    this.GA_ID = 'G-P49MEVNXDW';
  }

  init() {
    // Ensure gtag is available
    if (typeof gtag === 'undefined') {
      console.warn('Google Analytics not loaded');
      return;
    }

    // Initialize scroll depth tracking
    this.trackScrollDepth();
    
    console.log('Analytics initialized with GA4 ID:', this.GA_ID);
  }

  // Track custom events
  trackEvent(action, parameters = {}) {
    if (typeof gtag === 'undefined') return;
    
    gtag('event', action, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });

    console.log('Analytics Event:', action, parameters);
  }

  // Debug method to verify analytics setup
  debugAnalytics() {
    console.log('=== Analytics Debug Info ===');
    console.log('GA4 ID:', this.GA_ID);
    console.log('gtag available:', typeof gtag !== 'undefined');
    console.log('dataLayer available:', typeof window.dataLayer !== 'undefined');
    console.log('Current page:', window.location.href);
    
    if (typeof gtag !== 'undefined') {
      // Send a test event
      this.trackEvent('debug_test', {
        debug: true,
        timestamp: new Date().toISOString()
      });
      console.log('Test event sent successfully');
    }
    console.log('==============================');
  }

  // Track subject area engagement
  trackSubjectAreaEngagement(area, action, duration = null) {
    const eventData = {
      subject_area: area,
      interaction_type: action,
      page_title: document.title,
      page_location: window.location.href
    };

    if (duration) {
      eventData.engagement_time_msec = duration;
    }

    this.trackEvent('subject_area_engagement', eventData);
  }

  // Track content views
  trackContentView(area, contentType) {
    this.trackEvent('content_view', {
      subject_area: area,
      content_type: contentType,
      page_title: `${area} - ${contentType}`
    });
  }

  // Track form submissions
  trackFormSubmission(formType, success = true) {
    this.trackEvent('form_submit', {
      form_type: formType,
      success: success
    });
  }

  // Track resume downloads
  trackResumeDownload() {
    this.trackEvent('file_download', {
      file_name: 'vincent_virovac_resume.pdf',
      file_type: 'resume'
    });
  }

  // Track scroll depth
  trackScrollDepth() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        this.trackEvent('scroll', {
          scroll_depth: scrollPercent
        });
      }
    });
  }
}