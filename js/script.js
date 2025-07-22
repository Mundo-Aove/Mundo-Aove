// ================================
// CONFIGURATION MULTILINGUE COMPLÈTE
// ================================

const translations = {
    es: {
        // Navigation
        home: 'Blog',
        about: 'Sobre mí',
        contact: 'Contacto',
        
        // Page d'accueil
        blogTitle: 'Blog de Oleicultura Peruana',
        weeklyReflections: 'Reflexiones de la Semana',
        newThought: 'Nueva reflexión',
        readMore: 'Leer más →',
        backToArticles: '← Volver a los artículos',
        
        // Page À propos
        aboutTitle: 'Alejandra Galván Gómez',
        aboutDescription1: 'Ingeniera agroalimentaria especializada en oleicultura peruana con más de 10 años de experiencia en el desarrollo de métodos sostenibles de cultivo de oliva.',
        aboutDescription2: 'Graduada de la Universidad Nacional Agraria La Molina, he dedicado mi carrera a mejorar las prácticas agrícolas en las regiones áridas del Perú.',
        specialties: 'Especialidades:',
        specialty1: 'Agricultura agroecológica',
        specialty2: 'Gestión de la fertilidad del suelo',
        specialty3: 'Producción de aceite de oliva extra virgen',
        specialty4: 'Desarrollo de variedades adaptadas al clima peruano',
        
        // Contact
        contactTitle: 'Contacto',
        nameLabel: 'Nombre',
        emailLabel: 'Email',
        messageLabel: 'Mensaje',
        sendButton: 'Enviar',
        emailText: 'O por email:'
    },
    
    fr: {
        // Navigation
        home: 'Blog',
        about: 'À propos',
        contact: 'Contact',
        
        // Page d'accueil
        blogTitle: 'Blog de Oléiculture Péruvienne',
        weeklyReflections: 'Réflexions de la Semaine',
        newThought: 'Nouvelle réflexion',
        readMore: 'Lire plus →',
        backToArticles: '← Retour aux articles',
        
        // Page À propos
        aboutTitle: 'Alejandra Galván Gómez',
        aboutDescription1: 'Ingénieure agroalimentaire spécialisée dans l\'oléiculture péruvienne avec plus de 10 ans d\'expérience dans le développement de méthodes durables de culture de l\'olive.',
        aboutDescription2: 'Diplômée de l\'Universidad Nacional Agraria La Molina, j\'ai consacré ma carrière à l\'amélioration des pratiques agricoles dans les régions arides du Pérou.',
        specialties: 'Spécialités :',
        specialty1: 'Agriculture agroécologique',
        specialty2: 'Gestion de la fertilité des sols',
        specialty3: 'Production d\'huile d\'olive extra vierge',
        specialty4: 'Développement de variétés adaptées au climat péruvien',
        
        // Contact
        contactTitle: 'Contact',
        nameLabel: 'Nom',
        emailLabel: 'Email',
        messageLabel: 'Message',
        sendButton: 'Envoyer',
        emailText: 'Ou par email :'
    }
};

// ================================
// TEXTES DES BULLES DE RÉFLEXION
// ================================

const bubbleTexts = {
    es: [
        "La cosecha 2025 se perfila excepcional con un aumento del 30% en la producción.",
        "Las nuevas variedades adaptadas al clima peruano muestran excelente resistencia.",
        "La exportación de aceite de oliva peruano alcanza nuevos mercados asiáticos.",
        "Los métodos de cultivo orgánico ganan popularidad entre los productores.",
        "El festival anual del olivo se realizará en Tacna en octubre.",
        "La certificación orgánica abre nuevas oportunidades de exportación.",
        "Técnicas ancestrales combinadas con tecnología moderna revolucionan el sector."
    ],
    fr: [
        "La récolte 2025 s'annonce exceptionnelle avec une augmentation de 30% de la production.",
        "Les nouvelles variétés adaptées au climat péruvien montrent une excellente résistance.",
        "L'exportation d'huile d'olive péruvienne atteint de nouveaux marchés asiatiques.",
        "Les méthodes de culture biologiques gagnent en popularité parmi les producteurs.",
        "Le festival annuel de l'olive aura lieu à Tacna en octobre.",
        "La certification biologique ouvre de nouvelles opportunités d'exportation.",
        "Les techniques ancestrales combinées à la technologie moderne révolutionnent le secteur."
    ]
};

