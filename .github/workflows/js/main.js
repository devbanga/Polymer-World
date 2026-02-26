// OnlyPolymer - Interactive JavaScript Functionality
// Modern B2B Marketplace Features

class OnlyPolymerApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupCounters();
        this.setupProductInteractions();
        this.setupFormHandling();
        this.setupMobileMenu();
        this.setupSearchFunctionality();
    }

    // Navigation functionality
    setupNavigation() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('text-blue-600', 'font-semibold');
                        link.classList.add('text-gray-500');
                    });
                    
                    const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.remove('text-gray-500');
                        activeLink.classList.add('text-blue-600', 'font-semibold');
                    }
                }
            });
        });
    }

    // Scroll effects and animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-card, .product-card, .stat-item');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Animated counters
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const suffix = counter.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 100;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Product interactions
    setupProductInteractions() {
        const productButtons = document.querySelectorAll('.product-card button');
        
        productButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = button.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Add loading state
                const originalText = button.textContent;
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
                button.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    this.showProductModal(productName);
                }, 1500);
            });
        });
    }

    // Product modal
    showProductModal(productName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all">
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-info text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Product Details</h3>
                    <p class="text-gray-600 mb-6">
                        You've selected <strong>${productName}</strong>. More detailed information about this product will be available soon.
                    </p>
                    <div class="flex space-x-4">
                        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors" onclick="this.closest('.fixed').remove()">
                            Close
                        </button>
                        <button class="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                            Contact Supplier
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Form handling
    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                // Add loading state
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.textContent = 'Sent Successfully!';
                    submitButton.classList.add('bg-green-600');
                    
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('bg-green-600');
                        form.reset();
                    }, 2000);
                }, 2000);
            });
        });
    }

    // Mobile menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Change icon
                const icon = mobileMenuBtn.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
            
            // Close menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
    }

    // Search functionality
    setupSearchFunctionality() {
        // Add search bar if not exists
        const nav = document.querySelector('nav .hidden.md\:block');
        if (nav) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'relative ml-8';
            searchContainer.innerHTML = `
                <div class="relative">
                    <input type="text" 
                           placeholder="Search products..." 
                           class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <div id="search-results" class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 hidden z-50">
                    <div class="p-4 text-gray-500 text-sm">Search results will appear here...</div>
                </div>
            `;
            
            nav.appendChild(searchContainer);
            
            // Search functionality
            const searchInput = searchContainer.querySelector('input');
            const searchResults = searchContainer.querySelector('#search-results');
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                
                if (query.length > 2) {
                    searchResults.classList.remove('hidden');
                    // Simulate search results
                    searchResults.innerHTML = `
                        <div class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                            <div class="font-medium text-gray-900">Polyethylene Resins</div>
                            <div class="text-sm text-gray-500">$1,200/ton • High Quality</div>
                        </div>
                        <div class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                            <div class="font-medium text-gray-900">Polypropylene Products</div>
                            <div class="text-sm text-gray-500">$1,450/ton • Premium Grade</div>
                        </div>
                        <div class="p-3 hover:bg-gray-50 cursor-pointer">
                            <div class="font-medium text-gray-900">Biodegradable Polymers</div>
                            <div class="text-sm text-gray-500">$2,100/ton • Eco-friendly</div>
                        </div>
                    `;
                } else {
                    searchResults.classList.add('hidden');
                }
            });
            
            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchContainer.contains(e.target)) {
                    searchResults.classList.add('hidden');
                }
            });
        }
    }

    // Utility functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all`;
        
        const colors = {
            info: 'bg-blue-500 text-white',
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white'
        };
        
        notification.className += ` ${colors[type]}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OnlyPolymerApp();
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to all buttons with loading state
function addLoadingState(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalContent;
        button.disabled = false;
    };
}

// Export for global use
window.OnlyPolymerApp = OnlyPolymerApp;
window.addLoadingState = addLoadingState;