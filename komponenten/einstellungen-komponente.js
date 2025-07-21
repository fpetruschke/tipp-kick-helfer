// App-Einstellungen Komponente
const EinstellungenKomponente = {
    template: `
        <div class="portrait-only">
            <div class="text-center mb-4">
                <h2 class="text-tipp-kick">App-Einstellungen</h2>
            </div>

            <!-- App-Menü -->
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="mb-0">
                        <span class="material-symbols-outlined me-2">settings</span>
                        App-Einstellungen
                    </h5>
                </div>
                <div class="card-body">
                    <div class="d-grid">
                        <button
                            type="button"
                            class="btn btn-outline-danger"
                            @click="zeigeLoeschenModal"
                        >
                            <span class="material-symbols-outlined me-2">delete_forever</span>
                            Alle Daten löschen
                        </button>
                    </div>
                </div>
            </div>

            <!-- Zurück Button -->
            <div class="d-grid">
                <button type="button" class="btn btn-outline-secondary" @click="$router.push('/')">
                    <span class="material-symbols-outlined me-2">arrow_back</span>
                    Zurück
                </button>
            </div>

            <!-- Löschen Modal -->
            <div class="modal fade" id="loeschenModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-danger">
                                <span class="material-symbols-outlined me-2">warning</span>
                                Alle Daten löschen?
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="mb-0">
                                <strong>Achtung!</strong> Diese Aktion löscht alle gespeicherten Daten unwiderruflich:
                            </p>
                            <ul class="mt-2 mb-0">
                                <li>Alle Spielstatistiken</li>
                                <li>Alle Spieleinstellungen</li>
                                <li>Alle benutzerdefinierten Vereine</li>
                            </ul>
                            <p class="text-danger mt-3 mb-0">
                                <strong>Diese Aktion kann nicht rückgängig gemacht werden!</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Abbrechen
                            </button>
                            <button type="button" class="btn btn-danger" @click="alleDatenLoeschen">
                                <span class="material-symbols-outlined me-2">delete_forever</span>
                                Ja, alle Daten löschen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            // Keine Daten mehr benötigt für App-Einstellungen
        }
    },
    methods: {
        zeigeLoeschenModal() {
            const modal = new bootstrap.Modal(document.getElementById('loeschenModal'));
            modal.show();
        },
        alleDatenLoeschen() {
            // Lösche alle localStorage-Daten
            localStorage.removeItem('spielEinstellungen');
            localStorage.removeItem('spielStatistiken');
            localStorage.removeItem('spielTyp');

            // Schließe Modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('loeschenModal'));
            modal.hide();

            // Zeige Bestätigung
            alert('Alle Daten wurden erfolgreich gelöscht!');

            // Zurück zur Startseite
            this.$router.push('/');
        }
    },
    mounted() {
        // Keine Initialisierung mehr benötigt für App-Einstellungen
    }
};

// Exportiere für globale Verwendung
window.EinstellungenKomponente = EinstellungenKomponente;
