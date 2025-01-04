let intro = document.querySelector('.intro');
let welcomeSpan = document.querySelectorAll('.welcome');
let logo_small = document.querySelector('.logo_small');  
let logo_big = document.querySelector('.logo_big');

// Ensure everything runs after DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");

    setTimeout(() => {
        console.log("Adding 'active' class to welcome letters");

        // Add 'active' class to each span in sequence
        welcomeSpan.forEach((span, idx) => {
            setTimeout(() => {
                console.log(`Adding active to: ${span.textContent}`);
                span.classList.add('active');
            }, (idx + 1) * 400); // each letter fades in 400ms apart
        });

        setTimeout(() => {
            console.log("Starting fade out");

            // Remove 'active' class and add 'fade' class to each span in sequence
            welcomeSpan.forEach((span, idx) => {
                setTimeout(() => {
                    console.log(`Removing active and adding fade to: ${span.textContent}`);
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50); // each letter fades out 50ms apart
            });
        }, 2000); // After 2 seconds, start fading out

        setTimeout(() => {
            console.log("Sliding out the intro screen");
            // Slide out the intro screen after the animation
            intro.style.top = '-100vh'; // Move the intro screen up to hide it
        }, 2300); // After 2.3 seconds, start sliding out

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
        logo_small.src = 'logos/light_logo_green_small.png';  // Light theme small logo
        logo_small.alt = 'Light Logo Green Small';
        logo_big.src = 'logos/light_logo_green_big.png';  // Light theme big logo
        logo_big.alt = 'Light Logo Green Big';
    } else {
        logo_small.src = 'logos/dark_logo_blue_small.png';   // Dark theme small logo
        logo_small.alt = 'Dark Logo Blue Small';
        logo_big.src = 'logos/dark_logo_blue_big.png';   // Dark theme big logo
        logo_big.alt = 'Dark Logo Blue Big';
    }
});
