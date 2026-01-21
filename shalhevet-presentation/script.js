/* ============================================
   SHALHEVET PRESENTATION - JAVASCRIPT V4
   Center Timeline, Smooth Transitions
   ============================================ */

// Color Map
const colorMap = {
    'turquoise': '#00fff0',
    'pink': '#ff00aa',
    'yellow': '#ffe600',
    'orange': '#ff6600',
    'green': '#00ff66',
    'purple': '#aa00ff'
};

// State
let currentSectionIndex = 0;
let sections = [];
let scrollContainer = null;
let isTransitioning = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    scrollContainer = document.getElementById('scrollContainer');
    sections = document.querySelectorAll('.section');
    
    initScrollListener();
    initKeyboardNav();
    initTouchNav();
    
    // Initial state
    setTimeout(() => {
        updateActiveSection(0);
        sections[0]?.classList.add('active');
    }, 200);
});

/* ============================================
   SCROLL LISTENER
   ============================================ */

function initScrollListener() {
    if (!scrollContainer) return;
    
    let ticking = false;
    
    scrollContainer.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function handleScroll() {
    if (!scrollContainer) return;
    
    const scrollY = scrollContainer.scrollTop;
    const viewportHeight = window.innerHeight;
    const totalHeight = scrollContainer.scrollHeight - viewportHeight;
    
    // Update progress bar
    const progress = (scrollY / totalHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // Update timeline line
    const timelineLine = document.getElementById('timelineLine');
    if (timelineLine) {
        timelineLine.style.height = `${progress}%`;
    }
    
    // Determine current section
    const newIndex = Math.round(scrollY / viewportHeight);
    if (newIndex !== currentSectionIndex && newIndex >= 0 && newIndex < sections.length) {
        transitionToSection(newIndex);
    }
    
    // Parallax effect
    updateParallax(scrollY, viewportHeight);
}

function transitionToSection(newIndex) {
    if (isTransitioning) return;
    
    const oldIndex = currentSectionIndex;
    
    // Mark leaving
    sections[oldIndex]?.classList.add('leaving');
    sections[oldIndex]?.classList.remove('active');
    
    // Update index
    currentSectionIndex = newIndex;
    
    // Small delay before activating new section for smoother feel
    setTimeout(() => {
        sections[oldIndex]?.classList.remove('leaving');
        updateActiveSection(newIndex);
    }, 300);
}

function updateActiveSection(index) {
    const section = sections[index];
    if (!section) return;
    
    // Add active class
    section.classList.add('active');
    
    // Get color
    const color = section.dataset.color;
    const hexColor = colorMap[color] || colorMap.turquoise;
    
    // Update CSS variable on root
    document.documentElement.style.setProperty('--active-color', hexColor);
    
    // Update progress bar color
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.background = hexColor;
        progressBar.style.boxShadow = `0 0 15px ${hexColor}`;
    }
    
    // Update timeline line color
    const timelineLine = document.getElementById('timelineLine');
    if (timelineLine) {
        timelineLine.style.background = hexColor;
    }
    
    // Update slide counter
    const counter = document.getElementById('slideCounter');
    if (counter) {
        counter.textContent = `${index + 1} / ${sections.length}`;
    }
}

/* ============================================
   PARALLAX - Smoother
   ============================================ */

function updateParallax(scrollY, viewportHeight) {
    sections.forEach((section, index) => {
        const sectionTop = index * viewportHeight;
        const offset = scrollY - sectionTop;
        const progress = offset / viewportHeight;
        
        // Only apply to nearby sections
        if (Math.abs(progress) < 1.2) {
            const layerBack = section.querySelector('.layer-back');
            const layerMid = section.querySelector('.layer-mid');
            const layerFront = section.querySelector('.layer-front');
            
            // Gentler parallax movement
            if (layerBack) {
                layerBack.style.transform = `translateY(${progress * 50}px)`;
            }
            
            if (layerMid) {
                layerMid.style.transform = `translateY(${progress * 100}px)`;
            }
            
            if (layerFront) {
                layerFront.style.transform = `translateY(${progress * 150}px)`;
            }
        }
    });
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                e.preventDefault();
                navigateToSection(currentSectionIndex + 1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                navigateToSection(currentSectionIndex - 1);
                break;
            case 'Home':
                e.preventDefault();
                navigateToSection(0);
                break;
            case 'End':
                e.preventDefault();
                navigateToSection(sections.length - 1);
                break;
        }
    });
}

function navigateToSection(index) {
    if (!scrollContainer || isTransitioning) return;
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;
    if (index === currentSectionIndex) return;
    
    isTransitioning = true;
    
    const targetY = index * window.innerHeight;
    scrollContainer.scrollTo({
        top: targetY,
        behavior: 'smooth'
    });
    
    // Reset transition lock after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

/* ============================================
   TOUCH NAVIGATION
   ============================================ */

let touchStartY = 0;

function initTouchNav() {
    if (!scrollContainer) return;
    
    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    scrollContainer.addEventListener('touchend', (e) => {
        if (isTransitioning) return;
        
        const touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;
        const threshold = 80;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                navigateToSection(currentSectionIndex + 1);
            } else {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: true });
}

/* ============================================
   RESIZE HANDLER
   ============================================ */

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-snap to current section
        if (scrollContainer && !isTransitioning) {
            const targetY = currentSectionIndex * window.innerHeight;
            scrollContainer.scrollTo({
                top: targetY,
                behavior: 'auto'
            });
        }
    }, 300);
});

/* ============================================
   VISIBILITY CHANGE
   ============================================ */

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && scrollContainer) {
        setTimeout(() => {
            const scrollY = scrollContainer.scrollTop;
            const viewportHeight = window.innerHeight;
            const index = Math.round(scrollY / viewportHeight);
            if (index !== currentSectionIndex) {
                currentSectionIndex = index;
                updateActiveSection(index);
            }
        }, 200);
    }
});
