// ===================================
// SMOOTH SCROLLING ENHANCEMENT
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// CONSTELLATION INTERACTIVITY
// ===================================

class SkillConstellation {
    constructor() {
        this.skillStars = document.querySelectorAll('.skill-star');
        this.constellation = document.querySelector('.constellation');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateStars();
    }

    setupEventListeners() {
        this.skillStars.forEach(star => {
            const circle = star.querySelector('circle');
            const label = star.querySelector('.skill-label');
            
            // Hover effects
            star.addEventListener('mouseenter', () => {
                this.highlightSkill(star, circle, label);
            });
            
            star.addEventListener('mouseleave', () => {
                this.resetSkill(star, circle, label);
            });
            
            // Touch events for mobile
            star.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.highlightSkill(star, circle, label);
            });
        });
    }

    highlightSkill(star, circle, label) {
        circle.style.r = '12';
        circle.style.filter = 'drop-shadow(0 0 15px rgba(0, 217, 255, 0.8))';
        label.style.fill = '#00d9ff';
        label.style.fontSize = '14px';
    }

    resetSkill(star, circle, label) {
        circle.style.r = '8';
        circle.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 110, 0.5))';
        label.style.fill = '#ffffff';
        label.style.fontSize = '12px';
    }

    animateStars() {
        // Subtle pulse animation
        setInterval(() => {
            this.skillStars.forEach((star, index) => {
                const circle = star.querySelector('circle');
                const baseRadius = 8;
                const pulse = Math.sin(Date.now() / 500 + index) * 0.5;
                
                if (star !== document.activeElement) {
                    // Only animate if not being hovered
                    const isHovered = star.querySelector('circle').style.r === '12';
                    if (!isHovered) {
                        circle.style.r = baseRadius + pulse;
                    }
                }
            });
        }, 50);
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Observe stat boxes
        document.querySelectorAll('.stat').forEach(stat => {
            observer.observe(stat);
        });
    }

    animateElement(element) {
        element.style.animation = 'fadeInUp 0.6s ease forwards';
    }
}

// ===================================
// NAVIGATION ACTIVE STATE
// ===================================

class NavigationHandler {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('main > section');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===================================
// THEME TOGGLE (Optional Enhancement)
// ===================================

class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Store preference
        if (localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
}

// ===================================
// CURSOR GLOW EFFECT (Optional)
// ===================================

class CursorGlow {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-glow';
        document.body.appendChild(this.cursor);
        this.init();
    }

    init() {
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
            });
        }
    }
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    new SkillConstellation();
    new ScrollAnimations();
    new NavigationHandler();
    new ThemeManager();
    
    // Optional: Add cursor glow for desktop only
    if (window.innerWidth > 1024) {
        new CursorGlow();
    }

    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease';
    }

    // Console message
    console.log('%cMuhammad Fonda Rasendria - Web Developer', 'color: #ff006e; font-size: 16px; font-weight: bold;');
    console.log('%cPersona 5 inspired portfolio design', 'color: #00d9ff; font-size: 12px;');
});

// ===================================
// RESPONSIVE UTILITIES
// ===================================

window.addEventListener('resize', () => {
    // Handle responsive changes if needed
});

// Add CSS for cursor glow effect
const style = document.createElement('style');
style.textContent = `
    .cursor-glow {
        position: fixed;
        width: 30px;
        height: 30px;
        background: radial-gradient(circle, rgba(255, 0, 110, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
    }
`;
document.head.appendChild(style);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images when in viewport
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}