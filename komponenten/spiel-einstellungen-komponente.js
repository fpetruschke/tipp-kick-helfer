// Spieleinstellungen Komponente
const SpieleinstellungenKomponente = {
    template: `
        <div class="portrait-only">
            <div class="text-center mb-4">
                <h2 class="text-tipp-kick">Spieleinstellungen</h2>
            </div>

            <form @submit.prevent="speichereEinstellungen">
                <!-- Halbzeitlänge - nur für relevante Spielmodi -->
                <div v-if="!istZeitloserSpielmodus" class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="material-symbols-outlined me-2">timer</span>
                            Halbzeitlänge
                        </h5>
                        <div class="row align-items-center">
                            <div class="col-8">
                                <input
                                    type="range"
                                    class="form-range"
                                    min="0.5"
                                    max="10"
                                    step="0.5"
                                    v-model="halbzeitLaenge"
                                >
                                <div class="d-flex justify-content-between">
                                    <small>30 Sek</small>
                                    <small>{{ formatierteHalbzeitLaenge(halbzeitLaenge) }}</small>
                                    <small>10 Min</small>
                                </div>
                            </div>
                            <div class="col-4 text-center">
                                <div class="text-tipp-kick">
                                    <strong>{{ formatierteSpielLaenge(spielLaenge) }}</strong>
                                    <br><small>Gesamtspielzeit</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Training Runden (nur für Training-Modus) -->
                <div v-if="spielTyp === 'training'" class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="material-symbols-outlined me-2">repeat</span>
                            Anzahl Runden
                        </h5>
                        <div class="row align-items-center">
                            <div class="col-8">
                                <input
                                    type="range"
                                    class="form-range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    v-model="trainingRunden"
                                >
                                <div class="d-flex justify-content-between">
                                    <small>1 Runde</small>
                                    <small><span class="badge bg-tipp-kick">{{ trainingRunden }} {{ trainingRunden === 1 ? 'Runde' : 'Runden' }}</span></small>
                                    <small>10 Runden</small>
                                </div>
                            </div>
                            <div class="col-4 text-center">
                                <div class="text-tipp-kick">
                                    <strong>{{ gesamtSchuesse }}</strong>
                                    <br><small>Gesamte Schüsse</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Elfmeterschießen Schüsse (nur für Elfmeterschießen-Modus) -->
                <div v-if="spielTyp === 'elfmeterschiessen'" class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="material-symbols-outlined me-2">sports_soccer</span>
                            Anzahl Schüsse pro Team
                        </h5>
                        <div class="row align-items-center">
                            <div class="col-8">
                                <input
                                    type="range"
                                    class="form-range"
                                    min="3"
                                    max="10"
                                    step="1"
                                    v-model="elfmeterSchuesse"
                                >
                                <div class="d-flex justify-content-between">
                                    <small>3 Schüsse</small>
                                    <small><span class="badge bg-tipp-kick">{{ elfmeterSchuesse }} {{ elfmeterSchuesse === 1 ? 'Schuss' : 'Schüsse' }}</span></small>
                                    <small>10 Schüsse</small>
                                </div>
                            </div>
                            <div class="col-4 text-center">
                                <div class="text-tipp-kick">
                                    <strong>{{ gesamtElfmeterSchuesse }}</strong>
                                    <br><small>Gesamte Schüsse</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ballfarben -->
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="material-symbols-outlined me-2">sports_soccer</span>
                            Ballfarben
                        </h5>
                        <div class="row">
                            <div class="col-6">
                                <label class="form-label">Team 1</label>
                                <div class="mb-2">
                                    <select class="form-select mb-2" v-model="ballFarbenTyp.team1" @change="validiereBallFarben">
                                        <option value="standard">Standard (Schwarz/Weiß)</option>
                                        <option value="custom">Eigene Farbe</option>
                                    </select>
                                    <input
                                        v-if="ballFarbenTyp.team1 === 'custom'"
                                        type="color"
                                        class="form-control form-control-color"
                                        v-model="ballFarben.team1"
                                        @input="validiereBallFarben"
                                        title="Wähle die Farbe für Team 1"
                                    >
                                    <select v-else class="form-select" v-model="ballFarben.team1" @change="validiereBallFarben">
                                        <option value="schwarz">Schwarz</option>
                                        <option value="weiß">Weiß</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Team 2</label>
                                <div class="mb-2">
                                    <select class="form-select mb-2" v-model="ballFarbenTyp.team2" @change="validiereBallFarben">
                                        <option value="standard">Standard (Schwarz/Weiß)</option>
                                        <option value="custom">Eigene Farbe</option>
                                    </select>
                                    <input
                                        v-if="ballFarbenTyp.team2 === 'custom'"
                                        type="color"
                                        class="form-control form-control-color"
                                        v-model="ballFarben.team2"
                                        @input="validiereBallFarben"
                                        title="Wähle die Farbe für Team 2"
                                    >
                                    <select v-else class="form-select" v-model="ballFarben.team2" @change="validiereBallFarben">
                                        <option value="weiß">Weiß</option>
                                        <option value="schwarz">Schwarz</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- Fehlermeldung für Ballfarben -->
                        <div v-if="ballFarbenFehler" class="alert alert-danger mt-2">
                            <span class="material-symbols-outlined me-2">error</span>
                            {{ ballFarbenFehler }}
                        </div>
                    </div>
                </div>

                <!-- Spieler -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title mb-0">
                                <span class="material-symbols-outlined me-2">person</span>
                                Spieler
                            </h5>
                            <button type="button" class="btn btn-sm btn-tipp-kick" @click="fuegeSpielerHinzu">
                                <span class="material-symbols-outlined">add</span>
                            </button>
                        </div>

                        <div v-for="(spielerItem, index) in spieler" :key="index" class="card mb-3">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-4">
                                        <input
                                            type="text"
                                            class="form-control"
                                            :placeholder="'Spieler ' + (index + 1)"
                                            v-model="spielerItem.name"
                                            maxlength="40"
                                        >
                                    </div>
                                    <div class="col-5">
                                        <button
                                            type="button"
                                            class="btn btn-outline-tipp-kick btn-sm w-100"
                                            @click="waehleMannschaft(index)"
                                        >
                                            <div class="d-flex align-items-center justify-content-center">
                                                <img
                                                    v-if="spielerItem.mannschaftFlagge"
                                                    :src="spielerItem.mannschaftFlagge"
                                                    :alt="spielerItem.mannschaft"
                                                    class="me-2"
                                                    style="max-height: 20px; max-width: 25px;"
                                                    @error="handleImageError"
                                                >
                                                <span v-if="!spielerItem.mannschaftLand" class="material-symbols-outlined me-1">flag</span>
                                                <span class="text-truncate">
                                                    <span v-if="spielerItem.mannschaftLand" class="text-muted me-1">{{ spielerItem.mannschaftLand }}</span>
                                                    {{ spielerItem.mannschaft || 'Mannschaft wählen' }}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-3 text-end">
                                        <button
                                            type="button"
                                            class="btn btn-outline-danger btn-sm"
                                            @click="entferneSpieler(index)"
                                            title="Spieler entfernen"
                                        >
                                            <span class="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hintergrundgeräusch -->
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="material-symbols-outlined me-2">volume_up</span>
                            Hintergrundgeräusch
                        </h5>
                        <div class="form-check form-switch">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                v-model="hintergrundGerauesch"
                                id="hintergrundGeraueschSwitch"
                                style="cursor: pointer;"
                            >
                            <label class="form-check-label" for="hintergrundGeraueschSwitch" style="cursor: pointer;">
                                Stadionatmosphäre abspielen
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-tipp-kick btn-lg">
                        <span class="material-symbols-outlined me-2">play_arrow</span>
                        Spiel starten
                    </button>
                    <button type="button" class="btn btn-outline-dark" @click="$router.push('/')">
                        <span class="material-symbols-outlined me-2">arrow_back</span>
                        Zurück
                    </button>
                </div>
            </form>

            <!-- Mannschaftsauswahl Modal -->
            <div class="modal fade" id="mannschaftModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Mannschaft auswählen</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Mannschaft suchen..."
                                    v-model="mannschaftSuche"
                                >
                            </div>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-8">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Eigenen Verein eingeben..."
                                            v-model="eigenerVerein"
                                        >
                                    </div>
                                    <div class="col-4">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Logo URL (optional)"
                                            v-model="eigenerVereinLogo"
                                        >
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-tipp-kick d-flex align-items-center justify-content-center"
                                        @click="fuegeEigenenVereinHinzu"
                                        :disabled="!eigenerVerein.trim()"
                                    >
                                        <span class="material-symbols-outlined me-1">add</span>
                                        Eigenen Verein hinzufügen
                                    </button>
                                </div>
                            </div>
                            <!-- Kategorie-Tabs -->
                            <div v-if="spielTyp !== 'wm'" class="mb-3">
                                <ul class="nav nav-tabs" id="mannschaftTabs" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="national-tab" data-bs-toggle="tab" data-bs-target="#national" type="button" role="tab">
                                            <span class="material-symbols-outlined me-1">flag</span>
                                            Nationalmannschaften
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="vereine-tab" data-bs-toggle="tab" data-bs-target="#vereine" type="button" role="tab">
                                            <span class="material-symbols-outlined me-1">sports_soccer</span>
                                            Vereine
                                        </button>
                                    </li>
                                    <li v-if="eigeneVereine.length > 0" class="nav-item" role="presentation">
                                        <button class="nav-link" id="eigene-tab" data-bs-toggle="tab" data-bs-target="#eigene" type="button" role="tab">
                                            <span class="material-symbols-outlined me-1">person_add</span>
                                            Eigene Vereine
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <!-- Tab-Inhalte -->
                            <div class="tab-content" id="mannschaftTabContent">
                                <!-- Nationalmannschaften Tab -->
                                <div class="tab-pane fade show active" id="national" role="tabpanel">
                                                                    <div class="row">
                                    <div class="col-6" v-for="mannschaft in gefilterteNationalmannschaften" :key="mannschaft.name">
                                        <div
                                            class="card mb-2 mannschaft-card"
                                            @click="waehleMannschaftAus(mannschaft)"
                                        >
                                                <div class="card-body text-center">
                                                    <div class="mb-2">
                                                        <img
                                                            :src="mannschaft.flagge"
                                                            :alt="mannschaft.name"
                                                            class="img-fluid"
                                                            style="max-height: 30px; max-width: 40px;"
                                                            @error="handleImageError"
                                                        >
                                                    </div>
                                                    <strong>{{ mannschaft.name }}</strong>
                                                    <br>
                                                    <small class="text-muted">{{ mannschaft.land }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Vereine Tab -->
                                <div class="tab-pane fade" id="vereine" role="tabpanel">
                                    <div v-for="(vereine, land) in gruppierteVereine" :key="land" class="mb-4">
                                        <h6 class="text-muted mb-3">
                                            <img
                                                :src="getLandFlagge(land)"
                                                :alt="land"
                                                class="me-2"
                                                style="max-height: 20px; max-width: 25px;"
                                                @error="handleImageError"
                                            >
                                            {{ land }}
                                        </h6>
                                        <div class="row">
                                            <div class="col-6" v-for="verein in vereine" :key="verein.name">
                                                <div
                                                    class="card mb-2 mannschaft-card"
                                                    @click="waehleMannschaftAus(verein)"
                                                >
                                                    <div class="card-body text-center">
                                                        <div class="mb-2">
                                                            <img
                                                                :src="verein.flagge"
                                                                :alt="verein.name"
                                                                class="img-fluid"
                                                                style="max-height: 30px; max-width: 40px;"
                                                                @error="handleImageError"
                                                            >
                                                        </div>
                                                        <strong>{{ verein.name }}</strong>
                                                        <br>
                                                        <small class="text-muted">{{ verein.land }}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Eigene Vereine Tab -->
                                <div class="tab-pane fade" id="eigene" role="tabpanel">
                                    <div class="row">
                                        <div class="col-6" v-for="verein in gefilterteEigeneVereine" :key="verein.name">
                                            <div
                                                class="card mb-2 mannschaft-card"
                                                @click="waehleMannschaftAus(verein)"
                                            >
                                                <div class="card-body text-center">
                                                    <div class="mb-2">
                                                        <img
                                                            :src="verein.flagge"
                                                            :alt="verein.name"
                                                            class="flagge-logo flagge-logo-modal"
                                                            @error="handleImageError"
                                                        >
                                                    </div>
                                                    <strong>{{ verein.name }}</strong>
                                                    <br>
                                                    <small class="text-muted">{{ verein.land }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- WM-Modus: Nur Nationalmannschaften -->
                            <div v-if="spielTyp === 'wm'" class="row">
                                <div class="col-6" v-for="mannschaft in gefilterteNationalmannschaften" :key="mannschaft.name">
                                    <div
                                        class="card mb-2 mannschaft-card"
                                        @click="waehleMannschaftAus(mannschaft)"
                                    >
                                        <div class="card-body text-center">
                                            <div class="mb-2">
                                                <img
                                                    :src="mannschaft.flagge"
                                                    :alt="mannschaft.name"
                                                    class="flagge-logo flagge-logo-modal"
                                                    @error="handleImageError"
                                                >
                                            </div>
                                            <strong>{{ mannschaft.name }}</strong>
                                            <br>
                                            <small class="text-muted">{{ mannschaft.land }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            halbzeitLaenge: 5,
            ballFarben: {
                team1: 'schwarz',
                team2: 'weiß'
            },
            ballFarbenTyp: {
                team1: 'standard',
                team2: 'standard'
            },
            ballFarbenFehler: '',
            spieler: [
                { name: '', mannschaft: '' }
            ],
            hintergrundGerauesch: false,
            trainingRunden: 3,
            elfmeterSchuesse: 5,
            mannschaftSuche: '',
            eigenerVerein: '',
            eigenerVereinLogo: '',
            aktuellerSpielerIndex: 0,
            eigeneVereine: [],
            mannschaften: window.MannschaftenKonfiguration.alleMannschaften()
        }
    },
    computed: {
        spielTyp() {
            return localStorage.getItem('spielTyp');
        },
        istZeitloserSpielmodus() {
            const spielTyp = this.spielTyp;
            return spielTyp === 'elfmeterschiessen' || spielTyp === 'training';
        },
        spielLaenge() {
            return this.halbzeitLaenge * 2;
        },
        gesamtSchuesse() {
            return this.spieler.length * this.trainingRunden;
        },
        gesamtElfmeterSchuesse() {
            return this.spieler.length * this.elfmeterSchuesse;
        },
        gefilterteMannschaften() {
            const spielTyp = localStorage.getItem('spielTyp');
            let mannschaften = window.MannschaftenKonfiguration.alleMannschaften();

            if (spielTyp === 'wm') {
                mannschaften = window.MannschaftenKonfiguration.nurNationalmannschaften();
            }

            if (this.mannschaftSuche) {
                mannschaften = mannschaften.filter(m =>
                    m.name.toLowerCase().includes(this.mannschaftSuche.toLowerCase())
                );
            }

            return mannschaften;
        },
        gefilterteNationalmannschaften() {
            let nationalmannschaften = window.MannschaftenKonfiguration.nurNationalmannschaften();

            if (this.mannschaftSuche) {
                nationalmannschaften = nationalmannschaften.filter(m =>
                    m.name.toLowerCase().includes(this.mannschaftSuche.toLowerCase()) ||
                    m.land.toLowerCase().includes(this.mannschaftSuche.toLowerCase())
                );
            }

            return nationalmannschaften;
        },
        gruppierteVereine() {
            let vereine = window.MannschaftenKonfiguration.nurVereine();

            if (this.mannschaftSuche) {
                vereine = vereine.filter(m =>
                    m.name.toLowerCase().includes(this.mannschaftSuche.toLowerCase()) ||
                    m.land.toLowerCase().includes(this.mannschaftSuche.toLowerCase())
                );
            }

            // Gruppiere nach Land
            const gruppiert = {};
            vereine.forEach(verein => {
                if (!gruppiert[verein.land]) {
                    gruppiert[verein.land] = [];
                }
                gruppiert[verein.land].push(verein);
            });

            return gruppiert;
        },
        gefilterteEigeneVereine() {
            let eigeneVereine = this.eigeneVereine;

            if (this.mannschaftSuche) {
                eigeneVereine = eigeneVereine.filter(verein =>
                    verein.name.toLowerCase().includes(this.mannschaftSuche.toLowerCase()) ||
                    verein.land.toLowerCase().includes(this.mannschaftSuche.toLowerCase())
                );
            }

            return eigeneVereine;
        }
    },
    methods: {
        formatierteHalbzeitLaenge(laenge) {
            if (laenge < 1) {
                return `${Math.round(laenge * 60)} Sek`;
            } else if (laenge === 1) {
                return '1 Min';
            } else {
                return `${laenge} Min`;
            }
        },
        formatierteSpielLaenge(laenge) {
            if (laenge < 1) {
                return `${Math.round(laenge * 60)} Sek`;
            } else if (laenge === 1) {
                return '1 Min';
            } else {
                return `${laenge} Min`;
            }
        },
        fuegeSpielerHinzu() {
            this.spieler.push({ name: '', mannschaft: '' });
        },
        entferneSpieler(index) {
            if (this.spieler.length > 1) {
                this.spieler.splice(index, 1);
            }
        },
        waehleMannschaft(index) {
            this.aktuellerSpielerIndex = index;
            const modal = new bootstrap.Modal(document.getElementById('mannschaftModal'));
            modal.show();
        },
        waehleMannschaftAus(mannschaft) {
            this.spieler[this.aktuellerSpielerIndex].mannschaft = mannschaft.name;
            this.spieler[this.aktuellerSpielerIndex].mannschaftLand = mannschaft.land;
            this.spieler[this.aktuellerSpielerIndex].mannschaftFlagge = mannschaft.flagge;
            const modal = bootstrap.Modal.getInstance(document.getElementById('mannschaftModal'));
            modal.hide();
        },
        fuegeEigenenVereinHinzu() {
            if (!this.eigenerVerein.trim()) return;

            const neuerVerein = {
                name: this.eigenerVerein.trim(),
                typ: 'verein',
                land: 'Benutzerdefiniert',
                flagge: this.eigenerVereinLogo.trim() || 'assets/img/logos/default.png'
            };

            // Füge zu eigenen Vereinen hinzu
            this.eigeneVereine.push(neuerVerein);

            // Speichere in localStorage
            this.speichereEigeneVereine();

            // Wähle den neuen Verein direkt aus
            this.waehleMannschaftAus(neuerVerein);

            // Leere die Eingabefelder
            this.eigenerVerein = '';
            this.eigenerVereinLogo = '';
        },
        handleImageError(event) {
            // Fallback für fehlende Bilder
            console.warn(`Bild konnte nicht geladen werden: ${event.target.src}`);

            // Prüfe ob bereits das Fallback-Bild verwendet wird
            if (event.target.src.includes('default.png')) {
                // Verstecke das Bild komplett, wenn auch das Fallback fehlschlägt
                event.target.style.display = 'none';
                console.error('Auch Fallback-Bild konnte nicht geladen werden');
            } else {
                // Verwende Fallback-Bild
                event.target.src = 'assets/img/logos/default.png';
            }
        },
        validiereBallFarben() {
            this.ballFarbenFehler = '';

            // Wenn beide Standard-Farben verwenden
            if (this.ballFarbenTyp.team1 === 'standard' && this.ballFarbenTyp.team2 === 'standard') {
                // Automatisch unterschiedliche Farben setzen
                if (this.ballFarben.team1 === 'schwarz') {
                    this.ballFarben.team2 = 'weiß';
                } else if (this.ballFarben.team1 === 'weiß') {
                    this.ballFarben.team2 = 'schwarz';
                }
                return true;
            }

            // Wenn mindestens eine eigene Farbe verwendet wird
            if (this.ballFarbenTyp.team1 === 'custom' || this.ballFarbenTyp.team2 === 'custom') {
                const farbe1 = this.ballFarbenTyp.team1 === 'custom' ? this.ballFarben.team1 : this.getHexFarbe(this.ballFarben.team1);
                const farbe2 = this.ballFarbenTyp.team2 === 'custom' ? this.ballFarben.team2 : this.getHexFarbe(this.ballFarben.team2);

                // Normalisiere Hex-Codes (entferne # und konvertiere zu Kleinbuchstaben)
                const normalisierteFarbe1 = farbe1.replace('#', '').toLowerCase();
                const normalisierteFarbe2 = farbe2.replace('#', '').toLowerCase();

                if (normalisierteFarbe1 === normalisierteFarbe2) {
                    this.ballFarbenFehler = 'Die beiden Spieler müssen unterschiedliche Ballfarben haben!';
                    return false;
                }
            }

            return true;
        },
        getHexFarbe(standardFarbe) {
            // Konvertiere Standard-Farben zu Hex-Codes
            switch (standardFarbe) {
                case 'schwarz':
                    return '#000000';
                case 'weiß':
                    return '#ffffff';
                default:
                    return standardFarbe; // Bereits ein Hex-Code
            }
        },
        getLandFlagge(land) {
            // Finde die entsprechende Flagge für das Land
            const nationalmannschaften = window.MannschaftenKonfiguration.nurNationalmannschaften();
            const nationalmannschaft = nationalmannschaften.find(m => m.land === land);

            if (nationalmannschaft) {
                return nationalmannschaft.flagge;
            }

            // Fallback für unbekannte Länder
            return 'assets/img/flaggen/deutschland.png';
        },
        speichereEigeneVereine() {
            localStorage.setItem('eigeneVereine', JSON.stringify(this.eigeneVereine));
        },
        ladeEigeneVereine() {
            const gespeicherteVereine = localStorage.getItem('eigeneVereine');
            if (gespeicherteVereine) {
                this.eigeneVereine = JSON.parse(gespeicherteVereine);
            }
        },
        speichereEinstellungen() {
            // Validiere Eingaben
            const spielTyp = localStorage.getItem('spielTyp');

            // Bestimme minimale Spieleranzahl basierend auf Spieltyp
            let minSpieler = 1; // Standard für Elfmeterschießen und Training
            let fehlerNachricht = 'Mindestens ein Spieler ist erforderlich!';

            if (spielTyp === 'freundschaftsspiel' || spielTyp === 'wm') {
                minSpieler = 2;
                fehlerNachricht = 'Für Freundschaftsspiel und WM werden mindestens zwei Spieler benötigt!';
            }

            if (this.spieler.length < minSpieler) {
                window.NotificationManager.fehler(fehlerNachricht);
                return;
            }

            const spielerOhneNamen = this.spieler.filter(s => !s.name.trim());
            if (spielerOhneNamen.length > 0) {
                window.NotificationManager.fehler('Alle Spieler müssen einen Namen haben!');
                return;
            }

            const spielerOhneMannschaft = this.spieler.filter(s => !s.mannschaft.trim());
            if (spielerOhneMannschaft.length > 0) {
                window.NotificationManager.fehler('Alle Spieler müssen eine Mannschaft haben!');
                return;
            }

            // Validiere Ballfarben
            if (!this.validiereBallFarben()) {
                window.NotificationManager.fehler(this.ballFarbenFehler);
                return;
            }

            // Speichere Einstellungen
            const einstellungen = {
                ballFarben: this.ballFarben,
                ballFarbenTyp: this.ballFarbenTyp,
                spieler: this.spieler,
                hintergrundGerauesch: this.hintergrundGerauesch,
                spielTyp: spielTyp,
                trainingRunden: this.trainingRunden,
                elfmeterSchuesse: this.elfmeterSchuesse
            };

            // Füge Halbzeitlänge nur für zeitbasierte Spielmodi hinzu
            if (!this.istZeitloserSpielmodus) {
                einstellungen.halbzeitLaenge = this.halbzeitLaenge;
                einstellungen.spielLaenge = this.spielLaenge;
            }

            localStorage.setItem('spielEinstellungen', JSON.stringify(einstellungen));

            // Weiter zum Spiel basierend auf Spieltyp
            if (spielTyp === 'elfmeterschiessen') {
                this.$router.push('/elfmeterschiessen');
            } else if (spielTyp === 'training') {
                this.$router.push('/training');
            } else {
                this.$router.push('/spiel');
            }
        }
    },
    mounted() {
        // Lade eigene Vereine
        this.ladeEigeneVereine();

        // Lade gespeicherte Einstellungen
        const gespeicherteEinstellungen = localStorage.getItem('spielEinstellungen');
        if (gespeicherteEinstellungen) {
            const einstellungen = JSON.parse(gespeicherteEinstellungen);

            // Lade Halbzeitlänge nur für zeitbasierte Spielmodi
            if (!this.istZeitloserSpielmodus) {
                this.halbzeitLaenge = einstellungen.halbzeitLaenge || 5;
            }

            this.ballFarben = einstellungen.ballFarben || { team1: 'schwarz', team2: 'weiß' };
            this.ballFarbenTyp = einstellungen.ballFarbenTyp || { team1: 'standard', team2: 'standard' };
            this.spieler = einstellungen.spieler || [{ name: '', mannschaft: '' }];
            this.hintergrundGerauesch = einstellungen.hintergrundGerauesch || false;
            this.trainingRunden = einstellungen.trainingRunden || 3;
            this.elfmeterSchuesse = einstellungen.elfmeterSchuesse || 5; // Standardwert für Elfmeterschießen
        } else {
            // Standard-Spieler basierend auf Spieltyp
            const spielTyp = localStorage.getItem('spielTyp');
            if (spielTyp === 'elfmeterschiessen') {
                // Für Elfmeterschießen: Standardmäßig 2 Spieler, aber auch 1 erlaubt
                this.spieler = [
                    { name: '', mannschaft: '' },
                    { name: '', mannschaft: '' }
                ];
            }
        }

        // Prüfe WM-Modus und leere nicht-Nationalmannschaften
        const spielTyp = localStorage.getItem('spielTyp');
        if (spielTyp === 'wm') {
            this.spieler.forEach(spieler => {
                if (spieler.mannschaft) {
                    const mannschaft = window.MannschaftenKonfiguration.findeMannschaft(spieler.mannschaft);
                    if (mannschaft && mannschaft.typ !== 'national') {
                        spieler.mannschaft = '';
                        spieler.mannschaftLand = '';
                        spieler.mannschaftFlagge = '';
                    }
                }
            });
        }

        // Initialisiere Ballfarben-Validierung
        this.validiereBallFarben();
    }
};

// Exportiere für globale Verwendung
window.SpieleinstellungenKomponente = SpieleinstellungenKomponente;
