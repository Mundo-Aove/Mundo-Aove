// ================================
// MOTEUR PRINCIPAL DU BLOG
// Version optimisée avec navigation mobile
// ================================

class BlogEngine {
    constructor() {
        this.config = null;
        this.articleManager = null;
        this.currentLang = 'fr';
        this.currentPage = 'blog';
        this.isInitialized = false;
        this.components = {};
        
        // Binding des méthodes pour les événements
        this.navigate = this.navigate.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.newBubble = this.newBubble.bind(this);
        this.showArticle = this.showArticle.bind(this);
        this.showPage = this.showPage.bind(this);
    }

    /**
     * Initialisation complète du blog
     */
    async init() {
        try {
            console.log('🚀 Initialisation BlogEngine...');
            
            // 1. Charger la configuration
            await this.loadConfig();
            
            // 2. Initialiser le gestionnaire d'articles
            this.articleManager = new ArticleManager();
            await this.articleManager.init();
            
            // 3. Setup des événements
            this.setupEventListeners();
            
            // 4. Charger la langue par défaut
            this.currentLang = this.config?.site?.lang || 'fr';
            this.articleManager.setLanguage(this.currentLang);
            
            // 5. Rendu initial
            this.updateLanguage();
            this.articleManager.renderArticles(this.currentLang);
            
            // 6. Optimisations performance
            this.setupPerformanceOptimizations();
            
            // 7. Mise à jour de l'UI
            this.updateLanguageButton();
            
            // 8. Afficher la page par défaut
            this.showPage('blog');
            
            this.isInitialized = true;
            console.log('✅ BlogEngine initialisé avec succès!');
            
        } catch (error) {
            console.error('❌ Erreur d\'initialisation BlogEngine:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Charge la configuration depuis config.json
     */
    async loadConfig() {
        try {
            const response = await fetch('data/config.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            this.config = await response.json();
            document.title = this.config.site.title;
            
            // Mise à jour des meta tags
            this.updateMetaTags();
            
            console.log('⚙️ Configuration chargée');
        } catch (error) {
            console.warn('⚠️ Erreur chargement config, utilisation des valeurs par défaut');
            this.config = this.getDefaultConfig();
        }
    }

    /**
     * Configuration par défaut en cas d'erreur
     */
    getDefaultConfig() {
        return {
            site: {
                title: "Alejandra Galván - Blog",
                lang: "fr",
                author: "Alejandra Galván Gómez"
            },
            features: {
                lazyLoading: true,
                cache: true
            }
        };
    }

    /**
     * Met à jour les meta tags SEO
     */
    updateMetaTags() {
        if (!this.config.seo) return;
        
        // Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && this.config.site.description) {
            metaDesc.content = this.config.site.description;
        }
    }

    /**
     * Setup des événements globaux
     */
    setupEventListeners() {
        // Événements clavier
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Gestion erreurs globales
        window.addEventListener('error', this.handleGlobalError.bind(this));
        
        console.log('🎮 Event listeners configurés');
    }

    /**
     * Gestion des raccourcis clavier
     */
    handleKeyboard(event) {
        // Escape pour retour à l'accueil
        if (event.key === 'Escape' && this.currentPage !== 'blog') {
            this.showPage('blog');
        }
    }

    /**
     * Navigation entre les pages (compatible avec l'HTML existant)
     */
    showPage(pageName) {
        if (!this.isInitialized) {
            console.warn('⚠️ BlogEngine pas encore initialisé');
            return;
        }

        console.log(`📄 Navigation vers: ${pageName}`);
        
        // Masquer toutes les pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.classList.add('hidden'));
        
        // Afficher la page demandée
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageName;
            
            // Actions spécifiques par page
            if (pageName === 'blog') {
                // ✅ Ne rendre que si le container est vide
                const container = document.getElementById('articles-container');
                const hasArticles = container && container.children.length > 1; // > 1 car il y a le div de loading
                
                if (!hasArticles) {
                    this.articleManager?.renderArticles(this.currentLang);
                    console.log('📄 Articles rendus (container vide)');
                } else {
                    console.log('📄 Articles déjà présents, pas de re-rendu');
                }
            }
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.error(`❌ Page ${pageName}-page non trouvée`);
        }
    }

    /**
     * Alias pour compatibilité
     */
    navigate(page) {
        this.showPage(page);
    }

    /**
     * Changement de langue
     */
    toggleLanguage() {
        if (!this.isInitialized) return;
        
        this.currentLang = this.currentLang === 'es' ? 'fr' : 'es';
        this.articleManager?.setLanguage(this.currentLang);
        
        // Mise à jour UI
        this.updateLanguage();
        this.updateLanguageButton();
        
        // ✅ CORRECTION : Re-render l'article si on est dedans
        if (this.currentPage === 'article-detail') {
            const hash = window.location.hash;
            if (hash.includes('#article-')) {
                const articleId = parseInt(hash.match(/\d+/)?.[0]);
                if (articleId) {
                    console.log(`🔄 Re-rendu article ${articleId} en ${this.currentLang}`);
                    this.showArticle(articleId);
                }
            }
        }
        // Re-render articles si on est sur la page blog
        else if (this.currentPage === 'blog') {
            this.articleManager?.renderArticles(this.currentLang);
        }
        
        console.log(`🌍 Langue changée vers: ${this.currentLang}`);
    }

    /**
     * Met à jour le bouton de langue
     */
    updateLanguageButton() {
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.textContent = this.currentLang === 'es' ? 'FR' : 'ES';
        }
    }

    /**
     * Met à jour tous les textes traduits
     */
    updateLanguage() {
        if (!window.translations || !window.getTranslation) {
            console.warn('⚠️ Système de traductions non chargé');
            return;
        }
        
        // Mise à jour automatique des éléments avec data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = window.getTranslation(key, this.currentLang);
            
            if (translation && translation !== key) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        console.log(`🌍 Interface mise à jour en ${this.currentLang}`);
    }

    /**
     * Nouvelle bulle de réflexion
     */
    newBubble() {
        if (!window.translations) return;
        
        const bubble = document.getElementById('bubble-content');
        if (!bubble) return;
        
        const bubbles = window.translations[this.currentLang]?.bubbles || [];
        if (bubbles.length === 0) return;
        
        const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
        
        // Animation de changement
        bubble.style.opacity = '0';
        bubble.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            bubble.textContent = `"${randomBubble}"`;
            bubble.style.opacity = '1';
        }, 300);
        
