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

// Check if the user has a saved preference, or use system preference
let isLightMode;
if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
    // No saved preference, use system preference
    isLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
} else {
    // Use saved preference
    isLightMode = localStorage.getItem(THEME_STORAGE_KEY) === 'light';
}

let logo_small = document.querySelector('.logo_small');
let logo_big = document.querySelector('.logo_big');
let trailArr = [1, .9, .8, .5, .25, .6, .4, .3, .2];
var sparklesArr = [];

// Performance optimization - use requestAnimationFrame for animations
let animationFrameId = null;
let lastScrollPosition = 0;
let ticking = false;

function updateThemeElements(isLight) {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Update body class
    document.body.classList.toggle('light-mode', isLight);
    document.documentElement.classList.toggle('light-mode', isLight);
    
    // Update theme switch icon
    const themeIcon = isLight ? 'icons/dark_mode.png' : 'icons/light_mode.png';
    if (themeSwitch) {
        const img = themeSwitch.querySelector('img');
        if (img) {
            img.src = themeIcon;
            img.alt = isLight ? 'Dark Mode' : 'Light Mode';
        }
    }
    
    // Update logos - check if elements exist first
    if (logo_small) {
        logo_small.src = isLight ? 'logos/small_light_theme_logo.png' : 'logos/small_dark_theme_logo.png';
        logo_small.alt = isLight ? 'small_light_theme_logo' : 'small_dark_theme_logo';
    }
    
    if (logo_big) {
        logo_big.src = isLight ? 'logos/big_light_theme_logo.png' : 'logos/big_dark_theme_logo.png';
        logo_big.alt = isLight ? 'big_light_theme_logo' : 'big_dark_theme_logo';
    }
    
    // Update background animation
    updateBackgroundAnimation(isLight);
}

function updateBackgroundAnimation(isLight) {
    // First clean up any existing animation
    cleanupBackgroundAnimation();
    
    // Clear existing canvas elements
    const canvasContainer = document.querySelector('.content--canvas');
    if (canvasContainer) {
        // Remove old canvas elements
        while (canvasContainer.firstChild) {
            canvasContainer.removeChild(canvasContainer.firstChild);
        }
    }
    
    // Completely recreate the content--canvas container to ensure a fresh start
    if (canvasContainer) {
        const newContainer = document.createElement('div');
        newContainer.className = 'content--canvas';
        canvasContainer.parentNode.replaceChild(newContainer, canvasContainer);
    }
    
    // Load the appropriate script
    const scriptSrc = isLight ? "js_animations/light_bg.js" : "js_animations/dark_bg.js";
    
    // Load the script and handle any errors
    loadScript(scriptSrc).catch(error => {
        console.error('Error loading animation script:', error);
    });
}

// Debounce function to limit frequency of function calls
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events with requestAnimationFrame
function onScroll() {
    lastScrollPosition = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Any scroll-dependent animations would go here
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    updateThemeElements(isLightMode);
    
    // Set up theme switch handler
    setupThemeSwitch();
    
    // Listen for system theme changes
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    // Update theme if system preference changes and no manual preference is set
    const handleSystemThemeChange = (e) => {
        if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
            isLightMode = e.matches;
            updateThemeElements(isLightMode);
        }
    };
    
    // Use the newer event listener method if supported, fallback to older method
    if (colorSchemeQuery.addEventListener) {
        colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (colorSchemeQuery.addListener) {
        // Older browsers
        colorSchemeQuery.addListener(handleSystemThemeChange);
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const overlay = document.querySelector('.overlay');
    
    if (mobileMenuToggle && navMenu && overlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a nav item
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking the overlay
        overlay.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
        
        // Handle escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Add smooth scrolling with improved performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (!targetElement) return;
        
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
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', debounce(onScroll), { passive: true });
    
    // Add mousemove event for cursor sparkles
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
    }, { passive: true });

    // Add click event for extra sparkles
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
    }, { passive: true });
    
    // Start sparkle animation
    requestAnimationFrame(moveSparkles);
});

function trailAnimation(e, i, maxYTranslation) {
    // Limit number of sparkles for performance
    if (sparklesArr.length > 50) return;
    
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
    
    // Use CSS variables for colors if they exist, fallback to hardcoded values
    if (isLightMode) {
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
                let yInterpolation = calculateInterpolation(sparkle);
                let xInterpolation = sparkle.maxXTranslation ? 
                    calculateXInterpolation(sparkle) : 0;
                sparkle.style.transform = `translateY(${yInterpolation}px) translateX(${xInterpolation}px)`;
            }
            
            sparklesArr[moveIndex++] = sparkle;  // faster than array.splice()
        }
    }
    
    sparklesArr.length = moveIndex;
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(moveSparkles);
}

function calculateInterpolation(sparkle) {
    let currentMillis = Date.now();
    let lifeProgress = (currentMillis - sparkle.created) / sparkle.animationSpeed;
    let interpolation = sparkle.maxYTranslation * lifeProgress;
    
    return interpolation;
}

function calculateXInterpolation(sparkle) {
    let currentMillis = Date.now();
    let lifeProgress = (currentMillis - sparkle.created) / sparkle.animationSpeed;
    let interpolation = sparkle.maxXTranslation * lifeProgress;
    
    return interpolation;
}