// ================================
// DONNÉES DES ARTICLES (avec Markdown)
// ================================

const articlesData = {
    es: [
        {
            id: 1,
            title: "Revisión de la cosecha de olivos en Ica",
            date: "2025-07-22",
            author: "Alejandra Galván Gómez",
            excerpt: "La temporada de cosecha este año ha estado marcada por un clima irregular, pero los resultados son prometedores para el futuro de la oleicultura peruana.",
            content: `# Revisión de la cosecha de olivos en Ica

**Publicado el:** 22 de julio de 2025  
**Autora:** Alejandra Galván Gómez

La temporada de cosecha este año ha estado marcada por un clima irregular, pero los resultados son prometedores para el futuro de la oleicultura peruana.

## Datos destacados de la temporada

- **Variedades destacadas:** Sevillana y Arbequina
- **Producción promedio:** 1,800 kg/ha (incremento del 15% vs. 2024)
- **Calidad del aceite:** Extra virgen en 85% de la producción
- **Observaciones:** Mejora notable con fertilización orgánica

> "Estamos viendo un cambio de paradigmas en el manejo agroecológico del olivo. Los productores que adoptaron técnicas sostenibles muestran mejores resultados tanto en cantidad como en calidad."

### Metodología aplicada

Los campos evaluados implementaron técnicas de **agricultura regenerativa**, incluyendo:

1. **Compostaje in situ** - Reducción de residuos del 90%
2. **Manejo integrado de plagas** - Disminución del uso de pesticidas en 70%
3. **Sistemas de riego por goteo optimizados** - Ahorro de agua del 40%
4. **Análisis de suelo trimestral** - Monitoreo continuo de nutrientes

### Desafíos enfrentados

El **fenómeno El Niño** afectó inicialmente el desarrollo de los frutos, pero las variedades adaptadas resistieron mejor las condiciones adversas.

### Conclusiones y proyecciones

Los resultados demuestran que la combinación de técnicas tradicionales con innovaciones tecnológicas produce los mejores resultados en nuestro clima árido costero.

**Para 2026 esperamos:**
- Incremento del 25% en la producción
- Expansión a 50 hectáreas adicionales
- Certificación orgánica para el 60% de los productores`,
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop"
        },
        {
            id: 2,
            title: "Nuevas técnicas de poda para olivos jóvenes",
            date: "2025-07-15",
            author: "Alejandra Galván Gómez",
            excerpt: "La poda correcta en los primeros años define la productividad futura del olivo. Descubre las técnicas más efectivas adaptadas al clima peruano.",
            content: `# Nuevas técnicas de poda para olivos jóvenes

**Publicado el:** 15 de julio de 2025  
**Autora:** Alejandra Galván Gómez

La poda correcta en los primeros años define la productividad futura del olivo. Un árbol bien formado puede producir hasta 40% más aceite durante su vida útil.

## Principios fundamentales de la poda

La poda de formación debe seguir estos principios esenciales:

- **Equilibrio:** Entre crecimiento vegetativo y productivo
- **Aireación:** Garantizar la circulación del aire para prevenir hongos
- **Iluminación:** Maximizar la exposición solar en todas las ramas
- **Estructura:** Crear un esqueleto fuerte que soporte la producción

### Técnicas recomendadas según el sistema

#### 1. Poda en vaso (tradicional)
Ideal para **climas secos** como el nuestro:
- Eliminación del eje central a los 60-80 cm
- Selección de 3-4 ramas principales
- Ángulo de 45° entre ramas

#### 2. Poda en eje central (intensivo)
Para **plantaciones de alta densidad**:
- Mantenimiento del líder central
- Ramas laterales cortas y renovables
- Facilita la mecanización

#### 3. Poda mixta (innovación peruana)
Combinando ambas técnicas:
- Adaptación a condiciones locales
- Flexibilidad según el crecimiento
- Resultados superiores en ensayos

### Calendario de poda

| Edad del árbol | Época ideal | Intensidad |
|---------------|-------------|------------|
| 1-2 años | Julio-Agosto | Ligera |
| 3-4 años | Junio-Julio | Moderada |
| 5+ años | Mayo-Junio | Según necesidad |

### Herramientas recomendadas

- **Tijeras de poda:** Para ramas menores a 2cm
- **Serrote curvo:** Para ramas de 2-5cm  
- **Motosierra pequeña:** Para ramas mayores
- **Desinfectante:** Alcohol al 70% entre árboles

> **Consejo profesional:** Siempre pode en luna menguante para reducir el flujo de savia y acelerar la cicatrización.`,
            image: "https://images.unsplash.com/photo-1611909023032-2d4b3c66d5b9?w=400&h=200&fit=crop"
        },
        {
            id: 3,
            title: "El futuro de la oleicultura sostenible en Tacna",
            date: "2025-07-10",
            author: "Alejandra Galván Gómez",
            excerpt: "Tacna se posiciona como líder en oleicultura sostenible. Conoce los proyectos que transformarán la región en los próximos años.",
            content: `# El futuro de la oleicultura sostenible en Tacna

**Publicado el:** 10 de julio de 2025  
**Autora:** Alejandra Galván Gómez

Tacna se consolida como el centro de innovación en oleicultura sostenible del Perú, con proyectos que prometen revolucionar el sector.

## Proyecto "Olivos del Desierto"

Una iniciativa pionera que busca cultivar olivos en zonas previamente consideradas improductivas.

### Tecnologías implementadas:
- **Riego por nebulización solar**
- **Sensores IoT para monitoreo continuo**
- **Variedades resistentes a la salinidad**

Los primeros resultados muestran una adaptación excepcional al entorno árido tacneño.`,
            image: "https://images.unsplash.com/photo-1595535572811-e9521e6f7b17?w=400&h=200&fit=crop"
        }
    ],
    
    fr: [
        {
            id: 1,
            title: "Révision de la récolte d'oliviers à Ica",
            date: "2025-07-22",
            author: "Alejandra Galván Gómez",
            excerpt: "La saison de récolte cette année a été marquée par un climat irrégulier, mais les résultats sont prometteurs pour l'avenir de l'oléiculture péruvienne.",
            content: `# Révision de la récolte d'oliviers à Ica

**Publié le :** 22 juillet 2025  
**Auteure :** Alejandra Galván Gómez

La saison de récolte cette année a été marquée par un climat irrégulier, mais les résultats sont prometteurs pour l'avenir de l'oléiculture péruvienne.

## Données importantes de la saison

- **Variétés remarquables :** Sevillana et Arbequina
- **Production moyenne :** 1 800 kg/ha (augmentation de 15% vs. 2024)
- **Qualité de l'huile :** Extra vierge pour 85% de la production
- **Observations :** Amélioration notable avec fertilisation organique

> "Nous assistons à un changement de paradigmes dans la gestion agroécologique de l'olivier. Les producteurs qui ont adopté des techniques durables montrent de meilleurs résultats tant en quantité qu'en qualité."

### Méthodologie appliquée

Les champs évalués ont implémenté des techniques d'**agriculture régénérative**, incluant :

1. **Compostage in situ** - Réduction des déchets de 90%
2. **Gestion intégrée des nuisibles** - Diminution de l'usage de pesticides de 70%
3. **Systèmes d'irrigation goutte à goutte optimisés** - Économie d'eau de 40%
4. **Analyse trimestrielle du sol** - Monitoring continu des nutriments

### Défis rencontrés

Le **phénomène El Niño** a initialement affecté le développement des fruits, mais les variétés adaptées ont mieux résisté aux conditions adverses.

### Conclusions et projections

Les résultats démontrent que la combinaison de techniques traditionnelles avec des innovations technologiques produit les meilleurs résultats dans notre climat aride côtier.

**Pour 2026 nous attendons :**
- Augmentation de 25% de la production
- Expansion à 50 hectares supplémentaires
- Certification biologique pour 60% des producteurs`,
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop"
        },
        {
            id: 2,
            title: "Nouvelles techniques de taille pour jeunes oliviers",
            date: "2025-07-15",
            author: "Alejandra Galván Gómez",
            excerpt: "La taille correcte dans les premières années définit la productivité future de l'olivier. Découvrez les techniques les plus efficaces adaptées au climat péruvien.",
            content: `# Nouvelles techniques de taille pour jeunes oliviers

**Publié le :** 15 juillet 2025  
**Auteure :** Alejandra Galván Gómez

La taille correcte dans les premières années définit la productivité future de l'olivier. Un arbre bien formé peut produire jusqu'à 40% plus d'huile durant sa vie utile.

## Principes fondamentaux de la taille

La taille de formation doit suivre ces principes essentiels :

- **Équilibre :** Entre croissance végétative et productive
- **Aération :** Garantir la circulation de l'air pour prévenir les champignons
- **Illumination :** Maximiser l'exposition solaire sur toutes les branches
- **Structure :** Créer un squelette fort qui supporte la production

### Techniques recommandées selon le système

#### 1. Taille en vase (traditionnelle)
Idéale pour les **climats secs** comme le nôtre :
- Élimination de l'axe central à 60-80 cm
- Sélection de 3-4 branches principales
- Angle de 45° entre les branches

#### 2. Taille en axe central (intensive)
Pour les **plantations de haute densité** :
- Maintien du leader central
- Branches latérales courtes et renouvelables
- Facilite la mécanisation

#### 3. Taille mixte (innovation péruvienne)
Combinant les deux techniques :
- Adaptation aux conditions locales
- Flexibilité selon la croissance
- Résultats supérieurs lors des essais

### Calendrier de taille

| Âge de l'arbre | Époque idéale | Intensité |
|---------------|---------------|-----------|
| 1-2 ans | Juillet-Août | Légère |
| 3-4 ans | Juin-Juillet | Modérée |
| 5+ ans | Mai-Juin | Selon besoin |

### Outils recommandés

- **Sécateur :** Pour branches inférieures à 2cm
- **Scie courbe :** Pour branches de 2-5cm
- **Petite tronçonneuse :** Pour branches supérieures
- **Désinfectant :** Alcool à 70% entre les arbres

> **Conseil professionnel :** Taillez toujours en lune décroissante pour réduire le flux de sève et accélérer la cicatrisation.`,
            image: "https://images.unsplash.com/photo-1611909023032-2d4b3c66d5b9?w=400&h=200&fit=crop"
        },
        {
            id: 3,
            title: "L'avenir de l'oléiculture durable à Tacna",
            date: "2025-07-10",
            author: "Alejandra Galván Gómez",
            excerpt: "Tacna se positionne comme leader en oléiculture durable. Découvrez les projets qui transformeront la région dans les années à venir.",
            content: `# L'avenir de l'oléiculture durable à Tacna

**Publié le :** 10 juillet 2025  
**Auteure :** Alejandra Galván Gómez

Tacna se consolide comme le centre d'innovation en oléiculture durable du Pérou, avec des projets qui promettent de révolutionner le secteur.

## Projet "Oliviers du Désert"

Une initiative pionnière qui cherche à cultiver des oliviers dans des zones précédemment considérées comme improductives.

### Technologies implémentées :
- **Irrigation par nébulisation solaire**
- **Capteurs IoT pour monitoring continu**
- **Variétés résistantes à la salinité**

Les premiers résultats montrent une adaptation exceptionnelle à l'environnement aride de Tacna.`,
            image: "https://images.unsplash.com/photo-1595535572811-e9521e6f7b17?w=400&h=200&fit=crop"
        }
    ]
};

