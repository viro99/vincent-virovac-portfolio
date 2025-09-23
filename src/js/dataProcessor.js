export class DataProcessor {
  constructor() {
    this.personalData = null;
    this.experienceData = null;
    this.projectsData = null;
    this.blogPosts = null;
  }

  async loadAllData() {
    try {
      // Load JSON data files
      const [personalRes, experienceRes, projectsRes] = await Promise.all([
        fetch('/data/personal.json'),
        fetch('/data/experience.json'),
        fetch('/data/projects.json')
      ]);

      this.personalData = await personalRes.json();
      this.experienceData = await experienceRes.json();
      this.projectsData = await projectsRes.json();

      // Load blog posts (placeholder data for now)
      this.blogPosts = this.createBlogPlaceholders();

      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  getContentForArea(area) {
    switch (area) {
      case 'fintech':
        return this.getFintechContent();
      case 'media':
        return this.getMediaContent();
      case 'hobbies':
        return this.getHobbiesContent();
      default:
        return this.getDefaultContent();
    }
  }

  getFintechContent() {
    const fintechKeywords = [
      'cryptocurrency', 'crypto', 'blockchain', 'NEM', 'bitcoin', 
      'fintech', 'investment', 'wallet', 'financial', 'market'
    ];

    const experiences = this.filterByKeywords(
      this.experienceData.workExperience, 
      fintechKeywords
    );

    const projects = this.filterByKeywords(
      this.projectsData.projects, 
      fintechKeywords
    );

    return {
      title: 'Fintech & Blockchain',
      description: '10+ year outlook on cryptocurrency and financial technology innovation',
      experiences,
      projects,
      insights: [
        'Long-term perspective on cryptocurrency adoption',
        'Focus on utility over speculation',
        'Hardware wallet security expertise',
        'Market analysis and risk assessment'
      ]
    };
  }

  getMediaContent() {
    const mediaKeywords = [
      'media', 'creative', 'content', 'interview', 'video', 'photo', 
      'marketing', 'copywriting', 'film', 'podcast', 'generative'
    ];

    const experiences = this.filterByKeywords(
      this.experienceData.workExperience, 
      mediaKeywords
    );

    const projects = this.filterByKeywords(
      this.projectsData.projects, 
      mediaKeywords
    );

    // Add specific media experience from TTC
    const ttcExperience = this.experienceData.workExperience.find(
      exp => exp.company === 'Temporary Truth Creative'
    );
    if (ttcExperience && !experiences.includes(ttcExperience)) {
      experiences.push(ttcExperience);
    }

    return {
      title: 'Creative & Media Services',
      description: 'Content creation, interviewing, and strategic marketing from my first industry introduction',
      experiences,
      projects,
      mediaAssets: [
        {
          type: 'interview',
          description: 'Photo of me interviewing subjects',
          placeholder: '/images/interview-placeholder.jpg'
        },
        {
          type: 'filming',
          description: 'Behind-the-scenes filming work',
          placeholder: '/images/filming-placeholder.jpg'
        },
        {
          type: 'team',
          description: 'Group photo with TTC team',
          placeholder: '/images/team-placeholder.jpg'
        }
      ]
    };
  }

  getHobbiesContent() {
    const techKeywords = [
      'python', 'microbit', 'STEM', 'education', 'IoT', 
      'hardware', '3D', 'AI', 'teaching'
    ];

    const experiences = this.filterByKeywords(
      this.experienceData.workExperience, 
      techKeywords
    );

    const projects = this.filterByKeywords(
      this.projectsData.projects, 
      techKeywords
    );

    return {
      title: 'Hobbies & Experiments',
      description: 'Personal projects combining hardware, AI, and creative problem-solving',
      experiences,
      projects,
      blogPosts: this.blogPosts
    };
  }

  filterByKeywords(items, keywords) {
    return items.filter(item => {
      const searchText = [
        item.description || '',
        item.position || item.title || '',
        item.company || '',
        ...(item.skills || []),
        ...(item.technologies || []),
        ...(item.tags || []),
        ...(item.achievements || [])
      ].join(' ').toLowerCase();

      return keywords.some(keyword => 
        searchText.includes(keyword.toLowerCase())
      );
    });
  }

  createBlogPlaceholders() {
    return [
      {
        title: 'Casascius Coins & 3D Printing for Crypto Events',
        date: 'Coming Soon',
        excerpt: 'How I use 3D printing to create thoughtful memorabilia for cryptocurrency promotional events, including custom Casascius coin displays and educational materials.',
        image: '/images/casascius-placeholder.jpg',
        tags: ['3D Printing', 'Cryptocurrency', 'Events', 'Memorabilia']
      },
      {
        title: 'Teaching Kids Hardware Security with BBC Micro:bit',
        date: 'Coming Soon',
        excerpt: 'Foundational understanding of hardware wallets and IoT security through hands-on Python programming with young learners.',
        image: '/images/microbit-placeholder.jpg',
        tags: ['Education', 'Hardware Security', 'Python', 'IoT', 'BBC Micro:bit']
      },
      {
        title: 'AI Video Generation: From Concept to Marketing',
        date: 'Coming Soon',
        excerpt: 'Experimenting with generative AI video tools for marketing applications. See my short AI-generated video example in action.',
        image: '/images/mangowhat.gif',
        tags: ['AI', 'Video Generation', 'Marketing', 'Creative Tech']
      },
      {
        title: 'System 1 vs System 2: UX Psychology in Crypto',
        date: 'Coming Soon',
        excerpt: 'Applying behavioral psychology principles to make cryptocurrency interfaces more intuitive and user-friendly.',
        image: '/images/psychology-placeholder.jpg',
        tags: ['UX Design', 'Psychology', 'Cryptocurrency', 'User Experience']
      }
    ];
  }

  getDefaultContent() {
    return {
      title: 'Vincent Virovac',
      description: 'Multi-disciplinary professional ready for new challenges',
      experiences: this.experienceData?.workExperience || [],
      projects: this.projectsData?.projects || []
    };
  }

  // Utility method to get skills by area
  getSkillsByArea(area) {
    const content = this.getContentForArea(area);
    const allSkills = new Set();

    content.experiences.forEach(exp => {
      if (exp.skills) {
        exp.skills.forEach(skill => allSkills.add(skill));
      }
    });

    content.projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => allSkills.add(tech));
      }
      if (project.tags) {
        project.tags.forEach(tag => allSkills.add(tag));
      }
    });

    return Array.from(allSkills);
  }

  // Get statistics for each area
  getAreaStatistics() {
    return {
      fintech: {
        experiences: this.getFintechContent().experiences.length,
        projects: this.getFintechContent().projects.length,
        years: '8+',
        focus: 'Long-term vision'
      },
      media: {
        experiences: this.getMediaContent().experiences.length,
        projects: this.getMediaContent().projects.length,
        years: '1+',
        focus: 'Creative storytelling'
      },
      hobbies: {
        experiences: this.getHobbiesContent().experiences.length,
        projects: this.getHobbiesContent().projects.length,
        blogPosts: this.blogPosts.length,
        focus: 'Innovation & learning'
      }
    };
  }
}