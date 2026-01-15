document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-item');
    
    // Function to animate the number counting
    const countUp = (element) => {
        const target = parseInt(element.innerText);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps approx

        const updateCount = () => {
            count += increment;
            if (count < target) {
                element.innerText = Math.ceil(count) + "%";
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target + "%";
            }
        };
        updateCount();
    };

    // Intersection Observer to detect when section is on screen
    const observerOptions = {
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const numSpan = item.querySelector('.stat-number');
                
                // Add class for CSS fade up
                item.classList.add('is-visible');
                
                // Start the count-up animation
                countUp(numSpan);
                
                // Stop observing once animated
                observer.unobserve(item);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
});