# JSON Content Framework & Formatting Guide

## 📋 Overview

Your resume website uses a structured JSON-based content management system with three main data files. This guide explains the framework, required fields, and best practices for organizing your content efficiently.

## 🗂️ Data File Structure

```
public/data/
├── personal.json     # Personal info, bio, highlights, contact details
├── experience.json   # Work history, education, skills, languages  
└── projects.json     # Portfolio projects, categorized by area
```

---

## 📄 **1. personal.json**

**Purpose:** Core personal information, statistics, and key highlights

### Schema Structure:
```json
{
  "personalInfo": {
    "name": "string",           // Full name for display
    "phone": "string",          // Phone with country code (+886 xxx)
    "email": "string",          // Primary email address
    "location": "string",       // Current city, country
    "title": "string",          // Professional title/role
    "subtitle": "string",       // Optional secondary title
    "tagline": "string",        // Brief professional summary
    "bio": "string",           // 2-3 sentence professional bio
    "availability": "string",   // Current status
    "website": "string|null",   // Personal website URL
    "github": "string|null",    // GitHub profile URL
    "linkedin": "string|null",  // LinkedIn profile URL
    "twitter": "string|null"    // Twitter handle
  },
  "statistics": {
    "yearsProfessional": number, // Years of experience
    "languages": number,         // Number of languages spoken
    "projects": number,          // Total projects completed
    "studentsTaught": number     // Teaching experience metric
  },
  "highlights": [
    {
      "icon": "emoji",          // Single emoji for visual icon
      "text": "string"          // Brief highlight description
    }
  ]
}
```

### Content Guidelines:
- **Bio:** Keep to 2-3 sentences, focus on value proposition
- **Tagline:** 3-5 words max, encapsulate core offering
- **Statistics:** Use impressive, round numbers
- **Highlights:** 4 key achievements/credentials maximum
- **Icons:** Use relevant emojis (🎓📊💼🌍)

---

## 💼 **2. experience.json**

**Purpose:** Work history, education, certifications, and language skills

### Schema Structure:

#### Work Experience:
```json
{
  "workExperience": [
    {
      "id": number,               // Unique identifier
      "company": "string",        // Company/organization name
      "location": "string",       // City, country
      "position": "string",       // Job title/role
      "startDate": "string",      // Year or YYYY-MM-DD
      "endDate": "string",        // Year, YYYY-MM-DD, or "Present"
      "current": boolean,         // Is this current position?
      "description": "string",    // 1-2 sentence role summary
      "achievements": [           // Key accomplishments (3-5 max)
        "string"
      ],
      "skills": [                 // Relevant skills/technologies
        "string"
      ],
      "type": "string",          // "employment", "consulting", "volunteer", "internship"
      "photo": "string"          // Optional: company logo path
    }
  ]
}
```

#### Education:
```json
{
  "education": [
    {
      "id": number,
      "institution": "string",    // School/university name
      "location": "string",       // City, country
      "degree": "string",         // Degree type (Bachelor, Master, etc.)
      "field": "string",          // Major/field of study
      "startDate": "string",      // Year
      "endDate": "string",        // Year
      "current": boolean,         // Currently enrolled?
      "gpa": "number|null",       // GPA if relevant
      "achievements": [           // Academic projects/achievements
        "string"
      ],
      "skills": [                // Skills learned/technologies used
        "string"
      ]
    }
  ]
}
```

#### Additional Education:
```json
{
  "additionalEducation": [
    {
      "id": number,
      "institution": "string",    // Certification provider
      "program": "string",        // Course/certification name
      "year": "string",          // Completion year (or startDate/endDate)
      "type": "string",          // "certification", "online-courses", "bootcamp"
      "description": "string"     // Brief description
    }
  ]
}
```

#### Languages:
```json
{
  "languages": [
    {
      "language": "string",       // Language name
      "proficiency": "string",    // Fluent, Conversational, Basic
      "level": "string"          // Native, Professional, Conversational
    }
  ]
}
```

### Content Guidelines:
- **Achievements:** Use action verbs, quantify when possible
- **Skills:** Include both hard and soft skills, technologies
- **Types:** Categorize work for better organization
- **Dates:** Use consistent format throughout
- **Current roles:** Set `current: true` and `endDate: "Present"`

---

## 🚀 **3. projects.json**

**Purpose:** Portfolio projects categorized by professional focus areas

### Schema Structure:

#### Projects:
```json
{
  "projects": [
    {
      "id": number,               // Unique identifier
      "title": "string",          // Project name
      "description": "string",    // 2-3 sentence project summary
      "category": "string",       // See categories below
      "tags": [                   // Relevant keywords/technologies
        "string"
      ],
      "icon": "emoji",           // Visual identifier
      "year": "string",          // Year or year range
      "company": "string",        // Associated company/organization
      "status": "string",        // "completed", "ongoing", "planned"
      "technologies": [          // Technical stack used
        "string"
      ],
      "images": [                // Project screenshots/photos
        "string"                 // Image file paths
      ],
      "links": {
        "demo": "string|null",    // Live demo URL
        "code": "string|null",    // Source code URL
        "documentation": "string|null" // Project docs URL
      },
      "featured": boolean        // Show in featured projects?
    }
  ]
}
```

