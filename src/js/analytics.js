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