// ================================
// VARIABLES GLOBALES
// ================================

let currentLang = 'fr';
let currentPage = 'home';
let currentArticles = articlesData[currentLang];

// ================================
// FONCTIONS PRINCIPALES
// ================================

// Changement de langue
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'fr' : 'es';
    document.getElementById('lang-btn').textContent = currentLang === 'es' ? 'FR' : 'ES';
    currentArticles = articlesData[currentLang];
    updateLanguage();
    loadArticles();
    
    // Log pour debugging
    console.log(`🌍 Langue changée vers: ${currentLang}`);
}

// Met à jour tous les textes de la page
function updateLanguage() {
    const t = translations[currentLang];
    
    // Met à jour tous les éléments avec data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Mise à jour spéciale pour les éléments plus complexes
    updateAboutPage(t);
    updateContactPage(t);
}

// Met à jour la page À propos
function updateAboutPage(t) {
    const aboutTitle = document.querySelector('#about-page h1');
    if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
    
    const aboutPs = document.querySelectorAll('#about-page p');
    if (aboutPs.length >= 2) {
        aboutPs[0].textContent = t.aboutDescription1;
        aboutPs[1].textContent = t.aboutDescription2;
    }
    
    const specialtiesTitle = document.querySelector('#about-page h3');
    if (specialtiesTitle) specialtiesTitle.textContent = t.specialties;
    
    const specialtiesList = document.querySelectorAll('#about-page li');
    if (specialtiesList.length >= 4) {
        specialtiesList[0].textContent = t.specialty1;
        specialtiesList[1].textContent = t.specialty2;
        specialtiesList[2].textContent = t.specialty3;
        specialtiesList[3].textContent = t.specialty4;
    }
}

