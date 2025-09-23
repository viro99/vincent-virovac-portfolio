# Analytics Testing Guide

## Quick Browser Console Tests

After loading your portfolio website, open the browser console (F12) and run these commands to test analytics:

### 1. Basic Analytics Check
```javascript
// Check if analytics is loaded
window.app.analytics.debugAnalytics();
```

### 2. Test Subject Area Events
```javascript
// Test hover event
window.app.analytics.trackEvent('hover', {
  section_name: 'fintech',
  action: 'hover_start'
});

// Test section view
window.app.analytics.trackEvent('section_view', {
  section_name: 'fintech'
});
```

### 3. Test Form Submission Event
```javascript
// Test successful form submission
window.app.analytics.trackFormSubmission('contact', true);

// Test failed form submission  
window.app.analytics.trackFormSubmission('contact', false);
```

### 4. Test File Download Event
```javascript
// Test resume download
window.app.analytics.trackResumeDownload();
```

### 5. Test Content View Event
```javascript
// Test content view
window.app.analytics.trackContentView('fintech', 'experience');
```

### 6. Test Subject Area Engagement
```javascript
// Test engagement with duration
window.app.analytics.trackSubjectAreaEngagement('media', 'click', 5000);
```

## Expected Console Output

When events fire successfully, you should see:
```
Analytics Event: [event_name] {parameter_object}
```

## Verify in GA4 Real-time

1. Go to your GA4 property
2. Navigate to **Reports > Realtime > Events**  
3. Run the console commands above
4. Within 1-2 minutes, you should see the events appear

## Manual Testing Checklist

- [ ] Load homepage - should see `page_view` event
- [ ] Hover over subject cards - should see `hover` events  
- [ ] Click subject card - should see `section_view` event
- [ ] Navigate back - should see `engagement_time` event
- [ ] Scroll down page - should see `scroll` events at 25%/50%/75%/100%
- [ ] Submit contact form - should see `form_submit` event
- [ ] Click resume download - should see `file_download` event

## Common Issues

**No events in console:**
- JavaScript errors preventing execution
- Check if gtag is loaded: `typeof gtag`

**Events in console but not in GA4:**
- Network/firewall blocking GA4
- Incorrect GA4 property ID
- Ad blocker blocking analytics

**Events missing parameters:**
- Check custom dimension setup in GA4
- Parameters take 24-48h to appear in reports

## Debug Mode

Add to index.html for enhanced debugging:
```html
<script>
  gtag('config', 'G-P49MEVNXDW', {
    debug_mode: true
  });
</script>
```

Then use GA4 DebugView for real-time event debugging with full parameter details.