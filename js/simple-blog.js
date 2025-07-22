// ============================================
// SIMPLE BLOG - VERSION COMPLÈTE ET RÉPARÉE
// ============================================

const simpleBlog = {
    currentLang: 'fr',
    currentPage: 'blog',
    
    // ========== TRADUCTIONS COMPLÈTES ==========
    translations: {
        fr: {
            nav: {
                blog: "Blog",
                carte: "Oliviers Centenaires",
                about: "À propos", 
                contact: "Contact"
            },
            home: {
                title: "Blog de Oléiculture Péruvienne",
                bubbles_title: "Réflexions de la Semaine",
                new_bubble: "Nouvelle réflexion",
                loading: "Chargement des articles..."
            },
            carte: {
                title: "Oliviers Centenaires de Tacna-Moquegua-Ilo",
                description: "Découvrez notre inventaire des oliviers centenaires de la région sud du Pérou. Chaque arbre raconte l'histoire de l'oléiculture péruvienne.",
                map_title: "Carte Interactive",
                total_trees: "🫒 67 oliviers recensés",
                last_update: "Dernière mise à jour : 22/07/2025",
                loading: "Chargement de la carte...",
                legend_title: "Légende",
                legend: {
                    excellent: "Excellent état (8-10/10)",
                    good: "Bon état (6-7/10)",
                    poor: "État préoccupant (1-5/10)"
                }
            },
            about: {
                title: "Alejandra Galván Gómez",
                bio1: "Ingénieure agroalimentaire spécialisée dans l’élaboration d’huile d’olive et la préparation d’olives de table au Pérou, avec plus de 10 ans d’expérience aussi bien nationale qu'internationale",
                bio2: "Diplômée de l’Universidad Nacional Jorge Basadre Grohmann (Pérou) et de l’Universidad Nacional de Jaén (Espagne), je me suis spécialisée dans la production d’huile d’olive et le traitement des olives de table au Pérou.",
                specialties_title: "Spécialités :",
                spec1: "Analyses sensorielles",
                spec2: "Assistance et consulting en production huile et olives", 
                spec3: "Production d'huile d'olive extra vierge",
                spec4: "Assistance a la realisation de blend"
            },
            contact: {
                title: "Contact",
                name: "Nom",
                email: "Email", 
                message: "Message",
                placeholder: "Votre message...",
                send: "Envoyer le message",
                direct: "Ou contactez-moi directement :"
            },
            article: {
                back: "Retour aux articles"
            },
            footer: {
                description: "Ingénieure agroalimentaire spécialisée dans l'oléiculture péruvienne et les pratiques agricoles durables.",
                navigation: "Navigation",
                follow: "Suivez-moi",
                rights: "Tous droits réservés"
            }
        },
        es: {
            nav: {
                blog: "Blog",
                carte: "Olivos Centenarios",
                about: "Acerca de",
                contact: "Contacto"
            },
            home: {
                title: "Blog de Olivicultura Peruana",
                bubbles_title: "Reflexiones de la Semana",
                new_bubble: "Nueva reflexión",
                loading: "Cargando artículos..."
            },
            carte: {
                title: "Olivos Centenarios de Tacna-Moquegua-Ilo",
                description: "Descubra nuestro inventario de olivos centenarios de la región sur del Perú. Cada árbol cuenta la historia de la olivicultura peruana.",
                map_title: "Mapa Interactivo",
                total_trees: "🫒 67 olivos registrados",
                last_update: "Última actualización: 22/07/2025",
                loading: "Cargando el mapa...",
                legend_title: "Leyenda",
                legend: {
                    excellent: "Excelente estado (8-10/10)",
                    good: "Buen estado (6-7/10)",
                    poor: "Estado preocupante (1-5/10)"
                }
            },
            about: {
                title: "Alejandra Galván Gómez",
                bio1: "Ingeniera agroalimentaria especializada en la elaboración de aceite de oliva y en la preparación de aceitunas de mesa en el Perú, con más de 10 años de experiencia tanto a nivel nacional como internacional.",
                bio2: "Graduada de la Universidad Nacional Jorge Basadre Grohmann (Perú) y de la Universidad Nacional de Jaén (España), me especialicé en la producción de aceite de oliva y en el tratamiento de aceitunas de mesa en el Perú.",
                specialties_title: "Especialidades:",
                spec1: "Análisis sensoriales",
                spec2: "Asistencia y consultoría en producción de aceite y aceitunas",
                spec3: "Producción de aceite de oliva extra virgen",
                spec4: "Asistencia en la creación de mezclas (blends)"
            },
            contact: {
                title: "Contacto",
                name: "Nombre",
                email: "Correo",
                message: "Mensaje",
                placeholder: "Su mensaje...",
                send: "Enviar mensaje",
                direct: "O contáctame directamente:"
            },
            article: {
                back: "Volver a los artículos"
            },
            footer: {
                description: "Ingeniera agroalimentaria especializada en olivicultura peruana y prácticas agrícolas sostenibles.",
                navigation: "Navegación",
                follow: "Sígueme",
                rights: "Todos los derechos reservados"
            }
        }
    },

    // ========== ARTICLES ==========
    articles: {
        fr: [
            {
                id: 1,
                title: "Révision de la récolte d'oliviers à Ica",
                date: "2025-07-22",
                author: "Alejandra Galván Gómez",
                excerpt: "La saison de récolte cette année a été marquée par un climat irrégulier, mais les résultats sont prometteurs. Analyse complète des rendements 2025.",
                image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=300&fit=crop",
                content: `
                    <h1>Révision de la récolte d'oliviers à Ica</h1>
                    <p><em>22 juillet 2025 - Alejandra Galván Gómez</em></p>
                    
                    <h2>Introduction</h2>
                    <p>La région d'Ica a connu une saison de récolte 2025 particulièrement intéressante, marquée par des conditions climatiques variables mais des résultats finalement encourageants.</p>
                    
                    <h2>Conditions climatiques</h2>
                    <p>Les précipitations tardives de février ont initialement inquiété les producteurs, mais l'adaptation rapide des techniques d'irrigation a permis de maintenir une qualité exceptionnelle.</p>
                    
                    <h2>Résultats de production</h2>
                    <p>Malgré les défis, nous observons une augmentation de 15% du rendement par hectare comparé à 2024, principalement grâce aux nouvelles variétés résistantes.</p>
                    
                    <h2>Recommandations</h2>
                    <p>Pour 2026, je recommande de continuer l'expansion des variétés Sevillana adaptées et d'améliorer les systèmes de drainage préventif.</p>
                `
            },
            {
                id: 2,
                title: "Techniques de taille pour jeunes oliviers",
                date: "2025-07-15",
                author: "Alejandra Galván Gómez",
                excerpt: "La taille correcte dans les premières années définit la productivité future de l'olivier. Guide pratique avec illustrations techniques.",
                image: "https://images.unsplash.com/photo-1611909023032-2d4b3c66d5b9?w=600&h=300&fit=crop",
                content: `
                    <h1>Techniques de taille pour jeunes oliviers</h1>
                    <p><em>15 juillet 2025 - Alejandra Galván Gómez</em></p>
                    
                    <h2>Principes fondamentaux</h2>
                    <p>La formation d'un jeune olivier détermine sa structure productive pour les décennies à venir. Une taille appropriée dès les premières années est cruciale.</p>
                    
                    <h2>Première année (plantation)</h2>
                    <p>Éliminer les branches basses (jusqu'à 60cm du sol) et sélectionner 3-4 branches charpentières bien réparties autour du tronc.</p>
                    
                    <h2>Deuxième et troisième années</h2>
                    <p>Renforcer la structure en taillant les branches secondaires et en maintenant un équilibre entre croissance végétative et préparation à la fructification.</p>
                    
                    <h2>Erreurs courantes à éviter</h2>
                    <p>Ne jamais tailler trop sévèrement un jeune olivier - cela retarde l'entrée en production de 2-3 ans.</p>
                `
            }
        ],
        es: [
            {
                id: 1,
                title: "Revisión de la cosecha de olivos en Ica",
                date: "2025-07-22",
                author: "Alejandra Galván Gómez",
                excerpt: "La temporada de cosecha este año ha estado marcada por un clima irregular, pero los resultados son prometedores. Análisis completo de rendimientos 2025.",
                image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=300&fit=crop",
                content: `
                    <h1>Revisión de la cosecha de olivos en Ica</h1>
                    <p><em>22 de julio 2025 - Alejandra Galván Gómez</em></p>
                    
                    <h2>Introducción</h2>
                    <p>La región de Ica ha experimentado una temporada de cosecha 2025 particularmente interesante, marcada por condiciones climáticas variables pero resultados finalmente alentadores.</p>
                    
                    <h2>Condiciones climáticas</h2>
                    <p>Las precipitaciones tardías de febrero inicialmente preocuparon a los productores, pero la rápida adaptación de las técnicas de riego permitió mantener una calidad excepcional.</p>
                    
                    <h2>Resultados de producción</h2>
                    <p>A pesar de los desafíos, observamos un aumento del 15% en el rendimiento por hectárea comparado con 2024, principalmente gracias a las nuevas variedades resistentes.</p>
                    
                    <h2>Recomendaciones</h2>
                    <p>Para 2026, recomiendo continuar la expansión de las variedades Sevillana adaptadas y mejorar los sistemas de drenaje preventivo.</p>
                `
            },
            {
                id: 2,
                title: "Técnicas de poda para olivos jóvenes",
                date: "2025-07-15",
                author: "Alejandra Galván Gómez",
                excerpt: "La poda correcta en los primeros años define la productividad futura del olivo. Guía práctica con ilustraciones técnicas.",
                image: "https://images.unsplash.com/photo-1611909023032-2d4b3c66d5b9?w=600&h=300&fit=crop",
                content: `
                    <h1>Técnicas de poda para olivos jóvenes</h1>
                    <p><em>15 de julio 2025 - Alejandra Galván Gómez</em></p>
                    
                    <h2>Principios fundamentales</h2>
                    <p>La formación de un olivo joven determina su estructura productiva para las décadas venideras. Una poda apropiada desde los primeros años es crucial.</p>
                    
                    <h2>Primer año (plantación)</h2>
                    <p>Eliminar las ramas bajas (hasta 60cm del suelo) y seleccionar 3-4 ramas principales bien distribuidas alrededor del tronco.</p>
                    
                    <h2>Segundo y tercer años</h2>
                    <p>Reforzar la estructura podando las ramas secundarias y manteniendo un equilibrio entre crecimiento vegetativo y preparación para la fructificación.</p>
                    
                    <h2>Errores comunes a evitar</h2>
                    <p>Nunca podar demasiado severamente un olivo joven - esto retrasa la entrada en producción de 2-3 años.</p>
                `
            }
        ]
    },

    // ========== BULLES DE RÉFLEXION ==========
    bubbles: {
        fr: [
        "La région de Tacna concentre certaines des plus anciennes oliveraies du Pérou, avec des arbres âgés de plus de 200 ans.",
        "Les techniques de pressage à froid permettent de préserver les arômes délicats de l'huile d'olive extra vierge.",
        "La culture d'oliviers en conditions arides exige une gestion précise de l'irrigation et de la fertilité des sols.",
        "Des essais sont en cours à Moquegua pour adapter des variétés européennes au climat péruvien.",
        "La valorisation des olives de table représente une opportunité de diversification pour les petits producteurs locaux.",
        "En 2022, le Pérou a produit plus de 30 000 tonnes d'olives, principalement dans les régions de Tacna, Arequipa et Moquegua. (MINAGRI)",
        "La variété 'Sevillana' représente environ 80 % des cultures d'oliviers dans le sud du Pérou. (INIA Perú)",
        "Selon l'INIA, les techniques de taille formative augmentent jusqu'à 20 % la productivité des jeunes oliviers. (INIA)",
        "Les exportations péruviennes d'olives et d'huile d'olive ont atteint plus de 25 millions USD en 2023. (PROMPERÚ)",
        "La salinité des sols est un défi croissant pour l’olivier dans les vallées côtières péruviennes. (UNALM)"
        ],
        es: [
        "La región de Tacna alberga algunos de los olivares más antiguos del Perú, con árboles de más de 200 años.",
        "Las técnicas de prensado en frío preservan los aromas delicados del aceite de oliva extra virgen.",
        "El cultivo de olivos en condiciones áridas requiere una gestión precisa del riego y la fertilidad del suelo.",
        "En Moquegua se están realizando ensayos para adaptar variedades europeas al clima peruano.",
        "La valorización de las aceitunas de mesa representa una oportunidad de diversificación para los pequeños productores locales.",
        "En 2022, Perú produjo más de 30 000 toneladas de aceitunas, principalmente en las regiones de Tacna, Arequipa y Moquegua. (MINAGRI)",
        "La variedad 'Sevillana' representa aproximadamente el 80 % del cultivo de olivos en el sur del Perú. (INIA Perú)",
        "Según el INIA, las técnicas de poda formativa aumentan hasta un 20 % la productividad de los olivos jóvenes. (INIA)",
        "Las exportaciones peruanas de aceitunas y aceite de oliva superaron los 25 millones de USD en 2023. (PROMPERÚ)",
        "La salinidad del suelo es un reto creciente para el olivo en los valles costeros peruanos. Se están ensayando soluciones con enmiendas orgánicas. (UNALM)"
        ]
    },

    // ========== INITIALISATION ==========
    init() {
        console.log('🚀 Initialisation SimpleBlog...');
        
        // Masquer le splash screen après 3 secondes
        setTimeout(() => {
            const splash = document.querySelector('.splash-screen');
            if (splash) {
                splash.style.opacity = '0';
                splash.style.transition = 'opacity 0.5s ease';
                setTimeout(() => splash.remove(), 500);
            }
        }, 3000);

        // Charger la page par défaut
        this.showPage('blog');
        this.renderArticles();
        this.updateLanguage();
        
        console.log('✅ SimpleBlog initialisé !');
    },

    // ========== NAVIGATION ==========
    showPage(pageName) {
        console.log(`📄 Navigation vers: ${pageName}`);
        
        // Masquer toutes les pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.classList.add('hidden'));
        
        // Afficher la page demandée
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageName;
            
            // Actions spécifiques par page
            if (pageName === 'carte-oliviers') {
                console.log('🗺️ Page carte chargée - prête pour Leaflet.js');
            }
        } else {
            console.error(`❌ Page ${pageName}-page non trouvée`);
        }
    },

    // ========== GESTION DES ARTICLES ==========
    renderArticles() {
        const container = document.getElementById('articles-container');
        if (!container) {
            console.error('❌ Container articles-container non trouvé');
            return;
        }
        
        const articles = this.articles[this.currentLang];
        container.innerHTML = articles.map(article => `
            <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src="${article.image}" 
                     alt="${article.title}" 
                     class="w-full h-48 object-cover"
                     onerror="this.src='https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=300&fit=crop'">
                
                <div class="p-6">
                    <h2 class="text-xl font-bold text-forest-green mb-2 font-serif">${article.title}</h2>
                    <p class="text-gray-600 text-sm mb-3">
                        <i class="fas fa-calendar-alt mr-2"></i>${article.date} • 
                        <i class="fas fa-user mr-2"></i>${article.author}
                    </p>
                    <p class="text-gray-700 mb-4 leading-relaxed">${article.excerpt}</p>
                    <button onclick="simpleBlog.showArticle(${article.id})" 
                            class="inline-flex items-center text-matte-gold hover:text-yellow-600 font-medium transition-colors duration-200">
                        Lire l'article complet
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </article>
        `).join('');
        
        console.log(`📄 ${articles.length} articles affichés en ${this.currentLang}`);
    },

    showArticle(articleId) {
        const article = this.articles[this.currentLang].find(a => a.id === articleId);
        if (!article) {
            console.error(`❌ Article ${articleId} non trouvé`);
            return;
        }

        const content = document.getElementById('article-content');
        if (content) {
            content.innerHTML = article.content;
            this.showPage('article-detail');
            window.scrollTo(0, 0);
        }
    },

    // ========== GESTION DES LANGUES ==========
    toggleLanguage() {
        this.currentLang = this.currentLang === 'fr' ? 'es' : 'fr';
        
        // Mettre à jour le bouton
        const btn = document.getElementById('lang-btn');
        if (btn) {
            btn.textContent = this.currentLang === 'es' ? 'FR' : 'ES';
        }
        
        // Recharger le contenu
        this.updateLanguage();
        this.renderArticles();
        
        console.log(`🌍 Langue changée: ${this.currentLang}`);
    },

    updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    },

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`⚠️ Traduction manquante: ${key}`);
                return null;
            }
        }
        
        return translation;
    },

    // ========== BULLES DE RÉFLEXION ==========
    newBubble() {
        const bubble = document.getElementById('bubble-content');
        if (!bubble) return;
        
        const bubbles = this.bubbles[this.currentLang];
        const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
        
        bubble.style.opacity = '0';
        bubble.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            bubble.textContent = `"${randomBubble}"`;
            bubble.style.opacity = '1';
        }, 300);
        
        console.log('💭 Nouvelle bulle affichée');
    },

    // ========== FORMULAIRE DE CONTACT ==========
    handleContactForm(event) {
        event.preventDefault();
        
        // Simulation d'envoi
        const button = event.target.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
        button.disabled = true;
        
        setTimeout(() => {
            alert(this.currentLang === 'fr' ? 
                'Message envoyé avec succès ! Je vous répondrai bientôt.' :
                'Mensaje enviado con éxito! Te responderé pronto.');
            
            event.target.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        
        console.log('📧 Formulaire de contact soumis');
    }
};

// ========== FONCTIONS GLOBALES ==========
window.showPage = (page) => simpleBlog.showPage(page);
window.toggleLanguage = () => simpleBlog.toggleLanguage();
window.newBubble = () => simpleBlog.newBubble();
window.handleContactForm = (event) => simpleBlog.handleContactForm(event);

// ========== AUTO-INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 DOM chargé, initialisation SimpleBlog...');
    simpleBlog.init();
});

console.log('📦 SimpleBlog module chargé');
