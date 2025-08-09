/**
 * 📸 Portfolio Manager pour Mundo AOVE
 * Compatible avec BlogEngine et ArticleManager existants
 */
class PortfolioManager {
    constructor() {
        this.currentPortfolio = null;
        this.currentPhotoIndex = 0;
        this.isLightboxOpen = false;
        this.isInitialized = false;
    }

    /**
     * Initialisation différée (appelée par BlogEngine)
     */
    init() {
        if (this.isInitialized) return;
        
        this.createLightboxHTML();
        this.bindEvents();
        this.isInitialized = true;
        
        console.log('📸 PortfolioManager initialisé');
    }

    /**
     * Crée la structure HTML de la lightbox
     */
    createLightboxHTML() {
        // Vérifier si la lightbox existe déjà
        if (document.getElementById('portfolio-lightbox')) {
            console.log('📸 Lightbox déjà présente');
            return;
        }

        const lightboxHTML = `
            <div id="portfolio-lightbox" class="fixed inset-0 bg-black bg-opacity-90 z-50 hidden items-center justify-center">
                <div class="relative max-w-4xl max-h-full p-4 w-full">
                    <!-- Image principale -->
                    <div class="flex items-center justify-center h-full">
                        <img id="lightbox-image" 
                             class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
                             src="" alt="">
                    </div>
                    
                    <!-- Caption -->
                    <div id="lightbox-caption" class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
                        <p id="lightbox-text" class="text-lg mb-2"></p>
                        <p id="lightbox-counter" class="text-sm opacity-75"></p>
                    </div>
                    
                    <!-- Navigation -->
                    <button id="lightbox-prev" 
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200">
                        <i class="fas fa-chevron-left text-xl"></i>
                    </button>
                    
                    <button id="lightbox-next" 
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200">
                        <i class="fas fa-chevron-right text-xl"></i>
                    </button>
                    
                    <!-- Fermer -->
                    <button id="lightbox-close" 
                            class="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        console.log('📸 Lightbox HTML créée');
    }

    /**
     * Attache les événements
     */
    bindEvents() {
        // Navigation lightbox
        document.getElementById('lightbox-prev')?.addEventListener('click', () => this.previousPhoto());
        document.getElementById('lightbox-next')?.addEventListener('click', () => this.nextPhoto());
        document.getElementById('lightbox-close')?.addEventListener('click', () => this.closeLightbox());
        
        // Clavier
        document.addEventListener('keydown', (e) => {
            if (!this.isLightboxOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousPhoto();
                    break;
                case 'ArrowRight':
                    this.nextPhoto();
                    break;
            }
        });
        
        // Fermer en cliquant sur le fond
        document.getElementById('portfolio-lightbox')?.addEventListener('click', (e) => {
            if (e.target.id === 'portfolio-lightbox') {
                this.closeLightbox();
            }
        });

        console.log('📸 Events configurés');
    }

    /**
     * Génère le HTML du portfolio pour un article
     * COMPATIBLE avec la structure existante
     */
    renderPortfolio(article, lang = 'es') {
        // Vérifier si l'article a un portfolio
        if (!article.portfolio || !article.portfolio.enabled || !article.portfolio.photos?.length) {
            return ''; // Pas de portfolio = pas d'affichage
        }

        const photos = article.portfolio.photos;
        const translations = window.translations?.[lang] || {};
        const portfolioTitle = lang === 'fr' ? 'Galerie Photos' : 'Galería de Fotos';
        
        const photosHTML = photos.map((photo, index) => `
            <div class="cursor-pointer group" 
                 onclick="window.portfolioManager.openLightbox(${article.id}, ${index})">
                <div class="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img src="${photo.thumbnail}" 
                         alt="${photo.alt?.[lang] || photo.alt?.es || photo.caption?.[lang] || 'Photo'}"
                         class="w-full h-48 object-cover"
                         loading="lazy">
                    
                    <!-- Overlay avec icône -->
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <i class="fas fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
                    </div>
                    
                    <!-- Caption overlay -->
                    ${photo.caption?.[lang] ? `
                        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                            ${photo.caption[lang]}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        return `
            <section class="mt-8 portfolio-section">
                <div class="flex items-center mb-6">
                    <i class="fas fa-camera text-forest-green text-2xl mr-3"></i>
                    <h3 class="text-2xl font-bold text-forest-green font-playfair">${portfolioTitle}</h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${photosHTML}
                </div>
                
                <p class="text-sm text-stone-gray mt-4 text-center">
                    <i class="fas fa-info-circle mr-1"></i>
                    ${lang === 'fr' ? 'Cliquez sur une image pour l\'agrandir' : 'Haz clic en una imagen para ampliarla'}
                </p>
            </section>
        `;
    }

    /**
     * Ouvre la lightbox sur une photo spécifique
     */
    openLightbox(articleId, photoIndex = 0) {
        // Init si pas encore fait (pour les appels directs)
        if (!this.isInitialized) {
            this.init();
        }

        // Trouver l'article dans ArticleManager
        const articleManager = window.articleManager || window.blogApp?.articleManager;
        if (!articleManager) {
            console.error('❌ ArticleManager introuvable');
            return;
        }

        const currentLang = window.blogApp?.currentLang || articleManager.currentLang || 'es';
        const article = articleManager.getArticleById(articleId, currentLang);
        
        if (!article?.portfolio?.photos?.length) {
            console.error('❌ Article ou portfolio introuvable:', articleId);
            return;
        }

        this.currentPortfolio = article.portfolio.photos;
        this.currentPhotoIndex = photoIndex;
        this.isLightboxOpen = true;
        
        this.updateLightboxContent(currentLang);
        
        // Afficher la lightbox
        const lightbox = document.getElementById('portfolio-lightbox');
        if (lightbox) {
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            
            // Empêcher le scroll de la page
            document.body.style.overflow = 'hidden';
            
            console.log(`📸 Lightbox ouverte: photo ${photoIndex + 1}/${this.currentPortfolio.length}`);
        }
    }

    /**
     * Met à jour le contenu de la lightbox
     */
    updateLightboxContent(lang = 'es') {
        if (!this.currentPortfolio?.length) return;

        const photo = this.currentPortfolio[this.currentPhotoIndex];
        
        // Image
        const imgElement = document.getElementById('lightbox-image');
        if (imgElement) {
            imgElement.src = photo.src;
            imgElement.alt = photo.alt?.[lang] || photo.alt?.es || '';
        }
        
        // Caption
        const captionText = photo.caption?.[lang] || photo.caption?.es || '';
        const textElement = document.getElementById('lightbox-text');
        if (textElement) {
            textElement.textContent = captionText;
        }
        
        // Compteur
        const counter = `${this.currentPhotoIndex + 1} / ${this.currentPortfolio.length}`;
        const counterElement = document.getElementById('lightbox-counter');
        if (counterElement) {
            counterElement.textContent = counter;
        }
        
        // Boutons navigation (masquer si une seule photo)
        const showNav = this.currentPortfolio.length > 1;
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (prevBtn) prevBtn.style.display = showNav ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = showNav ? 'block' : 'none';
    }

    /**
     * Navigation vers la photo précédente
     */
    previousPhoto() {
        if (!this.currentPortfolio || this.currentPortfolio.length <= 1) return;
        
        this.currentPhotoIndex = this.currentPhotoIndex === 0 
            ? this.currentPortfolio.length - 1 
            : this.currentPhotoIndex - 1;
        
        const currentLang = window.blogApp?.currentLang || 'es';
        this.updateLightboxContent(currentLang);
    }

    /**
     * Navigation vers la photo suivante
     */
    nextPhoto() {
        if (!this.currentPortfolio || this.currentPortfolio.length <= 1) return;
        
        this.currentPhotoIndex = this.currentPhotoIndex === this.currentPortfolio.length - 1 
            ? 0 
            : this.currentPhotoIndex + 1;
        
        const currentLang = window.blogApp?.currentLang || 'es';
        this.updateLightboxContent(currentLang);
    }

    /**
     * Ferme la lightbox
     */
    closeLightbox() {
        const lightbox = document.getElementById('portfolio-lightbox');
        if (lightbox) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
        }
        
        this.isLightboxOpen = false;
        this.currentPortfolio = null;
        this.currentPhotoIndex = 0;
        
        // Restaurer le scroll
        document.body.style.overflow = '';
        
        console.log('📸 Lightbox fermée');
    }

    /**
     * Debug helper
     */
    getStats() {
        return {
            initialized: this.isInitialized,
            lightboxOpen: this.isLightboxOpen,
            currentPortfolio: this.currentPortfolio?.length || 0,
            currentIndex: this.currentPhotoIndex
        };
    }
}

// ================================
// INITIALISATION GLOBALE
// ================================

// Créer l'instance globale
window.PortfolioManager = PortfolioManager;
window.portfolioManager = new PortfolioManager();

console.log('📸 PortfolioManager chargé - init différée');