/**
 * NotificationManager - Hilfsklasse für Toast-Benachrichtigungen
 * Verwendet Notyf für moderne, benutzerfreundliche Benachrichtigungen
 */
class NotificationManager {
    constructor() {
        this.notyf = null;
        this.init();
    }

    /**
     * Initialisiert den NotificationManager
     */
    init() {
        this.notyf = new Notyf({
            duration: 6000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true,
            ripple: true,
            types: [
                {
                    type: 'success',
                    background: '#28a745',
                    icon: {
                        className: 'material-symbols-outlined',
                        tagName: 'span',
                        text: 'check_circle',
                        color: '#ffffff'
                    }
                },
                {
                    type: 'error',
                    background: '#dc3545',
                    icon: {
                        className: 'material-symbols-outlined',
                        tagName: 'span',
                        text: 'error',
                        color: '#ffffff'
                    }
                },
                {
                    type: 'warning',
                    background: '#ffc107',
                    icon: {
                        className: 'material-symbols-outlined',
                        tagName: 'span',
                        text: 'warning',
                        color: '#000000'
                    }
                },
                {
                    type: 'info',
                    background: '#17a2b8',
                    icon: {
                        className: 'material-symbols-outlined',
                        tagName: 'span',
                        text: 'info',
                        color: '#ffffff'
                    }
                }
            ]
        });
    }

    /**
     * Zeigt eine Erfolgs-Benachrichtigung an
     * @param {string} nachricht - Die anzuzeigende Nachricht
     */
    erfolg(nachricht) {
        this.notyf.success(nachricht);
    }

    /**
     * Zeigt eine Fehler-Benachrichtigung an
     * @param {string} nachricht - Die anzuzeigende Nachricht
     */
    fehler(nachricht) {
        this.notyf.error(nachricht);
    }

    /**
     * Zeigt eine Warnung an
     * @param {string} nachricht - Die anzuzeigende Nachricht
     */
    warnung(nachricht) {
        this.notyf.open({
            type: 'warning',
            message: nachricht
        });
    }

    /**
     * Zeigt eine Info-Benachrichtigung an
     * @param {string} nachricht - Die anzuzeigende Nachricht
     */
    info(nachricht) {
        this.notyf.open({
            type: 'info',
            message: nachricht
        });
    }

    /**
     * Zeigt eine Benachrichtigung mit benutzerdefinierten Optionen an
     * @param {string} nachricht - Die anzuzeigende Nachricht
     * @param {string} typ - Der Typ der Benachrichtigung ('success', 'error', 'warning', 'info')
     * @param {number} dauer - Die Anzeigedauer in Millisekunden (optional)
     */
    benachrichtigung(nachricht, typ = 'info', dauer = null) {
        const optionen = {
            type: typ,
            message: nachricht
        };

        if (dauer !== null) {
            optionen.duration = dauer;
        }

        this.notyf.open(optionen);
    }

    /**
     * Schließt alle aktiven Benachrichtigungen
     */
    alleSchliessen() {
        this.notyf.dismissAll();
    }
}

// Globale Instanz erstellen
window.NotificationManager = new NotificationManager(); 