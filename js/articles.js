// ================================
// GESTIONNAIRE D'ARTICLES
// ================================

class ArticleManager {
    constructor() {
        this.articles = { fr: [], es: [] };
        this.currentLang = 'fr';
        this.isLoading = false;
        this.loadAttempts = 0;
        this.maxAttempts = 3;
    }

    /**
     * Initialisation du gestionnaire d'articles
     */
    async init() {
        try {
            await this.loadArticles();
            console.log('📚 ArticleManager initialisé');
        } catch (error) {
            console.error('❌ Erreur initialisation ArticleManager:', error);
        }
    }

    /**
     * Charge les articles depuis les fichiers JSON
     */
    async loadArticles() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.loadAttempts++;

        try {
            console.log(`📖 Chargement des articles (tentative ${this.loadAttempts})`);

            const [frData, esData] = await Promise.all([
                Utils.fetchWithCache('data/articles-fr.json'),
                Utils.fetchWithCache('data/articles-es.json')
            ]);

            this.articles.fr = frData.articles || [];
            this.articles.es = esData.articles || [];

            console.log(`✅ Articles chargés: ${this.articles.fr.length} FR, ${this.articles.es.length} ES`);
            
            this.loadAttempts = 0; // Reset sur succès
        } catch (error) {
            console.error('❌ Erreur chargement articles:', error);
            
            if (this.loadAttempts < this.maxAttempts) {
                console.log(`🔄 Nouvelle tentative dans 2s...`);
                setTimeout(() => this.loadArticles(), 2000);
            } else {
                // Fallback vers articles par défaut
                this.loadFallbackArticles();
            }
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Articles de fallback en cas d'échec
     */
    loadFallbackArticles() {
        console.log('🔄 Chargement des articles de fallback');
        this.articles.fr = [{
            id: 1,
            title: "Article de démonstration",
            date: new Date().toISOString().split('T')[0],
            author: "Alejandra Galván Gómez",
            excerpt: "Ceci est un article de démonstration...",
            content: "# Article de démonstration\n\nContenu de démonstration.",
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop"
        }];
        this.articles.es = [{
            id: 1,
            title: "Artículo de demostración",
            date: new Date().toISOString().split('T')[0],
            author: "Alejandra Galván Gómez",
            excerpt: "Este es un artículo de demostración...",
            content: "# Artículo de demostración\n\nContenido de demostración.",
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop"
        }];
    }

    /**
     * Récupère les articles pour une langue donnée
     * @param {string} lang - Langue (fr/es)
     */
    getArticles(lang = this.currentLang) {
        return this.articles[lang] || [];
    }

    /**
     * Récupère un article par ID
     * @param {number} id 
     * @param {string} lang 
     */
    getArticleById(id, lang = this.currentLang) {
        const articles = this.getArticles(lang);
        return articles.find(article => article.id === parseInt(id));
    }

    /**
     * Récupère un article par slug
     * @param {string} slug 
     * @param {string} lang 
     */
    getArticleBySlug(slug, lang = this.currentLang) {
        const articles = this.getArticles(lang);
        return articles.find(article => article.slug === slug);
    }

    /**
     * Filtre les articles par catégorie
     * @param {string} category 
     * @param {string} lang 
     */
    getArticlesByCategory(category, lang = this.currentLang) {
        const articles = this.getArticles(lang);
        return articles.filter(article => article.category === category);
    }

    /**
     * Recherche dans les articles
     * @param {string} query 
     * @param {string} lang 
     */
    searchArticles(query, lang = this.currentLang) {
        if (!query.trim()) return this.getArticles(lang);

        const articles = this.getArticles(lang);
        const searchTerm = query.toLowerCase();

        return articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
    }

    /**
     * Rend les articles en HTML
     * @param {string} lang 
     * @param {string} containerId 
     */
    renderArticles(lang = this.currentLang, containerId = 'articles-container') {
        const container = Utils.$(containerId);
        if (!container) {
            console.error(`❌ Container ${containerId} introuvable`);
            return;
        }

        const articles = this.getArticles(lang);
        const t = window.translations?.[lang] || {};

        if (articles.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">Aucun article disponible</p>
                </div>
            `;
            return;
        }

        container.innerHTML = articles.map(article => this.renderArticleCard(article, t)).join('');
        
        // Setup lazy loading pour les nouvelles images
        Utils.setupLazyLoading();

        console.log(`📄 ${articles.length} articles rendus en ${lang}`);
    }

    /**
     * Rend une carte d'article
     * @param {Object} article 
     * @param {Object} translations 
     */
    renderArticleCard(article, translations = {}) {
        const readMore = translations.readMore || 'Lire plus →';
        
        return `
            <article class="article-card bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="relative overflow-hidden">
                    <img data-src="${article.image}" 
                         alt="${article.title}" 
                         class="lazy w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop'">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-2 mb-3">
                        ${article.category ? `<span class="bg-forest-green text-white px-2 py-1 rounded-full text-xs font-medium">${article.category}</span>` : ''}
                        ${article.tags ? article.tags.slice(0, 2).map(tag => `<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#${tag}</span>`).join('') : ''}
                    </div>
                    <h2 class="serif text-xl mb-3 text-forest-green font-semibold line-clamp-2 group-hover:text-matte-gold transition-colors duration-300">
                        ${article.title}
                    </h2>
                    <div class="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-calendar-alt"></i>
                            ${Utils.formatDate(article.date, window.blogApp?.currentLang || 'fr')}
                        </span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-user"></i>
                            ${article.author}
                        </span>
                    </div>
                    <p class="text-gray-700 mb-4 leading-relaxed line-clamp-3">${article.excerpt}</p>
                    <button onclick="window.blogApp?.showArticle(${article.id})" 
                            class="inline-flex items-center gap-2 text-matte-gold hover:text-yellow-600 font-medium transition-colors duration-200 group/btn">
                        ${readMore}
                        <i class="fas fa-arrow-right transition-transform duration-200 group-hover/btn:translate-x-1"></i>
                    </button>
                </div>
            </article>
        `;
    }

    /**
     * Rend le contenu complet d'un article
     * @param {number} articleId 
     * @param {string} lang 
     */
    renderFullArticle(articleId, lang = this.currentLang) {
        const article = this.getArticleById(articleId, lang);
        if (!article) {
            console.error(`❌ Article ${articleId} introuvable`);
            return '<p>Article non trouvé</p>';
        }

        // Conversion Markdown vers HTML
        let htmlContent = article.content;
        if (typeof marked !== 'undefined') {
            try {
                htmlContent = marked.parse(article.content);
            } catch (error) {
                console.warn('⚠️ Erreur Markdown:', error);
                htmlContent = article.content.replace(/\n/g, '<br>');
            }
        } else {
            // Fallback Markdown simple
            htmlContent = this.simpleMarkdownParser(article.content);
        }

        return `
            <article class="max-w-none prose prose-lg">
                <div class="mb-8">
                    <img src="${article.image}" 
                         alt="${article.title}" 
                         class="w-full h-64 object-cover rounded-lg mb-6">
                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        ${article.category ? `<span class="bg-forest-green text-white px-3 py-1 rounded-full text-sm font-medium">${article.category}</span>` : ''}
                        ${article.tags ? article.tags.map(tag => `<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#${tag}</span>`).join('') : ''}
                    </div>
                </div>
                <div class="article-content">
                    ${htmlContent}
                </div>
                <div class="mt-8 pt-8 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-500">
                            Publié le ${Utils.formatDate(article.date, lang)} par ${article.author}
                        </div>
                        <button onclick="Utils.copyToClipboard(window.location.href)" 
                                class="text-matte-gold hover:text-yellow-600 text-sm flex items-center gap-1">
                            <i class="fas fa-share"></i> Partager
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    /**
     * Parser Markdown simple pour fallback
     * @param {string} markdown 
     */
    simpleMarkdownParser(markdown) {
        return markdown
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n/g, '<br>');
    }

    /**
     * Change la langue courante
     * @param {string} lang 
     */
    setLanguage(lang) {
        if (this.articles[lang]) {
            this.currentLang = lang;
            console.log(`🌍 Langue changée vers: ${lang}`);
        } else {
            console.warn(`⚠️ Langue non supportée: ${lang}`);
        }
    }

    /**
     * Statistiques des articles
     */
    getStats() {
        return {
            totalFr: this.articles.fr.length,
            totalEs: this.articles.es.length,
            categories: this.getCategories(),
            tags: this.getAllTags()
        };
    }

    /**
     * Récupère toutes les catégories
     */
    getCategories(lang = this.currentLang) {
        const articles = this.getArticles(lang);
        const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];
        return categories;
    }

    /**
     * Récupère tous les tags
     */
    getAllTags(lang = this.currentLang) {
        const articles = this.getArticles(lang);
        const tags = articles.reduce((acc, article) => {
            if (article.tags) acc.push(...article.tags);
            return acc;
        }, []);
        return [...new Set(tags)];
    }
}

// Export global
window.ArticleManager = ArticleManager;

console.log('📚 ArticleManager.js chargé');