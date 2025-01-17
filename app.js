let intro = document.querySelector('.intro');
let welcomeSpan = document.querySelectorAll('.welcome');
let logo_small = document.querySelector('.logo_small');  
let logo_big = document.querySelector('.logo_big');

// Ensure everything runs after DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");

    setTimeout(() => {
        console.log("Adding 'active' class to welcome letters");
        welcomeSpan.forEach((span, idx) => {
            setTimeout(() => {
                console.log(`Adding active to: ${span.textContent}`);
                span.classList.add('active');
            }, (idx + 1) * 400); // each letter fades in 400ms apart
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
            // Slide out the intro screen after the animation
            intro.style.top = '-105vh'; 
        }, 2300); // After 2.3 seconds

    });
});
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    const isLightMode = document.body.classList.contains('light-mode');
    const themeIcon = isLightMode ? 'icons/dark_mode.png' : 'icons/light_mode.png';

    themeSwitch.querySelector('img').src = themeIcon;
    themeSwitch.querySelector('img').alt = isLightMode ? 'Dark Mode' : 'Light Mode';
    if (isLightMode) {
        logo_small.src = 'logos/black_logo_green_small.png'; 
        logo_small.alt = 'black Logo Green Small';
        logo_big.src = 'logos/black_logo_green_big.png'; 
        logo_big.alt = 'Black Logo Green Big';
        <script src="js_animations/pipeline.js"></script>
    } else {
        logo_small.src = 'logos/white_logo_blue_small.png';   
        logo_small.alt = 'White Logo Blue Small';
        logo_big.src = 'logos/white_logo_blue_big.png'; 
        logo_big.alt = 'White Logo Blue Big';
        <script src="js_animations/swirl.js"></script>
    }
});
