// ================================
// ARTICLE MANAGER V2.1 - COMPLET
// Gestion complète articles avec AutoLoader + Event Listeners
// ================================

class ArticleManager {
    constructor() {
        this.articles = { fr: [], es: [] };
        this.currentLang = 'fr';
        this.isLoading = false;
        this.loadAttempts = 0;
        this.maxAttempts = 3;
        this.lastLoadTime = { fr: 0, es: 0 };
    }

    /**
     * Initialisation - Charge les deux langues
     */
    async init() {
        console.log('📚 Initialisation ArticleManager v2.1...');
        
        try {
            await this.loadAllLanguages();
            console.log('✅ ArticleManager initialisé');
        } catch (error) {
            console.error('❌ Erreur init ArticleManager:', error);
            this.loadFallbackArticles();
        }
    }

    /**
     * Charge toutes les langues en parallèle
     */
    async loadAllLanguages() {
        if (this.isLoading) {
            console.log('⏳ Chargement déjà en cours...');
            return;
        }

        this.isLoading = true;
        console.log('🔄 Chargement FR + ES...');

        try {
            if (window.autoLoader) {
                const [frArticles, esArticles] = await Promise.all([
                    this.loadLanguageWithRetry('fr'),
                    this.loadLanguageWithRetry('es')
                ]);

                this.articles.fr = frArticles || [];
                this.articles.es = esArticles || [];
                this.lastLoadTime.fr = Date.now();
                this.lastLoadTime.es = Date.now();

                console.log(`✅ Chargé: ${this.articles.fr.length} FR, ${this.articles.es.length} ES`);
            } else {
                console.warn('⚠️ AutoLoader indisponible');
                this.loadFallbackArticles();
            }
        } catch (error) {
            console.error('❌ Erreur chargement langues:', error);
            this.loadFallbackArticles();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Charge une langue avec retry automatique
     */
    async loadLanguageWithRetry(language, attempt = 1) {
        try {
            console.log(`🔄 Chargement ${language} (tentative ${attempt})`);
            
            const articles = await window.autoLoader.loadAllArticles(language);
            
            if (!articles || articles.length === 0) {
                console.warn(`⚠️ Aucun article ${language} trouvé`);
                return [];
            }

            console.log(`✅ ${articles.length} articles ${language} chargés`);
            return articles;

        } catch (error) {
            console.error(`❌ Erreur ${language} tentative ${attempt}:`, error);
            
            if (attempt < this.maxAttempts) {
                console.log(`🔄 Retry ${language} dans 1s...`);
                await this.sleep(1000);
                return await this.loadLanguageWithRetry(language, attempt + 1);
            }
            
            console.error(`💥 Échec final ${language} après ${attempt} tentatives`);
            return [];
        }
    }

    /**
     * Recharge une langue spécifique
     */
    async reloadLanguage(language) {
        console.log(`🔄 Rechargement demandé: ${language}`);
        
        // Si déjà chargé récemment (< 5s), skip
        const lastLoad = this.lastLoadTime[language] || 0;
        if (Date.now() - lastLoad < 5000 && this.articles[language].length > 0) {
            console.log(`📦 ${language} déjà frais, skip reload`);
            return this.articles[language];
        }

        try {
            if (window.autoLoader) {
                const articles = await this.loadLanguageWithRetry(language);
                this.articles[language] = articles || [];
                this.lastLoadTime[language] = Date.now();
                
                console.log(`✅ Reload ${language}: ${this.articles[language].length} articles`);
                
                // Re-render après reload
                this.renderArticles(language);
                
                return this.articles[language];
            }
        } catch (error) {
            console.error(`❌ Erreur reload ${language}:`, error);
        }
        
        return this.articles[language] || [];
    }

    /**
     * Articles de fallback si tout plante
     */
    loadFallbackArticles() {
        console.log('🆘 Chargement articles de secours...');
        
        const fallbackFr = {
            id: 999,
            title: "Article de démonstration",
            date: new Date().toISOString().split('T')[0],
            author: "Alejandra Galván Gómez",
            excerpt: "Ceci est un article de démonstration en cas de problème technique.",
            content: "# Article de démonstration\n\nSi vous voyez ceci, il y a eu un problème de chargement des articles.\n\nVeuillez recharger la page.",
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop",
            category: "Système",
            source: "fallback"
        };

        const fallbackEs = {
            ...fallbackFr,
            title: "Artículo de demostración",
            excerpt: "Este es un artículo de demostración en caso de problema técnico.",
            content: "# Artículo de demostración\n\nSi ves esto, hubo un problema cargando los artículos.\n\nPor favor recarga la página."
        };

        this.articles.fr = [fallbackFr];
        this.articles.es = [fallbackEs];
    }

    /**
     * Récupère articles pour une langue
     */
    getArticles(lang = this.currentLang) {
        const articles = this.articles[lang] || [];
        
        // Si vide et pas en cours de chargement, tenter reload
        if (articles.length === 0 && !this.isLoading) {
            console.log(`📭 Articles ${lang} vides, reload en arrière-plan...`);
            this.reloadLanguage(lang).catch(console.error);
        }
        
        return articles;
    }

    /**
     * Change la langue avec rechargement intelligent
     */
    async setLanguage(lang) {
        console.log(`🌍 Changement langue: ${this.currentLang} → ${lang}`);
        
        if (!['fr', 'es'].includes(lang)) {
            console.warn(`⚠️ Langue non supportée: ${lang}`);
            return;
        }

        this.currentLang = lang;

        // Recharger si articles vides ou trop anciens
        const articles = this.articles[lang] || [];
        const lastLoad = this.lastLoadTime[lang] || 0;
        const isStale = Date.now() - lastLoad > 30000; // 30s

        if (articles.length === 0 || isStale) {
            console.log(`🔄 Rechargement ${lang} nécessaire...`);
            await this.reloadLanguage(lang);
        }

        console.log(`✅ Langue active: ${lang} (${this.articles[lang].length} articles)`);
        
        // Force rendu après changement langue
        console.log(`🎨 Rendu automatique ${lang}...`);
        
        // ✅ NOUVELLE LOGIQUE : Vérifier currentPage au lieu du hash
        const blogInstance = window.blogApp || window.blogEngine || window.app;
        if (blogInstance && blogInstance.currentPage === 'article-detail' && this.currentArticleId) {
            console.log(`📖 Re-rendu article ${this.currentArticleId} en ${lang}...`);
            blogInstance.showArticle(this.currentArticleId);
            return; // ← ARRÊTER ICI
        }

        // Seulement si pas dans un article
        console.log(`🎨 Rendu liste articles en ${lang}...`);
        this.renderArticles(lang);
    }

    /**
     * Rendu des articles avec gestion robuste et event listeners
     */
    renderArticles(lang = this.currentLang, containerId = 'articles-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`❌ Container ${containerId} introuvable`);
            return;
        }

        const articles = this.getArticles(lang);
        const translations = window.translations?.[lang] || {};

        // Affichage loading si articles vides et chargement en cours
        if (articles.length === 0 && this.isLoading) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
                    <p class="text-gray-500 text-lg">Chargement des articles...</p>
                </div>
            `;
            return;
        }

        // Affichage vide si vraiment aucun article
        if (articles.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">Aucun article disponible</p>
                    <button data-action="reload" data-lang="${lang}"
                            class="reload-button mt-4 px-4 py-2 bg-forest-green text-white rounded hover:bg-green-700">
                        Recharger
                    </button>
                </div>
            `;
            
            // Event listener pour bouton recharger
            const reloadBtn = container.querySelector('.reload-button');
            if (reloadBtn) {
                reloadBtn.addEventListener('click', () => {
                    console.log(`🔄 Clic reload ${lang}`);
                    this.reloadLanguage(lang);
                });
            }
            return;
        }

        // Rendu normal des articles
        container.innerHTML = articles.map(article => 
            this.renderArticleCard(article, translations)
        ).join('');
        
        // Attacher les event listeners
        this.attachArticleEvents(container);
        
        // Gestion des images
        this.handleImages(container);
        
        console.log(`📄 ${articles.length} articles ${lang} rendus avec events`);
    }

