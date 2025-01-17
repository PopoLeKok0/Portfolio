// Welcome screen animation
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
});

// Theme Switcher Logic
const THEME_STORAGE_KEY = 'preferred-theme';
let isLightMode = localStorage.getItem(THEME_STORAGE_KEY) === 'light';
let logo_small = document.querySelector('.logo_small');
let logo_big = document.querySelector('.logo_big');

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
        logo_small.src = 'logos/black_logo_green_small.png';
        logo_small.alt = 'Black Logo Green Small';
        logo_big.src = 'logos/black_logo_green_big.png';
        logo_big.alt = 'Black Logo Green Big';
    } else {
        logo_small.src = 'logos/white_logo_blue_small.png';
        logo_small.alt = 'White Logo Blue Small';
        logo_big.src = 'logos/white_logo_blue_big.png';
        logo_big.alt = 'White Logo Blue Big';
    }
    
    // Update background animation
    updateBackgroundAnimation(isLight);
}

function updateBackgroundAnimation(isLight) {
    const existingScript = document.querySelector('.pipeline-animation, .swirl-animation');
    if (existingScript) {
        existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.src = isLight ? "pipeline.js" : "swirl.js";
    script.className = isLight ? "pipeline-animation" : "swirl-animation";
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
});

// Make isLightMode available globally
window.isLightMode = isLightMode;