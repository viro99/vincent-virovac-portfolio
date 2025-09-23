import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export class NameWheelAnimation {
  constructor() {
    this.container = document.querySelector('.container');
    this.txt = document.querySelector('.txt');
    this.wheel = document.querySelector('.wheel');
    this.numLines = 20;
    this.fontSize = 60; // Base font size in pixels
    this.radius = (this.fontSize / 2) / Math.sin((180 / this.numLines) * (Math.PI / 180));
    this.angle = 360 / this.numLines;
    this.origin = `50% 50% -${this.radius}px`;
    this.mySplitText = null;
  }

  init() {
    if (!this.txt || !this.wheel) return;
    
    this.setupText();
    this.cloneText();
    this.positionText();
    this.startAnimation();
  }

  setupText() {
    // Split text into characters
    this.mySplitText = new SplitText(this.txt, {
      type: "chars", 
      charsClass: "char", 
      position: "absolute"
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

    const charEase = "power4.inOut";
    const gtl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: 3
      },
      repeat: -1
    });

    gtl.to(this.wheel, {
        rotationX: -(360 / (this.numLines / 5)),
        transformOrigin: "50% 50%"
      })
      .to('.char:nth-of-type(even)', {
        rotationX: (360 / this.numLines),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char:nth-of-type(odd)', {
        fontWeight: 400,
        ease: charEase
      }, "-=2")
      .to(this.wheel, {
        rotationX: -((360 / (this.numLines / 5)) * 2),
        transformOrigin: "50% 50%"
      }, "-=0.5")
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 2),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char:nth-of-type(even)', {
        fontWeight: 400,
        ease: charEase
      }, "-=2")
      .to(this.wheel, {
        rotationX: -((360 / (this.numLines / 5)) * 3),
        transformOrigin: "50% 50%"
      }, "-=0.5")
      .to('.char:nth-of-type(even)', {
        rotationX: ((360 / this.numLines) * 3),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char:nth-of-type(odd)', {
        fontWeight: 700,
        ease: charEase
      }, "-=2")
      .to(this.wheel, {
        rotationX: -((360 / (this.numLines / 5)) * 4),
        transformOrigin: "50% 50%"
      }, "-=0.5")
      .to('.char:nth-of-type(odd)', {
        rotationX: ((360 / this.numLines) * 4),
        transformOrigin: this.origin,
        duration: 2
      }, "-=1")
      .to('.char:nth-of-type(even)', {
        fontWeight: 700,
        ease: charEase
      }, "-=2")
      .set('.char', {
        rotationX: 0,
        immediateRender: false
      })
      .set(this.wheel, {
        rotationX: 0,
        immediateRender: false
      });

    // Adjust speed
    gtl.timeScale(2);
  }
}