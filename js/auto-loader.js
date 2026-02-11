// ================================
// AUTO-LOADER V2.1 - ZERO 404 INUTILES
// Système index MD propre et efficace
// ================================

class AutoLoader {
    constructor() {
        this.cache = new Map();
        this.isLoading = false;
        this.indexUrl = 'data/articles-index.md';
        this.articlesPath = 'data/incoming/articles_';
        this.skipLegacySystem = true; // Plus de recherche articles-fr/es.json
    }

    /**
     * Point d'entrée principal - Charge tous les articles
     */
    async loadAllArticles(language = 'fr') {
        console.log(`🔄 AutoLoader: Demande ${language}...`);
        
        // Vérifier cache (mais seulement si non-vide)
        const cached = this.cache.get(language);
        if (cached && cached.length > 0) {
            console.log(`📦 Depuis cache: ${cached.length} articles (${language})`);
            return cached;
        }

        // Si déjà en chargement, attendre
        if (this.isLoading) {
            console.log('⏳ Attente fin chargement...');
            await this.waitForLoadingComplete();
            return this.cache.get(language) || [];
        }

        // Nouveau chargement
        this.isLoading = true;
        console.log(`🔄 Chargement frais ${language}...`);

        try {
            const articles = await this.loadFromIndex(language);
            this.cache.set(language, articles);
            
            console.log(`✅ ${articles.length} articles chargés et mis en cache (${language})`);
            return articles;
            
        } catch (error) {
            console.error(`❌ Erreur chargement ${language}:`, error);
            return [];
        } finally {
            this.isLoading = false;
        }
    }

    // Fonction helper pour attendre
    async waitForLoadingComplete() {
        return new Promise((resolve) => {
            const check = setInterval(() => {
                if (!this.isLoading) {
                    clearInterval(check);
                    resolve();
                }
            }, 50);
        });
    }

    /**
     * Charge articles via l'index MD
     */
    async loadFromIndex(language) {
        try {
            // 1. Lire l'index
            const articleNumbers = await this.readIndex();
            
            if (articleNumbers.length === 0) {
                console.log('📋 Index vide → Scan d\'urgence');
                return await this.emergencyScan(language);
            }

            console.log(`📋 Index: [${articleNumbers.join(', ')}]`);

            // 2. Charger articles en parallèle (plus rapide)
            const promises = articleNumbers.map(num => 
                this.loadSingleArticle(num, language)
            );
            
            const results = await Promise.all(promises);

            // 3. Filtrer succès et aplatir les tableaux
            const articles = results
                .filter(result => result !== null)
                .flat();

            // 4. Logger les échecs pour debug
            const loadedNumbers = results
                .map((result, i) => result !== null ? articleNumbers[i] : null)
                .filter(Boolean);
            
            const failed = articleNumbers.filter(num => !loadedNumbers.includes(num));
            if (failed.length > 0) {
                console.warn(`⚠️ Articles manquants: [${failed.join(', ')}]`);
            }

            // 5. Trier par date (plus récent d'abord)
            return this.sortByDate(articles);

        } catch (error) {
            console.warn('⚠️ Erreur index, fallback scan:', error);
            return await this.emergencyScan(language);
        }
    }

    /**
     * Lit et parse l'index MD
     */
    async readIndex() {
        const response = await fetch(this.indexUrl);
        if (!response.ok) {
            throw new Error(`Index introuvable (${response.status})`);
        }

        const content = await response.text();
        
        // Parse ligne par ligne
        const numbers = content
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.startsWith('#'))
            .map(line => line.split('#')[0].trim()) // Retire commentaires
            .filter(line => /^\d+$/.test(line)) // Garde que les chiffres
            .map(num => num.padStart(3, '0')); // Format 001, 002, etc.

