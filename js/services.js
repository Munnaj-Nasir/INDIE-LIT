// 1. Updated Data Object with matching keys
const serviceData = {
    "structural": "../assets/images/woman-safety-equipment-work.jpg", 
    "drylining": "../assets/images/medium-shot-woman-wearing-mask.jpg",
    "maintenance": "../assets/images/pexels-photo-4483775.webp"
};

// 2. Select Elements
const serviceItems = document.querySelectorAll('.service-item');
const displayImg = document.getElementById('dynamic-service-img');

// 3. Add Click Events
serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all
        serviceItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // This key now matches the data-service in your HTML
        const serviceKey = item.getAttribute('data-service');
        
        // Fade effect for image swap
        displayImg.style.opacity = 0;
        
        setTimeout(() => {
            // Check if key exists to avoid "undefined" errors
            if (serviceData[serviceKey]) {
                displayImg.src = serviceData[serviceKey];
            }
            displayImg.style.opacity = 1;
        }, 300);
    });
});