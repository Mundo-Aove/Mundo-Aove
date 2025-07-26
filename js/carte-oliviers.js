// ============================================
// CARTE INTERACTIVE DES OLIVIERS CENTENAIRES
// Version finale - Alejandra Galván - 67 oliviers réels
// Modification: Image complète dans modal détails
// ============================================

const carteOliviers = {
    map: null,
    markers: [],
    oliviers: [], // Sera chargé depuis JSON
    currentLang: 'fr',
    
    // ========== CONFIGURATION ==========
    config: {
        center: [-18.15, -70.35], // Centre zone Tacna réelle
        zoom: 10,
        minZoom: 8,
        maxZoom: 18
    },

    // ========== STYLES DES MARQUEURS ==========
    markerStyles: {
        excellent: { color: '#22c55e', fillColor: '#22c55e', icon: '🫒' },
        good: { color: '#eab308', fillColor: '#eab308', icon: '🟡' },
        poor: { color: '#ef4444', fillColor: '#ef4444', icon: '🔴' }
    },

    // ========== CHARGEMENT DONNÉES RÉELLES ==========
    async loadRealData() {
        try {
            console.log('📊 Chargement données oliviers...');
            const response = await fetch('data/oliviers-processed.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Charger les oliviers réels
            this.oliviers = data.oliviers || [];
            
            console.log(`✅ ${this.oliviers.length} oliviers chargés depuis JSON`);
            console.log(`📊 Zones: ${Object.keys(data.stats?.zones || {}).join(', ')}`);
            console.log(`📈 Stats: ${data.stats?.enriched || 0}/${data.stats?.total_oliviers || 0} enrichis`);
            
            return true;
            
        } catch (error) {
            console.error('❌ Erreur chargement données JSON:', error);
            this.showError(`Impossible de charger les données: ${error.message}`);
            return false;
        }
    },

    // ========== INITIALISATION ==========
    async init() {
        console.log('🗺️ Initialisation carte oliviers centenaires...');
        
        // Vérifications préalables
        if (typeof L === 'undefined') {
            console.error('❌ Leaflet.js non chargé');
            this.showError('Leaflet.js non disponible');
            return false;
        }

        const container = document.getElementById('carte-oliviers');
        if (!container) {
            console.error('❌ Container carte-oliviers non trouvé');
            return false;
        }

        try {
            // 1. Charger les données réelles
            const dataLoaded = await this.loadRealData();
            if (!dataLoaded) {
                return false;
            }

            // 2. Créer la carte de base
            this.createMap();
            
            // 3. Ajouter tous les marqueurs
            this.addMarkers();
            
            // 4. Masquer le loading
            this.hideLoading();
            
            console.log('✅ Carte initialisée avec succès - données réelles');
            return true;
            
        } catch (error) {
            console.error('❌ Erreur initialisation carte:', error);
            this.showError(`Erreur d'initialisation: ${error.message}`);
            return false;
        }
    },

    // ========== CRÉATION DE LA CARTE ==========
    createMap() {
        // Nettoyer l'existant
        if (this.map) {
            this.map.remove();
            this.map = null;
            this.markers = [];
        }

        // Créer la nouvelle carte
        this.map = L.map('carte-oliviers', {
            center: this.config.center,
            zoom: this.config.zoom,
            minZoom: this.config.minZoom,
            maxZoom: this.config.maxZoom,
            zoomControl: true,
            scrollWheelZoom: true,
            preferCanvas: false
        });

        // Ajouter les tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> | Oliviers Centenaires - <strong>Alejandra Galván</strong>',
            maxZoom: 18,
            subdomains: ['a', 'b', 'c']
        }).addTo(this.map);

        console.log('🗺️ Carte de base créée - OpenStreetMap');
    },

    // ========== AJOUT DES MARQUEURS ==========
    addMarkers() {
        if (!this.oliviers || this.oliviers.length === 0) {
            console.warn('⚠️ Aucun olivier à afficher');
            return;
        }

        this.markers = []; // Reset
        
        console.log(`📍 Ajout de ${this.oliviers.length} marqueurs...`);
        
        this.oliviers.forEach((olivier, index) => {
            // Déterminer le style basé sur l'état
            const etat = olivier.etat || 'good';
            const style = this.markerStyles[etat] || this.markerStyles.good;
            
            // Créer le marqueur circulaire
            const marker = L.circleMarker([olivier.lat, olivier.lng], {
                radius: 10,
                fillColor: style.fillColor,
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });

            // Créer le popup
            const popupContent = this.createPopupContent(olivier);
            marker.bindPopup(popupContent, {
                maxWidth: 320,
                minWidth: 280,
                className: 'olivier-popup',
                closeOnClick: false
            });

            // Événements du marqueur
            marker.on('click', () => {
                this.animateMarker(marker);
            });

            marker.on('mouseover', () => {
                marker.setStyle({ radius: 12, weight: 3 });
            });

            marker.on('mouseout', () => {
                marker.setStyle({ radius: 10, weight: 2 });
            });

            // Ajouter à la carte
            marker.addTo(this.map);
            this.markers.push(marker);
        });

        // Ajuster la vue pour englober tous les marqueurs
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            const bounds = group.getBounds();
            this.map.fitBounds(bounds.pad(0.05));
        }

        console.log(`✅ ${this.markers.length} marqueurs ajoutés à la carte`);
    },

    // ========== ANIMATION MARQUEUR ==========
    animateMarker(marker) {
        marker.setStyle({ radius: 14, weight: 4 });
        setTimeout(() => {
            marker.setStyle({ radius: 10, weight: 2 });
        }, 400);
    },

    // ========== CRÉATION POPUP ==========
    createPopupContent(olivier) {
        const lang = this.getCurrentLanguage();
        const details = olivier.details?.[lang] || olivier.details?.fr || {};
        
        // Labels selon la langue
        const labels = {
            fr: { 
                age: 'Âge', state: 'État', production: 'Production', 
                owner: 'Propriétaire', details: 'Voir détails complets',
                excellent: 'Excellent', good: 'Bon', poor: 'Préoccupant'
            },
            es: { 
                age: 'Edad', state: 'Estado', production: 'Producción',
                owner: 'Propietario', details: 'Ver detalles completos',
                excellent: 'Excelente', good: 'Bueno', poor: 'Preocupante'
            }
        };
        
        const l = labels[lang] || labels.fr;
        
        // Couleurs d'état
        const stateColors = {
            excellent: '#22c55e',
            good: '#eab308', 
            poor: '#ef4444'
        };
        
        const stateColor = stateColors[olivier.etat] || stateColors.good;
        const stateLabel = l[olivier.etat] || l.good;
        
        // 🆕 IMAGE THUMBNAIL
        const thumbnailPath = `images/oliviers/${olivier.id}_thumb.jpg`;
        const fallbackImage = 'images/oliviers/default_thumb.jpg';
        
        return `
            <div class="olivier-popup-content">
                <div class="popup-header">
                    <h3>${details.nom || olivier.name_raw || 'Olivier'}</h3>
                    <p>${olivier.region || 'Tacna'} • ${olivier.secteur || 'Zone'}</p>
                </div>
                
                <div class="popup-body">
                    <!-- 🆕 IMAGE THUMBNAIL -->
                    <div style="text-align: center; margin-bottom: 10px;">
                        <img src="${thumbnailPath}" 
                            alt="${details.nom || 'Olivier'}"
                            style="width: 100%; max-width: 280px; height: 150px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
                            onerror="this.src='${fallbackImage}'; this.onerror=null;">
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 28px;">${this.markerStyles[olivier.etat || 'good'].icon}</span>
                        <div style="text-align: right;">
                            <div style="font-size: 16px; font-weight: bold; color: #2d5016;">
                                ${olivier.age || 'N/A'} ${olivier.age ? 'ans' : ''}
                            </div>
                            <div style="font-size: 12px; color: #666;">
                                ${olivier.variete || 'Variété N/A'}
                            </div>
                        </div>
                    </div>
                    
                    ${details.description ? `
                        <p style="color: #555; font-size: 13px; line-height: 1.4; margin-bottom: 10px;">
                            ${details.description}
                        </p>
                    ` : ''}
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; font-size: 11px;">
                        <div>
                            <strong>${l.state}:</strong><br>
                            <span style="display: inline-block; padding: 2px 6px; border-radius: 3px; background: ${stateColor}; color: white; font-size: 10px;">
                                ${stateLabel} (${olivier.note || 'N/A'}/10)
                            </span>
                        </div>
                        <div>
                            <strong>${l.production}:</strong><br>
                            <span style="font-size: 11px;">${olivier.production || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <div style="font-size: 11px; color: #666; margin-bottom: 10px;">
                        <strong>${l.owner}:</strong> ${olivier.proprietaire || 'N/A'}
                    </div>
                    
                    <div style="border-top: 1px solid #ddd; padding-top: 8px;">
                        <button onclick="carteOliviers.showDetails('${olivier.id}')" class="popup-button">
                            ${l.details}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // ========== MODAL DÉTAILS AVEC IMAGE COMPLÈTE ==========
    showDetails(olivierId) {
        const olivier = this.oliviers.find(o => o.id === olivierId);
        if (!olivier) {
            console.error('❌ Olivier non trouvé:', olivierId);
            return;
        }

        const lang = this.getCurrentLanguage();
        const details = olivier.details?.[lang] || olivier.details?.fr || {};
        
        const labels = {
            fr: {
                generalInfo: 'Informations générales',
                location: 'Localisation', 
                description: 'Description',
                characteristics: 'Caractéristiques physiques',
                health: 'État sanitaire',
                contact: 'Contact propriétaire',
                age: 'Âge', variety: 'Variété', production: 'Production',
                healthScore: 'Note état', planted: 'planté vers',
                visits: 'Pour visites sur rendez-vous'
            },
            es: {
                generalInfo: 'Información general',
                location: 'Localización',
                description: 'Descripción', 
                characteristics: 'Características físicas',
                health: 'Estado sanitario',
                contact: 'Contacto propietario',
                age: 'Edad', variety: 'Variedad', production: 'Producción',
                healthScore: 'Nota estado', planted: 'plantado hacia',
                visits: 'Para visitas con cita previa'
            }
        };
        
        const l = labels[lang] || labels.fr;
        
        // 🆕 CHEMIN DE L'IMAGE COMPLÈTE
        const fullImagePath = `images/oliviers/${olivier.id}_full.jpg`;
        const fallbackFullImage = 'images/oliviers/default_full.jpg';
        
        const modal = `
            <div id="olivier-modal">
                <div class="modal-backdrop" onclick="carteOliviers.closeModal()"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h2>${details.nom || olivier.name_raw || 'Olivier'}</h2>
                            <p>${olivier.region || 'Tacna'} • ${olivier.secteur || 'Zone'}</p>
                        </div>
                        <button onclick="carteOliviers.closeModal()" class="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <!-- 🆕 IMAGE COMPLÈTE INTÉGRÉE -->
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="${fullImagePath}" 
                                 alt="${details.nom || 'Olivier'}"
                                 style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                 onerror="this.src='${fallbackFullImage}'; this.onerror=null;">
                        </div>
                        
                        <!-- Contenu existant -->
                        <div class="info-grid">
                            <div class="info-section">
                                <h3>${l.generalInfo}</h3>
                                <ul>
                                    <li><strong>${l.age}:</strong> ${olivier.age || 'N/A'} ${olivier.age ? `ans (${l.planted} ${2025 - (olivier.age || 0)})` : ''}</li>
                                    <li><strong>${l.variety}:</strong> ${olivier.variete || 'N/A'}</li>
                                    <li><strong>${l.production}:</strong> ${olivier.production || 'N/A'}</li>
                                    <li><strong>${l.healthScore}:</strong> ${olivier.note || 'N/A'}/10</li>
                                </ul>
                            </div>
                            
                            <div class="info-section">
                                <h3>${l.location}</h3>
                                <p>${details.localisation || `${olivier.region}, ${olivier.secteur}`}</p>
                                <p class="gps-coords">GPS: ${olivier.lat.toFixed(4)}, ${olivier.lng.toFixed(4)}</p>
                            </div>
                        </div>
                        
                        ${details.description ? `
                            <div class="info-section">
                                <h3>${l.description}</h3>
                                <p>${details.description}</p>
                            </div>
                        ` : ''}
                        
                        ${details.caracteristiques ? `
                            <div class="info-section">
                                <h3>${l.characteristics}</h3>
                                <p>${details.caracteristiques}</p>
                            </div>
                        ` : ''}
                        
                        ${details.sante ? `
                            <div class="info-section">
                                <h3>${l.health}</h3>
                                <p>${details.sante}</p>
                            </div>
                        ` : ''}
                        
                        <div class="contact-section">
                            <h3>${l.contact}</h3>
                            <p><strong>${olivier.proprietaire || 'N/A'}</strong></p>
                            <p class="contact-note">${l.visits}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        
        // Gestion ESC
        setTimeout(() => {
            document.addEventListener('keydown', this.handleModalKeydown.bind(this));
        }, 100);
    },

    // ========== FERMETURE MODAL ==========
    closeModal() {
        const modal = document.getElementById('olivier-modal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', this.handleModalKeydown.bind(this));
            }, 200);
        }
    },

    // ========== GESTION CLAVIER ==========
    handleModalKeydown(e) {
        if (e.key === 'Escape') {
            this.closeModal();
        }
    },

    // ========== UTILITAIRES ==========
    getCurrentLanguage() {
        return (typeof simpleBlog !== 'undefined' && simpleBlog.currentLang) ? simpleBlog.currentLang : 'fr';
    },

    hideLoading() {
        const loading = document.getElementById('carte-loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 300);
        }
    },

    showError(message) {
        const container = document.getElementById('carte-oliviers');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 400px; background: #f9fafb; border-radius: 8px;">
                    <div style="text-align: center; color: #666; max-width: 300px;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px; color: #f59e0b;"></i>
                        <h3 style="margin-bottom: 12px; color: #374151;">Erreur de chargement</h3>
                        <p style="font-size: 14px; line-height: 1.4;">${message}</p>
                        <button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #2d5016; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Recharger la page
                        </button>
                    </div>
                </div>
            `;
        }
    },

    // ========== MISE À JOUR LANGUE ==========
    updateLanguage(lang) {
        this.currentLang = lang;
        
        // Mettre à jour les popups ouverts
        this.markers.forEach((marker, index) => {
            if (marker.isPopupOpen() && this.oliviers[index]) {
                const newContent = this.createPopupContent(this.oliviers[index]);
                marker.setPopupContent(newContent);
            }
        });
        
        console.log(`🌍 Carte langue mise à jour: ${lang}`);
    },

    // ========== REDIMENSIONNEMENT ==========
    resize() {
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
                console.log('🔄 Carte redimensionnée');
            }, 100);
        }
    },

    // ========== DESTRUCTION ==========
    destroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
            this.markers = [];
            this.oliviers = [];
            console.log('🧹 Carte détruite');
        }
    }
};

// ========== OBSERVER DE PAGE ==========
const initCarteObserver = () => {
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.id === 'carte-oliviers-page') {
                        if (!target.classList.contains('hidden')) {
                            // Page carte visible
                            setTimeout(() => {
                                if (!carteOliviers.map) {
                                    carteOliviers.init();
                                } else {
                                    carteOliviers.resize();
                                }
                            }, 200);
                        } else {
                            // Page cachée - nettoyer
                            const modal = document.getElementById('olivier-modal');
                            if (modal) carteOliviers.closeModal();
                        }
                    }
                }
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const cartePage = document.getElementById('carte-oliviers-page');
            if (cartePage) {
                observer.observe(cartePage, { attributes: true });
                console.log('👀 Observer carte initialisé');
            }
        });
    }
};

// ========== INTÉGRATION AVEC SIMPLE-BLOG ==========
if (typeof simpleBlog !== 'undefined') {
    const originalToggleLanguage = simpleBlog.toggleLanguage;
    if (originalToggleLanguage) {
        simpleBlog.toggleLanguage = function() {
            originalToggleLanguage.call(this);
            carteOliviers.updateLanguage(this.currentLang);
        };
    }
}

// ========== INITIALISATION ==========
initCarteObserver();

// ========== EXPORT GLOBAL ==========
window.carteOliviers = carteOliviers;

console.log('🗺️ Module carte-oliviers chargé - Version avec image complète intégrée');