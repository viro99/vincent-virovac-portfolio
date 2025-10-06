# Vincent Virovac - Professional Portfolio

A modern, interactive resume website showcasing expertise in Fintech, Media, and Creative projects. Built with Vite, GSAP animations, and Google Analytics tracking.

## 🚀 Features

- **Interactive 3D Name Animation** - Eye-catching rotating text effect
- **Subject Area Navigation** - Fintech, Media, and Hobbies sections with smooth transitions
- **Google Analytics Integration** - Track visitor engagement and content preferences
- **Mobile Responsive** - Clean design that works on all devices
- **Performance Optimized** - Fast loading with modern build tools

## 📁 Project Structure

```
Resume2 website/
├── public/
│   ├── resume.pdf              # ⚠️ Add your resume here
│   └── images/                 # ⚠️ Add your photos here
├── data/
│   ├── personal.json          # Your personal information
│   ├── experience.json        # Work experience data
│   └── projects.json          # Projects and portfolio items
├── src/
│   ├── styles/main.css        # Main stylesheet
│   ├── js/                    # JavaScript modules
│   └── main.js                # Application entry point
└── index.html                 # Main HTML file
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "/Users/user/Documents/resumes/Resume2 website"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Visit `http://localhost:3000`
   - The site will auto-reload on changes

### Build for Production
```bash
npm run build
```

## 📸 Image Setup

### Required Images (place in `/public/images/`):

1. **Profile Photos:**
   - Copy `profile.jpg` from your existing `/images/` folder

2. **Media Section (from TTC internship):**
   - `interview-placeholder.jpg` → Photo of you interviewing people
   - `filming-placeholder.jpg` → Photo of you filming  
   - `team-placeholder.jpg` → Group photo with TTC team

3. **Hobbies/Blog Section:**
   - `casascius-placeholder.jpg` → 3D printing crypto memorabilia
   - `microbit-placeholder.jpg` → BBC Micro:bit education projects
   - `mangowhat.gif` → Your AI generated video example
   - `psychology-placeholder.jpg` → UX psychology illustration

4. **Company Logos:**
   - Copy existing `MingChuanUniversitylogo.jpg` and `TTClogo.jpg`

## �️ Adding New Images (IMPORTANT!)

### For GitHub Pages Compatibility

**⚠️ CRITICAL:** Images must be added to **BOTH** locations for proper deployment:

1. **Add to `images/` folder (root)**
   ```bash
   cp your-new-image.jpg images/
   ```

2. **Add to `public/images/` folder** 
   ```bash
   cp your-new-image.jpg public/images/
   ```

### Why Both Locations?

- **Local Development:** Uses `public/images/` via Vite dev server
- **GitHub Pages:** Serves from root `images/` folder after build
- **Missing either location** → Broken images on production

### JSON Data Path Format

Use **relative paths** in your JSON files:
```json
{
  "images": {
    "logo": "./images/company-logo.jpg",
    "hero": "./images/hero-image.jpg", 
    "gallery": [
      "./images/gallery1.jpg",
      "./images/gallery2.jpg"
    ]
  }
}
```

### Step-by-Step Example

Adding a new hobby post image:

1. **Add image files:**
   ```bash
   # Copy to both locations
   cp ~/Downloads/my-project.jpg images/
   cp ~/Downloads/my-project.jpg public/images/
   ```

2. **Update JSON data:**
   ```json
   {
     "title": "My New Project",
     "images": {
       "hero": "./images/my-project.jpg"
     }
   }
   ```

3. **Copy updated data:**
   ```bash
   cp data/hobby-posts.json public/data/hobby-posts.json
   ```

4. **Commit and deploy:**
   ```bash
   git add .
   git commit -m "Add new project images"
   git push origin main
   ```

### Supported Formats
- **Photos:** `.jpg`, `.jpeg`, `.png`
- **Animations:** `.gif`
- **Recommended:** Use `.jpg` for photos, `.png` for logos with transparency

### Image Optimization Tips
- **Compress images** before adding (use tools like TinyPNG)
- **Consistent sizing:** 1200px width for hero images, 400px for logos
- **File naming:** Use lowercase, hyphens instead of spaces

