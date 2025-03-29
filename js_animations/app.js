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
    const existingScript = document.querySelector('.light_bg-animation, .dark_bg-animation');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Use a more efficient way to load the script
    const script = document.createElement('script');
    script.src = isLight ? "js_animations/light_bg.js" : "js_animations/dark_bg.js";
    script.className = isLight ? "light_bg-animation" : "dark_bg-animation";
    
    // Use async to prevent blocking
    script.async = true;
    
    // Add to the document
    document.body.appendChild(script);
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
    
    // Add theme switch event listener
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            isLightMode = !isLightMode;
            localStorage.setItem(THEME_STORAGE_KEY, isLightMode ? 'light' : 'dark');
            updateThemeElements(isLightMode);
            
            // Use requestAnimationFrame for smoother transitions
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                window.location.reload();
            });
        });
    }
    
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
                let interpolation = calculateInterpolation(sparkle);
                sparkle.style.transform = `translateY(${interpolation}px)`;
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

// Make isLightMode available globally
window.isLightMode = isLightMode;