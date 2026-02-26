// OnlyPolymer Supplier Search - Interactive Location-Based Search
// Advanced supplier search with mapping and filtering capabilities

class SupplierSearch {
    constructor() {
        this.suppliers = [];
        this.filteredSuppliers = [];
        this.map = null;
        this.markers = [];
        this.userLocation = null;
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.initializeMap();
        this.displaySuppliers(this.suppliers);
    }

    // Sample supplier data with locations
    loadSampleData() {
        this.suppliers = [
            {
                id: 1,
                name: "Houston Polymer Solutions",
                location: "Houston, TX, USA",
                coordinates: { lat: 29.7604, lng: -95.3698 },
                products: ["polyethylene", "polypropylene", "pvc"],
                rating: 4.8,
                reviewCount: 127,
                description: "Leading supplier of industrial polymers with 25+ years of experience",
                verified: true,
                distance: null,
                phone: "+1 (713) 555-0123",
                email: "info@houstonpolymer.com",
                website: "www.houstonpolymer.com"
            },
            {
                id: 2,
                name: "Shanghai Chemical Industries",
                location: "Shanghai, China",
                coordinates: { lat: 31.2304, lng: 121.4737 },
                products: ["polyethylene", "polypropylene", "polystyrene", "pet"],
                rating: 4.6,
                reviewCount: 89,
                description: "Major polymer manufacturer serving Asian markets",
                verified: true,
                distance: null,
                phone: "+86 21 5555 1234",
                email: "contact@shanghaichem.com",
                website: "www.shanghaichem.com"
            },
            {
                id: 3,
                name: "Rotterdam Petrochemicals",
                location: "Rotterdam, Netherlands",
                coordinates: { lat: 51.9244, lng: 4.4777 },
                products: ["polyethylene", "polypropylene", "pvc", "biodegradable"],
                rating: 4.7,
                reviewCount: 156,
                description: "European leader in sustainable polymer solutions",
                verified: true,
                distance: null,
                phone: "+31 10 555 5678",
                email: "info@rotterdampetro.com",
                website: "www.rotterdampetro.com"
            },
            {
                id: 4,
                name: "Mumbai Polymer Corp",
                location: "Mumbai, India",
                coordinates: { lat: 19.0760, lng: 72.8777 },
                products: ["polyethylene", "polypropylene", "polystyrene"],
                rating: 4.5,
                reviewCount: 203,
                description: "India's largest polymer distributor with nationwide coverage",
                verified: true,
                distance: null,
                phone: "+91 22 5555 6789",
                email: "sales@mumbaipolymer.com",
                website: "www.mumbaipolymer.com"
            },
            {
                id: 5,
                name: "Dallas Resin Company",
                location: "Dallas, TX, USA",
                coordinates: { lat: 32.7767, lng: -96.7970 },
                products: ["polyethylene", "pvc"],
                rating: 4.3,
                reviewCount: 67,
                description: "Specialized in PVC compounds and custom formulations",
                verified: false,
                distance: null,
                phone: "+1 (214) 555-0456",
                email: "orders@dallasresin.com",
                website: "www.dallasresin.com"
            },
            {
                id: 6,
                name: "Singapore Polymers Ltd",
                location: "Singapore",
                coordinates: { lat: 1.3521, lng: 103.8198 },
                products: ["polyethylene", "polypropylene", "pet", "biodegradable"],
                rating: 4.9,
                reviewCount: 94,
                description: "Premium polymer supplier serving Southeast Asian markets",
                verified: true,
                distance: null,
                phone: "+65 6555 7890",
                email: "business@singaporepolymers.com",
                website: "www.singaporepolymers.com"
            },
            {
                id: 7,
                name: "Toronto Chemical Works",
                location: "Toronto, Canada",
                coordinates: { lat: 43.6532, lng: -79.3832 },
                products: ["polyethylene", "polypropylene", "polystyrene"],
                rating: 4.4,
                reviewCount: 78,
                description: "Canadian polymer specialist with focus on quality and sustainability",
                verified: true,
                distance: null,
                phone: "+1 (416) 555-0987",
                email: "info@torontochemical.com",
                website: "www.torontochemical.com"
            },
            {
                id: 8,
                name: "Dubai Polymers FZCO",
                location: "Dubai, UAE",
                coordinates: { lat: 25.2048, lng: 55.2708 },
                products: ["polyethylene", "polypropylene", "pvc", "biodegradable"],
                rating: 4.6,
                reviewCount: 112,
                description: "Leading Middle Eastern polymer distributor with global reach",
                verified: true,
                distance: null,
                phone: "+971 4 555 1234",
                email: "sales@dubaipolymers.com",
                website: "www.dubaipolymers.com"
            },
            {
                id: 9,
                name: "São Paulo Resinas",
                location: "São Paulo, Brazil",
                coordinates: { lat: -23.5505, lng: -46.6333 },
                products: ["polyethylene", "polypropylene", "pvc"],
                rating: 4.2,
                reviewCount: 145,
                description: "Brazil's premier polymer supplier serving South American markets",
                verified: false,
                distance: null,
                phone: "+55 11 5555 4321",
                email: "comercial@saopauloresinas.com",
                website: "www.saopauloresinas.com"
            },
            {
                id: 10,
                name: "London Polymer Group",
                location: "London, UK",
                coordinates: { lat: 51.5074, lng: -0.1278 },
                products: ["polyethylene", "polypropylene", "biodegradable"],
                rating: 4.7,
                reviewCount: 89,
                description: "European polymer specialists with focus on biodegradable solutions",
                verified: true,
                distance: null,
                phone: "+44 20 5555 6789",
                email: "enquiries@londonpolymer.com",
                website: "www.londonpolymer.com"
            }
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Search button
        const searchBtn = document.getElementById('search-btn');
        searchBtn.addEventListener('click', () => this.performSearch());

        // Location detection
        const detectLocationBtn = document.getElementById('detect-location');
        detectLocationBtn.addEventListener('click', () => this.detectUserLocation());

        // Filter changes
        const locationInput = document.getElementById('location-search');
        const productFilter = document.getElementById('product-filter');
        const ratingFilter = document.getElementById('rating-filter');

        locationInput.addEventListener('input', () => this.debounce(this.performSearch.bind(this), 500));
        productFilter.addEventListener('change', () => this.performSearch());
        ratingFilter.addEventListener('change', () => this.performSearch());

        // Map toggle
        const mapToggle = document.getElementById('map-toggle');
        mapToggle.addEventListener('click', () => this.toggleMap());

        // Sort by
        const sortBy = document.getElementById('sort-by');
        sortBy.addEventListener('change', () => this.sortSuppliers());

        // Location cards
        const locationCards = document.querySelectorAll('.location-card');
        locationCards.forEach(card => {
            card.addEventListener('click', () => {
                const location = card.dataset.location;
                document.getElementById('location-search').value = location;
                this.performSearch();
            });
        });

        // Reset search
        const resetBtn = document.getElementById('reset-search');
        resetBtn.addEventListener('click', () => this.resetSearch());

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                const icon = mobileMenuBtn.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
        }
    }

