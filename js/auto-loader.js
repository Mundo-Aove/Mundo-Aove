// ================================
// AUTO-LOADER POUR ARTICLES INCOMING
// Version 1.1 - Gestion images améliorée
// ================================

class AutoLoader {
    constructor() {
        this.cache = new Map();
        this.lastScanTime = 0;
        this.scanInterval = 30000; // 30 secondes
        this.isLoading = false;
    }

    /**
     * Charge TOUS les articles (existants + incoming)
     */
    async loadAllArticles(language = 'fr') {
        console.log(`🔄 AutoLoader: Chargement articles ${language}...`);
        
        try {
            // 1. Charger articles existants
            const existingArticles = await this.loadExistingArticles(language);
            console.log(`📚 Articles existants: ${existingArticles.length}`);
            
            // 2. Charger articles incoming
            const incomingArticles = await this.loadIncomingArticles(language);
            console.log(`📥 Articles incoming: ${incomingArticles.length}`);
            
            // 3. Fusionner et trier
            const allArticles = [...existingArticles, ...incomingArticles];
            const sortedArticles = this.sortArticlesByDate(allArticles);
            
            console.log(`✅ Total articles: ${sortedArticles.length}`);
            return sortedArticles;
            
        } catch (error) {
            console.error('❌ Erreur AutoLoader:', error);
            
            // Fallback: articles existants seulement
            return await this.loadExistingArticles(language);
        }
    }

    /**
     * Charge les articles du système existant
     */
    async loadExistingArticles(language) {
        try {
            const response = await fetch(`data/articles-${language}.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            return data.articles || [];
            
        } catch (error) {
            console.warn(`⚠️ Erreur chargement articles-${language}.json:`, error);
            return [];
        }
    }

    /**
     * Charge les articles depuis data/incoming/
     */
    async loadIncomingArticles(language) {
        try {
            // Scanner les fichiers incoming
            const incomingFiles = await this.scanIncomingFiles();
            console.log(`📁 Fichiers incoming détectés: ${incomingFiles.length}`);
            
            const articles = [];
            
            // Traiter chaque fichier bilingue
            for (const fileName of incomingFiles) {
                try {
                    const fileArticles = await this.processIncomingFile(fileName, language);
                    articles.push(...fileArticles);
                } catch (error) {
                    console.warn(`⚠️ Erreur traitement ${fileName}:`, error);
                }
            }
            
            return articles;
            
        } catch (error) {
            console.warn('⚠️ Erreur scan incoming:', error);
            return [];
        }
    }

    /**
     * Scanne le dossier data/incoming/ (détection auto + liste fixe)
     */
    async scanIncomingFiles() {
        // Liste des fichiers à essayer (tu peux en ajouter)
        const possibleFiles = [
            'articles_bilingual_20250726_154501.json',
            'articles_bilingual_20250726_154639.json',
            // Détection automatique pour aujourd'hui
            ...this.generateTodayFiles()
        ];
        
        const existingFiles = [];
        
        for (const fileName of possibleFiles) {
            try {
                const response = await fetch(`data/incoming/${fileName}`, { method: 'HEAD' });
                if (response.ok) {
                    existingFiles.push(fileName);
                }
            } catch (error) {
                // Fichier n'existe pas, on continue
            }
        }
        
        return [...new Set(existingFiles)]; // Supprimer doublons
    }

    /**
     * Génère les noms de fichiers possibles pour aujourd'hui
     */
    generateTodayFiles() {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        
        const files = [];
        // Essayer quelques heures autour de maintenant
        const currentHour = today.getHours();
        
        for (let h = Math.max(0, currentHour - 2); h <= Math.min(23, currentHour + 2); h++) {
            for (let m = 0; m < 60; m += 15) {
                const timeStr = `${h.toString().padStart(2, '0')}${m.toString().padStart(2, '0')}`;
                files.push(`articles_bilingual_${dateStr}_${timeStr}01.json`);
            }
        }
        
        return files;
    }

    /**
     * Traite un fichier JSON bilingue
     */
    async processIncomingFile(fileName, language) {
        try {
            const response = await fetch(`data/incoming/${fileName}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            
            if (!data.articles || !Array.isArray(data.articles)) {
                console.warn(`⚠️ Format invalide dans ${fileName}`);
                return [];
            }
            
            // Convertir format bilingue vers format blog
            const articles = data.articles.map(article => {
                return this.convertBilingualToStandard(article, language);
            }).filter(article => article !== null);
            
            console.log(`✅ ${fileName}: ${articles.length} articles extraits (${language})`);
            return articles;
            
        } catch (error) {
            console.error(`❌ Erreur traitement ${fileName}:`, error);
            return [];
        }
    }

    /**
     * Convertit un article bilingue vers le format standard du blog
     */
    convertBilingualToStandard(bilingualArticle, language) {
        try {
            // Vérifier que l'article a le contenu dans la langue demandée
            const title = bilingualArticle.title?.[language];
            const content = bilingualArticle.content?.[language];
            const excerpt = bilingualArticle.excerpt?.[language] || '';
            
            if (!title || !content) {
                console.warn(`⚠️ Article ${bilingualArticle.id}: contenu manquant en ${language}`);
                return null;
            }
            
            // ✅ GESTION ROBUSTE DES IMAGES
            let imagePath = bilingualArticle.image || '';
            if (imagePath) {
                if (imagePath.startsWith('/') || imagePath.includes('Bureau') || imagePath.includes('home')) {
                    // Chemin absolu local -> relatif incoming
                    imagePath = `images/incoming/${bilingualArticle.id}.jpg`;
                } else if (!imagePath.startsWith('http') && !imagePath.startsWith('images/')) {
                    // Pas d'URL complète et pas dans images/ -> ajouter incoming
                    imagePath = `images/incoming/${bilingualArticle.id}.jpg`;
                }
                // Sinon garder le chemin original (URL ou images/articles/X.jpg)
            } else {
                // Fallback image par défaut
                imagePath = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop';
            }
            
            return {
                id: bilingualArticle.id,
                title: title,
                date: bilingualArticle.date,
                author: bilingualArticle.author,
                excerpt: excerpt,
                content: content,
                image: imagePath,
                source: 'incoming', // Marquer comme venant d'incoming
                category: bilingualArticle.category || 'Nouveau'
            };
            
        } catch (error) {
            console.error('❌ Erreur conversion article bilingue:', error);
            return null;
        }
    }

    /**
     * Trie les articles par date (plus récent en premier)
     */
    sortArticlesByDate(articles) {
        return articles.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // Ordre décroissant
        });
    }

    /**
     * Force le rechargement du cache
     */
    clearCache() {
        this.cache.clear();
        this.lastScanTime = 0;
        console.log('🧹 Cache AutoLoader vidé');
    }

    /**
     * Statistiques du AutoLoader
     */
    getStats() {
        return {
            cacheSize: this.cache.size,
            lastScan: new Date(this.lastScanTime).toISOString(),
            isLoading: this.isLoading
        };
    }
}

// ================================
// INTÉGRATION AVEC ArticleManager
// ================================

// Instance globale
window.autoLoader = new AutoLoader();

// Fonction helper pour ArticleManager
window.loadArticlesWithIncoming = async function(language) {
    return await window.autoLoader.loadAllArticles(language);
};

console.log('🚀 AutoLoader v1.1 chargé avec gestion images améliorée');