    /**
     * Attache les event listeners aux articles
     */
    attachArticleEvents(container) {
        // Event listeners pour boutons "Lire plus"
        const readMoreButtons = container.querySelectorAll('.article-read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const articleId = parseInt(button.dataset.articleId);
                console.log(`🔗 Clic article ${articleId}`);
                
                // Chercher l'instance blog (toutes les variantes)
                const blogInstance = window.blogApp || 
                                    window.blogEngine || 
                                    window.app || 
                                    window.blog;
                
                if (blogInstance?.showArticle) {
                    console.log(`📖 Ouverture article ${articleId}...`);
                    blogInstance.showArticle(articleId);
                } else {
                    console.error('❌ Instance blog introuvable');
                    console.log('🔍 Instances disponibles:', Object.keys(window).filter(k => 
                        typeof window[k] === 'object' && window[k]?.showArticle
                    ));
                    
                    // Fallback : essayer de naviguer manuellement
                    console.log('🔄 Tentative navigation manuelle...');
                    if (window.location.hash !== `#article-${articleId}`) {
                        window.location.hash = `#article-${articleId}`;
                    }
                }
            });
        });

        console.log(`🎮 ${readMoreButtons.length} boutons "Lire plus" configurés`);
    }

    /**
     * Gestion robuste des images
     */
    handleImages(container) {
        setTimeout(() => {
            const images = container.querySelectorAll('img');
            images.forEach(img => {
                // Skip images Unsplash (déjà optimisées)
                if (img.src.includes('unsplash.com')) return;

                img.onerror = () => {
                    img.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop';
                };
            });
        }, 100);
    }





    /**
     * Rend le contenu complet d'un article
     */
    renderFullArticle(articleId, lang = this.currentLang) {
        this.currentArticleId = articleId; // ← NOUVEAU : stocker l'ID
        
        const article = this.getArticleById(articleId, lang);
        if (!article) {
            console.error(`❌ Article ${articleId} introuvable en ${lang}`);
            return '<div class="text-center py-12"><p class="text-red-500">Article non trouvé</p></div>';
        }
        console.log(`📖 Rendu article complet: ${article.title}`);

        // Conversion Markdown vers HTML basique
        let htmlContent = article.content || article.excerpt || '';
        
        // Markdown simple
        htmlContent = htmlContent
            .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
            .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
            .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/\n/g, '<br>');
        
        // Wrapper paragraphe
        if (!htmlContent.startsWith('<h') && !htmlContent.startsWith('<p')) {
            htmlContent = `<p class="mb-4">${htmlContent}</p>`;
        }

        const badge = this.getBadge(article);

        return `
            <article class="max-w-none">
                <div class="mb-8">
                    <div class="relative mb-6">
                        <img src="${article.image}" 
                            alt="${article.title}" 
                            class="w-full h-64 object-cover rounded-lg"
                            onerror="this.src='https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=400&fit=crop'">
                        ${badge}
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        ${article.category ? `<span class="bg-forest-green text-white px-3 py-1 rounded-full text-sm font-medium">${article.category}</span>` : ''}
                        ${article.source === 'incoming' ? '<span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Nouveau</span>' : ''}
                    </div>
                    
                    <h1 class="text-4xl font-bold text-forest-green mb-4">${article.title}</h1>
                    
                    <div class="flex items-center gap-4 mb-6 text-gray-600">
                        <span class="flex items-center gap-2">
                            <i class="fas fa-calendar-alt"></i>
                            ${this.formatDate(article.date)}
                        </span>
                        <span class="flex items-center gap-2">
                            <i class="fas fa-user"></i>
                            ${article.author}
                        </span>
                    </div>
                </div>
                
                <div class="prose prose-lg max-w-none">
                    ${htmlContent}
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <button onclick="window.history.back()" 
                                class="flex items-center gap-2 text-forest-green hover:text-green-700 transition-colors">
                            <i class="fas fa-arrow-left"></i>
                            Retour aux articles
                        </button>
                        <button onclick="navigator.clipboard?.writeText(window.location.href)" 
                                class="flex items-center gap-2 text-matte-gold hover:text-yellow-600 transition-colors">
                            <i class="fas fa-share"></i>
                            Partager
                        </button>
                    </div>
                </div>
            </article>
        `;
    }


    /**
     * Rendu carte article avec data-attributes
     */
    renderArticleCard(article, translations = {}) {
        const readMore = translations.readMore || 'Lire plus →';
        const badge = this.getBadge(article);
        
        return `
            <article class="article-card bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="relative overflow-hidden">
                    <img src="${article.image}" 
                         alt="${article.title}" 
                         class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop'">
                    ${badge}
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-2 mb-3">
                        ${article.category ? `<span class="bg-forest-green text-white px-2 py-1 rounded-full text-xs font-medium">${article.category}</span>` : ''}
                    </div>
                    <h2 class="serif text-xl mb-3 text-forest-green font-semibold line-clamp-2 group-hover:text-matte-gold transition-colors duration-300">
                        ${article.title}
                    </h2>
                    <div class="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-calendar-alt"></i>
                            ${this.formatDate(article.date)}
                        </span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-user"></i>
                            ${article.author}
                        </span>
                    </div>
                    <p class="text-gray-700 mb-4 leading-relaxed line-clamp-3">${article.excerpt}</p>
                    <button data-article-id="${article.id}" 
                            class="article-read-more inline-flex items-center gap-2 text-matte-gold hover:text-yellow-600 font-medium transition-colors duration-200 group/btn cursor-pointer">
                        ${readMore}
                        <i class="fas fa-arrow-right transition-transform duration-200 group-hover/btn:translate-x-1"></i>
                    </button>
                </div>
            </article>
        `;
    }

    /**
     * Badge selon source article
     */
    getBadge(article) {
        if (article.source === 'incoming') {
            return '<span class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">Nouveau</span>';
        }
        if (article.source === 'fallback') {
            return '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">Demo</span>';
        }
        return '';
    }

    /**
     * Utilitaires
     */
    getArticleById(id, lang = this.currentLang) {
        return this.getArticles(lang).find(article => article.id === parseInt(id));
    }

    searchArticles(query, lang = this.currentLang) {
        if (!query.trim()) return this.getArticles(lang);
        
        const articles = this.getArticles(lang);
        const searchTerm = query.toLowerCase();
        
        return articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm)
        );
    }

    formatDate(dateStr) {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString(this.currentLang === 'fr' ? 'fr-FR' : 'es-ES');
        } catch {
            return dateStr;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Stats et debug
     */
    getStats() {
        return {
            fr: this.articles.fr.length,
            es: this.articles.es.length,
            currentLang: this.currentLang,
            isLoading: this.isLoading,
            lastLoad: this.lastLoadTime
        };
    }

    /**
     * Force refresh complet
     */
    async forceReload() {
        console.log('🔄 Force reload toutes langues...');
        this.lastLoadTime = { fr: 0, es: 0 };
        await this.loadAllLanguages();
        this.renderArticles(this.currentLang);
    }
}

// ================================
// INSTANCE GLOBALE
// ================================

window.ArticleManager = ArticleManager;
window.articleManager = new ArticleManager();

console.log('📚 ArticleManager v2.1 - Complet avec event listeners chargé');