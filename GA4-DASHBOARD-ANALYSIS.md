# GA4 Dashboard Analysis for Vincent Virovac Portfolio

## Overview
This document analyzes the Google Analytics 4 (GA4) tracking implementation for the Vincent Virovac portfolio website and details what outputs should appear in the GA4 dashboard.

**GA4 Property ID:** `G-P49MEVNXDW`

## Analytics Implementation Summary

The portfolio website implements comprehensive user engagement tracking through a dedicated `AnalyticsManager` class and integrated event tracking throughout the user journey.

## Tracked Events & Expected GA4 Outputs

### 1. Page View Events
**Event Name:** `page_view` (automatically tracked by GA4)
**Additional Custom:** `page_view` event with custom parameters

**Triggered When:**
- Initial page load on landing page
- Navigation between sections

**Parameters:**
```javascript
{
  page_title: 'Landing Page',
  page_location: window.location.href
}
```

**GA4 Dashboard Outputs:**
- **Pages and screens report:** Shows page views with custom titles
- **Real-time overview:** Active users and page views
- **Audience > Overview:** Session and user metrics

### 2. Subject Area Engagement Events

#### 2.1 Hover Interactions
**Event Name:** `hover`
**Triggered When:** User hovers over subject area cards (Fintech, Media, Hobbies)

**Parameters:**
```javascript
{
  event_category: 'engagement',
  section_name: 'fintech|media|hobbies',
  action: 'hover_start|hover_end'
}
```

#### 2.2 Section Views
**Event Name:** `section_view`
**Triggered When:** User clicks on a subject area card

**Parameters:**
```javascript
{
  event_category: 'engagement',
  section_name: 'fintech|media|hobbies'
}
```

#### 2.3 Engagement Time Tracking
**Event Name:** `engagement_time`
**Triggered When:** User navigates away from a section

**Parameters:**
```javascript
{
  event_category: 'engagement',
  section_name: 'fintech|media|hobbies',
  duration: [time_in_milliseconds]
}
```

**GA4 Dashboard Outputs:**
- **Engagement > Events:** All hover, section_view, and engagement_time events
- **Custom Reports:** Section popularity analysis
- **Exploration Reports:** User journey through different subject areas

### 3. Content Interaction Events

#### 3.1 Content Views
**Event Name:** `content_view`
**Triggered When:** Users view specific content within sections

**Parameters:**
```javascript
{
  event_category: 'engagement',
  subject_area: 'fintech|media|hobbies',
  content_type: 'experience|project|blog',
  page_title: '{area} - {contentType}'
}
```

**GA4 Dashboard Outputs:**
- **Content analysis:** Most viewed content types per subject area
- **Custom dimensions:** Content engagement by area

### 4. Form Submission Events
**Event Name:** `form_submit`
**Triggered When:** Contact form is submitted (success or failure)

**Parameters:**
```javascript
{
  event_category: 'engagement',
  form_type: 'contact',
  success: true|false
}
```

**GA4 Dashboard Outputs:**
- **Conversions:** Form submissions as conversion events
- **Events report:** Success/failure rates
- **Custom reports:** Contact form performance

### 5. File Download Events
**Event Name:** `file_download`
**Triggered When:** Resume PDF is downloaded

**Parameters:**
```javascript
{
  event_category: 'engagement',
  file_name: 'vincent_virovac_resume.pdf',
  file_type: 'resume'
}
```

**GA4 Dashboard Outputs:**
- **Engagement > Events:** File download tracking
- **Conversions:** Resume downloads as potential conversion goal

### 6. Scroll Depth Events
**Event Name:** `scroll`
**Triggered When:** User scrolls to 25%, 50%, 75%, 100% of page

**Parameters:**
```javascript
{
  event_category: 'engagement',
  scroll_depth: 25|50|75|100
}
```

**GA4 Dashboard Outputs:**
- **Engagement > Pages and screens:** Enhanced with scroll depth data
- **Custom reports:** Content engagement depth analysis

### 7. Subject Area Engagement (Alternative Implementation)
**Event Name:** `subject_area_engagement`
**Triggered When:** Complex subject area interactions

**Parameters:**
```javascript
{
  event_category: 'engagement',
  subject_area: 'fintech|media|hobbies',
  interaction_type: 'hover_start|hover_end|click',
  page_title: document.title,
  page_location: window.location.href,
  engagement_time_msec: [optional_duration]
}
```

## Expected GA4 Dashboard Reports