## �📄 Resume Setup

**⚠️ IMPORTANT:** Place your resume PDF as `/public/resume.pdf`

The navigation "Resume" button links directly to this file and tracks downloads in Google Analytics.

## 🚀 GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/Resume2-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically build and deploy

3. **Your site will be live at:**
   `https://USERNAME.github.io/Resume2-website/`

### Manual Deployment
```bash
npm run deploy
```

## 📊 Analytics Tracking

The site tracks:
- **Page views** and session duration
- **Subject area engagement** (Fintech, Media, Hobbies)
- **Content interactions** (hover, click, view duration)  
- **Resume downloads**
- **Form submissions**
- **Scroll depth**

**📋 Analytics Documentation:**
- **[GA4 Dashboard Analysis](./GA4-DASHBOARD-ANALYSIS.md)** - Complete analysis of expected GA4 outputs
- **[GA4 Quick Setup Guide](./GA4-QUICK-SETUP-GUIDE.md)** - Step-by-step GA4 configuration
- **[Analytics Testing Guide](./ANALYTICS-TESTING.md)** - Browser console testing commands

Access your data at: [Google Analytics Dashboard](https://analytics.google.com/)

## 🎨 Customization

### Content Updates
- Edit JSON files in `/data/` to update your information
- The site automatically categorizes content by keywords

### Styling Changes
- Modify `/src/styles/main.css`
- CSS custom properties for easy theme adjustments

### Animation Tweaks
- Adjust GSAP animations in `/src/js/` modules
- Name wheel animation in `nameWheel.js`

## � **Content Management**

### JSON Structure & Formatting
This website uses a structured JSON-based content system. See **[JSON-STRUCTURE-GUIDE.md](./JSON-STRUCTURE-GUIDE.md)** for comprehensive documentation on:

- Complete schema reference for all JSON files
- Field requirements and data types
- Content categorization system
- Quick update procedures
- Best practices and validation checklist

### Smart Content Categorization
The `DataProcessor` automatically sorts your experiences and projects into three areas based on keywords:

- **Fintech:** blockchain, cryptocurrency, investment, fintech
- **Media:** creative, content, interview, video, marketing
- **Hobbies:** python, IoT, 3D printing, education, AI

### Performance Optimization
- Vite for fast builds and hot reloading
- GSAP for smooth, hardware-accelerated animations  
- Lazy loading and code splitting
- Optimized images and assets

### Analytics Insights
Track which subjects get the most attention:
- Heat maps of area interactions
- Content engagement duration
- Popular skills and projects
- Visitor behavior patterns

## 🎯 Design Philosophy

**"Show Don't Tell"** - The site demonstrates your skills through:
- **System 1 Thinking:** Intuitive, emotional first impressions
- **System 2 Thinking:** Logical, detailed exploration of content
- **Progressive Disclosure:** Reveal information based on visitor interest

## 🔍 SEO & Metadata

- Semantic HTML structure
- Meta descriptions and Open Graph tags
- Fast loading scores for search rankings
- Mobile-first responsive design

## 📞 Contact Integration

Contact form submissions are tracked in analytics. Consider integrating with:
- Netlify Forms
- Formspree
- EmailJS
- Your own backend service

## 🚨 Before Going Live

### Content Checklist:
- [ ] Add resume PDF to `/public/resume.pdf`
- [ ] Replace placeholder images with actual photos
- [ ] Update contact information in `/data/personal.json`
- [ ] Test all links and animations
- [ ] Verify Google Analytics tracking
- [ ] Check mobile responsiveness

### Launch Checklist:
- [ ] Custom domain setup (optional)
- [ ] SSL certificate (automatic with GitHub Pages)
- [ ] Social media preview cards
- [ ] Search console setup
- [ ] Performance audit

## 🎬 Demo Video

[Add link to demo video showing the site in action]

---

**Built by Vincent Virovac**
- 📧 vincentwvirovac@gmail.com  
- 📍 Taipei, Taiwan

*Professional portfolio showcasing expertise in business consulting, creative services, and technical projects.*