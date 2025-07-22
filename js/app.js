// ================================
// MOTEUR PRINCIPAL DU BLOG
// ================================

class BlogEngine {
    constructor() {
        this.config = null;
        this.articleManager = null;
        this.currentLang = 'fr';
        this.currentPage = 'home';
        this.isInitialized = false;
        this.components = {};
        
        // Binding des méthodes pour les événements
        this.navigate = this.navigate.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.newBubble = this.newBubble.bind(this);
        this.showArticle = this.showArticle.bind(this);
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
            
            // 3. Initialiser les composants
            this.initializeComponents();
            
            // 4. Setup des événements
            this.setupEventListeners();
            
            // 5. Charger la langue par défaut
            this.currentLang = this.config.site.defaultLang || 'fr';
            this.articleManager.setLanguage(this.currentLang);
            
            // 6. Rendu initial
            this.updateLanguage();
            this.articleManager.renderArticles(this.currentLang);
            
            // 7. Optimisations performance
            this.setupPerformanceOptimizations();
            
            // 8. Mise à jour de l'UI
            this.updateLanguageButton();
            
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
            this.config = await Utils.fetchWithCache('data/config.json');
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
                defaultLang: "fr",
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
        let metaDesc = Utils.$('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = this.config.site.description;

        // Keywords
        if (this.config.seo.keywords) {
            let metaKeywords = Utils.$('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = this.config.seo.keywords;
        }

        // Open Graph
        this.updateOpenGraphTags();
    }

    /**
     * Met à jour les tags Open Graph
     */
    updateOpenGraphTags() {
        const ogTags = [
            { property: 'og:title', content: this.config.site.title },
            { property: 'og:description', content: this.config.site.description },
            { property: 'og:url', content: this.config.site.url },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: `${this.config.site.url}/${this.config.seo.ogImage}` }
        ];

        ogTags.forEach(tag => {
            let metaTag = Utils.$(`meta[property="${tag.property}"]`);
            if (!metaTag) {
                metaTag = document.createElement('meta');
                metaTag.setAttribute('property', tag.property);
                document.head.appendChild(metaTag);
            }
            metaTag.content = tag.content;
        });
    }

    /**
     * Initialise les composants modulaires
     */
    initializeComponents() {
        console.log('🧩 Initialisation des composants...');
        
        // Les composants seront initialisés quand on les créera
        this.components = {
            navigation: null,
            languageSwitcher: null,
            articleCard: null
        };
    }

    /**
     * Setup des événements globaux
     */
    setupEventListeners() {
        // Événements de navigation
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        
        // Événements clavier
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Événements de performance
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Gestion erreurs globales
        window.addEventListener('error', this.handleGlobalError.bind(this));
        
        console.log('🎮 Event listeners configurés');
    }

    /**
     * Gestion des clics globaux
     */
    handleGlobalClick(event) {
        const target = event.target;
        
        // Navigation
        if (target.hasAttribute('data-nav')) {
            event.preventDefault();
            this.navigate(target.dataset.nav);
        }
        
        // Articles
        if (target.hasAttribute('data-article-id')) {
            event.preventDefault();
            this.showArticle(parseInt(target.dataset.articleId));
        }
    }

    /**
     * Gestion des raccourcis clavier
     */
    handleKeyboard(event) {
        // Ctrl+K ou Cmd+K pour la recherche (futur)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            console.log('🔍 Recherche à implémenter');
        }
        
        // Escape pour retour à l'accueil
        if (event.key === 'Escape' && this.currentPage !== 'home') {
            this.navigate('home');
        }
    }

    /**
     * Navigation entre les pages
     */
    navigate(page) {
        if (!this.isInitialized) {
            console.warn('⚠️ BlogEngine pas encore initialisé');
            return;
        }

        const pages = ['home-page', 'about-page', 'contact-page', 'article-detail'];
        
        // Cacher toutes les pages
        pages.forEach(pageId => {
            const element = Utils.$(pageId);
            if (element) element.classList.add('hidden');
        });
        
        // Afficher la page demandée
        let targetPageId;
        switch(page) {
            case 'home':
                targetPageId = 'home-page';
                this.articleManager.renderArticles(this.currentLang);
                break;
            case 'about':
                targetPageId = 'about-page';
                break;
            case 'contact':
                targetPageId = 'contact-page';
                break;
            default:
                targetPageId = 'home-page';
                page = 'home';
        }
        
        const targetPage = Utils.$(targetPageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = page;
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log(`📄 Navigation vers: ${page}`);
        }
    }

    /**
     * Changement de langue
     */
    toggleLanguage() {
        if (!this.isInitialized) return;
        
        this.currentLang = this.currentLang === 'es' ? 'fr' : 'es';
        this.articleManager.setLanguage(this.currentLang);
        
        // Mise à jour UI
        this.updateLanguage();
        this.updateLanguageButton();
        
        // Re-render articles si on est sur la page home
        if (this.currentPage === 'home') {
            this.articleManager.renderArticles(this.currentLang);
        }
        
        console.log(`🌍 Langue changée vers: ${this.currentLang}`);
    }

    /**
     * Met à jour le bouton de langue
     */
    updateLanguageButton() {
        const langBtn = Utils.$('#lang-btn');
        if (langBtn) {
            langBtn.textContent = this.currentLang === 'es' ? 'FR' : 'ES';
        }
    }

