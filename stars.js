
function createStars(numStars) {
    const background = document.querySelector('.background');
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1; // Random size between 1 and 4
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`; 
        star.style.left = `${Math.random() * 100}vw`; 
        star.style.animationDuration = `${Math.random() * 1 + 0.5}s`; 
        star.style.animationDelay = `${Math.random() * 2}s`; 
        background.appendChild(star);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createStars(200);
});
