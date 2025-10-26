// --- 1. Define Image Data Array ---
// 🚨 IMPORTANT: Replace the 'src' values with your actual image file paths or URLs
// If you use the placeholder script in index.html, this array is optional for a quick test.
const imageData = [
    { src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", alt: "Your First Product Offer" }, 
    { src: "https://thelittlebunny.in/cdn/shop/files/E83689CF-8048-436C-B8E4-0FEFB62F3BA8.jpg?v=1714489289&width=416", alt: "Your Second Product Offer" },
    { src: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9498-3x2-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200", alt: "Your Third Product Offer" },
    // Add more images here in the same format
];

// Use placeholder data if the main array is empty (for easy testing)
const slidesData = imageData.length > 0 ? imageData : (window.tempImageData || []);

// --- 2. Global Variables ---
const slideWrapper = document.querySelector('.carousel-slide-wrapper');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.carousel-dots');
const container = document.querySelector('.carousel-container');

let currentSlide = 0;
const slideCount = slidesData.length;
const autoSlideInterval = 3000; // 3 seconds
let slideTimer = null; 

// --- 3. Core Function: BUILD the Slides and Dots from Data ---
function createCarouselElements() {
    slidesData.forEach((imgData, index) => {
        // Create the Slide HTML
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = imgData.alt;
        
        slideDiv.appendChild(img);
        slideWrapper.appendChild(slideDiv);

        // Create the Dot HTML
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index);
        
        // Add click listener to jump to a slide
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide(); 
            startAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
}

// --- 4. Movement and Navigation Logic ---
function goToSlide(index) {
    // 1. Calculate the correct looping index
    if (index >= slideCount) {
        currentSlide = 0; // Loop back to start
    } else if (index < 0) {
        currentSlide = slideCount - 1; // Loop back to end
    } else {
        currentSlide = index;
    }

    // 2. Determine the width of one slide 
    const firstSlide = slideWrapper.querySelector('.slide');
    if (!firstSlide) return; 
    const slideWidth = firstSlide.clientWidth; 
    
    // 3. Apply the CSS transformation
    const offset = -currentSlide * slideWidth;
    slideWrapper.style.transform = `translateX(${offset}px)`;

    // 4. Update the navigation dots
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });

    const activeDot = document.querySelector(`.dot[data-index="${currentSlide}"]`);
    if (activeDot) {
        activeDot.classList.add('active');
    }
}

// --- 5. Auto Slide Control ---
function startAutoSlide() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, autoSlideInterval);
}

function stopAutoSlide() {
    clearInterval(slideTimer);
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// --- 6. Initialization on Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if we have any data to work with
    if (slideCount === 0) {
        console.error("No image data found. Carousel cannot be initialized.");
        return;
    }
    
    // 1. Create the slides and dots based on the data array
    createCarouselElements();
    
    // 2. Attach button listeners
    nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
    prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
    
    // 3. Stop/Start auto-slide on hover
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    // 4. Set the initial position and start the timer
    goToSlide(0);
    startAutoSlide();
});