### 1. Real-time Reports
- **Active users:** Current site visitors
- **Page views:** Real-time page view tracking
- **Events:** Live event stream showing user interactions
- **Conversions:** Real-time form submissions and downloads

### 2. Audience Reports
- **Overview:** User demographics and behavior
- **User attributes:** Geographic and device information
- **Cohort analysis:** User retention patterns

### 3. Engagement Reports
- **Events:** Complete breakdown of all tracked events
  - Most triggered: `hover` events from subject area interactions
  - High-value: `section_view` and `form_submit` events
  - Depth indicators: `scroll` and `engagement_time` events
- **Pages and screens:** Page performance with custom parameters
- **Conversions:** Form submissions and file downloads

### 4. Custom Reports & Explorations

#### Recommended Custom Report: "Subject Area Popularity"
**Dimensions:**
- `section_name` (from event parameters)
- `Event name`
- `Page title`

**Metrics:**
- Event count
- Active users
- Sessions

#### Recommended Exploration: "User Journey Analysis"
**Path Analysis showing:**
1. Landing page → Subject area hover → Section view
2. Section engagement time by area
3. Conversion paths (section view → form submit)

## Key Performance Indicators (KPIs) to Monitor

### 1. Engagement Metrics
- **Subject Area Interest:** Count of `section_view` events by area
- **Hover Engagement:** Ratio of `hover` to `section_view` events
- **Content Depth:** Average `engagement_time` per section
- **Scroll Engagement:** Distribution of scroll depth percentages

### 2. Conversion Metrics
- **Contact Form Conversion Rate:** `form_submit` / total sessions
- **Resume Download Rate:** `file_download` / total sessions
- **Subject-to-Contact Conversion:** Sessions with section views that lead to form submissions

### 3. Content Performance
- **Most Popular Subject:** Section with highest `section_view` count
- **Engagement Quality:** Average time spent per subject area
- **Bounce Rate:** Sessions without any engagement events

## GA4 Configuration Recommendations

### 1. Custom Dimensions
Set up the following custom dimensions in GA4:
- `section_name` - tracks which portfolio section users engage with
- `content_type` - differentiates between experiences, projects, blogs
- `interaction_type` - hover vs click interactions
- `form_type` - type of form submitted

### 2. Conversion Events
Mark these events as conversions in GA4:
- `form_submit` (when success = true)
- `file_download`
- `engagement_time` (for sessions > 30 seconds)

### 3. Enhanced Ecommerce (Optional)
While not an ecommerce site, you could track "value" using:
- Form submissions as high-value conversions
- Resume downloads as medium-value conversions
- Extended section engagement as micro-conversions

## Troubleshooting & Verification

### 1. Verify Events are Firing
**In GA4 Real-time Reports:**
- Navigate to Realtime > Events
- Interact with the portfolio (hover, click sections, submit form)
- Verify events appear with correct parameters

### 2. Debug Mode
Add to GA4 configuration:
```javascript
gtag('config', 'G-P49MEVNXDW', {
  debug_mode: true
});
```

### 3. Browser Console Verification
The `AnalyticsManager` logs all events to console:
```javascript
console.log('Analytics Event:', action, parameters);
```

### 4. GA4 DebugView
- Enable debug mode in GA4 interface
- Use DebugView to see events in real-time with full parameter details

## Data Retention & Privacy

- **Data Retention:** Standard GA4 retention (2-14 months depending on settings)
- **Privacy:** No personally identifiable information is tracked
- **GDPR Compliance:** Consider adding cookie consent for EU visitors
- **IP Anonymization:** Enabled by default in GA4

## Expected Monthly Metrics (Estimates)

Based on a personal portfolio site:
- **Sessions:** 50-500 per month
- **Page Views:** 150-1500 per month
- **Events:** 300-3000 per month (high due to hover tracking)
- **Conversions:** 1-10 form submissions per month
- **Resume Downloads:** 5-50 per month

## Next Steps for Dashboard Optimization

1. **Set up Custom Reports** focusing on subject area performance
2. **Create Audience Segments** based on engagement depth
3. **Configure Conversion Goals** for form submissions and downloads
4. **Set up Alerts** for significant changes in key metrics
5. **Regular Review Schedule** - weekly for first month, then monthly

---

*Last Updated: [Current Date]*
*Portfolio URL: https://viro99.github.io/vincent-virovac-portfolio/*
*GA4 Property: G-P49MEVNXDW*