#### Project Categories:
```json
{
  "projectCategories": [
    {
      "id": "string",            // Category identifier
      "name": "string",          // Display name
      "description": "string"    // Category description
    }
  ]
}
```

### Available Categories:
- **`business-consulting`** - Client work, strategy, professional services
- **`creative-media`** - Content creation, video, marketing, design
- **`tech-education`** - Technical projects, STEM education, coding
- **`all`** - Shows all projects (default filter)

### Content Guidelines:
- **Categories:** Projects auto-sort into subject areas (Fintech, Media, Hobbies) based on tags
- **Featured:** Mark 2-4 best projects as `featured: true`
- **Technologies:** List specific tools, frameworks, languages used
- **Status:** Use consistent status values across all projects
- **Images:** Store in `/public/images/projects/`
- **Links:** Only include working URLs, use `null` for unavailable links

---

## 🎯 **Content Categorization System**

Your website automatically categorizes content into three main areas based on keywords:

### **Fintech** (Business Focus)
**Keywords:** `blockchain`, `cryptocurrency`, `investment`, `fintech`, `trading`, `portfolio`, `market analysis`, `consulting`

**Best for:** Business consulting projects, financial technology work, crypto/blockchain experience

### **Media** (Creative Focus)  
**Keywords:** `creative`, `content`, `interview`, `video`, `marketing`, `design`, `photography`, `film`, `social media`

**Best for:** Creative services, content creation, media production, marketing projects

### **Hobbies** (Technical Focus)
**Keywords:** `python`, `IoT`, `education`, `STEM`, `AI`, `3D printing`, `microbit`, `programming`, `data analysis`

**Best for:** Technical projects, educational work, hobby programming, maker projects

---

## 📝 **Quick Content Update Procedure**

### 1. **Adding New Work Experience:**
```json
// Add to workExperience array in experience.json
{
  "id": 5,  // Next available ID
  "company": "New Company",
  "position": "Your Role",
  "startDate": "2024",
  "endDate": "Present",
  "current": true,
  "achievements": [
    "Achievement 1 with quantifiable results",
    "Achievement 2 with specific technologies"
  ],
  "skills": ["Skill1", "Skill2", "Skill3"],
  "type": "employment"
}
```

### 2. **Adding New Project:**
```json
// Add to projects array in projects.json  
{
  "id": 7,  // Next available ID
  "title": "Project Name",
  "category": "business-consulting",  // Choose appropriate category
  "tags": ["relevant", "keywords", "for", "categorization"],
  "year": "2024",
  "status": "completed",
  "featured": true,  // If it's a showcase project
  "technologies": ["Tool1", "Framework2", "Language3"]
}
```

### 3. **Updating Personal Info:**
```json
// Modify personalInfo section in personal.json
{
  "personalInfo": {
    "tagline": "Updated professional focus",
    "bio": "Updated 2-3 sentence professional summary",
    "availability": "Current status"
  }
}
```

---

## 🔧 **Best Practices**

### **Consistency:**
- Use consistent date formats across all entries
- Maintain uniform skill naming conventions
- Keep description lengths similar within sections

### **SEO Optimization:**
- Include relevant keywords in descriptions
- Use specific, searchable skill names
- Write clear, descriptive titles

### **Performance:**
- Keep JSON files under 50KB each
- Optimize image file sizes before adding paths
- Limit projects to 15-20 most relevant entries

### **Maintenance:**
- Review and update content quarterly
- Remove outdated or less relevant projects
- Keep contact information current
- Update availability status regularly

### **Analytics Tracking:**
The website automatically tracks engagement with different content areas. Popular skills and projects will show higher analytics engagement, helping you understand what resonates with visitors.

---

## 🚨 **Validation Checklist**

Before deploying changes:

- [ ] **JSON Syntax:** Validate JSON format using online tools
- [ ] **Required Fields:** Ensure all required fields are present
- [ ] **Image Paths:** Verify all image references point to existing files
- [ ] **Links:** Test all external URLs are working
- [ ] **IDs:** Ensure all IDs are unique within their arrays
- [ ] **Categories:** Verify project categories match defined options
- [ ] **Current Items:** Only one job should have `current: true`
- [ ] **Featured Projects:** Limit to 3-4 featured projects max

---

**Need Help?** 
- Test your changes locally with `npm run dev`
- Check browser console for any JSON loading errors
- Use JSON validation tools before committing changes
- Keep backups of working versions before major updates

This structured approach ensures your resume website remains professional, performant, and easy to maintain as your career evolves.