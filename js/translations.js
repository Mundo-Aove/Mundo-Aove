// ================================
// SYSTÈME DE TRADUCTIONS EXTERNALISÉ - VERSION COMPATIBLE
// ================================

const translations = {
    es: {
        // Navigation
        nav: {
            blog: 'Blog',
            carte: 'Olivos Centenarios', 
            about: 'Acerca de',
            contact: 'Contacto'
        },
        
        // Page d'accueil
        home: {
            title: 'Blog de Mundo Aove Peru',
            bubbles_title: 'Reflexiones de la Semana',
            new_bubble: 'Nueva reflexión',
            loading: 'Cargando artículos...',
            rss_title: "Noticias Oleícolas Internacionales",
            rss_loading: "Cargando noticias RSS...",
            refresh_rss: "Actualizar", 
            rss_source: "Fuente",
            rss_updated: "Actualizado el",
            rss_error: "Error al cargar RSS",
            rss_read_more: "Leer artículo completo",
            rss_next: "Siguiente"
        },
        
        // Page carte
        carte: {
            title: 'Olivos Centenarios de Tacna y Moquegua',
            description: 'Descubra nuestro inventario de olivos centenarios de la región sur del Perú. Cada árbol cuenta la historia de la olivicultura peruana. En colaboración con Sud Oliva.',
            map_title: 'Mapa Interactivo',
            total_trees: '🫒 67 olivos registrados',
            last_update: 'Última actualización: 22/07/2025',
            loading: 'Cargando el mapa...',
            legend_title: 'Leyenda',
            legend: {
                excellent: 'Excelente estado (8-10/10)',
                good: 'Buen estado (6-7/10)',
                poor: 'Estado preocupante (1-5/10)'
            }
        },
        
        // Page À propos
        about: {
            title: 'Alejandra Galván Gómez',
            bio1: 'Ingeniera colegiada y habilitada en Industrias Alimentarias con máster oficial en Olivar y Aceite de Oliva realizado en España, con mas de 12 años de experiencia en el rubro del Aceite de Oliva en el área de Aseguramiento, Gestión de la Calidad y producción, liderando auditorías y certificaciones nacionales e internacionales de calidad.',
            bio2: 'Coautora de primer libro para niños en Perú, "Aprendiendo del Olivo Peruano" el cual ganó el 1er puesto a nivel mundial en la categoría Book for children en el Gourmand World Cook Book Award 2023, organizado en Umea – Suecia. Participación como jurado internacional de concursos de aceite de oliva. Actualmente me encuentro trabajando en el Proyecto Olivo en la Dirección Regional de Agricultura de Tacna.',
            specialties_title: 'Especialidades:',
            spec1: 'Análisis sensoriales',
            spec2: 'Asistencia y consultoría en producción de aceite y aceitunas',
            spec3: 'Producción de aceite de oliva extra virgen',
            spec4: 'Asistencia en la creación de mezclas (blends)',
            spec5: 'Elaboración de manuales e implementación de BPM, POES, PGH, HACCP',
            spec6: 'Asesoría para obtención de registro sanitario'
        },
        
        // Page Contact
        contact: {
            title: 'Contacto'
        },
        
        // Article détail
        article: {
            back: 'Volver a los artículos'
        },
        
        // Footer
        footer: {
            description: 'Ingeniera agroalimentaria especializada en olivicultura peruana y prácticas agrícolas sostenibles.',
            navigation: 'Navegación',
            follow: 'Sígueme',
            rights: 'Todos los derechos reservados'
        },
        
        // Bulles de réflexion
        bubbles: [
            "La región de Tacna alberga algunos de los olivares más antiguos del Perú, con árboles de más de 200 años.",
            "Las técnicas de prensado en frío preservan los aromas delicados del aceite de oliva extra virgen.",
            "El cultivo de olivos en condiciones áridas requiere una gestión precisa del riego y la fertilidad del suelo.",
            "En Moquegua se están realizando ensayos para adaptar variedades europeas al clima peruano.",
            "La valorización de las aceitunas de mesa representa una oportunidad de diversificación para los pequeños productores locales."
        ]
    },
    
    fr: {
        // Navigation
        nav: {
            blog: 'Blog',
            carte: 'Oliviers Centenaires',
            about: 'À propos',
            contact: 'Contact'
        },
        
        // Page d'accueil
        home: {
            title: 'Blog de Mundo Aove Peru',
            bubbles_title: 'Réflexions de la Semaine',
            new_bubble: 'Nouvelle réflexion',
            loading: 'Chargement des articles...',
            rss_title: "Actualités Oléicoles Internationales",
            rss_loading: "Chargement des actualités RSS...",
            refresh_rss: "Actualiser",
            rss_source: "Source",
            rss_updated: "Mis à jour le",
            rss_error: "Erreur de chargement RSS",
            rss_read_more: "Lire l'article complet",
            rss_next: "Suivant" 
        },
        
        // Page carte
        carte: {
            title: 'Oliviers Centenaires de Tacna et Moquegua',
            description: 'Découvrez notre inventaire des oliviers centenaires de la région sud du Pérou. Chaque arbre raconte l\'histoire de l\'oléiculture péruvienne. En collaboration avec Sud Oliva.',
            map_title: 'Carte Interactive',
            total_trees: '🫒 67 oliviers recensés',
            last_update: 'Dernière mise à jour : 22/07/2025',
            loading: 'Chargement de la carte...',
            legend_title: 'Légende',
            legend: {
                excellent: 'Excellent état (8-10/10)',
                good: 'Bon état (6-7/10)',
                poor: 'État préoccupant (1-5/10)'
            }
        },
        
        // Page À propos
        about: {
            title: 'Alejandra Galván Gómez',
            bio1: 'Ingénieure agréée et habilitée en Industries Alimentaires avec master officiel en Oliviculture et Huile d\'Olive réalisé en Espagne, avec plus de 12 ans d\'expérience dans le secteur de l\'Huile d\'Olive dans le domaine de l\'Assurance, Gestion de la Qualité et production, dirigeant des audits et certifications nationales et internationales de qualité.',
            bio2: 'Co-auteure du premier livre pour enfants au Pérou, "Apprendre de l\'Olivier Péruvien" qui a remporté la 1ère place mondiale dans la catégorie Livre pour enfants au Gourmand World Cook Book Award 2023, organisé à Umeå – Suède. Participation comme jury international de concours d\'huile d\'olive. Actuellement je travaille sur le Projet Olivier à la Direction Régionale d\'Agriculture de Tacna.',
            specialties_title: 'Spécialités :',
            spec1: 'Analyses sensorielles',
            spec2: 'Assistance et conseil en production d\'huile et olives',
            spec3: 'Production d\'huile d\'olive extra vierge',
            spec4: 'Assistance à la création de mélanges (blends)',
            spec5: 'Élaboration de manuels et implémentation de BPM, POES, PGH, HACCP',
            spec6: 'Conseil pour l\'obtention d\'enregistrement sanitaire'
        },
        
        // Page Contact
        contact: {
            title: 'Contact'
        },
        
        // Article détail
        article: {
            back: 'Retour aux articles'
        },
        
        // Footer
        footer: {
            description: 'Ingénieure agroalimentaire spécialisée dans l\'oléiculture péruvienne et les pratiques agricoles durables.',
            navigation: 'Navigation',
            follow: 'Suivez-moi',
            rights: 'Tous droits réservés'
        },
        
        // Bulles de réflexion
        bubbles: [
            "La région de Tacna concentre certaines des plus anciennes oliveraies du Pérou, avec des arbres âgés de plus de 200 ans.",
            "Les techniques de pressage à froid permettent de préserver les arômes délicats de l'huile d'olive extra vierge.",
            "La culture d'oliviers en conditions arides exige une gestion précise de l'irrigation et de la fertilité des sols.",
            "Des essais sont en cours à Moquegua pour adapter des variétés européennes au climat péruvien.",
            "La valorisation des olives de table représente une opportunité de diversification pour les petits producteurs locaux."
        ]
    }
};

// Fonction utilitaire pour récupérer une traduction
function getTranslation(key, lang = 'es') {
    const keys = key.split('.');
    let translation = translations[lang];
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            console.warn(`⚠️ Traduction manquante: ${key} (${lang})`);
            return key;
        }
    }
    
    return translation;
}

// Export global
window.translations = translations;
window.getTranslation = getTranslation;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, getTranslation };
}

console.log('🌍 Système de traductions chargé - COMPATIBLE avec HTML existant');