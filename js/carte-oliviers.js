// ============================================
// Carte interactive des Oliviers Centenaires
// Version PRODUCTION - 67 points réels (Tacna)
// Garantie : pas de double init, pas d'erreur _leaflet_pos
// ============================================

const carteOliviers = {
    // ---------- ÉTAT INTERNE ----------
    map: null,
    markers: [],
    oliviers: [],
    currentLang: 'fr',
    isInitializing: false,
    isDestroyed: false,
    modalOpen: false,
    escHandler: null,
    initPromise: null,

    // ---------- CONFIGURATION ----------
    config: {
        center: [-18.15, -70.35],
        zoom: 10,
        minZoom: 8,
        maxZoom: 18,
        tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> | Oliviers Centenaires'
    },

    // ---------- STYLES SELON ÉTAT ----------
    markerStyles: {
        excellent: { fillColor: '#22c55e', icon: '🫒', label: { fr: 'Excellent', es: 'Excelente', en: 'Excellent' } },
        good:      { fillColor: '#eab308', icon: '🟡', label: { fr: 'Bon', es: 'Bueno', en: 'Good' } },
        poor:      { fillColor: '#ef4444', icon: '🔴', label: { fr: 'Préoccupant', es: 'Preocupante', en: 'Poor' } }
    },

    // ---------- LABELS MULTILANGUES ----------
    labels: {
        fr: {
            age: 'Âge', state: 'État', production: 'Production', owner: 'Propriétaire',
            details: 'Voir détails complets', generalInfo: 'Informations générales',
            location: 'Localisation', description: 'Description', characteristics: 'Caractéristiques',
            health: 'État sanitaire', contact: 'Contact propriétaire', variety: 'Variété',
            healthScore: 'Note état', planted: 'planté vers', visits: 'Pour visites sur rendez-vous',
            gps: 'GPS'
        },
        es: {
            age: 'Edad', state: 'Estado', production: 'Producción', owner: 'Propietario',
            details: 'Ver detalles completos', generalInfo: 'Información general',
            location: 'Localización', description: 'Descripción', characteristics: 'Características',
            health: 'Estado sanitario', contact: 'Contacto propietario', variety: 'Variedad',
            healthScore: 'Nota estado', planted: 'plantado hacia', visits: 'Para visitas con cita previa',
            gps: 'GPS'
        }
    },

    // ---------- INITIALISATION (UNE SEULE FOIS) ----------
    async init(force = false) {
        // Si la carte existe déjà et qu'on ne force pas, on redimensionne seulement
        if (this.map && !force) {
            console.log('🗺️ Carte déjà prête, simple resize');
            this.resize();
            return true;
        }

        // Évite les initialisations concurrentes
        if (this.isInitializing) {
            console.warn('⚠️ Initialisation déjà en cours, attente…');
            return this.initPromise;
        }

        this.isInitializing = true;
        this.isDestroyed = false;

        // On garde une promesse pour éviter les appels parallèles
        this.initPromise = this._doInit();
        return this.initPromise;
    },

    async _doInit() {
        const container = document.getElementById('carte-oliviers');
        if (!container) {
            console.error('❌ #carte-oliviers introuvable');
            this.isInitializing = false;
            return false;
        }

        try {
            // 1. Nettoyage complet de l'ancienne instance
            this.destroy();

            // 2. Chargement des données (JSON ou fallback)
            const loaded = await this.loadRealData();
            if (!loaded) throw new Error('Aucune donnée disponible');

            // 3. Création de la carte
            this.map = L.map(container, {
                center: this.config.center,
                zoom: this.config.zoom,
                minZoom: this.config.minZoom,
                maxZoom: this.config.maxZoom,
                attributionControl: true
            });

            L.tileLayer(this.config.tileLayer, {
                attribution: this.config.attribution,
                maxZoom: 18,
                subdomains: ['a','b','c']
            }).addTo(this.map);

            // 4. Ajout des marqueurs (la fonction gère elle-même le timing)
            this.addMarkers();

            // 5. Disparition du loader
            this.hideLoading();

            console.log(`✅ Carte initialisée (${this.markers.length} points)`);
            this.isInitializing = false;
            return true;

        } catch (error) {
            console.error('❌ Erreur init carte:', error);
            this.showError(error.message);
            this.isInitializing = false;
            return false;
        }
    },

    // ---------- CHARGEMENT JSON ----------
    async loadRealData() {
        try {
            const response = await fetch('data/oliviers-processed.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            this.oliviers = data.oliviers || [];
            console.log(`📊 ${this.oliviers.length} oliviers chargés (JSON)`);
            if (this.oliviers.length > 0) return true;
        } catch (e) {
            console.warn('⚠️ Échec chargement JSON, utilisation des données de secours');
        }
        this.oliviers = this.getFallbackData();
        return this.oliviers.length > 0;
    },

    // ---------- DONNÉES DE SECOURS ----------
    getFallbackData() {
        return [
            { id: 'demo1', lat: -18.0132, lng: -70.2515, etat: 'excellent', name_raw: 'Arbequina 247', region: 'Tacna', secteur: 'Valle Viejo', age: 120, variete: 'Arbequina', note: 9 },
            { id: 'demo2', lat: -18.0098, lng: -70.2559, etat: 'good', name_raw: 'Picual 112', region: 'Tacna', secteur: 'Valle Viejo', age: 85, variete: 'Picual', note: 7 },
            { id: 'demo3', lat: -18.0155, lng: -70.2490, etat: 'poor', name_raw: 'Frantoio 89', region: 'Tacna', secteur: 'Valle Viejo', age: 95, variete: 'Frantoio', note: 4 }
        ];
    },

    // ---------- AJOUT DES MARQUEURS (SÉQUENCE FIABLE) ----------
    addMarkers() {
        if (!this.map || !this.oliviers.length) return;

        // Supprime tous les anciens marqueurs
        this.markers.forEach(m => this.map.removeLayer(m));
        this.markers = [];

        // Création des nouveaux marqueurs
        this.oliviers.forEach(olivier => {
            const style = this.markerStyles[olivier.etat] || this.markerStyles.good;
            
            const marker = L.circleMarker([olivier.lat, olivier.lng], {
                radius: 10,
                fillColor: style.fillColor,
                color: '#ffffff',
                weight: 2,
                fillOpacity: 0.8
            });

            marker.bindPopup(() => this.createPopupContent(olivier), {
                maxWidth: 320,
                minWidth: 280,
                className: 'olivier-popup'
            });

            marker.on('click', () => this.onMarkerClick(marker));
            marker.on('mouseover', () => marker.setStyle({ radius: 12, weight: 3 }));
            marker.on('mouseout', () => marker.setStyle({ radius: 10, weight: 2 }));

            marker.addTo(this.map);
            this.markers.push(marker);
        });

        // Ajustement de la vue – la partie critique
        if (this.markers.length) {
            // Étape 1 : forcer le recalcule des dimensions (indispensable)
            this.map.invalidateSize({ animate: false });

            // Étape 2 : attendre que le conteneur ait une hauteur > 0
            const waitForContainer = () => {
                const container = this.map.getContainer();
                if (container.clientHeight > 0 && container.clientWidth > 0) {
                    // Conteneur prêt, on peut fitBounds
                    const group = L.featureGroup(this.markers);
                    this.map.fitBounds(group.getBounds().pad(0.05), { animate: false });
                } else {
                    // Sinon on réessaie au prochain frame
                    requestAnimationFrame(waitForContainer);
                }
            };
            requestAnimationFrame(waitForContainer);
        }
    },

    // ---------- ANIMATION CLIC ----------
    onMarkerClick(marker) {
        marker.setStyle({ radius: 14, weight: 4 });
        setTimeout(() => marker.setStyle({ radius: 10, weight: 2 }), 400);
    },

    // ---------- CONTENU DU POPUP ----------
    createPopupContent(olivier) {
        const lang = this.currentLang;
        const l = this.labels[lang] || this.labels.fr;
        const style = this.markerStyles[olivier.etat] || this.markerStyles.good;
        const stateLabel = style.label[lang] || style.label.fr;
        const details = olivier.details?.[lang] || olivier.details?.fr || {};

        const thumbPath = `images/oliviers/${olivier.id}_thumb.jpg`;
        const fallbackThumb = 'images/oliviers/default_thumb.jpg';

        return `
            <div class="olivier-popup-content" style="font-family: 'Inter', sans-serif;">
                <div style="margin-bottom: 8px;">
                    <h3 style="margin:0; color:#2C4C3B; font-weight:800;">${details.nom || olivier.name_raw || 'Olivier'}</h3>
                    <p style="margin:0; font-size:11px; color:#666;">${olivier.region || 'Tacna'} • ${olivier.secteur || ''}</p>
                </div>
                <img src="${thumbPath}" 
                     alt="Olivier" 
                     style="width:100%; height:150px; object-fit:cover; border-radius:6px; margin-bottom:10px;"
                     onerror="this.src='${fallbackThumb}'; this.onerror=null;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:28px;">${style.icon}</span>
                    <div style="text-align:right;">
                        <div style="font-size:16px; font-weight:bold; color:#2C4C3B;">${olivier.age || 'N/A'} ${olivier.age ? 'ans' : ''}</div>
                        <div style="font-size:11px; color:#666;">${olivier.variete || 'Variété N/A'}</div>
                    </div>
                </div>
                ${details.description ? `<p style="font-size:12px; color:#555; margin-bottom:8px;">${details.description}</p>` : ''}
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px; margin-bottom:8px;">
                    <div><strong>${l.state}:</strong><br><span style="background:${style.fillColor}; color:white; padding:2px 6px; border-radius:4px;">${stateLabel} (${olivier.note || 'N/A'}/10)</span></div>
                    <div><strong>${l.production}:</strong><br>${olivier.production || 'N/A'}</div>
                </div>
                <div style="font-size:11px; color:#666; margin-bottom:8px;">
                    <strong>${l.owner}:</strong> ${olivier.proprietaire || 'N/A'}
                </div>
                <button onclick="carteOliviers.openModal('${olivier.id}')" 
                        style="width:100%; background:#C5A059; color:white; border:none; padding:8px; border-radius:30px; font-weight:bold; cursor:pointer;">
                    ${l.details}
                </button>
            </div>
        `;
    },

    // ---------- OUVERTURE MODAL ----------
    openModal(olivierId) {
        if (this.modalOpen) this.closeModal();

        const olivier = this.oliviers.find(o => o.id === olivierId);
        if (!olivier) return;

        const lang = this.currentLang;
        const l = this.labels[lang] || this.labels.fr;
        const details = olivier.details?.[lang] || olivier.details?.fr || {};
        const fullImage = `images/oliviers/${olivier.id}_full.jpg`;
        const fallbackFull = 'images/oliviers/default_full.jpg';

        const modalHTML = `
            <div id="olivier-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; z-index:9999;">
                <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(31,58,44,0.9); backdrop-filter:blur(6px);" onclick="carteOliviers.closeModal()"></div>
                <div style="position:relative; background:white; width:90%; max-width:700px; max-height:90vh; overflow-y:auto; border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); animation:modalFadeIn 0.2s;">
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:20px 25px; background:#2C4C3B; color:white; border-radius:20px 20px 0 0;">
                        <div>
                            <h2 style="margin:0; font-size:24px; font-family:'Playfair Display', serif;">${details.nom || olivier.name_raw || 'Olivier'}</h2>
                            <p style="margin:4px 0 0; opacity:0.8;">${olivier.region || 'Tacna'} • ${olivier.secteur || ''}</p>
                        </div>
                        <button onclick="carteOliviers.closeModal()" style="background:none; border:none; color:white; font-size:28px; cursor:pointer;">&times;</button>
                    </div>
                    <div style="padding:25px;">
                        <img src="${fullImage}" alt="Olivier" style="width:100%; max-height:350px; object-fit:cover; border-radius:12px; margin-bottom:20px;" onerror="this.src='${fallbackFull}'; this.onerror=null;">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
                            <div>
                                <h3 style="color:#2C4C3B; font-size:16px; margin-bottom:10px;">${l.generalInfo}</h3>
                                <ul style="list-style:none; padding:0; margin:0; font-size:14px;">
                                    <li><strong>${l.age}:</strong> ${olivier.age || 'N/A'} ans</li>
                                    <li><strong>${l.variety}:</strong> ${olivier.variete || 'N/A'}</li>
                                    <li><strong>${l.production}:</strong> ${olivier.production || 'N/A'}</li>
                                    <li><strong>${l.healthScore}:</strong> ${olivier.note || 'N/A'}/10</li>
                                </ul>
                            </div>
                            <div>
                                <h3 style="color:#2C4C3B; font-size:16px; margin-bottom:10px;">${l.location}</h3>
                                <p style="font-size:14px; margin:0;">${details.localisation || `${olivier.region}, ${olivier.secteur}`}</p>
                                <p style="font-size:12px; color:#666; margin-top:6px;">${l.gps}: ${olivier.lat.toFixed(4)}, ${olivier.lng.toFixed(4)}</p>
                            </div>
                        </div>
                        ${details.description ? `<div style="margin-bottom:20px;"><h3 style="color:#2C4C3B; font-size:16px;">${l.description}</h3><p style="font-size:14px;">${details.description}</p></div>` : ''}
                        ${details.caracteristiques ? `<div style="margin-bottom:20px;"><h3 style="color:#2C4C3B; font-size:16px;">${l.characteristics}</h3><p style="font-size:14px;">${details.caracteristiques}</p></div>` : ''}
                        ${details.sante ? `<div style="margin-bottom:20px;"><h3 style="color:#2C4C3B; font-size:16px;">${l.health}</h3><p style="font-size:14px;">${details.sante}</p></div>` : ''}
                        <div style="background:#F9FAFB; padding:15px; border-radius:12px;">
                            <h3 style="color:#2C4C3B; font-size:16px; margin-bottom:6px;">${l.contact}</h3>
                            <p style="font-size:14px; margin:0;"><strong>${olivier.proprietaire || 'N/A'}</strong></p>
                            <p style="font-size:12px; color:#666; margin-top:4px;">${l.visits}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modalOpen = true;

        this.escHandler = (e) => { if (e.key === 'Escape') this.closeModal(); };
        document.addEventListener('keydown', this.escHandler);
    },

    // ---------- FERMETURE MODAL ----------
    closeModal() {
        const modal = document.getElementById('olivier-modal');
        if (modal) {
            modal.remove();
            this.modalOpen = false;
            if (this.escHandler) {
                document.removeEventListener('keydown', this.escHandler);
                this.escHandler = null;
            }
        }
    },

    // ---------- MISE À JOUR LANGUE ----------
    updateLanguage(lang) {
        if (lang === this.currentLang) return;
        this.currentLang = lang;

        // Mise à jour des popups ouverts
        this.markers.forEach((marker, idx) => {
            if (marker.isPopupOpen() && this.oliviers[idx]) {
                const newContent = this.createPopupContent(this.oliviers[idx]);
                marker.setPopupContent(newContent);
            }
        });

        // Fermeture du modal s'il est ouvert (cohérence)
        if (this.modalOpen) this.closeModal();
    },

    // ---------- REDIMENSIONNEMENT (PUBLIC) ----------
    resize() {
        if (this.map) {
            this.map.invalidateSize({ animate: false });
            console.log('🔄 Carte redimensionnée');
        }
    },

    // ---------- DESTRUCTION COMPLÈTE ----------
    destroy() {
        this.closeModal();
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        this.markers = [];
        this.oliviers = [];
        this.isDestroyed = true;
        console.log('🧹 Carte détruite');
    },

    // ---------- GESTION DES ERREURS ----------
    showError(message) {
        const container = document.getElementById('carte-oliviers');
        if (container) {
            container.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; height:400px; background:#F9FAFB; border-radius:8px;">
                    <div style="text-align:center; max-width:300px;">
                        <i class="fas fa-exclamation-triangle" style="font-size:48px; color:#f59e0b; margin-bottom:16px;"></i>
                        <h3 style="margin-bottom:12px; color:#374151;">Erreur de chargement</h3>
                        <p style="font-size:14px; line-height:1.4; color:#666;">${message}</p>
                        <button onclick="carteOliviers.init(true)" style="margin-top:16px; padding:8px 16px; background:#2C4C3B; color:white; border:none; border-radius:30px; font-weight:bold; cursor:pointer;">
                            Réessayer
                        </button>
                    </div>
                </div>
            `;
        }
    },

    // ---------- CACHER LE LOADER ----------
    hideLoading() {
        const loader = document.getElementById('carte-loading');
        if (loader) {
            loader.style.transition = 'opacity 0.2s';
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 200);
        }
    }
};

