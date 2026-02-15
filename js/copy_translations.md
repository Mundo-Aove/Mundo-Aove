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
            tech: "Tech & Infra",
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

        // Page Tech & Infrastructure (Nouveau)
        tech: {
            main_title: "Ingeniería al servicio <br><span class='italic text-[#C5A059]'>de la Tierra.</span>",
            main_subtitle: "El ecosistema Maverick: una arquitectura soberana, desconectada de la nube, para una trazabilidad total desde el suelo hasta la botella.",
            pillar1_title: "Maverick OS",
            pillar1_desc: "Sistema operativo propietario 'Local-First'. Gestión de producción sin dependencia de los gigantes de la nube. Resiliencia total en zonas sin conexión.",
            pillar1_spec1: "Latencia Cero (Edge)",
            pillar1_spec2: "Soberanía de datos",
            pillar1_spec3: "Auditoría de Hardware",
            pillar2_title: "Geo-Tech Audit",
            pillar2_desc: "Cartografía de alta precisión mediante drones y GNSS. Cada olivo es un dato de inventario único, auditado en tiempo real para inversores.",
            pillar2_btn: "VER EL MAPA",
            pillar3_title: "Mundo-App",
            pillar3_desc: "Interfaz unificada para ingenieros de campo y propietarios. Monitoreo de salud de cultivos y seguimiento logístico cifrado.",
            footer_info: "© 2026 Mundo-AOVE Industrial Division — Austin / Spain"
        },
        
        maverick: {
            badge: "🫒 Sistema operativo de negocio",
            title: "Maverick <span class='text-[#C5A059]'>Engine</span>",
            subtitle: "El sistema operativo de negocio para almazaras<br>Soberano, flexible, económico.",
            problem_text: "¿Gestiona la recepción, producción, envasado y trazabilidad con herramientas no diseñadas para usted? Hojas de cálculo, cuadernos de papel, soluciones SaaS genéricas… cada enfoque tiene sus límites: múltiples ingresos de datos, pérdida de información, suscripciones costosas, dependencia de un proveedor.",
            solution_intro: "Maverick Engine cambia las reglas del juego.",
            solution_desc: "Es un sistema operativo de negocio, diseñado para funcionar en una simple Raspberry Pi (80 €), que digitaliza sus procesos sin encerrarlo en la nube o una suscripción.",
            problem_title: "El problema de las soluciones actuales",
            table_tool: "Herramienta",
            table_limit: "Limitaciones",
            table_excel: "Hojas de cálculo",
            table_excel_desc: "Múltiples archivos, errores de entrada, falta de trazabilidad, difícil de compartir.",
            table_saas: "SaaS",
            table_saas_desc: "Suscripción mensual, datos alojados por un tercero, dependencia de internet, imposibilidad de personalizar profundamente.",
            table_turnkey: "Soluciones llave en mano",
            table_turnkey_desc: "A menudo demasiado rígidas, costosas, requieren un servidor dedicado y conocimientos informáticos.",
            advantages_title: "Ventajas de Maverick Engine",
            adv1_t: "Soberanía total",
            adv1_d: "Sin nube impuesta. Sus datos permanecen en su hardware. Base de datos SQLite ultra robusta, incluso tras un corte de luz.",
            adv2_t: "Cero suscripción",
            adv2_d: "Una vez instalado, sin licencia mensual. Hardware por 80 €, evoluciones a la carta.",
            adv3_t: "Adaptabilidad sin recompilación",
            adv3_d: "Cada formulario es un simple archivo HTML. Modifique, añada, exporte sin depender de un proveedor.",
            adv4_t: "Trazabilidad completa",
            adv4_d: "Cada entrada tiene fecha, hora y firma. Historial exhaustivo, alertas Telegram opcionales.",
            adv5_t: "Multipuesto y multilenguaje",
            adv5_d: "Accesible desde cualquier navegador en la red local. Interfaz en FR/ES/EN, seleccionable con un clic.",
            adv6_t: "Infraestructura ultraligera",
            adv6_d: "Binario único en Go, arranque en segundos. Perfecto para entornos difíciles (polvo, calor).",
            how_title: "¿Cómo funciona?",
            step1_t: "Auditoría",
            step1_d: "Análisis de sus flujos: recepción, producción, envasado…",
            step2_t: "Formularios",
            step2_d: "Creación de páginas HTML a medida + exportaciones (PDF, Excel).",
            step3_t: "Instalación",
            step3_d: "Raspberry Pi preconfigurada colocada en su taller, conectada a la red local.",
            step4_t: "Formación",
            step4_d: "Acceso vía http://maverick.local, cuentas personales, ingreso inmediato.",
            step5_t: "Evoluciones",
            step5_d: "Nuevos formularios o exportaciones bajo demanda, usted se lleva la herramienta actualizada.",
            compare_title: "Lo que cambia concretamente",
            before: "Antes",
            before1: "📄 Ingresos en papel o Excel, múltiples reingresos",
            before2: "🔍 Sin trazabilidad fiable",
            before3: "⏳ Dificultad para recuperar historial",
            before4: "📤 Exportación manual para contabilidad",
            before5: "🚫 Sin alertas en caso de anomalía",
            before6: "🔒 Dependencia de proveedor o suscripción",
            after: "Después de Maverick Engine",
            after1: "✅ Ingreso único, directamente en base de datos",
            after2: "🔐 Cada operación es firmada y fechada",
            after3: "⚡ Búsqueda instantánea por lote, proveedor, fecha",
            after4: "📊 Generación automática de archivos Excel",
            after5: "📲 Notificaciones Telegram (opcionales)",
            after6: "🏠 Sistema libre, sin cánones, usted es propietario",
            target_title: "¿Para quién?",
            target_desc: "Almazaras (artesanales o cooperativas), productores que deseen trazar sus lotes, talleres de envasado, cualquier organización harta de soluciones en la nube costosas e inflexibles.",
            cta_title: "¿Y después?",
            cta_desc: "No vendemos un producto terminado, construimos su herramienta a medida. Contáctenos para una primera charla sin compromiso."
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
            tech: "Tech & Infra",
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

        // Page Tech & Infrastructure (Nouveau)
        tech: {
            main_title: "L'Ingénierie au service <br><span class='italic text-[#C5A059]'>de la Terre.</span>",
            main_subtitle: "L'écosystème Maverick : une architecture souveraine, déconnectée du cloud, pour une traçabilité totale du sol à la bouteille.",
            pillar1_title: "Maverick OS",
            pillar1_desc: "Système d'exploitation propriétaire 'Local-First'. Gestion de production sans dépendance aux géants du Cloud. Résilience totale en zone blanche.",
            pillar1_spec1: "Latence Zéro (Edge)",
            pillar1_spec2: "Souveraineté des données",
            pillar1_spec3: "Audit Hardware custom",
            pillar2_title: "Geo-Tech Audit",
            pillar2_desc: "Cartographie haute précision par drone et GNSS. Chaque olivier est une donnée d'inventaire unique, auditée en temps réel pour nos investisseurs.",
            pillar2_btn: "VOIR LA CARTE",
            pillar3_title: "Mundo-App",
            pillar3_desc: "Interface unifiée pour les ingénieurs de terrain et les propriétaires. Monitoring de santé des cultures et suivi logistique chiffré.",
            footer_info: "© 2026 Mundo-AOVE Industrial Division — Austin / Spain"
        },
        
        maverick: {
            badge: "🫒 Système d’exploitation métier",
            title: "Maverick <span class='text-[#C5A059]'>Engine</span>",
            subtitle: "Le système d’exploitation métier pour les moulins à huile<br> Souverain, flexible, économique.",
            problem_text: "Vous gérez la réception, la production, le conditionnement et la traçabilité avec des outils qui ne sont pas faits pour vous ? Excel, carnets papier, solutions SaaS génériques… chacune de ces approches a ses limites : saisies multiples, perte de données, abonnements coûteux, dépendance à un éditeur.",
            solution_intro: "Maverick Engine change la donne.",
            solution_desc: "C’est un système d’exploitation métier, conçu pour tourner sur un simple Raspberry Pi (80 €), qui digitalise vos process sans vous enfermer dans un cloud ou un abonnement.",
            problem_title: "Le problème des solutions actuelles",
            table_tool: "Outil",
            table_limit: "Limites",
            table_excel: "Tableurs",
            table_excel_desc: "Fichiers multiples, erreurs de saisie, absence de traçabilité, difficulté à partager.",
            table_saas: "SaaS",
            table_saas_desc: "Abonnement mensuel, données hébergées chez un tiers, dépendance à une connexion internet, impossibilité de personnaliser profondément.",
            table_turnkey: "Solutions clé en main",
            table_turnkey_desc: "Souvent trop rigides, coûteuses, nécessitent un serveur dédié et des compétences informatiques.",
            advantages_title: "Les atouts de Maverick Engine",
            adv1_t: "Souveraineté totale",
            adv1_d: "Aucun cloud imposé. Vos données restent sur votre matériel. Base SQLite ultra‑robuste, même en cas de coupure.",
            adv2_t: "Zéro abonnement",
            adv2_d: "Une fois installé, plus de licence mensuelle. Matériel à 80 €, évolutions facturées à la carte.",
            adv3_t: "Adaptabilité sans recompilation",
            adv3_d: "Chaque formulaire est un simple fichier HTML. Modifiez, ajoutez, exportez sans dépendre d’un éditeur.",
            adv4_t: "Traçabilité complète",
            adv4_d: "Chaque saisie est horodatée et signée. Historique exhaustif, alertes Telegram optionnelles.",
            adv5_t: "Multi‑poste & multi‑langue",
            adv5_d: "Accessible depuis tout navigateur sur le réseau local. Interface en FR/ES/EN, sélectionnable en un clic.",
            adv6_t: "Infrastructure ultra‑légère",
            adv6_d: "Binaire unique en Go, démarrage en secondes. Parfait pour environnements difficiles (poussière, chaleur).",
            how_title: "Comment ça fonctionne ?",
            step1_t: "Audit",
            step1_d: "Analyse de vos flux : réception, production, conditionnement…",
            step2_t: "Formulaires",
            step2_d: "Création des pages HTML sur mesure + exports (PDF, Excel).",
            step3_t: "Installation",
            step3_d: "Raspberry Pi préconfiguré posé dans l’atelier, connecté au réseau.",
            step4_t: "Formation",
            step4_d: "Accès via http://maverick.local, comptes personnels, saisie immédiate.",
            step5_t: "Évolutions",
            step5_d: "Nouveaux formulaires ou exports à la carte, vous repartez avec l’outil mis à jour.",
            compare_title: "Ce qui change concrètement",
            before: "Avant",
            before1: "📄 Saisies papier ou Excel, ressaisies multiples",
            before2: "🔍 Pas de traçabilité fiable",
            before3: "⏳ Difficulté à retrouver un historique",
            before4: "📤 Export manuel pour la compta",
            before5: "🚫 Pas d’alertes en cas d’anomalie",
            before6: "🔒 Dépendance à un éditeur ou abonnement",
            after: "Après Maverick Engine",
            after1: "✅ Saisie unique, directement en base",
            after2: "🔐 Chaque opération est signée et horodatée",
            after3: "⚡ Recherche instantanée par lot, fournisseur, date",
            after4: "📊 Génération automatique de fichiers Excel",
            after5: "📲 Notifications Telegram (optionnelles)",
            after6: "🏠 Système libre, sans redevance, que vous possédez",
            target_title: "Pour qui ?",
            target_desc: "Moulins à huile (artisanaux ou coopératives), producteurs souhaitant tracer leurs lots, ateliers de conditionnement, toute structure qui en a assez des solutions cloud coûteuses et peu flexibles.",
            cta_title: "Et après ?",
            cta_desc: "Nous ne vendons pas un produit fini, nous construisons votre outil sur mesure. Contactez‑nous pour un premier échange sans engagement."
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
    },
    en: {
        // Navigation
        nav: {
            blog: 'Blog',
            carte: 'Ancient Olive Trees',
            about: 'About',
            tech: "Tech & Infra",
            contact: 'Contact'
        },

        // Page Tech & Infrastructure (Nouveau)
        tech: {
            main_title: "Engineering at the service <br><span class='italic text-[#C5A059]'>of the Earth.</span>",
            main_subtitle: "The Maverick ecosystem: a sovereign architecture, cloud-independent, for total traceability from soil to bottle.",
            pillar1_title: "Maverick OS",
            pillar1_desc: "Proprietary 'Local-First' OS. Production management without dependence on Cloud giants. Total resilience in offline areas.",
            pillar1_spec1: "Zero Latency (Edge)",
            pillar1_spec2: "Data Sovereignty",
            pillar1_spec3: "Hardware Auditing",
            pillar2_title: "Geo-Tech Audit",
            pillar2_desc: "High-precision mapping via drone and GNSS. Each olive tree is a unique inventory data point, audited in real-time for investors.",
            pillar2_btn: "VIEW THE MAP",
            pillar3_title: "Mundo-App",
            pillar3_desc: "Unified interface for field engineers and owners. Crop health monitoring and encrypted logistics tracking.",
            footer_info: "© 2026 Mundo-AOVE Industrial Division — Austin / Spain"
        },

        maverick: {
            badge: "🫒 Business Operating System",
            title: "Maverick <span class='text-[#C5A059]'>Engine</span>",
            subtitle: "The business operating system for oil mills<br>Sovereign, flexible, cost‑effective.",
            problem_text: "Do you manage reception, production, packaging and traceability with tools not designed for you? Spreadsheets, paper notebooks, generic SaaS solutions… each approach has its limits: multiple data entries, data loss, expensive subscriptions, vendor lock‑in.",
            solution_intro: "Maverick Engine changes the game.",
            solution_desc: "It is a business operating system, designed to run on a simple Raspberry Pi (€80), that digitises your processes without locking you into the cloud or a subscription.",
            problem_title: "The problem with current solutions",
            table_tool: "Tool",
            table_limit: "Limitations",
            table_excel: "Spreadsheets",
            table_excel_desc: "Multiple files, entry errors, lack of traceability, difficult to share.",
            table_saas: "SaaS",
            table_saas_desc: "Monthly subscription, data hosted by a third party, internet dependency, impossible to deeply customise.",
            table_turnkey: "Turnkey solutions",
            table_turnkey_desc: "Often too rigid, expensive, require a dedicated server and IT skills.",
            advantages_title: "Maverick Engine advantages",
            adv1_t: "Total sovereignty",
            adv1_d: "No imposed cloud. Your data stays on your hardware. Ultra‑robust SQLite database, even after a power cut.",
            adv2_t: "Zero subscription",
            adv2_d: "Once installed, no monthly licence. Hardware for €80, pay‑as‑you‑go evolutions.",
            adv3_t: "Adaptability without recompilation",
            adv3_d: "Each form is a simple HTML file. Modify, add, export without depending on a vendor.",
            adv4_t: "Full traceability",
            adv4_d: "Every entry is timestamped and signed. Complete history, optional Telegram alerts.",
            adv5_t: "Multi‑device & multi‑language",
            adv5_d: "Accessible from any browser on the local network. Interface in FR/ES/EN, switchable with one click.",
            adv6_t: "Ultra‑light infrastructure",
            adv6_d: "Single Go binary, starts in seconds. Perfect for harsh environments (dust, heat).",
            how_title: "How does it work?",
            step1_t: "Audit",
            step1_d: "Analysis of your workflows: reception, production, packaging…",
            step2_t: "Forms",
            step2_d: "Creation of custom HTML pages + exports (PDF, Excel).",
            step3_t: "Installation",
            step3_d: "Pre‑configured Raspberry Pi placed in your workshop, connected to the local network.",
            step4_t: "Training",
            step4_d: "Access via http://maverick.local, personal accounts, immediate data entry.",
            step5_t: "Evolutions",
            step5_d: "New forms or exports on demand, you leave with the updated tool.",
            compare_title: "What actually changes",
            before: "Before",
            before1: "📄 Paper or Excel entries, multiple re‑entries",
            before2: "🔍 No reliable traceability",
            before3: "⏳ Difficult to retrieve history",
            before4: "📤 Manual export for accounting",
            before5: "🚫 No alerts in case of anomaly",
            before6: "🔒 Vendor or subscription dependency",
            after: "After Maverick Engine",
            after1: "✅ Single entry, directly into the database",
            after2: "🔐 Every operation is signed and timestamped",
            after3: "⚡ Instant search by batch, supplier, date",
            after4: "📊 Automatic Excel file generation",
            after5: "📲 Optional Telegram notifications",
            after6: "🏠 Free system, no royalties, you own it",
            target_title: "Who is it for?",
            target_desc: "Oil mills (artisan or cooperative), producers wanting to trace their batches, packaging workshops, any organisation tired of expensive and inflexible cloud solutions.",
            cta_title: "What's next?",
            cta_desc: "We don't sell a finished product, we build your custom tool. Contact us for a first no‑obligation discussion."
        },

        home: {
            title: 'Mundo Aove Peru Blog',
            bubbles_title: 'Weekly Reflections',
            new_bubble: 'New reflection',
            loading: 'Loading articles...',
            rss_title: "International Olive Oil News",
            rss_loading: "Loading RSS news...",
            refresh_rss: "Refresh",
            rss_source: "Source",
            rss_updated: "Updated on",
            rss_error: "RSS loading error",
            rss_read_more: "Read full article",
            rss_next: "Next"
        },
        carte: {
            title: 'Ancient Olive Trees of Tacna & Moquegua',
            description: 'Discover our inventory of ancient olive trees in Southern Peru. Each tree tells a story of Peruvian olive heritage.',
            map_title: 'Interactive Map',
            total_trees: '🫒 67 registered trees',
            last_update: 'Last update: 07/22/2025',
            loading: 'Loading map...',
            legend_title: 'Legend',
            legend: {
                excellent: 'Excellent condition (8-10/10)',
                good: 'Good condition (6-7/10)',
                poor: 'Concerning condition (1-5/10)'
            }
        },
        about: {
            title: 'Alejandra Galván Gómez',
            bio1: 'Licensed and certified Food Industry Engineer with an Official Master’s degree in Olive Growing and Olive Oil obtained in Spain. She has over 12 years of experience in the Olive Oil sector, specializing in Quality Assurance, Quality Management, and production, leading both national and international quality audits and certifications.',
            bio2: 'Co-author of the first children’s book in Peru, "Learning from the Peruvian Olive Tree," which won 1st place worldwide in the "Book for Children" category at the Gourmand World Cookbook Awards 2023 in Umeå, Sweden. She also serves as an international jury member for olive oil competitions. Currently, she is working on the "Olive Project" at the Regional Directorate of Agriculture in Tacna.',
            specialties_title: 'Specialties:',
            spec1: 'Sensory analysis (tasting)',
            spec2: 'Technical assistance and consultancy in oil and olive production',
            spec3: 'Extra virgin olive oil production management',
            spec4: 'Expert assistance in creating olive oil blends',
            spec5: 'Development and implementation of BPM, POES, PGH, and HACCP manuals',
            spec6: 'Advisory services for obtaining sanitary registrations'
        },
        contact: {
            title: 'Contact',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send Message'
        },
        article: {
            back: 'Back to articles',
            read_more: 'Read more',
            gallery: 'Photo Gallery'
        },
        footer: {
            description: 'Agri-food engineer specialized in Peruvian olive growing and sustainable farming practices.',
            navigation: 'Navigation',
            follow: 'Follow me',
            rights: 'All rights reserved'
        },
        bubbles: [
            "Tacna region is home to some of the oldest olive groves in Peru.",
            "Cold pressing techniques preserve the delicate aromas of EVOO.",
            "Trials are underway in Moquegua to adapt European varieties to Peru."
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