// Met à jour la page Contact
function updateContactPage(t) {
    const contactTitle = document.querySelector('#contact-page h1');
    if (contactTitle) contactTitle.textContent = t.contactTitle;
    
    const labels = document.querySelectorAll('#contact-page label');
    if (labels.length >= 3) {
        labels[0].textContent = t.nameLabel;
        labels[1].textContent = t.emailLabel;
        labels[2].textContent = t.messageLabel;
    }
    
    const sendBtn = document.querySelector('#contact-page button[type="submit"]');
    if (sendBtn) sendBtn.textContent = t.sendButton;
    
    const emailP = document.querySelector('#contact-page p');
    if (emailP && emailP.querySelector('a')) {
        const emailLink = emailP.querySelector('a').outerHTML;
        emailP.innerHTML = `${t.emailText} ${emailLink}`;
    }
}

// Nouvelle bulle de réflexion
function newBubble() {
    const bubble = document.getElementById('bubble-content');
    const texts = bubbleTexts[currentLang];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    
    bubble.style.opacity = '0';
    setTimeout(() => {
        bubble.textContent = `"${randomText}"`;
        bubble.style.opacity = '1';
    }, 300);
    
    console.log('💭 Nouvelle bulle générée');
}

// Navigation entre les pages
function navigate(page) {
    const pages = ['home-page', 'about-page', 'contact-page', 'article-detail'];
    pages.forEach(p => {
        const element = document.getElementById(p);
        if (element) element.classList.add('hidden');
    });
    
    if (page === 'home') {
        document.getElementById('home-page').classList.remove('hidden');
        currentPage = 'home';
    } else if (page === 'about') {
        document.getElementById('about-page').classList.remove('hidden');
        currentPage = 'about';
    } else if (page === 'contact') {
        document.getElementById('contact-page').classList.remove('hidden');
        currentPage = 'contact';
    }
    
    console.log(`📄 Navigation vers: ${page}`);
}

