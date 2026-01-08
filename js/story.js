// 1. Success Stories Data
const storyData = [
    {
        title: "Stuart Logistics Improves Sorting Center Operations",
        description: "Stuart Logistics specializes in deliveries to city-based customers all across Europe. It's unprecedented speed and efficiency revolutionized urban freight transport.",
        image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000",
        overlay: "KEEPING YOU ON <br><span class='extra-bold'>THE ROAD TO SUCCESS</span>"
    },
    {
        title: "Metro Express Reduces Fuel Costs by 22%",
        description: "By utilizing INDIE LIT's AI-driven route optimization, Metro Express was able to streamline their last-mile delivery network in major metropolitan areas.",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000",
        overlay: "DRIVING EFFICIENCY <br><span class='extra-bold'>EVERY SINGLE MILE</span>"
    },
    {
        title: "Global Cargo Expands Trans-Atlantic Capacity",
        description: "Global Cargo integrated INDIE LIT's logistics dashboard to manage complex sea-to-road transitions, resulting in a 15% faster turnaround time at ports.",
        image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1000",
        overlay: "CONNECTING PORTS <br><span class='extra-bold'>WITH PRECISION LOGISTICS</span>"
    }
];

let currentIndex = 0;

// 2. Select Elements
const storyImg = document.querySelector('.story-image-side img');
const storyOverlay = document.querySelector('.img-overlay h3');
const storyTitle = document.querySelector('.story-title');
const storyDesc = document.querySelector('.story-content-side p');
const progressSegments = document.querySelectorAll('.progress-segment');
const prevBtn = document.querySelector('.circle-nav.prev');
const nextBtn = document.querySelector('.circle-nav.next');
const storyCard = document.querySelector('.story-card');

// 3. Update Function
function updateStory(index) {
    const data = storyData[index];

    // Add a quick fade-out effect
    storyCard.style.opacity = '0.5';
    storyCard.style.transform = 'translateX(10px)';
    
    setTimeout(() => {
        // Swap Content
        storyImg.src = data.image;
        storyOverlay.innerHTML = data.overlay;
        storyTitle.innerText = data.title;
        storyDesc.innerText = data.description;

        // Update Progress Segments
        progressSegments.forEach((seg, i) => {
            seg.classList.toggle('active', i === index);
        });

        // Fade back in
        storyCard.style.opacity = '1';
        storyCard.style.transform = 'translateX(0)';
    }, 200);
}

// 4. Event Listeners
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % storyData.length;
    updateStory(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + storyData.length) % storyData.length;
    updateStory(currentIndex);
});

// Optional: Auto-play every 8 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % storyData.length;
    updateStory(currentIndex);
}, 8000);