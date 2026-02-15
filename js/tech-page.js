document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation de la langue
    let currentLang = localStorage.getItem('selectedLanguage') || 'fr';
    console.log('🌐 Langue actuelle :', currentLang);

    function applyTranslations(lang) {
        if (!window.translations || !window.translations[lang]) {
            console.error('❌ Fichier translations.js non chargé ou langue manquante');
            return;
        }

        document.querySelectorAll('[data-translate]').forEach(el => {
            const path = el.getAttribute('data-translate');
            const keys = path.split('.');
            let text = window.translations[lang];
            
            // On descend dans l'objet translations[lang].tech.main_title
            keys.forEach(key => {
                if (text) text = text[key];
            });

            if (text) {
                el.innerHTML = text;
                console.log(`✅ Traduit : ${path}`);
            } else {
                console.warn(`⚠️ Clé manquante : ${path}`);
            }
        });

        // Mise à jour du bouton
        const langBtn = document.getElementById('lang-btn-tech');
        if (langBtn) langBtn.textContent = lang.toUpperCase();
    }

    // 2. Gestion du bouton de changement de langue
    window.toggleTechLanguage = function() {
        const langs = ['fr', 'es', 'en'];
        let nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
        currentLang = langs[nextIndex];
        
        localStorage.setItem('selectedLanguage', currentLang);
        applyTranslations(currentLang);
        // Optionnel : location.reload() si tu veux être sûr de tout rafraîchir
    };

    // 3. Forcer le lien "Retour au Blog"
    const backLink = document.querySelector('a[href="index.html"]');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            // On empêche le script de navigation SPA de bloquer le lien
            e.stopPropagation(); 
        });
    }

    applyTranslations(currentLang);
});