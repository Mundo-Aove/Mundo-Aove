// ================================
// UTILITAIRES RÉUTILISABLES
// ================================

class Utils {
    // Cache intelligent pour les données
    static cache = new Map();
    
    /**
     * Fetch avec cache intelligent
     * @param {string} url - URL à charger
     * @param {number} ttl - Time to live en ms (défaut: 5 min)
     */
    static async fetchWithCache(url, ttl = 300000) {
        const cached = this.cache.get(url);
        if (cached && Date.now() - cached.timestamp < ttl) {
            console.log(`📋 Cache hit pour: ${url}`);
            return cached.data;
        }
        
        try {
            console.log(`🌐 Chargement: ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.cache.set(url, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error(`❌ Erreur de chargement ${url}:`, error);
            
            // Retourner le cache expiré si disponible
            if (cached) {
                console.log(`🔄 Utilisation du cache expiré pour: ${url}`);
                return cached.data;
            }
            
            throw error;
        }
    }

    /**
     * Débounce pour optimiser les performances
     * @param {Function} func - Fonction à débouncer
     * @param {number} wait - Délai en ms
     */
    static debounce(func, wait) {
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
     * Lazy loading intelligent des images
     */
    static setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                    console.log(`🖼️ Image chargée: ${img.alt}`);
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Formatage des dates intelligent selon la langue
     * @param {string} dateString - Date ISO
     * @param {string} lang - Langue (fr/es)
     */
    static formatDate(dateString, lang = 'fr') {
        try {
            const date = new Date(dateString);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            
            return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'fr-FR', options);
        } catch (error) {
            console.warn('⚠️ Erreur formatage date:', error);
            return dateString;
        }
    }

    /**
     * Validation d'email robuste
     * @param {string} email 
     */
    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Génération de slugs SEO-friendly
     * @param {string} text - Texte à convertir
     */
    static generateSlug(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Supprime accents
            .replace(/[^a-z0-9 -]/g, '') // Caractères spéciaux
            .replace(/\s+/g, '-') // Espaces -> tirets
            .replace(/-+/g, '-') // Tirets multiples
            .trim('-');
    }

    /**
     * Scroll fluide vers un élément
     * @param {string} elementId 
     */
    static smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Détection du device (mobile/tablet/desktop)
     */
    static getDeviceType() {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    }

    /**
     * Copy to clipboard moderne
     * @param {string} text 
     */
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            console.log('📋 Copié dans le presse-papiers');
            return true;
        } catch (error) {
            console.error('❌ Erreur copie:', error);
            return false;
        }
    }

    /**
     * Storage local avec expiration
     * @param {string} key 
     * @param {any} value 
     * @param {number} ttl - En secondes
     */
    static setLocalStorage(key, value, ttl = 86400) {
        const data = {
            value,
            expires: Date.now() + (ttl * 1000)
        };
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Récupération du storage local avec vérification d'expiration
     * @param {string} key 
     */
    static getLocalStorage(key) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            const data = JSON.parse(item);
            if (Date.now() > data.expires) {
                localStorage.removeItem(key);
                return null;
            }

            return data.value;
        } catch (error) {
            console.error('❌ Erreur localStorage:', error);
            return null;
        }
    }

    /**
     * Throttle pour les événements scroll/resize
     * @param {Function} func 
     * @param {number} limit 
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Sélecteur sécurisé avec gestion d'erreur
     * @param {string} selector 
     */
    static $(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.error(`❌ Sélecteur invalide: ${selector}`, error);
            return null;
        }
    }

    /**
     * Sélecteur multiple sécurisé
     * @param {string} selector 
     */
    static $$(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.error(`❌ Sélecteur invalide: ${selector}`, error);
            return [];
        }
    }
}

// Export pour les autres modules
window.Utils = Utils;

console.log('🛠️ Utils.js chargé');