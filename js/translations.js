// ================================
// SYSTÈME DE TRADUCTIONS EXTERNALISÉ
// Version corrigée pour correspondre aux data-translate du HTML
// ================================

const translations = {
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
            title: 'Blog de Oléiculture Péruvienne',
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
            title: 'Oliviers Centenaires de Tacna-Moquegua-Ilo',
            description: 'Découvrez notre inventaire des oliviers centenaires de la région sud du Pérou. Chaque arbre raconte l\'histoire de l\'oléiculture péruvienne.',
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
            bio1: 'Ingénieure agroalimentaire spécialisée dans l\'élaboration d\'huile d\'olive et la préparation d\'olives de table au Pérou, avec plus de 10 ans d\'expérience aussi bien nationale qu\'internationale.',
            bio2: 'Diplômée de l\'Universidad Nacional Jorge Basadre Grohmann (Pérou) et de l\'Universidad Nacional de Jaén (Espagne), je me suis spécialisée dans la production d\'huile d\'olive et le traitement des olives de table au Pérou.',
            specialties_title: 'Spécialités :',
            spec1: 'Analyses sensorielles',
            spec2: 'Assistance et consulting en production huile et olives',
            spec3: 'Production d\'huile d\'olive extra vierge',
            spec4: 'Assistance à la réalisation de blend'
        },
        
        // Page Contact
        contact: {
            title: 'Contact',
            name: 'Nom',
            email: 'Email',
            message: 'Message',
            placeholder: 'Votre message...',
            send: 'Envoyer le message',
            direct: 'Ou contactez-moi directement :'
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
            "La valorisation des olives de table représente une opportunité de diversification pour les petits producteurs locaux.",
            "En 2022, le Pérou a produit plus de 30 000 tonnes d'olives, principalement dans les régions de Tacna, Arequipa et Moquegua. (MINAGRI)",
            "La variété 'Sevillana' représente environ 80 % des cultures d'oliviers dans le sud du Pérou. (INIA Perú)",
            "Selon l'INIA, les techniques de taille formative augmentent jusqu'à 20 % la productivité des jeunes oliviers. (INIA)",
            "Les exportations péruviennes d'olives et d'huile d'olive ont atteint plus de 25 millions USD en 2023. (PROMPERÚ)",
            "La salinité des sols est un défi croissant pour l'olivier dans les vallées côtières péruviennes. (UNALM)"
        ]
    },
    
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
            title: 'Blog de Olivicultura Peruana',
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
            title: 'Olivos Centenarios de Tacna-Moquegua-Ilo',
            description: 'Descubra nuestro inventario de olivos centenarios de la región sur del Perú. Cada árbol cuenta la historia de la olivicultura peruana.',
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
            bio1: 'Ingeniera agroalimentaria especializada en la elaboración de aceite de oliva y en la preparación de aceitunas de mesa en el Perú, con más de 10 años de experiencia tanto a nivel nacional como internacional.',
            bio2: 'Graduada de la Universidad Nacional Jorge Basadre Grohmann (Perú) y de la Universidad Nacional de Jaén (España), me especialicé en la producción de aceite de oliva y en el tratamiento de aceitunas de mesa en el Perú.',
            specialties_title: 'Especialidades:',
            spec1: 'Análisis sensoriales',
            spec2: 'Asistencia y consultoría en producción de aceite y aceitunas',
            spec3: 'Producción de aceite de oliva extra virgen',
            spec4: 'Asistencia en la creación de mezclas (blends)'
        },
        
        // Page Contact
        contact: {
            title: 'Contacto',
            name: 'Nombre',
            email: 'Correo',
            message: 'Mensaje',
            placeholder: 'Su mensaje...',
            send: 'Enviar mensaje',
            direct: 'O contáctame directamente:'
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
            "La valorización de las aceitunas de mesa representa una oportunidad de diversificación para los pequeños productores locales.",
            "En 2022, Perú produjo más de 30 000 toneladas de aceitunas, principalmente en las regiones de Tacna, Arequipa y Moquegua. (MINAGRI)",
            "La variedad 'Sevillana' representa aproximadamente el 80 % del cultivo de olivos en el sur del Perú. (INIA Perú)",
            "Según el INIA, las técnicas de poda formativa aumentan hasta un 20 % la productividad de los olivos jóvenes. (INIA)",
            "Las exportaciones peruanas de aceitunas y aceite de oliva superaron los 25 millones de USD en 2023. (PROMPERÚ)",
            "La salinidad del suelo es un reto creciente para el olivo en los valles costeros peruanos. Se están ensayando soluciones con enmiendas orgánicas. (UNALM)"
        ]
    }
};

// Fonction utilitaire pour récupérer une traduction
function getTranslation(key, lang = 'fr') {
    const keys = key.split('.');
    let translation = translations[lang];
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            console.warn(`⚠️ Traduction manquante: ${key} (${lang})`);
            return key; // Retourne la clé si traduction non trouvée
        }
    }
    
    return translation;
}

// Export global
window.translations = translations;
window.getTranslation = getTranslation;

// Export pour modules si besoin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, getTranslation };
}

console.log('🌍 Système de traductions chargé avec structure hiérarchique');