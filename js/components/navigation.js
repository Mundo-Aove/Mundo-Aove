// ================================
// COMPOSANT NAVIGATION
// ================================

class NavigationComponent {
    constructor() {
        this.currentPage = 'home';
        this.isInitialized = false;
    }

    /**
     * Initialise le composant navigation
     */
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.isInitialized = true;
        console.log('🧭 Navigation component initialisé');
    }

    /**
     * Configuration de la navigation principale
     */
    setupNavigation() {
        const navLinks = Utils.$$('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('onclick')?.match(/navigate\('(\w+)'\)/)?.[1];
                if (page) {
                    this.navigateTo(page);
                }
            });
        });
    }

    /**
     * Configuration du menu mobile (responsive)
     */
    setupMobileMenu() {
        // Créer le bouton hamburger pour mobile
        const nav = Utils.$('nav');
        if (!nav) return;

        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'md:hidden text-forest-green hover:text-matte-gold transition p-2';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        mobileMenuButton.addEventListener('click', this.toggleMobileMenu.bind(this));

        // Ajouter le bouton au nav
        const navContainer = nav.querySelector('.flex.justify-between');
        if (navContainer) {
            navContainer.appendChild(mobileMenuButton);
        }

        // Menu mobile overlay
        this.createMobileMenuOverlay();
    }

    /**
     * Crée l'overlay du menu mobile
     */
    createMobileMenuOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'mobile-menu-overlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden';
        
        const menu = document.createElement('div');
        menu.className = 'fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform translate-x-full transition-transform duration-300';
        
        menu.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="serif text-xl font-bold text-forest-green">Menu</h3>
                    <button id="close-mobile-menu" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <nav class="space-y-4">
                    <a href="#" data-nav="home" class="block py-3 px-4 text-forest-green hover:bg-gray-100 rounded-lg transition">
                        <i class="fas fa-home mr-3"></i>Blog
                    </a>
                    <a href="#" data-nav="about" class="block py-3 px-4 text-forest-green hover:bg-gray-100 rounded-lg transition">
                        <i class="fas fa-user mr-3"></i>À propos
                    </a>
                    <a href="#" data-nav="contact" class="block py-3 px-4 text-forest-green hover:bg-gray-100 rounded-lg transition">
                        <i class="fas fa-envelope mr-3"></i>Contact
                    </a>
                </nav>
                <div class="mt-8 pt-8 border-t border-gray-200">
                    <button onclick="toggleLanguage()" class="w-full bg-matte-gold text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition">
                        <i class="fas fa-globe mr-2"></i>
                        <span id="mobile-lang-btn">Cambiar idioma</span>
                    </button>
                </div>
            </div>
        `;
        
        overlay.appendChild(menu);
        document.body.appendChild(overlay);

        // Event listeners
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeMobileMenu();
        });

        Utils.$('#close-mobile-menu').addEventListener('click', this.closeMobileMenu.bind(this));

        // Navigation dans le menu mobile
        menu.querySelectorAll('[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.nav;
                this.navigateTo(page);
                this.closeMobileMenu();
            });
        });
    }

    /**
     * Ouvre le menu mobile
     */
    toggleMobileMenu() {
        const overlay = Utils.$('#mobile-menu-overlay');
        const menu = overlay?.querySelector('div');
        
        if (overlay && menu) {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                menu.style.transform = 'translateX(0)';
            }, 10);
            
            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Ferme le menu mobile
     */
    closeMobileMenu() {
        const overlay = Utils.$('#mobile-menu-overlay');
        const menu = overlay?.querySelector('div');
        
        if (overlay && menu) {
            menu.style.transform = 'translateX(100%)';
            setTimeout(() => {
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    }

    /**
     * Navigation avec mise à jour des styles
     */
    navigateTo(page) {
        // Mettre à jour les liens actifs
        this.updateActiveLinks(page);
        
        // Déléguer la navigation au BlogEngine
        if (window.blogApp) {
            window.blogApp.navigate(page);
        }
        
        this.currentPage = page;
    }

    /**
     * Met à jour les liens actifs
     */
    updateActiveLinks(activePage) {
        const navLinks = Utils.$$('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('onclick')?.match(/navigate\('(\w+)'\)/)?.[1];
            
            if (linkPage === activePage) {
                link.classList.add('text-matte-gold', 'font-semibold');
                link.classList.remove('text-forest-green');
            } else {
                link.classList.remove('text-matte-gold', 'font-semibold');
                link.classList.add('text-forest-green');
            }
        });
    }

    /**
     * Comportement de scroll (navigation sticky)
     */
    setupScrollBehavior() {
        let lastScrollY = window.scrollY;
        
        const handleScroll = Utils.throttle(() => {
            const nav = Utils.$('nav');
            if (!nav) return;

            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                // Navigation compacte en scrollant
                nav.style.transform = currentScrollY > lastScrollY 
                    ? 'translateY(-100%)' 
                    : 'translateY(0)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                // Navigation normale en haut
                nav.style.transform = 'translateY(0)';
                nav.style.backdropFilter = 'none';
                nav.style.backgroundColor = 'white';
            }
            
            lastScrollY = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Mise à jour de la langue dans le menu mobile
     */
    updateMobileLanguage(lang) {
        const mobileLangBtn = Utils.$('#mobile-lang-btn');
        if (mobileLangBtn) {
            mobileLangBtn.textContent = lang === 'fr' ? 'Cambiar idioma' : 'Changer langue';
        }
    }
}

// Export global
window.NavigationComponent = NavigationComponent;

console.log('🧭 NavigationComponent chargé');