let intro = document.querySelector('.intro');
let welcomeSpan = document.querySelectorAll('.welcome');

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
    const themeIcon = isLightMode ? 'dark_mode.png' : 'light_mode.png';

    themeSwitch.querySelector('img').src = themeIcon;
    themeSwitch.querySelector('img').alt = isLightMode ? 'Dark Mode' : 'Light Mode';
});