    // Initialize map
    initializeMap() {
        // Map will be initialized when toggle is clicked
    }

    // Toggle map visibility
    toggleMap() {
        const mapContainer = document.getElementById('map-container');
        const mapToggle = document.getElementById('map-toggle');
        
        if (mapContainer.classList.contains('hidden')) {
            mapContainer.classList.remove('hidden');
            mapToggle.innerHTML = '<i class="fas fa-list mr-2"></i>Hide Map';
            mapToggle.classList.add('active');
            
            if (!this.map) {
                this.initMap();
            }
            this.updateMapMarkers();
        } else {
            mapContainer.classList.add('hidden');
            mapToggle.innerHTML = '<i class="fas fa-map mr-2"></i>Show Map';
            mapToggle.classList.remove('active');
        }
    }

    // Initialize Leaflet map
    initMap() {
        this.map = L.map('supplier-map').setView([20, 0], 2);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    // Update map markers
    updateMapMarkers() {
        if (!this.map) return;

        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        // Add new markers for filtered suppliers
        this.filteredSuppliers.forEach(supplier => {
            const marker = L.marker([supplier.coordinates.lat, supplier.coordinates.lng])
                .addTo(this.map)
                .bindPopup(this.createPopupContent(supplier));
            
            this.markers.push(marker);
        });

        // Fit map to show all markers
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    // Create popup content for map marker
    createPopupContent(supplier) {
        return `
            <div class="p-2">
                <h3 class="font-bold text-lg mb-1">${supplier.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${supplier.location}</p>
                <div class="flex items-center mb-2">
                    <div class="text-yellow-400 mr-1">${'★'.repeat(Math.floor(supplier.rating))}</div>
                    <span class="text-sm font-medium">${supplier.rating}</span>
                    <span class="text-sm text-gray-500 ml-1">(${supplier.reviewCount} reviews)</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">${supplier.description}</p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors" onclick="supplierSearch.viewSupplierProfile(${supplier.id})">
                    View Profile
                </button>
            </div>
        `;
    }

    // Detect user location
    detectUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Reverse geocode to get location name
                    this.reverseGeocode(this.userLocation.lat, this.userLocation.lng)
                        .then(location => {
                            document.getElementById('location-search').value = location;
                            this.performSearch();
                        })
                        .catch(() => {
                            this.showNotification('Unable to detect your location', 'error');
                        });
                },
                (error) => {
                    this.showNotification('Location access denied. Please enter your location manually.', 'error');
                }
            );
        } else {
            this.showNotification('Geolocation is not supported by your browser.', 'error');
        }
    }

    // Reverse geocode coordinates to location name
    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            return data.display_name || 'Your Location';
        } catch (error) {
            return 'Your Location';
        }
    }

    // Perform search with filters
    performSearch() {
        const locationInput = document.getElementById('location-search').value.toLowerCase();
        const productFilter = document.getElementById('product-filter').value;
        const ratingFilter = parseFloat(document.getElementById('rating-filter').value);

        // Show loading state
        this.showLoadingState();

        // Simulate API call delay
        setTimeout(() => {
            this.filteredSuppliers = this.suppliers.filter(supplier => {
                // Location filter
                const locationMatch = !locationInput || supplier.location.toLowerCase().includes(locationInput);

                // Product filter
                const productMatch = !productFilter || supplier.products.includes(productFilter);

                // Rating filter
                const ratingMatch = supplier.rating >= ratingFilter;

                return locationMatch && productMatch && ratingMatch;
            });

            // Calculate distances if user location is available
            if (this.userLocation) {
                this.filteredSuppliers.forEach(supplier => {
                    supplier.distance = this.calculateDistance(
                        this.userLocation.lat,
                        this.userLocation.lng,
                        supplier.coordinates.lat,
                        supplier.coordinates.lng
                    );
                });
            }

            this.hideLoadingState();
            this.displaySuppliers(this.filteredSuppliers);
            this.updateMapMarkers();
        }, 1000);
    }

    // Calculate distance between two coordinates (Haversine formula)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of Earth in kilometers
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLng = this.degreesToRadians(lng2 - lng1);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        
        return Math.round(distance * 10) / 10; // Round to 1 decimal place
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Display suppliers
    displaySuppliers(suppliers) {
        const grid = document.getElementById('suppliers-grid');
        const noResults = document.getElementById('no-results');
        const resultsCount = document.getElementById('results-count');

        if (suppliers.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            resultsCount.textContent = 'No suppliers found';
            return;
        }

        noResults.classList.add('hidden');
        resultsCount.textContent = `Found ${suppliers.length} supplier${suppliers.length === 1 ? '' : 's'}`;

        grid.innerHTML = suppliers.map(supplier => this.createSupplierCard(supplier)).join('');

        // Add event listeners to supplier cards
        suppliers.forEach(supplier => {
            const card = document.querySelector(`[data-supplier-id="${supplier.id}"]`);
            if (card) {
                card.addEventListener('click', () => this.viewSupplierProfile(supplier.id));
            }
        });
    }

    // Create supplier card HTML
    createSupplierCard(supplier) {
        const distanceText = supplier.distance ? `${supplier.distance} km away` : '';
        const verifiedBadge = supplier.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : '';
        
        return `
            <div class="supplier-card" data-supplier-id="${supplier.id}">
                <div class="supplier-header">
                    <div class="supplier-logo">${supplier.name.charAt(0)}</div>
                    ${verifiedBadge}
                </div>
                <div class="supplier-info">
                    <h3 class="supplier-name">${supplier.name}</h3>
                    <div class="supplier-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${supplier.location}
                        ${distanceText ? `<span class="distance">• ${distanceText}</span>` : ''}
                    </div>
                    <p class="supplier-products">${supplier.description}</p>
                    <div class="supplier-rating">
                        <div class="rating-stars">${'★'.repeat(Math.floor(supplier.rating))}${'☆'.repeat(5 - Math.floor(supplier.rating))}</div>
                        <span class="rating-text">${supplier.rating}</span>
                        <span class="rating-count">(${supplier.reviewCount} reviews)</span>
                    </div>
                    <div class="supplier-tags">
                        ${supplier.products.map(product => `<span class="supplier-tag">${this.formatProductName(product)}</span>`).join('')}
                    </div>
                    <div class="supplier-actions">
                        <button class="view-profile-btn" onclick="supplierSearch.viewSupplierProfile(${supplier.id})">
                            View Profile
                        </button>
                        <button class="contact-btn" onclick="supplierSearch.contactSupplier(${supplier.id})">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Format product name for display
    formatProductName(product) {
        const names = {
            'polyethylene': 'Polyethylene',
            'polypropylene': 'Polypropylene',
            'polystyrene': 'Polystyrene',
            'pvc': 'PVC',
            'pet': 'PET',
            'biodegradable': 'Biodegradable'
        };
        return names[product] || product;
    }

    // Sort suppliers
    sortSuppliers() {
        const sortBy = document.getElementById('sort-by').value;
        
        this.filteredSuppliers.sort((a, b) => {
            switch (sortBy) {
                case 'distance':
                    return (a.distance || 9999) - (b.distance || 9999);
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        this.displaySuppliers(this.filteredSuppliers);
    }

    // View supplier profile
    viewSupplierProfile(supplierId) {
        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) return;

        // Create modal for supplier profile
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <div class="relative">
                    <div class="h-32 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                            ${supplier.name.charAt(0)}
                        </div>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100">
                        <i class="fas fa-times text-gray-600"></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">${supplier.name}</h2>
                            <div class="flex items-center text-gray-600 mb-2">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                ${supplier.location}
                            </div>
                            ${supplier.verified ? '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"><i class="fas fa-check-circle mr-1"></i>Verified Supplier</span>' : ''}
                        </div>
                        <div class="text-right">
                            <div class="flex items-center mb-1">
                                <div class="text-yellow-400 mr-1">${'★'.repeat(Math.floor(supplier.rating))}</div>
                                <span class="font-semibold">${supplier.rating}</span>
                            </div>
                            <div class="text-sm text-gray-500">${supplier.reviewCount} reviews</div>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 mb-6">${supplier.description}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-3">Products Offered</h3>
                            <div class="space-y-2">
                                ${supplier.products.map(product => `
                                    <div class="flex items-center">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        <span class="text-gray-700">${this.formatProductName(product)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-3">Contact Information</h3>
                            <div class="space-y-2">
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-phone mr-3 text-blue-500"></i>
                                    <span>${supplier.phone}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-envelope mr-3 text-blue-500"></i>
                                    <span>${supplier.email}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-globe mr-3 text-blue-500"></i>
                                    <span>${supplier.website}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors" onclick="supplierSearch.contactSupplier(${supplier.id})">
                            Contact Supplier
                        </button>
                        <button class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors" onclick="this.closest('.fixed').remove()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Contact supplier
    contactSupplier(supplierId) {
        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) return;

        // Create contact form modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-md w-full">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-900">Contact ${supplier.name}</h2>
                        <button onclick="this.closest('.fixed').remove()" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                            <i class="fas fa-times text-gray-600"></i>
                        </button>
                    </div>
                    
                    <form id="contact-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                            <input type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Your Company</label>
                            <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows="4" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Tell us about your polymer requirements..."></textarea>
                        </div>
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                                Send Message
                            </button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-semibold transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);

        // Handle form submission
        const form = modal.querySelector('#contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                modal.remove();
                this.showNotification('Your message has been sent to the supplier!', 'success');
            }, 2000);
        });
    }

    // Reset search
    resetSearch() {
        document.getElementById('location-search').value = '';
        document.getElementById('product-filter').value = '';
        document.getElementById('rating-filter').value = '0';
        document.getElementById('sort-by').value = 'distance';
        
        this.filteredSuppliers = [...this.suppliers];
        this.displaySuppliers(this.filteredSuppliers);
        this.updateMapMarkers();
    }

    // Utility functions
    showLoadingState() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('suppliers-grid').classList.add('hidden');
        document.getElementById('no-results').classList.add('hidden');
    }

    hideLoadingState() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('suppliers-grid').classList.remove('hidden');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all max-w-sm`;
        
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
                <span class="text-sm">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Debounce function
    debounce(func, wait) {
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
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.supplierSearch = new SupplierSearch();
});