// ===========================
// Theme Toggle (Dark/Light Mode)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle button icon
    updateThemeIcon(currentTheme);
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // Update theme icon function
    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
});

// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===========================
// Scroll to Top Button
// ===========================
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// Navbar Background on Scroll
// ===========================
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
}

// ===========================
// Search Functionality
// ===========================
const searchInput = document.getElementById('searchInput');
const blogSearch = document.getElementById('blogSearch');
const resourceSearch = document.getElementById('resourceSearch');

// Home page search
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                // Redirect to blog page with search query
                window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}

// Blog search functionality
if (blogSearch) {
    blogSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const blogPosts = document.querySelectorAll('.blog-post-card');
        
        blogPosts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query)) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    });
}

// Resource search functionality
if (resourceSearch) {
    resourceSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const resources = document.querySelectorAll('.resource-card');
        
        resources.forEach(resource => {
            const title = resource.querySelector('h3').textContent.toLowerCase();
            const description = resource.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                resource.style.display = '';
            } else {
                resource.style.display = 'none';
            }
        });
    });
}

// ===========================
// Category Filter
// ===========================
const categoryFilters = document.querySelectorAll('.category-filter');

if (categoryFilters.length > 0) {
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            const blogPosts = document.querySelectorAll('.blog-post-card');
            
            blogPosts.forEach(post => {
                const postCategory = post.querySelector('.post-category');
                if (category === 'all') {
                    post.style.display = '';
                } else if (postCategory && postCategory.classList.contains(category)) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Update active state
            categoryFilters.forEach(f => f.style.color = '');
            this.style.color = 'var(--primary-color)';
        });
    });
}

// ===========================
// Resource Filter Buttons
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const resourcesGrid = document.getElementById('resourcesGrid');

if (filterButtons.length > 0 && resourcesGrid) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const resources = resourcesGrid.querySelectorAll('.resource-card');
            
            resources.forEach(resource => {
                const category = resource.getAttribute('data-category');
                
                if (filter === 'all') {
                    resource.style.display = '';
                    setTimeout(() => {
                        resource.style.opacity = '1';
                        resource.style.transform = 'scale(1)';
                    }, 10);
                } else if (category.includes(filter)) {
                    resource.style.display = '';
                    setTimeout(() => {
                        resource.style.opacity = '1';
                        resource.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    resource.style.opacity = '0';
                    resource.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        resource.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===========================
// Tutorial Details Toggle
// ===========================
function toggleTutorialDetails(tutorialId) {
    const details = document.getElementById(tutorialId);
    const button = event.target.closest('.tutorial-btn');
    
    if (details) {
        if (details.classList.contains('show')) {
            details.classList.remove('show');
            details.style.maxHeight = '0';
            details.style.padding = '0 2rem';
            button.innerHTML = 'Start Tutorial <i class="fas fa-play"></i>';
        } else {
            // Close all other open details
            document.querySelectorAll('.tutorial-details').forEach(detail => {
                detail.classList.remove('show');
                detail.style.maxHeight = '0';
                detail.style.padding = '0 2rem';
            });
            
            // Open clicked details
            details.classList.add('show');
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.padding = '0 2rem 2rem';
            button.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
        }
    }
}

// ===========================
// Copy to Clipboard Functionality
// ===========================
function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    const button = event.target.closest('.copy-btn');
    
    if (codeElement) {
        const code = codeElement.textContent;
        
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            
            // Update button text
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy code. Please try selecting and copying manually.');
        }
        
        // Remove temporary textarea
        document.body.removeChild(textarea);
    }
}

// ===========================
// Download Resource
// ===========================
function downloadResource(filename) {
    // In a real application, this would trigger an actual download
    // For demo purposes, we'll show an alert
    alert(`Downloading ${filename}...\n\nIn a production environment, this would download the actual file.`);
    
    // Example of how you might implement real downloads:
    // const link = document.createElement('a');
    // link.href = '/path/to/resources/' + filename;
    // link.download = filename;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// ===========================
// Newsletter Form Submission
// ===========================
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            // In a real application, you would send this to a server
            alert(`Thank you for subscribing!\n\nWe'll send updates to: ${email}`);
            this.reset();
        }
    });
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// Animate on Scroll
// ===========================
function animateOnScroll() {
    const elements = document.querySelectorAll('.article-card, .topic-card, .tutorial-card, .resource-card, .repo-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ===========================
// Progress Bar Update (for tutorials)
// ===========================
function updateProgress(tutorialId, percentage) {
    const tutorial = document.querySelector(`#${tutorialId}`);
    if (tutorial) {
        const progressFill = tutorial.querySelector('.progress-fill');
        const progressText = tutorial.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = percentage + '%';
            progressText.textContent = percentage + '% Complete';
        }
    }
}

// ===========================
// Dark Mode Toggle (Optional Enhancement)
// ===========================
// Uncomment this section if you want to add a dark/light mode toggle
/*
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    darkModeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
*/

// ===========================
// Loading State Handler
// ===========================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// ===========================
// Handle URL Parameters (for search)
// ===========================
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery && blogSearch) {
        blogSearch.value = searchQuery;
        // Trigger search
        const event = new Event('input');
        blogSearch.dispatchEvent(event);
    }
});

// ===========================
// Print Current Year in Footer
// ===========================
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(element => {
    element.textContent = currentYear;
});

// ===========================
// Code Syntax Highlighting Enhancement
// ===========================
// If using Prism.js, ensure it highlights all code blocks
if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
}

// ===========================
// Lazy Loading Images (Performance)
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Console Welcome Message
// ===========================
console.log('%c Welcome to PyBlog! ', 'background: #16a085; color: white; font-size: 20px; padding: 10px;');
console.log('%c Built with ❤️ for Python & Data Science learners ', 'font-size: 12px; color: #16a085;');

// ===========================
// Performance Monitoring (Optional)
// ===========================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}
