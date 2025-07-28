// RSS Loader pour la section Reflexiones - Version carrousel
class RSSLoader {
    constructor() {
        this.rssData = null;
        this.currentIndex = 0;
    }

    async init() {
        await this.loadRSS();
        this.displayCurrentItem();
    }

    async loadRSS() {
        try {
            console.log('Tentative de chargement RSS...');
            const response = await fetch('./rss-data.json');
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.rssData = await response.json();
            console.log('RSS chargé:', this.rssData);
            
            // Met à jour la date
            const currentLang = document.documentElement.lang || 'fr';
            const locale = currentLang === 'es' ? 'es-ES' : 'fr-FR';
            
            const lastUpdate = new Date(this.rssData.updated).toLocaleDateString(locale);
            const updateElement = document.getElementById('rss-last-update');
            if (updateElement) {
                const updateText = currentLang === 'es' ? 'Actualizado el' : 'Mis à jour le';
                updateElement.textContent = `${updateText} ${lastUpdate}`;
            }
                
        } catch (error) {
            console.error('Erreur détaillée:', error);
            this.showError();
        }
    }

    displayCurrentItem() {
        const container = document.getElementById('rss-container');
        const loading = document.getElementById('rss-loading');
        
        if (!this.rssData || !this.rssData.items.length) {
            this.showError();
            return;
        }

        // Cache le loading
        if (loading) loading.style.display = 'none';

        // Détermine la langue courante
        const currentLang = document.documentElement.lang || 'fr';
        const locale = currentLang === 'es' ? 'es-ES' : 'fr-FR';

        // Récupère l'article actuel
        const currentItem = this.rssData.items[this.currentIndex];
        
        // Format original avec une seule news (SANS le bouton Suivant dans le contenu)
        container.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-matte-gold relative">
                <div class="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45 border-l border-b border-matte-gold"></div>
                
                <div class="mb-3">
                    <h3 class="font-semibold text-forest-green mb-2 leading-relaxed">
                        ${currentItem.title}
                    </h3>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div class="flex items-center">
                            <i class="fas fa-calendar-alt mr-2"></i>
                            <span>${new Date(currentItem.pubDate).toLocaleDateString(locale)}</span>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <span class="bg-matte-gold text-white text-xs px-2 py-1 rounded-full">
                                🫒 COI
                            </span>
                            <span class="text-xs text-gray-400">
                                ${this.currentIndex + 1}/${this.rssData.items.length}
                            </span>
                        </div>
                    </div>
                    
                    ${currentItem.description ? `
                        <p class="text-gray-600 text-sm mb-3 leading-relaxed">
                            ${currentItem.description.substring(0, 200)}${currentItem.description.length > 200 ? '...' : ''}
                        </p>
                    ` : ''}
                    
                    <div class="text-center">
                        <a href="${currentItem.link}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="text-matte-gold hover:text-yellow-600 transition duration-200 flex items-center justify-center space-x-1 text-sm font-medium">
                            <span data-translate="home.rss_read_more">Lire l'article complet</span>
                            <i class="fas fa-external-link-alt text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Applique les traductions si la fonction existe
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }
    }

    nextItem() {
        if (!this.rssData || !this.rssData.items.length) return;
        
        // Animation de l'icône du bouton HTML
        const icon = document.getElementById('next-icon');
        if (icon) {
            icon.style.transform = 'translateX(3px)';
            setTimeout(() => {
                icon.style.transform = 'translateX(0)';
            }, 200);
        }
        
        // Passe au suivant, retourne au début si on est à la fin
        this.currentIndex = (this.currentIndex + 1) % this.rssData.items.length;
        
        // Animation de transition
        const container = document.getElementById('rss-container');
        container.style.opacity = '0.5';
        container.style.transform = 'translateX(10px)';
        
        setTimeout(() => {
            this.displayCurrentItem();
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
        }, 150);
    }

    showError() {
        const container = document.getElementById('rss-container');
        const loading = document.getElementById('rss-loading');
        
        if (loading) loading.style.display = 'none';
        
        container.innerHTML = `
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                    <p class="text-red-700">Erreur de chargement RSS</p>
                </div>
            </div>
        `;
    }
}

// Instance globale
const rssLoader = new RSSLoader();

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    rssLoader.init();
});