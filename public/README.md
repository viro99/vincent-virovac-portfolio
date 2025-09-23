# Resume Placement Instructions

## Where to place your resume:

**For GitHub Pages deployment:**
Place your resume PDF file as: `/public/resume.pdf`

This will make it accessible at: `https://yourusername.github.io/Resume2-website/resume.pdf`

## Current setup:
- The "Resume" button in the navigation links to `/resume.pdf`
- Google Analytics tracks when someone downloads your resume
- The file should be named exactly `resume.pdf` (lowercase)

## Recommended resume filename:
`vincent_virovac_resume.pdf` - but you can keep it as `resume.pdf` for the web link

## Example file structure:
```
/public/
  resume.pdf                 <- Place your actual resume here
  /images/                   <- Additional images folder
    profile.jpg              <- Your profile photo
    interview-placeholder.jpg
    filming-placeholder.jpg
    team-placeholder.jpg
    casascius-placeholder.jpg
    microbit-placeholder.jpg
    mangowhat.gif           <- Your AI video example
    psychology-placeholder.jpg
```

The build process will automatically copy files from `/public/` to the root of your deployed site.