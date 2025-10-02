export class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitButton = null;
    
    // EmailJS configuration
    this.emailjsConfig = {
      serviceId: 'service_flj9b48',
      templateId: 'template_yh6qnjv',
      publicKey: 'rkcLzU5bvkbHRgu2j'
    };
  }

  init() {
    if (!this.form) return;

    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.setupEventListeners();
    
    // Initialize EmailJS
    this.initializeEmailJS();
  }

  initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.emailjsConfig.publicKey);
      console.log('EmailJS initialized successfully');
    } else {
      console.error('EmailJS library not loaded');
    }
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Track resume download clicks
    const resumeLinks = document.querySelectorAll('.resume-download');
    resumeLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.app && window.app.analytics) {
          window.app.analytics.trackResumeDownload();
        }
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Track form submission attempt
    if (window.app && window.app.analytics) {
      window.app.analytics.trackFormSubmission('contact', true);
    }

    // Disable submit button
    this.setSubmitState(true);

    try {
      // Send email using EmailJS
      await this.sendEmailWithEmailJS(data);
      this.showSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError(error);
      
      if (window.app && window.app.analytics) {
        window.app.analytics.trackFormSubmission('contact', false);
      }
    } finally {
      this.setSubmitState(false);
    }
  }

  async sendEmailWithEmailJS(data) {
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS not loaded');
    }

    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'vincentwvirovac@gmail.com',
      reply_to: data.email
    };

    try {
      const response = await emailjs.send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('EmailJS error:', error);
      throw error;
    }
  }

  setSubmitState(isSubmitting) {
    if (!this.submitButton) return;

    if (isSubmitting) {
      this.submitButton.textContent = 'Sending...';
      this.submitButton.disabled = true;
      this.submitButton.style.opacity = '0.6';
    } else {
      this.submitButton.textContent = 'Send Message';
      this.submitButton.disabled = false;
      this.submitButton.style.opacity = '1';
    }
  }

  showSuccess() {
    this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.form.reset();
  }

  showError(error = null) {
    let errorMessage = 'Sorry, there was an error sending your message. Please try emailing me directly at vincentwvirovac@gmail.com';
    
    // Provide more specific error messages
    if (error && error.text) {
      if (error.text.includes('EmailJS')) {
        errorMessage = 'Email service temporarily unavailable. Please email me directly at vincentwvirovac@gmail.com';
      }
    }
    
    this.showMessage(errorMessage, 'error');
  }

  showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    // Add styles
    message.style.cssText = `
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      ${type === 'success' 
        ? 'background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); color: #00ff00;'
        : 'background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); color: #ff6b6b;'
      }
    `;

    this.form.appendChild(message);

    // Remove message after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }
}