        console.log(`📋 ${numbers.length} articles dans l'index`);
        return numbers;
    }

    /**
     * Charge un article spécifique par numéro
     */
    async loadSingleArticle(number, language) {
        const url = `${this.articlesPath}${number}.json`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            
            // Format bilingue (nouveau système)
            if (data.articles && Array.isArray(data.articles)) {
                return data.articles
                    .map(article => this.convertBilingual(article, language))
                    .filter(Boolean);
            }
            
            // Format direct simple
            if (data.title) {
                return [this.convertDirect(data, language)];
            }

            console.warn(`⚠️ Format inconnu: ${url}`);
            return null;

        } catch (error) {
            // Échec silencieux, géré par le niveau supérieur
            return null;
        }
    }

    /**
     * Scan d'urgence si index indispo
     */
    async emergencyScan(language) {
        console.log('🚨 SCAN D\'URGENCE 001→200');
        
        const articles = [];
        let consecutiveFailures = 0;
        const maxFailures = 20;

        for (let i = 1; i <= 200; i++) {
            const number = i.toString().padStart(3, '0');
            const result = await this.loadSingleArticle(number, language);
            
            if (result && result.length > 0) {
                articles.push(...result);
                consecutiveFailures = 0;
            } else {
                consecutiveFailures++;
                if (consecutiveFailures >= maxFailures) {
                    console.log(`🛑 Arrêt après ${i} (${maxFailures} échecs)`);
                    break;
                }
            }
        }

        console.log(`🚨 Scan terminé: ${articles.length} articles`);
        return this.sortByDate(articles);
    }

    /**
     * Convertit article bilingue → format standard
     */
    convertBilingual(article, language) {
            // Système de priorité : Langue choisie > Espagnol > Français
            const title = article.title?.[language] || article.title?.['es'] || article.title?.['fr'];
            const content = article.content?.[language] || article.content?.['es'] || article.content?.['fr'];
            const excerpt = article.excerpt?.[language] || article.excerpt?.['es'] || '';
            
            // Si vraiment aucun titre ni contenu, là on rejette
            if (!title || !content) {
                console.warn(`⚠️ Article ${article.id} ignoré : contenu manquant`);
                return null;
            }

            return {
                id: article.id,
                title: title,
                content: content,
                excerpt: excerpt,
                date: article.date,
                author: article.author || 'Alejandra Galván Gómez',
                image: this.cleanImagePath(article.image, article.id),
                category: article.category || 'Nouveau',
                portfolio: article.portfolio,
                source: 'incoming'
            };
        }

    /**
     * Convertit article direct → format standard
     */
    convertDirect(article, language) {
        return {
            id: article.id || Date.now(),
            title: article.title || 'Sans titre',
            content: article.content || '',
            excerpt: article.excerpt || '',
            date: article.date || new Date().toISOString().split('T')[0],
            author: article.author || 'Alejandra Galván Gómez',
            image: this.cleanImagePath(article.image, article.id),
            category: article.category || 'Nouveau',
            portfolio: article.portfolio,
            source: 'incoming'
        };
    }

    /**
     * Nettoie et normalise les chemins d'images
     */
    cleanImagePath(imagePath, articleId) {
        // Pas d'image → Fallback Unsplash
        if (!imagePath) {
            return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop';
        }

        // URL complète → Garder tel quel
        if (imagePath.startsWith('http')) {
            return imagePath;
        }

        // Chemin relatif correct → Garder
        if (imagePath.startsWith('images/')) {
            return imagePath;
        }

        // Chemin local/absolu → Convertir vers incoming
        return `images/incoming/${articleId}.jpg`;
    }

    /**
     * Tri par date décroissante (plus récent en premier)
     */
    sortByDate(articles) {
        return articles.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    }

    /**
     * Vide le cache (force rechargement)
     */
    clearCache() {
        this.cache.clear();
        console.log('🧹 Cache vidé');
    }

    /**
     * Force le rechargement d'une langue
     */
    async reloadLanguage(language) {
        this.cache.delete(language);
        return await this.loadAllArticles(language);
    }

    /**
     * Statistiques de debug
     */
    getStats() {
        return {
            cached: Array.from(this.cache.keys()),
            isLoading: this.isLoading,
            cacheSize: this.cache.size
        };
    }
}

// ================================
// INSTANCE GLOBALE
// ================================

window.autoLoader = new AutoLoader();

console.log('🚀 AutoLoader v2.1 - Système index MD propre chargé');