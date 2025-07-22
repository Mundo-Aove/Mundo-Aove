// ================================
// SYSTÈME DE TRADUCTIONS EXTERNALISÉ
// ================================

const translations = {
    es: {
        // Navigation
        home: 'Blog',
        about: 'Sobre mí',
        carte: "Olivos Centenarios",
        contact: 'Contacto',
        
        // Page d'accueil
        blogTitle: 'Blog de Oleicultura Peruana',
        weeklyReflections: 'Reflexiones de la Semana',
        newThought: 'Nueva reflexión',
        readMore: 'Leer más →',
        backToArticles: '← Volver a los artículos',
        
        // Page À propos
        aboutTitle: 'Alejandra Galván Gómez',
        aboutDescription1: 'Diplômée de l’Universidad Nacional Jorge Basadre Grohmann (Pérou) et de l’Universidad Nacional de Jaén (Espagne), je me suis spécialisée dans la production d’huile d’olive et le traitement des olives de table au Pérou.',
        aboutDescription2: 'Diplômée de l’Universidad Nacional Jorge Basadre Grohmann (Pérou) et de l’Universidad Nacional de Jaén (Espagne), je me suis spécialisée dans la production d’huile d’olive et le traitement des olives de table au Pérou.',
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
        emailText: 'O por email:',
        
        // Bulles de réflexion
        bubbles: [
            "La cosecha 2025 se perfila excepcional con un aumento del 30% en la producción.",
            "Las nuevas variedades adaptadas al clima peruano muestran excelente resistencia.",
            "La exportación de aceite de oliva peruano alcanza nuevos mercados asiáticos.",
            "Los métodos de cultivo orgánico ganan popularidad entre los productores.",
            "El festival anual del olivo se realizará en Tacna en octubre.",
            "La certificación orgánica abre nuevas oportunidades de exportación.",
            "Técnicas ancestrales combinadas con tecnología moderna revolucionan el sector."
        ]
    },
    
    fr: {
        // Navigation
        home: 'Blog',
        about: 'À propos',
        carte: "Oliviers Centenaires",
        contact: 'Contact',
        
        // Page d'accueil
        blogTitle: 'Blog de Oléiculture Péruvienne',
        weeklyReflections: 'Réflexions de la Semaine',
        newThought: 'Nouvelle réflexion',
        readMore: 'Lire plus →',
        backToArticles: '← Retour aux articles',
        
        // Page À propos
        aboutTitle: 'Alejandra Galván Gómez',
        aboutDescription1: 'Diplômée de l’Universidad Nacional Jorge Basadre Grohmann (Pérou) et de l’Universidad Nacional de Jaén (Espagne), je me suis spécialisée dans la production d’huile d’olive et le traitement des olives de table au Pérou.',
        aboutDescription2: 'Diplômée de l’Universidad Nacional Jorge Basadre Grohmann (Pérou) et de l’Universidad Nacional de Jaén (Espagne), je me suis spécialisée dans la production d’huile d’olive et le traitement des olives de table au Pérou.',
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
        emailText: 'Ou par email :',
        
        // Bulles de réflexion
        bubbles: [
            "La récolte 2025 s'annonce exceptionnelle avec une augmentation de 30% de la production.",
            "Les nouvelles variétés adaptées au climat péruvien montrent une excellente résistance.",
            "L'exportation d'huile d'olive péruvienne atteint de nouveaux marchés asiatiques.",
            "Les méthodes de culture biologiques gagnent en popularité parmi les producteurs.",
            "Le festival annuel de l'olive aura lieu à Tacna en octobre.",
            "La certification biologique ouvre de nouvelles opportunités d'exportation.",
            "Les techniques ancestrales combinées à la technologie moderne révolutionnent le secteur."
        ]
    }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}