/* // Welcome screen animation
let intro = document.querySelector('.intro');
let welcomeSpan = document.querySelectorAll('.welcome');

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");

    setTimeout(() => {
        console.log("Adding 'active' class to welcome letters");
        welcomeSpan.forEach((span, idx) => {
            setTimeout(() => {
                console.log(`Adding active to: ${span.textContent}`);
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            console.log("Starting fade out");
            welcomeSpan.forEach((span, idx) => {
                setTimeout(() => {
                    console.log(`Removing active and adding fade to: ${span.textContent}`);
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            console.log("Sliding out the intro screen");
            intro.style.top = '-105vh';
        }, 2300);
    });
}); */

// Theme Switcher Logic
const THEME_STORAGE_KEY = 'preferred-theme';
let isLightMode = localStorage.getItem(THEME_STORAGE_KEY) === 'light';
let logo_small = document.querySelector('.logo_small');
let logo_big = document.querySelector('.logo_big');
let trailArr = [1, .9, .8, .5, .25, .6, .4, .3, .2];
var sparklesArr = [];

function updateThemeElements(isLight) {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Update body class
    document.body.classList.toggle('light-mode', isLight);
    
    // Update theme switch icon
    const themeIcon = isLight ? 'icons/dark_mode.png' : 'icons/light_mode.png';
    themeSwitch.querySelector('img').src = themeIcon;
    themeSwitch.querySelector('img').alt = isLight ? 'Dark Mode' : 'Light Mode';
    
    // Update logos
    if (isLight) {
        logo_small.src = 'logos/small_light_theme_logo.png';
        logo_small.alt = 'small_light_theme_logo';
        logo_big.src = 'logos/big_light_theme_logo.png';
        logo_big.alt = 'big_light_theme_logo';
    } else {
        logo_small.src = 'logos/small_dark_theme_logo.png';
        logo_small.alt = 'small_dark_theme_logo';
        logo_big.src = 'logos/big_dark_theme_logo.png';
        logo_big.alt = 'big_dark_theme_logo';
    }
    
    // Update background animation
    updateBackgroundAnimation(isLight);
}

