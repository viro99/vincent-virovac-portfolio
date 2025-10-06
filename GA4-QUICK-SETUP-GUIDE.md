# GA4 Quick Setup Guide for Vincent Virovac Portfolio

## Immediate Actions for GA4 Dashboard

### 1. Access Your GA4 Property
- Go to [Google Analytics](https://analytics.google.com/)
- Select property `G-P49MEVNXDW`
- Navigate to **Reports** section

### 2. Essential Custom Dimensions Setup

Go to **Admin > Data display > Custom definitions > Custom dimensions**

Create these custom dimensions:
```
Dimension Name: Section Name
Parameter name: section_name
Scope: Event
Description: Portfolio section (fintech, media, hobbies)

Dimension Name: Content Type  
Parameter name: content_type
Scope: Event
Description: Type of content viewed

Dimension Name: Interaction Type
Parameter name: interaction_type  
Scope: Event
Description: How user interacted (hover, click)

Dimension Name: Form Type
Parameter name: form_type
Scope: Event  
Description: Type of form submitted
```

### 3. Mark Conversion Events

Go to **Admin > Events > Mark as conversion**

Mark these events as conversions:
- `form_submit`
- `file_download`

### 4. Create Key Reports

#### Report 1: Subject Area Performance
**Path:** Explore > Free form

**Dimensions:**
- Section name (custom dimension)
- Event name

**Metrics:**  
- Event count
- Active users

#### Report 2: Engagement Funnel
**Path:** Explore > Funnel exploration

**Steps:**
1. page_view (landing)
2. hover (interest)  
3. section_view (engagement)
4. form_submit (conversion)

### 5. Set Up Real-time Monitoring

**Path:** Reports > Realtime

Monitor these events live:
- `hover` - Shows immediate user interest
- `section_view` - Shows deeper engagement  
- `form_submit` - Shows conversions
- `scroll` - Shows content consumption

### 6. Expected Event Volume

**Daily (typical personal portfolio):**
- `page_view`: 5-20 events
- `hover`: 10-50 events  
- `section_view`: 2-15 events
- `scroll`: 5-30 events
- `form_submit`: 0-2 events
- `file_download`: 0-5 events

### 7. Key Metrics to Watch

**Primary KPIs:**
1. **Engagement Rate:** (hover + section_view) / page_view
2. **Section Interest:** section_view events by area
3. **Conversion Rate:** form_submit / sessions
4. **Content Depth:** Average scroll depth %

**Red Flags:**
- Zero events firing (implementation issue)
- Only page_view events (JavaScript not loading)
- High bounce rate with no engagement events

### 8. Quick Verification Checklist

✅ **Real-time test:**
1. Visit your portfolio
2. Hover over subject cards
3. Click into a section  
4. Scroll down the page
5. Submit contact form (test)

✅ **GA4 verification:**
1. Check Realtime > Events
2. See events appearing within 1-2 minutes
3. Verify custom parameters are captured

### 9. Troubleshooting Common Issues

**No events showing:**
- Check browser console for JavaScript errors
- Verify gtag is loaded: `typeof gtag` in console
- Confirm GA4 ID is correct in index.html

**Events but no custom parameters:**  
- Custom dimensions need 24-48 hours to activate
- Verify parameter names match exactly

**High bounce rate:**
- Normal for portfolio sites
- Focus on engagement events instead

### 10. Monthly Review Template

**Questions to answer:**
1. Which subject area gets most engagement?
2. What's the hover-to-click conversion rate?
3. How deep do users scroll?
4. What's the contact form conversion rate?
5. Which content types perform best?

**Action items based on data:**
- Optimize low-performing subject areas
- A/B test hover interactions
- Improve content that has low scroll depth
- Optimize contact form placement/design

---

## Quick GA4 Dashboard URLs

**Most Important Reports:**
- Real-time: `https://analytics.google.com/analytics/web/#/p[YOUR_PROPERTY_ID]/realtime/overview`
- Events: `https://analytics.google.com/analytics/web/#/p[YOUR_PROPERTY_ID]/reports/reportinghub`
- Conversions: `https://analytics.google.com/analytics/web/#/p[YOUR_PROPERTY_ID]/reports/conversions`

**Replace [YOUR_PROPERTY_ID] with your actual GA4 property number**

---

*For detailed analysis, see GA4-DASHBOARD-ANALYSIS.md*