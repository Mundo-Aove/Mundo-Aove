// ================================
// COMPOSANT CHANGEMENT DE LANGUE
// ================================

class LanguageSwitcherComponent {
    constructor() {
        this.currentLang = 'fr';
        this.languages = {
            fr: { name: 'Français', flag: '🇫🇷', code: 'FR' },
            es: { name: 'Español', flag: '🇪🇸', code: 'ES' }
        };
        this.isInitialized = false;
    }

    /**
     * Initialise le composant de changement de langue
     */
    init() {
        this.setupLanguageButton();
        this.setupKeyboardShortcuts();
        this.loadSavedLanguage();
        this.isInitialized = true;
        console.log('🌍 LanguageSwitcher component initialisé');
    }

    /**
     * Configuration du bouton de langue
     */
    setupLanguageButton() {
        const langButton = Utils.$('button[onclick="toggleLanguage()"]');
        if (!langButton) {
            console.warn('⚠️ Bouton de langue non trouvé');
            return;
        }

        // Améliorer le bouton existant
        this.enhanceLanguageButton(langButton);
        
        // Ajouter dropdown pour mobile
        this.createLanguageDropdown();
    }

    /**
     * Améliore le bouton de langue existant
     */
    enhanceLanguageButton(button) {
        // Ajouter tooltip
        button.title = 'Changer de langue (Ctrl+L)';
        
        // Ajouter animation au clic
        button.addEventListener('click', (e) => {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
        });

        // Ajouter indicateur visuel
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="language-flag">${this.languages[this.currentLang].flag}</span>
                ${originalHTML}
                <i class="fas fa-globe text-xs opacity-60"></i>
            </div>
        `;
    }

    /**
     * Crée un dropdown de langue pour une meilleure UX
     */
    createLanguageDropdown() {
        const dropdown = document.createElement('div');
        dropdown.id = 'language-dropdown';
        dropdown.className = 'absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px] z-50 hidden';
        
        dropdown.innerHTML = Object.entries(this.languages).map(([code, lang]) => `
            <button onclick="window.blogApp?.switchToLanguage('${code}')" 
                    class="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3">
                <span class="text-lg">${lang.flag}</span>
                <span class="text-sm font-medium">${lang.name}</span>
                <span class="text-xs opacity-60 ml-auto">${lang.code}</span>
            </button>
        `).join('');

        // Positionner par rapport au bouton de langue
        const langButton = Utils.$('button[onclick="toggleLanguage()"]');
        if (langButton && langButton.parentElement) {
            langButton.parentElement.style.position = 'relative';
            langButton.parentElement.appendChild(dropdown);

            // Toggle dropdown au clic droit
            langButton.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.toggleDropdown();
            });

            // Fermer dropdown au clic extérieur
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target) && !langButton.contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        }
    }

    /**
     * Toggle du dropdown de langue
     */
    toggleDropdown() {
        const dropdown = Utils.$('#language-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    /**
     * Raccourcis clavier pour changer de langue
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+L pour changer de langue
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                this.switchLanguage();
            }
            
            // Alt+1 pour français, Alt+2 pour espagnol
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                this.switchToLanguage('fr');
            }
            if (e.altKey && e.key === '2') {
                e.preventDefault();
                this.switchToLanguage('es');
            }
        });
    }

    /**
     * Change la langue avec animation
     */
    switchLanguage() {
        const newLang = this.currentLang === 'fr' ? 'es' : 'fr';
        this.switchToLanguage(newLang);
    }

    /**
     * Bascule vers une langue spécifique
     */
    switchToLanguage(targetLang) {
        if (!this.languages[targetLang]) {
            console.warn(`⚠️ Langue non supportée: ${targetLang}`);
            return;
        }

        if (targetLang === this.currentLang) {
            console.log(`🌍 Déjà en ${targetLang}`);
            return;
        }

        console.log(`🌍 Changement de langue: ${this.currentLang} → ${targetLang}`);

        // Animation de transition
        this.animateLanguageChange(() => {
            this.currentLang = targetLang;
            this.updateLanguageButton();
            this.saveLanguagePreference();
            
            // Notifier le BlogEngine
            if (window.blogApp) {
                window.blogApp.currentLang = targetLang;
                window.blogApp.articleManager?.setLanguage(targetLang);
                window.blogApp.updateLanguage();
                
                // Re-render articles si on est sur la page home
                if (window.blogApp.currentPage === 'home') {
                    window.blogApp.articleManager?.renderArticles(targetLang);
                }
            }

            // Fermer le dropdown
            const dropdown = Utils.$('#language-dropdown');
            if (dropdown) dropdown.classList.add('hidden');

            // Notification à l'utilisateur
            this.showLanguageNotification(targetLang);
        });
    }

    /**
     * Animation de changement de langue
     */
    animateLanguageChange(callback) {
        const main = Utils.$('main');
        if (!main) {
            callback();
            return;
        }

        // Fade out
        main.style.opacity = '0.7';
        main.style.transform = 'translateY(10px)';
        main.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            callback();
            
            // Fade in
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                main.style.transition = '';
            }, 300);
        }, 150);
    }

    /**
     * Met à jour le bouton de langue
     */
    updateLanguageButton() {
        const langBtn = Utils.$('#lang-btn');
        const flagSpan = Utils.$('.language-flag');
        
        if (langBtn) {
            langBtn.textContent = this.currentLang === 'es' ? 'FR' : 'ES';
        }
        
        if (flagSpan) {
            flagSpan.textContent = this.languages[this.currentLang].flag;
        }

        // Mettre à jour le titre
        const langButton = Utils.$('button[onclick="toggleLanguage()"]');
        if (langButton) {
            const currentLangName = this.languages[this.currentLang].name;
            const otherLang = this.currentLang === 'fr' ? 'es' : 'fr';
            const otherLangName = this.languages[otherLang].name;
            langButton.title = `Basculer vers ${otherLangName} (actuellement ${currentLangName})`;
        }
    }

    /**
     * Sauvegarde la préférence de langue
     */
    saveLanguagePreference() {
        Utils.setLocalStorage('preferredLanguage', this.currentLang, 86400 * 30); // 30 jours
        
        // Aussi dans les cookies pour la compatibilité
        document.cookie = `lang=${this.currentLang}; path=/; max-age=${86400 * 30}`;
    }

    /**
     * Charge la langue sauvegardée
     */
    loadSavedLanguage() {
        // Priorité: localStorage > cookies > détection navigateur > défaut
        let savedLang = Utils.getLocalStorage('preferredLanguage');
        
        if (!savedLang) {
            // Essayer les cookies
            const cookies = document.cookie.split(';');
            const langCookie = cookies.find(c => c.trim().startsWith('lang='));
            if (langCookie) {
                savedLang = langCookie.split('=')[1];
            }
        }

        if (!savedLang) {
            // Détection automatique de la langue du navigateur
            const browserLang = navigator.language.split('-')[0];
            savedLang = this.languages[browserLang] ? browserLang : 'fr';
        }

        if (savedLang && savedLang !== this.currentLang) {
            console.log(`🌍 Langue sauvegardée détectée: ${savedLang}`);
            this.switchToLanguage(savedLang);
        }
    }

    /**
     * Notification de changement de langue
     */
    showLanguageNotification(lang) {
        const notification = document.createElement('div');
        const langName = this.languages[lang].name;
        const flag = this.languages[lang].flag;
        
        notification.className = 'fixed bottom-4 right-4 bg-matte-gold text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <span class="text-lg">${flag}</span>
            <span class="font-medium">Langue changée vers ${langName}</span>
            <button onclick="this.parentElement.remove()" class="text-white hover:text-gray-200 ml-2">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-suppression
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    /**
     * Détecte la langue préférée de l'utilisateur
     */
    detectPreferredLanguage() {
        // Géolocalisation basique via timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        if (timezone.includes('Europe')) return 'fr';
        if (timezone.includes('America') && (timezone.includes('Lima') || timezone.includes('Bogota'))) return 'es';
        
        // Fallback sur la langue du navigateur
        const browserLang = navigator.language.split('-')[0];
        return this.languages[browserLang] ? browserLang : 'fr';
    }

    /**
     * Statistiques d'utilisation des langues
     */
    getLanguageStats() {
        return {
            currentLang: this.currentLang,
            availableLanguages: Object.keys(this.languages),
            browserLanguage: navigator.language,
            savedLanguage: Utils.getLocalStorage('preferredLanguage')
        };
    }
}

// Fonction globale pour compatibilité
window.switchToLanguage = (lang) => {
    if (window.languageSwitcher) {
        window.languageSwitcher.switchToLanguage(lang);
    }
};

// Export global
window.LanguageSwitcherComponent = LanguageSwitcherComponent;

console.log('🌍 LanguageSwitcherComponent chargé');