// Charge et affiche les articles
function loadArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    const t = translations[currentLang];
    
    container.innerHTML = currentArticles.map(article => `
        <div class="article-card bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="${article.image}" 
                 alt="${article.title}" 
                 class="w-full h-48 object-cover"
                 loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop'">
            <div class="p-6">
                <h2 class="serif text-2xl mb-2 text-forest-green">${article.title}</h2>
                <p class="text-gray-600 text-sm mb-2">
                    <i class="fas fa-calendar-alt mr-1"></i>
                    ${formatDate(article.date)} · 
                    <i class="fas fa-user mr-1"></i>
                    ${article.author}
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">${article.excerpt}</p>
                <button onclick="showArticle(${article.id})" 
                        class="text-matte-gold hover:text-yellow-600 font-medium transition-colors duration-200 flex items-center">
                    ${t.readMore}
                    <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    console.log(`📚 ${currentArticles.length} articles chargés en ${currentLang}`);
}

// Affiche un article complet
function showArticle(articleId) {
    const article = currentArticles.find(a => a.id === articleId);
    if (!article) {
        console.error(`❌ Article ${articleId} non trouvé`);
        return;
    }
    
    // Convertit le Markdown en HTML si marked est disponible
    let htmlContent = article.content;
    if (typeof marked !== 'undefined') {
        try {
            htmlContent = marked.parse(article.content);
        } catch (error) {
            console.warn('⚠️ Erreur Markdown, affichage en texte brut:', error);
            htmlContent = article.content.replace(/\n/g, '<br>');
        }
    } else {
        // Fallback simple si marked n'est pas disponible
        htmlContent = article.content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    
    document.getElementById('article-content').innerHTML = htmlContent;
    
    // Navigation vers la page article
    const pages = ['home-page', 'about-page', 'contact-page'];
    pages.forEach(p => document.getElementById(p).classList.add('hidden'));
    document.getElementById('article-detail').classList.remove('hidden');
    
    // Scroll vers le haut
    window.scrollTo(0, 0);
    
    console.log(`📖 Article "${article.title}" affiché`);
}

// Formate la date selon la langue
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    try {
        if (currentLang === 'es') {
            return date.toLocaleDateString('es-ES', options);
        } else {
            return date.toLocaleDateString('fr-FR', options);
        }
    } catch (error) {
        console.warn('⚠️ Erreur formatage date:', error);
        return dateString; // Fallback
    }
}

// ================================
// INITIALISATION
// ================================

// Démarre l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Blog Alejandra Galván initialisé !');
    console.log(`📍 Version: 2.0 | Langue: ${currentLang} | Articles: ${articlesData[currentLang].length}`);
    
    try {
        // Charge les articles
        loadArticles();
        
        // Met à jour la langue
        updateLanguage();
        
        // Définit la langue initiale du bouton
        document.getElementById('lang-btn').textContent = 'ES';
        
        console.log('✅ Initialisation réussie !');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
    }
});

// ================================
// FONCTIONS UTILITAIRES
// ================================

// Ajouter un nouvel article (pour l'administration future)
function addNewArticle(articleData, lang = 'fr') {
    if (!articlesData[lang]) {
        articlesData[lang] = [];
    }
    
    const newId = Math.max(...articlesData[lang].map(a => a.id), 0) + 1;
    articleData.id = newId;
    articleData.date = articleData.date || new Date().toISOString().split('T')[0];
    
    articlesData[lang].push(articleData);
    
    if (currentLang === lang) {
        currentArticles = articlesData[currentLang];
        loadArticles();
    }
    
    console.log(`➕ Nouvel article ajouté: ${articleData.title} (${lang})`);
    return newId;
}

// Debug: afficher les statistiques
function showStats() {
    console.log('📊 Statistiques du blog:');
    console.log(`- Langue actuelle: ${currentLang}`);
    console.log(`- Page actuelle: ${currentPage}`);
    console.log(`- Articles ES: ${articlesData.es.length}`);
    console.log(`- Articles FR: ${articlesData.fr.length}`);
    console.log(`- Bulles ES: ${bubbleTexts.es.length}`);
    console.log(`- Bulles FR: ${bubbleTexts.fr.length}`);
}

// Exporter les fonctions pour utilisation globale
window.BlogApp = {
    toggleLanguage,
    navigate,
    newBubble,
    showArticle,
    addNewArticle,
    showStats,
    currentLang: () => currentLang,
    currentArticles: () => currentArticles
};

// Debug dans la console
console.log('🚀 BlogApp disponible globalement');
console.log('💡 Tapez "BlogApp.showStats()" pour voir les statistiques');