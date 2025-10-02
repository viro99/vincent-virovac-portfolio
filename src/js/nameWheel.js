import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export class NameWheelAnimation {
  constructor(animationMode = 'smooth-spin') {
    this.container = document.querySelector('.container');
    this.txt = document.querySelector('.txt');
    this.wheel = document.querySelector('.wheel');
    this.numLines = 20;
    this.fontSize = 60; // Base font size in pixels
    this.radius = (this.fontSize / 2) / Math.sin((180 / this.numLines) * (Math.PI / 180));
    this.angle = 360 / this.numLines;
    this.origin = `50% 50% -${this.radius}px`;
    this.mySplitText = null;
    this.animationMode = animationMode; // 'smooth-spin', 'classic', or 'minimal'
  }

  init() {
    if (!this.txt || !this.wheel) return;
    
    this.setupText();
    this.cloneText();
    this.positionText();
    this.startAnimation();
  }

  setupText() {
    // Ensure clean text content
    this.txt.textContent = this.txt.textContent.trim();
    
    // Split text into characters with proper spacing
    this.mySplitText = new SplitText(this.txt, {
      type: "chars", 
      charsClass: "char",
      position: "absolute",
      reduceWhiteSpace: false
    });
  }

  cloneText() {
    for (let i = 0; i < this.numLines - 1; i++) {
      const clone = this.txt.cloneNode(true);
      this.wheel.appendChild(clone);
    }
  }

  positionText() {
    gsap.set('.txt', {
      rotationX: (index) => this.angle * index,
      z: this.radius,
      transformOrigin: this.origin
    });
  }

  startAnimation() {
    // Make container visible
    gsap.set(this.container, { autoAlpha: 1 });

    // Choose animation based on mode with fallback
    switch (this.animationMode) {
      case 'smooth-spin':
        this.smoothSpinAnimation();
        break;
      case 'classic':
        this.classicAnimation();
        break;
      case 'minimal':
        this.minimalAnimation();
        break;

      default:
        // Fallback to smooth-spin if mode not recognized
        console.warn(`Unknown animation mode: ${this.animationMode}. Falling back to 'smooth-spin'.`);
        this.smoothSpinAnimation();
    }
  }

  // Current smooth spin and settle animation (saved as mode)
  smoothSpinAnimation() {
    // Smooth, organic easing for natural movement
    const spinEase = "power1.inOut";
    const settleEase = "power2.out";
    
    const gtl = gsap.timeline({
      defaults: {
        ease: spinEase,
        duration: 4
      },
      repeat: -1
    });

    // Slow, smooth spinning motion with alternating character movements
    // Each phase has a gentle spin and settle
    
    // Phase 1: Even characters spin forward, odd characters settle
    gtl.to('.char:nth-of-type(even)', {
        rotationX: (360 / this.numLines),
        transformOrigin: this.origin,
        duration: 3,
        ease: spinEase
      })
      .to('.char:nth-of-type(odd)', {
        rotationX: 0,
        transformOrigin: this.origin,
        duration: 1.5,
        ease: settleEase
      }, "-=2")
      
      // Phase 2: Odd characters spin forward, even characters settle  
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 2),
        transformOrigin: this.origin,
        duration: 3,
        ease: spinEase
      }, "-=0.5")
      .to('.char:nth-of-type(even)', {
        rotationX: (360 / this.numLines),
        transformOrigin: this.origin,
        duration: 1.5,
        ease: settleEase
      }, "-=2")
      
      // Phase 3: Even characters continue spin, odd characters settle
      .to('.char:nth-of-type(even)', {
        rotationX: ((360 / this.numLines) * 3),
        transformOrigin: this.origin,
        duration: 3,
        ease: spinEase
      }, "-=0.5")
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 2),
        transformOrigin: this.origin,
        duration: 1.5,
        ease: settleEase
      }, "-=2")
      
      // Phase 4: Final spin and gentle settle to complete cycle
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 4),
        transformOrigin: this.origin,
        duration: 3,
        ease: spinEase
      }, "-=0.5")
      .to('.char:nth-of-type(even)', {
        rotationX: ((360 / this.numLines) * 3),
        transformOrigin: this.origin,
        duration: 1.5,
        ease: settleEase
      }, "-=2")
      
      // Smooth reset with gentle settle
      .to('.char', {
        rotationX: 0,
        transformOrigin: this.origin,
        duration: 2,
        ease: "power2.inOut"
      }, "+=3");

    // Slower, more contemplative speed
    gtl.timeScale(0.7);
  }

  // Classic animation mode (placeholder for original style)
  classicAnimation() {
    const charEase = "power4.inOut";
    const gtl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: 3
      },
      repeat: -1
    });

    // Simple character rotation cycle
    gtl.to('.char:nth-of-type(even)', {
        rotationX: (360 / this.numLines),
        transformOrigin: this.origin,
        duration: 2
      })
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 2),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char:nth-of-type(even)', {
        rotationX: ((360 / this.numLines) * 3),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 4),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char', {
        rotationX: 0,
        transformOrigin: this.origin,
        duration: 0.5,
        ease: "power2.inOut"
      });

    gtl.timeScale(1);
  }

  // Minimal animation mode (subtle effect)
  minimalAnimation() {
    const gtl = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        duration: 6
      },
      repeat: -1
    });

    // Very subtle character movements
    gtl.to('.char:nth-of-type(even)', {
        rotationX: (180 / this.numLines), // Half rotation for subtlety
        transformOrigin: this.origin,
        duration: 4
      })
      .to('.char:nth-of-type(odd)', {
        rotationX: (180 / this.numLines),
        transformOrigin: this.origin,
        duration: 4
      }, "-=2")
      .to('.char', {
        rotationX: 0,
        transformOrigin: this.origin,
        duration: 3,
        ease: "power2.out"
      }, "+=2");

    gtl.timeScale(0.5);
  }


}