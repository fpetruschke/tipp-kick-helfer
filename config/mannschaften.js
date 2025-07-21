// Mannschaften-Konfiguration
// Diese Datei enthält alle verfügbaren Mannschaften für das TippKick-Spiel

const MannschaftenKonfiguration = {
    // Nationalmannschaften
    nationalmannschaften: [
        {
            name: 'Deutschland',
            typ: 'national',
            land: 'Deutschland',
            flagge: 'assets/img/flaggen/deutschland.png'
        },
        {
            name: 'Brasilien',
            typ: 'national',
            land: 'Brasilien',
            flagge: 'assets/img/flaggen/brasilien.png'
        },
        {
            name: 'Argentinien',
            typ: 'national',
            land: 'Argentinien',
            flagge: 'assets/img/flaggen/argentinien.png'
        },
        {
            name: 'Frankreich',
            typ: 'national',
            land: 'Frankreich',
            flagge: 'assets/img/flaggen/frankreich.png'
        },
        {
            name: 'Spanien',
            typ: 'national',
            land: 'Spanien',
            flagge: 'assets/img/flaggen/spanien.png'
        },
        {
            name: 'England',
            typ: 'national',
            land: 'England',
            flagge: 'assets/img/flaggen/england.png'
        },
        {
            name: 'Italien',
            typ: 'national',
            land: 'Italien',
            flagge: 'assets/img/flaggen/italien.png'
        },
        {
            name: 'Island',
            typ: 'national',
            land: 'Island',
            flagge: 'assets/img/flaggen/island.png'
        },
        {
            name: 'Irland',
            typ: 'national',
            land: 'Irland',
            flagge: 'assets/img/flaggen/irland.png'
        },
        {
            name: 'Niederlande',
            typ: 'national',
            land: 'Niederlande',
            flagge: 'assets/img/flaggen/niederlande.png'
        },
        {
            name: 'Portugal',
            typ: 'national',
            land: 'Portugal',
            flagge: 'assets/img/flaggen/portugal.png'
        },
        {
            name: 'Schweiz',
            typ: 'national',
            land: 'Schweiz',
            flagge: 'assets/img/flaggen/schweiz.png'
        },
        {
            name: 'Kroatien',
            typ: 'national',
            land: 'Kroatien',
            flagge: 'assets/img/flaggen/kroatien.png'
        }
    ],

    // Vereine
    vereine: [
        {
            name: 'Bayern München',
            typ: 'verein',
            land: 'Deutschland',
            flagge: 'assets/img/logos/bayern-muenchen.png'
        },
        {
            name: 'Borussia Dortmund',
            typ: 'verein',
            land: 'Deutschland',
            flagge: 'assets/img/logos/borussia-dortmund.png'
        },
        {
            name: 'Real Madrid',
            typ: 'verein',
            land: 'Spanien',
            flagge: 'assets/img/logos/real-madrid.png'
        },
        {
            name: 'Barcelona',
            typ: 'verein',
            land: 'Spanien',
            flagge: 'assets/img/logos/barcelona.png'
        },
        {
            name: 'Manchester United',
            typ: 'verein',
            land: 'England',
            flagge: 'assets/img/logos/manchester-united.png'
        },
        {
            name: 'Liverpool',
            typ: 'verein',
            land: 'England',
            flagge: 'assets/img/logos/liverpool.png'
        },
        {
            name: 'Paris Saint-Germain',
            typ: 'verein',
            land: 'Frankreich',
            flagge: 'assets/img/logos/psg.png'
        },
        {
            name: 'Juventus',
            typ: 'verein',
            land: 'Italien',
            flagge: 'assets/img/logos/juventus.png'
        },
        {
            name: 'AC Mailand',
            typ: 'verein',
            land: 'Italien',
            flagge: 'assets/img/logos/ac-mailand.png'
        },
        {
            name: 'Inter Mailand',
            typ: 'verein',
            land: 'Italien',
            flagge: 'assets/img/logos/inter-mailand.png'
        },
        {
            name: 'FC St. Pauli',
            typ: 'verein',
            land: 'Deutschland',
            flagge: 'assets/img/logos/fc-st-pauli.png'
        },
        {
            name: 'HSV',
            typ: 'verein',
            land: 'Deutschland',
            flagge: 'assets/img/logos/hsv.png'
        },
        {
            name: 'GNK Dinamo Zagreb',
            typ: 'verein',
            land: 'Kroatien',
            flagge: 'assets/img/logos/dinamo-zagreb.png'
        },
        {
            name: 'Grasshopper Club Zürich',
            typ: 'verein',
            land: 'Schweiz',
            flagge: 'assets/img/logos/grasshopper-club-zuerich.png'
        },
    ],

    // Hilfsmethoden
    /**
     * Gibt alle Mannschaften zurück (Nationalmannschaften + Vereine)
     * @returns {Array} Alle verfügbaren Mannschaften
     */
    alleMannschaften() {
        return [...this.nationalmannschaften, ...this.vereine];
    },

    /**
     * Gibt nur Nationalmannschaften zurück
     * @returns {Array} Alle Nationalmannschaften
     */
    nurNationalmannschaften() {
        return this.nationalmannschaften;
    },

    /**
     * Gibt nur Vereine zurück
     * @returns {Array} Alle Vereine
     */
    nurVereine() {
        return this.vereine;
    },

    /**
     * Sucht eine Mannschaft nach Namen
     * @param {string} name - Name der gesuchten Mannschaft
     * @returns {Object|null} Gefundene Mannschaft oder null
     */
    findeMannschaft(name) {
        return this.alleMannschaften().find(m => m.name === name) || null;
    },

    /**
     * Filtert Mannschaften nach Typ
     * @param {string} typ - Typ der Mannschaft ('national' oder 'verein')
     * @returns {Array} Gefilterte Mannschaften
     */
    filtereNachTyp(typ) {
        return this.alleMannschaften().filter(m => m.typ === typ);
    },

    /**
     * Filtert Mannschaften nach Land
     * @param {string} land - Land der Mannschaft
     * @returns {Array} Gefilterte Mannschaften
     */
    filtereNachLand(land) {
        return this.alleMannschaften().filter(m => m.land === land);
    },

    /**
     * Gruppiert Vereine nach Land
     * @returns {Object} Vereine gruppiert nach Land
     */
    gruppiereVereineNachLand() {
        const gruppiert = {};
        this.vereine.forEach(verein => {
            if (!gruppiert[verein.land]) {
                gruppiert[verein.land] = [];
            }
            gruppiert[verein.land].push(verein);
        });
        return gruppiert;
    }
};

// Exportiere die Konfiguration für globale Verwendung
window.MannschaftenKonfiguration = MannschaftenKonfiguration; 