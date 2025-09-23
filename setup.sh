#!/bin/bash

# Setup script for Vincent Virovac Portfolio Website
echo "🚀 Setting up Vincent Virovac Portfolio Website..."

# Create public/images directory if it doesn't exist
mkdir -p public/images

# Copy existing images from the data/images folder
if [ -d "images" ]; then
    echo "📸 Copying existing images..."
    cp images/profile.jpg public/images/ 2>/dev/null && echo "✅ Copied profile.jpg"
    cp images/profile.png public/images/ 2>/dev/null && echo "✅ Copied profile.png"
    cp images/MingChuanUniversitylogo.jpg public/images/ 2>/dev/null && echo "✅ Copied university logo"
    cp images/TTClogo.jpg public/images/ 2>/dev/null && echo "✅ Copied TTC logo"
fi

# Create placeholder images
echo "🖼️ Creating placeholder images..."
touch public/images/interview-placeholder.jpg
touch public/images/filming-placeholder.jpg
touch public/images/team-placeholder.jpg
touch public/images/casascius-placeholder.jpg
touch public/images/microbit-placeholder.jpg
touch public/images/mangowhat.gif
touch public/images/psychology-placeholder.jpg

echo "📄 Don't forget to add your resume as: public/resume.pdf"
echo ""
echo "🌟 Next steps:"
echo "1. Install Node.js from https://nodejs.org"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Replace placeholder images with your actual photos"
echo "5. Add your resume PDF to public/resume.pdf"
echo ""
echo "🚀 Ready to launch your professional portfolio!"