        console.log('💭 Nouvelle bulle générée');
    }

    /**
     * Affiche un article complet
     */
    showArticle(articleId) {
        if (!this.articleManager) {
            console.error('❌ ArticleManager non initialisé');
            return;
        }
        
        const articleContent = this.articleManager.renderFullArticle(articleId, this.currentLang);
        const contentContainer = document.getElementById('article-content');
        
        if (contentContainer) {
            contentContainer.innerHTML = articleContent;
            this.showPage('article-detail');
            console.log(`📖 Article ${articleId} affiché`);
        }
    }

    /**
     * Gestion de formulaire de contact
     */
    handleContactForm(event) {
        event.preventDefault();
        
        // Simulation d'envoi
        const button = event.target.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
        button.disabled = true;
        
        setTimeout(() => {
            alert(this.currentLang === 'fr' ? 
                'Message envoyé avec succès ! Je vous répondrai bientôt.' :
                'Mensaje enviado con éxito! Te responderé pronto.');
            
            event.target.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        
        console.log('📧 Formulaire de contact soumis');
    }

    /**
     * Optimisations de performance
     */
    setupPerformanceOptimizations() {
        // Lazy loading des images
        this.setupLazyLoading();
        
        // Debounce pour resize
        window.addEventListener('resize', this.debounce(() => {
            console.log('📱 Redimensionnement détecté');
        }, 250));
    }

    /**
     * Setup du lazy loading des images
     */
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Fonction debounce utilitaire
     */
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

    /**
     * Gestion d'erreur d'initialisation
     */
    handleInitializationError(error) {
        console.error('💥 Erreur critique d\'initialisation:', error);
        
        // Affichage d'un message d'erreur à l'utilisateur
        const errorContainer = document.createElement('div');
        errorContainer.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
        errorContainer.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Erreur de chargement. Veuillez actualiser la page.</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(errorContainer);
        
        // Auto-suppression après 10 secondes
        setTimeout(() => {
            if (errorContainer.parentElement) {
                errorContainer.remove();
            }
        }, 10000);
    }

    /**
     * Gestion des erreurs globales
     */
    handleGlobalError(event) {
        console.error('🚨 Erreur globale détectée:', event.error);
    }

    /**
     * Statistiques du blog
     */
    getStats() {
        return {
            engine: {
                initialized: this.isInitialized,
                currentLang: this.currentLang,
                currentPage: this.currentPage,
                version: this.config?.site?.version || 'unknown'
            },
            articles: this.articleManager?.getStats() || null
        };
    }
}

// ================================
// NAVIGATION MOBILE
// ================================

/**
 * Toggle du menu mobile
 */
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    
    if (!menu || !icon) return;
    
    menu.classList.toggle('active');
    
    // Change l'icône hamburger ↔ croix
    if (menu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
    
    console.log('📱 Menu mobile:', menu.classList.contains('active') ? 'ouvert' : 'fermé');
};

/**
 * Fermeture du menu mobile
 */
window.closeMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    
    if (!menu || !icon) return;
    
    menu.classList.remove('active');
    icon.className = 'fas fa-bars';
    
    console.log('📱 Menu mobile fermé');
};

