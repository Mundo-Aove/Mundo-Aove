// ================================
// UTILITAIRES RÉUTILISABLES - VERSION OPTIMISÉE
// ================================

class Utils {
    // Cache intelligent pour les données
    static cache = new Map();
    
    /**
     * Fetch avec cache intelligent - UTILISÉ par articles.js
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
     * Formatage des dates - UTILISÉ par articles.js
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
     * Copy to clipboard - UTILISÉ par articles.js
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
     * Storage local avec expiration - UTILISÉ par language-switcher.js
     */
    static setLocalStorage(key, value, ttl = 86400) {
        const data = {
            value,
            expires: Date.now() + (ttl * 1000)
        };
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Récupération storage local - UTILISÉ par language-switcher.js
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
     * Throttle - UTILISÉ par navigation.js
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
     * Sélecteur sécurisé - UTILISÉ par navigation.js et language-switcher.js
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
     * Sélecteur multiple sécurisé - UTILISÉ par navigation.js
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

console.log('🛠️ Utils.js optimisé chargé');