// ================================
// AUTO-LOADER POUR ARTICLES INCOMING
// Version 1.0 - Intégration transparente
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
     * Scanne le dossier data/incoming/ (simulation)
     */
    async scanIncomingFiles() {
        // Liste des fichiers à essayer
        const possibleFiles = [
            'articles_bilingual_20250726_154501.json',
            'articles_bilingual_20250726_154639.json'
            // On peut en ajouter d'autres automatiquement
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
        
        return existingFiles;
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
            
            // Adapter le chemin de l'image si nécessaire
            let imagePath = bilingualArticle.image || '';
            if (imagePath && imagePath.startsWith('/')) {
                // Convertir chemin absolu en relatif pour le web
                imagePath = `images/incoming/${bilingualArticle.id}.jpg`;
            }
            
            return {
                id: bilingualArticle.id,
                title: title,
                date: bilingualArticle.date,
                author: bilingualArticle.author,
                excerpt: excerpt,
                content: content,
                image: imagePath,
                source: 'incoming' // Marquer comme venant d'incoming
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
     * Détecte automatiquement de nouveaux fichiers incoming
     */
    async autoDetectIncoming() {
        const now = Date.now();
        
        // Scanner seulement si nécessaire
        if (now - this.lastScanTime < this.scanInterval) {
            return [];
        }
        
        this.lastScanTime = now;
        
        // Générer noms de fichiers possibles basés sur la date actuelle
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        
        const possibleFiles = [];
        
        // Essayer différents timestamps pour aujourd'hui
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const timeStr = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
                possibleFiles.push(`articles_bilingual_${dateStr}_${timeStr}*.json`);
            }
        }
        
        return possibleFiles;
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

console.log('🚀 AutoLoader chargé et prêt');