function updateBackgroundAnimation(isLight) {
    const existingScript = document.querySelector('.light_bg-animation, .dark_bg-animation');
    if (existingScript) {
        existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.src = isLight ? "js_animations/light_bg.js" : "js_animations/dark_bg.js";
    script.className = isLight ? "light_bg-animation" : "dark_bg-animation";
    document.body.appendChild(script);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    updateThemeElements(isLightMode);
    
    // Add theme switch event listener
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('click', () => {
        isLightMode = !isLightMode;
        localStorage.setItem(THEME_STORAGE_KEY, isLightMode ? 'light' : 'dark');
        updateThemeElements(isLightMode);
        // Add a small delay before reloading to ensure the theme is saved
        window.requestAnimationFrame(() => {
            window.location.reload();
        });
        
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
      
          if (targetId === "experience") {
            // For "Experience" section, scroll to the start with an offset
            const topOffset = 300; // Adjust offset as needed
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - topOffset;
      
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          } else {
            // Default scroll for other sections
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        });
      });
      function trailAnimation(e, i, maxYTranslation) {
        let elem = document.createElement('div');
      
        elem = styleSparkle(elem, e, i);
        
        elem.classList.add("sparkle");
      
        document.body.appendChild(elem);
      
        elem = addAnimationProperties(elem, i, maxYTranslation);
        
        sparklesArr.push(elem);
      }
      
      function styleSparkle(elem, e, i) {
        let j = (1 - i) * 50;
        let size = Math.ceil(Math.random() * 10 * i) + 'px';
        
        elem.style.top = e.pageY - window.scrollY + Math.round(Math.random() * j - j / 2) + 'px';
        elem.style.left = e.pageX + Math.round(Math.random() * j - j / 2) + 'px';
        
        elem.style.width = size;
        elem.style.height = size;
        elem.style.borderRadius = size;
        
        if (window.isLightMode) {
            // More blue, with some cyan and a bit of purple for variety
            elem.style.background = `hsla(${200 + Math.random() * 40}, ${50 + Math.random() * 50}%, ${30 + Math.random() * 40}%, ${i})`;
        } else {
            // Purple, pink, and dark blue sparkles in dark mode
            elem.style.background = `hsla(${220 + Math.random() * 80}, ${60 + Math.random() * 40}%, ${50 + Math.random() * 40}%, ${i})`;
        }
        
        
        return elem;
      }
      
      function addAnimationProperties(elem, i, maxYTranslation) {
        const ANIMATION_SPEED = 1100;
        let lifeExpectancy = Math.round(Math.random() * i * ANIMATION_SPEED);
      
        elem.maxYTranslation = maxYTranslation;
        elem.animationSpeed = ANIMATION_SPEED;
        elem.created = Date.now();
        elem.diesAt = elem.created + lifeExpectancy;
      
        return elem;
      }
      
      function moveSparkles() {
        let remove = false;
        let moveIndex = 0;
        let sparkle;
      
        for (let i = 0; i < sparklesArr.length; i++) {
          sparkle = sparklesArr[i];
          remove = sparkle.diesAt <= Date.now();
          
          if (remove) {
            document.body.removeChild(sparkle);
          } else {
            if (sparkle.maxYTranslation) {
              let interpolation = calculateInterpolation(sparkle);
              sparkle.style.transform = `translateY(${interpolation}px)`; 
            }
            
            sparklesArr[moveIndex++] = sparkle;  // faster than array.splice()    
          }
        }
        
        sparklesArr.length = moveIndex;
        requestAnimationFrame(moveSparkles);
      }
      
      function calculateInterpolation(sparkle) {
        let currentMillis = Date.now();
        let lifeProgress = (currentMillis - sparkle.created) / sparkle.animationSpeed;
        let interpolation = sparkle.maxYTranslation * lifeProgress;
        
        return interpolation;
      }
      let lastCall = 0;

      window.addEventListener('mousemove', function (e) {
          const now = Date.now();

          if (now - lastCall > 40) { // Throttling to limit calls
              let maxYTranslation = '80';
              
              trailArr.forEach((i) => { 
                  trailAnimation(e, i, maxYTranslation); 
              });

              lastCall = now;
          }
      }, false);

      document.addEventListener('click', function(e) {
        let maxYTranslation = 80;
        trailArr.forEach((intensity) => {
          for (let j = 0; j < 5; j++) {
            let elem = document.createElement('div');
            elem = styleSparkle(elem, e, intensity);
            elem.classList.add("sparkle");
            document.body.appendChild(elem);
      
            // Randomize translations only for click sparkles
            const randomYTranslation = (Math.random() * 2 - 1) * maxYTranslation;
            const randomXTranslation = (Math.random() * 2 - 1) * maxYTranslation;
      
            elem.maxYTranslation = randomYTranslation;
            elem.maxXTranslation = randomXTranslation;
      
            elem = addAnimationProperties(elem, intensity, randomYTranslation);
            sparklesArr.push(elem);
          }
        });
      });

      function moveSparkles() {
        let moveIndex = 0;
      
        for (let i = 0; i < sparklesArr.length; i++) {
          let sparkle = sparklesArr[i];
          
          if (sparkle.diesAt <= Date.now()) {
            document.body.removeChild(sparkle);
          } else {
            if (sparkle.maxYTranslation) {
              let yInterpolation = calculateInterpolation(sparkle);
              let xInterpolation = sparkle.maxXTranslation ? 
                calculateXInterpolation(sparkle) : 0;
              sparkle.style.transform = `translateY(${yInterpolation}px) translateX(${xInterpolation}px)`; 
            }
            
            sparklesArr[moveIndex++] = sparkle;
          }
        }
        
        sparklesArr.length = moveIndex;
        requestAnimationFrame(moveSparkles);
      }
      
      function calculateXInterpolation(sparkle) {
        let currentMillis = Date.now();
        let lifeProgress = (currentMillis - sparkle.created) / sparkle.animationSpeed;
        let interpolation = sparkle.maxXTranslation * lifeProgress;
        
        return interpolation;
      }
      moveSparkles();
});

// Make isLightMode available globally
window.isLightMode = isLightMode;