/**
 * Synchronisation du bouton langue mobile
 */
function syncMobileLangButton() {
    const desktopBtn = document.getElementById('lang-btn');
    const mobileBtn = document.getElementById('lang-btn-mobile');
    
    if (desktopBtn && mobileBtn) {
        mobileBtn.textContent = desktopBtn.textContent;
    }
}

// ================================
// EVENT LISTENERS NAVIGATION MOBILE
// ================================

// Fermeture du menu si clic à l'extérieur
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const button = document.querySelector('.mobile-menu-button');
    
    if (menu && button && 
        !menu.contains(event.target) && 
        !button.contains(event.target)) {
        window.closeMobileMenu();
    }
});

// Fermeture du menu sur redimensionnement (si on passe desktop)
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        window.closeMobileMenu();
    }
});

// Synchronisation des boutons langue au changement
document.addEventListener('DOMContentLoaded', function() {
    // Observer les changements du bouton langue desktop
    const desktopBtn = document.getElementById('lang-btn');
    if (desktopBtn) {
        const observer = new MutationObserver(function() {
            syncMobileLangButton();
        });
        
        observer.observe(desktopBtn, {
            childList: true,
            characterData: true,
            subtree: true
        });
        
        // Sync initial
        syncMobileLangButton();
    }
});

console.log('📱 Navigation mobile chargée');

// ================================
// INITIALISATION GLOBALE
// ================================

// Création de l'instance globale
window.blogApp = new BlogEngine();

// Fonctions globales pour compatibilité avec l'HTML existant
window.showPage = (page) => window.blogApp.showPage(page);
window.toggleLanguage = () => {
    window.blogApp.toggleLanguage();
    // Sync mobile après changement
    setTimeout(syncMobileLangButton, 100);
};
window.newBubble = () => window.blogApp.newBubble();
window.showArticle = (id) => window.blogApp.showArticle(id);
window.handleContactForm = (event) => window.blogApp.handleContactForm(event);

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌿 Démarrage du Blog Alejandra Galván...');
    
    // Masquer le splash screen après un délai
    setTimeout(() => {
        const splash = document.querySelector('.splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            splash.style.transition = 'opacity 0.5s ease';
            setTimeout(() => splash.remove(), 500);
        }
    }, 3000);
    
    await window.blogApp.init();
});

// Debug helper
window.BlogStats = () => console.table(window.blogApp.getStats());

console.log('🚀 BlogEngine (app.js) chargé et optimisé');