    /**
     * Met à jour tous les textes traduits
     */
    updateLanguage() {
        if (!window.translations) {
            console.warn('⚠️ Traductions non chargées');
            return;
        }
        
        const t = window.translations[this.currentLang];
        if (!t) {
            console.warn(`⚠️ Traductions manquantes pour: ${this.currentLang}`);
            return;
        }
        
        // Mise à jour automatique des éléments avec data-translate
        Utils.$$('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
        
        // Mise à jour spéciale pour les pages complexes
        this.updateAboutPage(t);
        this.updateContactPage(t);
    }

    /**
     * Met à jour la page À propos
     */
    updateAboutPage(t) {
        const aboutTitle = Utils.$('#about-page h1');
        if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
        
        const aboutPs = Utils.$$('#about-page p');
        if (aboutPs.length >= 2) {
            aboutPs[0].textContent = t.aboutDescription1;
            aboutPs[1].textContent = t.aboutDescription2;
        }
        
        const specialtiesTitle = Utils.$('#about-page h3');
        if (specialtiesTitle) specialtiesTitle.textContent = t.specialties;
        
        const specialtiesList = Utils.$$('#about-page li');
        if (specialtiesList.length >= 4) {
            specialtiesList[0].textContent = t.specialty1;
            specialtiesList[1].textContent = t.specialty2;
            specialtiesList[2].textContent = t.specialty3;
            specialtiesList[3].textContent = t.specialty4;
        }
    }

    /**
     * Met à jour la page Contact
     */
    updateContactPage(t) {
        const contactTitle = Utils.$('#contact-page h1');
        if (contactTitle) contactTitle.textContent = t.contactTitle;
        
        const labels = Utils.$$('#contact-page label');
        if (labels.length >= 3) {
            labels[0].textContent = t.nameLabel;
            labels[1].textContent = t.emailLabel;
            labels[2].textContent = t.messageLabel;
        }
        
        const sendBtn = Utils.$('#contact-page button[type="submit"]');
        if (sendBtn) sendBtn.textContent = t.sendButton;
        
        const emailP = Utils.$('#contact-page p');
        if (emailP && emailP.querySelector('a')) {
            const emailLink = emailP.querySelector('a').outerHTML;
            emailP.innerHTML = `${t.emailText} ${emailLink}`;
        }
    }

    /**
     * Nouvelle bulle de réflexion
     */
    newBubble() {
        if (!window.translations) return;
        
        const bubble = Utils.$('#bubble-content');
        if (!bubble) return;
        
        const bubbles = window.translations[this.currentLang]?.bubbles || [];
        if (bubbles.length === 0) return;
        
        const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
        
        // Animation de changement
        bubble.style.opacity = '0';
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
        const contentContainer = Utils.$('#article-content');
        
        if (contentContainer) {
            contentContainer.innerHTML = articleContent;
            
            // Cacher les autres pages
            const pages = ['home-page', 'about-page', 'contact-page'];
            pages.forEach(pageId => {
                const element = Utils.$(pageId);
                if (element) element.classList.add('hidden');
            });
            
            // Afficher la page article
            const articlePage = Utils.$('#article-detail');
            if (articlePage) {
                articlePage.classList.remove('hidden');
                this.currentPage = 'article';
                
                // Scroll vers le haut
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                console.log(`📖 Article ${articleId} affiché`);
            }
        }
    }

    /**
     * Optimisations de performance
     */
    setupPerformanceOptimizations() {
        // Lazy loading des images
        if (this.config.features?.lazyLoading) {
            Utils.setupLazyLoading();
        }
        
        // Preload des ressources critiques
        this.preloadCriticalResources();
        
        // Debounce pour resize
        window.addEventListener('resize', Utils.debounce(() => {
            console.log('📱 Redimensionnement détecté');
        }, 250));
    }

    /**
     * Preload des ressources importantes
     */
    preloadCriticalResources() {
        // Preload des images importantes
        const criticalImages = [
            'images/alejandra.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Gestion d'erreur d'initialisation
     */
    handleInitializationError(error) {
        console.error('💥 Erreur critique d\'initialisation:', error);
        
        // Affichage d'un message d'erreur à l'utilisateur
        const errorContainer = document.createElement('div');
        errorContainer.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50';
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
        // Ici on pourrait envoyer l'erreur à un service de monitoring
    }

    /**
     * Nettoyage avant fermeture
     */
    handleBeforeUnload() {
        // Sauvegarder l'état si nécessaire
        Utils.setLocalStorage('lastVisitedPage', this.currentPage);
        Utils.setLocalStorage('lastLanguage', this.currentLang);
    }

    /**
     * Statistiques du blog
     */
    getStats() {
        if (!this.articleManager) return null;
        
        return {
            engine: {
                initialized: this.isInitialized,
                currentLang: this.currentLang,
                currentPage: this.currentPage,
                version: this.config?.site?.version || 'unknown'
            },
            articles: this.articleManager.getStats(),
            performance: {
                cacheSize: Utils.cache.size,
                deviceType: Utils.getDeviceType()
            }
        };
    }
}

// ================================
// INITIALISATION GLOBALE
// ================================

// Création de l'instance globale
window.blogApp = new BlogEngine();

// Fonctions globales pour compatibilité avec l'HTML existant
window.navigate = (page) => window.blogApp.navigate(page);
window.toggleLanguage = () => window.blogApp.toggleLanguage();
window.newBubble = () => window.blogApp.newBubble();
window.showArticle = (id) => window.blogApp.showArticle(id);

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌿 Démarrage du Blog Alejandra Galván...');
    await window.blogApp.init();
});

// Debug helper
window.BlogStats = () => console.table(window.blogApp.getStats());

console.log('🚀 BlogEngine (app.js) chargé');