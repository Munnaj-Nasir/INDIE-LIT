// 1. Our Data Object (could be in a separate .json file)
const serviceData = {
    "trucking": "../assets/images/woman-safety-equipment-work.jpg",
    "logistics": "../assets/images/tablet-label-shipping-with-man-warehouse-logistics-route-tracking-code-cargo-box-inventory-checklist-ecommerce-delivery-with-person-factory-supplier-distribution-depot.jpg",
    "shipping": "../assets/images/full-shot-men-wearing-protection-equipment.jpg"
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
        
        // Get the specific service key (trucking, logistics, etc)
        const serviceKey = item.getAttribute('data-service');
        
        // Fade effect for image swap
        displayImg.style.opacity = 0;
        
        setTimeout(() => {
            displayImg.src = serviceData[serviceKey];
            displayImg.style.opacity = 1;
        }, 300);
    });
});