// ========== OBSERVER POUR PAGE CACHÉE/VISIBLE ==========
(function initObserver() {
    const page = document.getElementById('carte-oliviers-page');
    if (!page) {
        console.warn('⚠️ #carte-oliviers-page non trouvé, observer désactivé');
        return;
    }

    let isVisible = !page.classList.contains('hidden');

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            if (m.attributeName === 'class') {
                const nowVisible = !page.classList.contains('hidden');
                if (nowVisible && !isVisible) {
                    // La page devient visible
                    console.log('👁️ Page carte visible');
                    if (!carteOliviers.map) {
                        // Pas de carte → initialisation
                        carteOliviers.init();
                    } else {
                        // Carte existante → redimensionnement (le conteneur a peut-être changé de taille)
                        setTimeout(() => carteOliviers.resize(), 50);
                    }
                } else if (!nowVisible && isVisible) {
                    // Page cachée → on ferme le modal
                    carteOliviers.closeModal();
                }
                isVisible = nowVisible;
            }
        });
    });

    observer.observe(page, { attributes: true });
    console.log('👁️ Observer carte actif');
})();

// ========== INTÉGRATION AVEC SIMPLE-BLOG ==========
if (typeof simpleBlog !== 'undefined' && typeof simpleBlog.toggleLanguage === 'function') {
    const originalToggle = simpleBlog.toggleLanguage;
    simpleBlog.toggleLanguage = function() {
        originalToggle.call(this);
        carteOliviers.updateLanguage(this.currentLang);
    };
    console.log('🌐 Carte liée au changement de langue');
}

// ========== STYLE D'ANIMATION POUR MODAL ==========
(function injectModalStyle() {
    if (document.getElementById('carte-oliviers-style')) return;
    const style = document.createElement('style');
    style.id = 'carte-oliviers-style';
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity:0; transform:scale(0.95); }
            to { opacity:1; transform:scale(1); }
        }
    `;
    document.head.appendChild(style);
})();

// ========== EXPOSITION GLOBALE ==========
window.carteOliviers = carteOliviers;

console.log('🗺️ CarteOliviers PROD – prête et robuste');