// Function to load a script with a promise
function loadScript(url) {
  return new Promise((resolve, reject) => {
    console.log(`Loading script: ${url}`);

    // Remove any existing animation scripts to avoid conflicts
    document.querySelectorAll('.light_bg-animation, .dark_bg-animation').forEach(el => el.remove());

    // Cache busting to ensure fresh script
    const cacheBuster = '?v=' + new Date().getTime();
    const script = document.createElement('script');
    script.src = url + cacheBuster;
    
    // Add a class for easy selection later
    if (url.includes('light_bg.js')) {
      script.classList.add('light_bg-animation');
    } else if (url.includes('dark_bg.js')) {
      script.classList.add('dark_bg-animation');
    }
    
    script.onload = () => {
      console.log(`Script loaded successfully: ${url}`);
      // Give some time for the script to initialize
      setTimeout(() => {
        try {
          // Call the appropriate setup function based on theme
          if (url.includes('light_bg.js')) {
            if (typeof window.lightSetup === 'function') {
              window.lightSetup();
              console.log('Light animation setup complete');
            } else {
              console.error('Light setup function not found after script load');
            }
          } else if (url.includes('dark_bg.js')) {
            if (typeof window.darkSetup === 'function') {
              window.darkSetup();
              console.log('Dark animation setup complete');
            } else {
              console.error('Dark setup function not found after script load');
            }
          }
          resolve();
        } catch (error) {
          console.error('Error setting up animation:', error);
          reject(error);
        }
      }, 100);
    };
    
    script.onerror = (error) => {
      console.error(`Error loading script ${url}:`, error);
      reject(error);
    };
    
    document.body.appendChild(script);
  });
}

// Function to clean up background animation
function cleanupBackgroundAnimation() {
  console.log('Cleaning up background animation...');
  
  // Cancel any animation frames
  if (window.requestAnimationFrameId) {
    window.cancelAnimationFrame(window.requestAnimationFrameId);
    window.requestAnimationFrameId = null;
  }
  
  // Call theme-specific cleanup functions if available
  try {
    if (typeof window.lightCleanup === 'function' && document.documentElement.dataset.theme === 'light') {
      window.lightCleanup();
      console.log('Light animation cleanup complete');
    } else if (typeof window.darkCleanup === 'function' && document.documentElement.dataset.theme === 'dark') {
      window.darkCleanup();
      console.log('Dark animation cleanup complete');
    }
  } catch (error) {
    console.error('Error cleaning up animation:', error);
  }
  
  // Remove existing animation scripts
  document.querySelectorAll('.light_bg-animation, .dark_bg-animation').forEach(el => {
    el.remove();
  });

  // Clean up the container
  const container = document.querySelector('.content--canvas');
  if (container) {
    // Remove all canvas elements
    Array.from(container.children).forEach(child => {
      container.removeChild(child);
    });
  }
  
  console.log('Background animation cleanup complete');
}

// Function to set up theme switch button
function setupThemeSwitch() {
  const themeSwitch = document.querySelector('.theme-switch');
  if (!themeSwitch) return;
  
  // Clone and replace to remove old event listeners
  const newThemeSwitch = themeSwitch.cloneNode(true);
  themeSwitch.parentNode.replaceChild(newThemeSwitch, themeSwitch);
  
  // Add click event listener to the new theme switch
  newThemeSwitch.addEventListener('click', function() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    console.log(`Switching theme from ${currentTheme} to ${newTheme}`);
    
    // Clean up existing animation
    cleanupBackgroundAnimation();
    
    // Update theme without refreshing page
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    // Update global variable for other components that use it
    window.isLightMode = (newTheme === 'light');
    
    // Update all theme-dependent elements
    updateThemeElements(window.isLightMode);
    
    // Completely recreate the canvas container
    let container = document.querySelector('.content--canvas');
    if (container) {
      const newContainer = document.createElement('div');
      newContainer.className = 'content--canvas';
      container.parentNode.replaceChild(newContainer, container);
    }
    
    // Load appropriate animation script
    const scriptUrl = newTheme === 'light' ? './js_animations/light_bg.js' : './js_animations/dark_bg.js';
    loadScript(scriptUrl).catch(error => {
      console.error('Failed to load animation script:', error);
    });
    
    // Reset SimplexNoise if it exists
    if (window.SimplexNoise) {
      console.log('SimplexNoise exists, no need to reload');
    } else {
      console.log('Loading SimplexNoise library');
      loadScript('./js_animations/simplex-noise.min.js');
    }
    
    // Set up theme switch again to ensure it works for future clicks
    setTimeout(setupThemeSwitch, 100);
  });
  
  console.log('Theme switch handler set up');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial theme based on local storage or system preference
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.dataset.theme = defaultTheme;
  window.isLightMode = (defaultTheme === 'light');
  console.log(`Initial theme set to: ${defaultTheme}`);
  
  // Apply initial theme to all elements
  updateThemeElements(window.isLightMode);
  
  // Load SimplexNoise library first
  loadScript('./js_animations/simplex-noise.min.js')
    .then(() => {
      // Then load the appropriate animation based on theme
      const scriptUrl = defaultTheme === 'light' ? './js_animations/light_bg.js' : './js_animations/dark_bg.js';
      return loadScript(scriptUrl);
    })
    .catch(error => {
      console.error('Error during initialization:', error);
    });
  
  // Set up theme switch handler
  setupThemeSwitch();
});

// Make isLightMode available globally
window.isLightMode = isLightMode;