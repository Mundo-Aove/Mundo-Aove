// ================================
// TELEGRAM BOT CONTACT SIMPLE
// ================================

class TelegramContact {
    constructor() {
        this.botToken = '8457793513:AAHJcyUJhsftK8txWKgBQir8qp0eDJTm1CA';
        this.chatId = '6051665667';
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
    }

    /**
     * Envoi d'un message de contact
     */
    async sendContactMessage(name, email, message) {
        const date = new Date().toLocaleString('fr-FR');
        
        const text = `
📩 <b>NOUVEAU MESSAGE DE CONTACT</b>

📅 <b>Date:</b> ${date}
👤 <b>Nom:</b> ${name}
📧 <b>Email:</b> ${email}

💬 <b>Message:</b>
${message}

---
Répondre à: ${email}
        `.trim();

        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                console.log('✅ Message Telegram envoyé');
                return true;
            } else {
                console.error('❌ Erreur Telegram:', await response.text());
                return false;
            }
        } catch (error) {
            console.error('💥 Erreur réseau:', error);
            return false;
        }
    }
}

// Instance globale
window.telegramContact = new TelegramContact();

// Fonction pour le formulaire existant
async function sendContactForm(name, email, message) {
    const success = await window.telegramContact.sendContactMessage(name, email, message);
    
    if (success) {
        alert('✅ Message envoyé avec succès ! Alejandra vous répondra bientôt.');
        return true;
    } else {
        alert('❌ Erreur d\'envoi. Veuillez réessayer plus tard.');
        return false;
    }
}

console.log('🤖 Telegram Contact chargé');