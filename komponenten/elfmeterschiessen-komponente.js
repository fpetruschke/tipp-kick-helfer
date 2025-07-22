// Elfmeterschießen Komponente
const ElfmeterschiessenKomponente = {
    template: `
        <div>
            <!-- Ladezustand -->
            <div v-if="!aktuellesSpiel" class="text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-tipp-kick" role="status">
                        <span class="visually-hidden">Lade...</span>
                    </div>
                </div>
                <p class="mt-3 text-muted">Lade Elfmeterschießen...</p>
            </div>

            <!-- Elfmeterschießen-Interface -->
            <div v-else-if="!spielBeendet && aktuellesSpiel" class="text-center">
                <!-- Teams - nur anzeigen wenn mehr als ein Spieler -->
                <div v-if="!istEinzelspieler" class="row mb-4">
                    <div class="col-6">
                        <div class="team-display">
                            <div class="text-center mb-3">
                                <img
                                    :src="aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png'"
                                    :alt="aktuellesSpiel.team1.mannschaft"
                                    class="flagge-logo flagge-logo-spiel mb-2"
                                    @error="handleImageError"
                                >
                                <h4>{{ aktuellesSpiel.team1.name }}</h4>
                                <small class="text-muted">{{ aktuellesSpiel.team1.mannschaft }}</small>
                            </div>
                            <div class="mb-2">
                                <span
                                    class="badge"
                                    :class="getBallColorClass('team1')"
                                    :style="getBallColorStyle('team1')"
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div class="display-4 mb-3">{{ aktuellesSpiel.tore.team1 }}</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="team-display">
                            <div class="text-center mb-3">
                                <img
                                    :src="aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png'"
                                    :alt="aktuellesSpiel.team2.mannschaft"
                                    class="flagge-logo flagge-logo-spiel mb-2"
                                    @error="handleImageError"
                                >
                                <h4>{{ aktuellesSpiel.team2.name }}</h4>
                                <small class="text-muted">{{ aktuellesSpiel.team2.mannschaft }}</small>
                            </div>
                            <div class="mb-2">
                                <span
                                    class="badge"
                                    :class="getBallColorClass('team2')"
                                    :style="getBallColorStyle('team2')"
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div class="display-4 mb-3">{{ aktuellesSpiel.tore.team2 }}</div>
                        </div>
                    </div>
                </div>

                <!-- Aktueller Schütze - wird deutlich hervorgehoben -->
                <div class="text-center mb-4" v-if="aktuellesSpiel">
                    <!-- Einzelspieler: Zeige nur den einen Spieler -->
                    <div v-if="istEinzelspieler" class="current-shooter team1-active">
                        <div class="card border-primary">
                            <div class="card-body">
                                <div class="mb-3">
                                    <img
                                        :src="aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png'"
                                        :alt="aktuellesSpiel.team1.mannschaft"
                                        class="flagge-logo flagge-logo-spiel-gross mb-2"
                                        @error="handleImageError"
                                    >
                                    <h4 class="text-primary">{{ aktuellesSpiel.team1.name }}</h4>
                                    <small class="text-muted">{{ aktuellesSpiel.team1.mannschaft }}</small>
                                </div>
                                                                    <div class="mb-2">
                                        <span
                                            class="badge"
                                            :class="getBallColorClass('team1')"
                                            :style="getBallColorStyle('team1')"
                                        >
                                            &nbsp;
                                        </span>
                                    </div>
                                <h5 class="text-primary">DEIN SCHUSS!</h5>
                                <p class="text-muted">Gib das Ergebnis deines Schusses ein:</p>
                            </div>
                        </div>
                    </div>
                    <!-- Mehrspieler: Zeige aktuellen Schützen -->
                    <div v-else>
                        <div v-if="elfmeterAktuellerSchuetze === 'team1'" class="current-shooter team1-active">
                            <div class="card border-primary">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <img
                                            :src="aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png'"
                                            :alt="aktuellesSpiel.team1.mannschaft"
                                            class="img-fluid mb-2"
                                            style="max-height: 60px; max-width: 70px;"
                                            @error="handleImageError"
                                        >
                                        <h4 class="text-primary">{{ aktuellesSpiel.team1.name }}</h4>
                                        <small class="text-muted">{{ aktuellesSpiel.team1.mannschaft }}</small>
                                    </div>
                                    <div class="mb-2">
                                        <span
                                            class="badge"
                                            :class="getBallColorClass('team1')"
                                            :style="getBallColorStyle('team1')"
                                        >
                                            &nbsp;
                                        </span>
                                    </div>
                                    <h5 class="text-primary">IST DRAN!</h5>
                                    <p class="text-muted">Gib das Ergebnis deines Schusses ein:</p>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="elfmeterAktuellerSchuetze === 'team2'" class="current-shooter team2-active">
                            <div class="card border-primary">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <img
                                            :src="aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png'"
                                            :alt="aktuellesSpiel.team2.mannschaft"
                                            class="flagge-logo flagge-logo-spiel-gross mb-2"
                                            @error="handleImageError"
                                        >
                                        <h4 class="text-primary">{{ aktuellesSpiel.team2.name }}</h4>
                                        <small class="text-muted">{{ aktuellesSpiel.team2.mannschaft }}</small>
                                    </div>
                                    <div class="mb-2">
                                        <span
                                            class="badge"
                                            :class="getBallColorClass('team2')"
                                            :style="getBallColorStyle('team2')"
                                        >
                                            &nbsp;
                                        </span>
                                    </div>
                                    <h5 class="text-primary">IST DRAN!</h5>
                                    <p class="text-muted">Gib das Ergebnis deines Schusses ein:</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Schuss-Ergebnis Buttons -->
                <div class="row mb-4" v-if="aktuellesSpiel">
                    <div class="col-6">
                        <button
                            class="btn btn-success btn-lg w-100"
                            @click="elfmeterSchussErgebnis(true)"
                        >
                            <span class="material-symbols-outlined me-2">sports_soccer</span>
                            Tor getroffen!
                        </button>
                    </div>
                    <div class="col-6">
                        <button
                            class="btn btn-danger btn-lg w-100"
                            @click="elfmeterSchussErgebnis(false)"
                        >
                            <span class="material-symbols-outlined me-2">close</span>
                            Kein Tor
                        </button>
                    </div>
                </div>

                <!-- Stand -->
                <div class="row mb-4" v-if="aktuellesSpiel">
                    <!-- Einzelspieler: Zeige Cards wie im Training -->
                    <div v-if="istEinzelspieler" class="row">
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Tore</h5>
                                    <div class="display-6 text-success">{{ elfmeterTore.team1 }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Quote</h5>
                                    <div class="display-6 text-tipp-kick">{{ elfmeterQuote }}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Mehrspieler: Zeige beide Teams nebeneinander -->
                    <div v-else class="row">
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="mb-3">
                                        <img
                                            :src="aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png'"
                                            :alt="aktuellesSpiel.team1.mannschaft"
                                            class="flagge-logo flagge-logo-spiel-klein mb-2"
                                            @error="handleImageError"
                                        >
                                        <h6>{{ aktuellesSpiel.team1.name }}</h6>
                                        <small class="text-muted">{{ aktuellesSpiel.team1.mannschaft }}</small>
                                    </div>
                                    <div class="text-tipp-kick">
                                        <strong>Elfmeter: {{ elfmeterTore.team1 }}/{{ elfmeterSchuesse.team1 }}</strong>
                                        <br><small class="text-muted">Tore/Schüsse</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="mb-3">
                                        <img
                                            :src="aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png'"
                                            :alt="aktuellesSpiel.team2.mannschaft"
                                            class="flagge-logo flagge-logo-spiel-klein mb-2"
                                            @error="handleImageError"
                                        >
                                        <h6>{{ aktuellesSpiel.team2.name }}</h6>
                                        <small class="text-muted">{{ aktuellesSpiel.team2.mannschaft }}</small>
                                    </div>
                                    <div class="text-tipp-kick">
                                        <strong>Elfmeter: {{ elfmeterTore.team2 }}/{{ elfmeterSchuesse.team2 }}</strong>
                                        <br><small class="text-muted">Tore/Schüsse</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase Info -->
                <div class="mt-4 text-center" v-if="aktuellesSpiel">
                    <div v-if="elfmeterPhase === 'regulaer'">
                        <h6>
                            <span v-if="istEinzelspieler">Elfmeterschießen ({{ elfmeterSchuesseProTeam }} Schüsse)</span>
                            <span v-else>Reguläres Elfmeterschießen ({{ elfmeterSchuesseProTeam }} Schüsse pro Team)</span>
                        </h6>
                        <p class="text-muted">
                            <span v-if="istEinzelspieler">Schuss {{ elfmeterSchuesse.team1 }} von {{ elfmeterSchuesseProTeam }}</span>
                            <span v-else>Schuss {{ Math.max(elfmeterSchuesse.team1, elfmeterSchuesse.team2) + 1 }} von {{ elfmeterSchuesseProTeam }} ({{ elfmeterSchuesse.team1 + elfmeterSchuesse.team2 }} insgesamt)</span>
                        </p>
                    </div>
                    <div v-else-if="elfmeterPhase === 'sudden-death'">
                        <h6 class="text-danger">Sudden Death</h6>
                        <p class="text-muted">
                            <span v-if="istEinzelspieler">Nächster Schuss entscheidet! (Schuss {{ elfmeterSchuesse.team1 }})</span>
                            <span v-else>Nächster Schuss entscheidet! (Schuss {{ Math.max(elfmeterSchuesse.team1, elfmeterSchuesse.team2) + 1 }}, {{ elfmeterSchuesse.team1 + elfmeterSchuesse.team2 }} insgesamt)</span>
                        </p>
                    </div>
                </div>

                <!-- Lautstärke-Regler für Hintergrundgeräusch -->
                <div v-if="spielEinstellungen && spielEinstellungen.hintergrundGerauesch" class="mt-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <span class="material-symbols-outlined me-2">volume_up</span>
                                <label class="form-label mb-0 me-3">Hintergrundgeräusch</label>
                                <input
                                    type="range"
                                    class="form-range flex-grow-1"
                                    min="0"
                                    max="100"
                                    step="5"
                                    v-model="hintergrundLautstaerke"
                                    @input="aendereHintergrundLautstaerke"
                                >
                                <span class="ms-2 text-muted">{{ hintergrundLautstaerke }}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Abbrechen Button -->
                <div class="mt-4" v-if="aktuellesSpiel">
                    <button
                        class="btn btn-outline-dark"
                        @click="spielAbbrechen"
                    >
                        <span class="material-symbols-outlined me-2">stop</span>
                        Spiel abbrechen
                    </button>
                </div>
            </div>

            <!-- Spiel beendet -->
            <div v-else-if="spielBeendet && aktuellesSpiel" class="text-center">
                <div class="card">
                    <div class="card-body">
                        <h3 class="text-tipp-kick mb-4">Elfmeterschießen beendet!</h3>
                        
                        <div class="row mb-4">
                            <div class="col-6">
                                <div class="team-display">
                                    <div class="text-center mb-3">
                                        <img
                                            :src="aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png'"
                                            :alt="aktuellesSpiel.team1.mannschaft"
                                            class="flagge-logo flagge-logo-spiel mb-2"
                                            @error="handleImageError"
                                        >
                                        <h4>{{ aktuellesSpiel.team1.name }}</h4>
                                        <small class="text-muted">{{ aktuellesSpiel.team1.mannschaft }}</small>
                                    </div>
                                    <div class="display-4 mb-3">{{ aktuellesSpiel.tore.team1 }}</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="team-display">
                                    <div class="text-center mb-3">
                                        <img
                                            :src="aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png'"
                                            :alt="aktuellesSpiel.team2.mannschaft"
                                            class="flagge-logo flagge-logo-spiel mb-2"
                                            @error="handleImageError"
                                        >
                                        <h4>{{ aktuellesSpiel.team2.name }}</h4>
                                        <small class="text-muted">{{ aktuellesSpiel.team2.mannschaft }}</small>
                                    </div>
                                    <div class="display-4 mb-3">{{ aktuellesSpiel.tore.team2 }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <h4 v-if="aktuellesSpiel.tore.team1 > aktuellesSpiel.tore.team2" class="text-success">
                                🏆 {{ aktuellesSpiel.team1.name }} gewinnt!
                            </h4>
                            <h4 v-else-if="aktuellesSpiel.tore.team2 > aktuellesSpiel.tore.team1" class="text-success">
                                🏆 {{ aktuellesSpiel.team2.name }} gewinnt!
                            </h4>
                            <h4 v-else class="text-warning">
                                ⚽ Unentschieden!
                            </h4>
                        </div>

                        <div class="d-grid gap-2 d-md-block">
                            <button
                                class="btn btn-tipp-kick btn-lg me-md-2"
                                @click="neuesSpiel"
                            >
                                <span class="material-symbols-outlined me-2">refresh</span>
                                Neues Elfmeterschießen
                            </button>
                            <button
                                class="btn btn-outline-dark btn-lg"
                                @click="zurueckZurStartseite"
                            >
                                <span class="material-symbols-outlined me-2">home</span>
                                Zurück zur Startseite
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Abbrechen-Confirm-Modal -->
            <div class="modal fade" id="abbrechenModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Elfmeterschießen abbrechen?</h5>
                        </div>
                        <div class="modal-body">
                            <p>Willst Du wirklich abbrechen? Euer Fortschritt wird nicht gespeichert.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Abbrechen
                            </button>
                            <button type="button" class="btn btn-danger" @click="spielWirklichAbbrechen">
                                <span class="material-symbols-outlined me-2">stop</span>
                                Ja, abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            aktuellesSpiel: null,
            spielBeendet: false,
            elfmeterAktiv: true,
            elfmeterTore: { team1: 0, team2: 0 },
            elfmeterSchuesse: { team1: 0, team2: 0 },
            elfmeterPhase: 'regulaer',
            elfmeterAktuellerSchuetze: 'team1',
            spielStartZeit: null,
            spielerAnzahl: 0,
            elfmeterSchuesseProTeam: 5,
            spielEinstellungen: null,
            hintergrundLautstaerke: 50
        };
    },
    computed: {
        istEinzelspieler() {
            return this.spielerAnzahl === 1;
        },
        elfmeterQuote() {
            if (this.elfmeterSchuesse.team1 === 0) return 0;
            return Math.round((this.elfmeterTore.team1 / this.elfmeterSchuesse.team1) * 100);
        }
    },
    methods: {
        elfmeterSchussErgebnis(istTor) {
            if (!this.aktuellesSpiel) return;

            const team = this.elfmeterAktuellerSchuetze;
            const spieler = this.aktuellesSpiel[team].name;

            if (istTor) {
                this.elfmeterTore[team]++;
                this.aktuellesSpiel.tore[team]++;
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('torjubel');
                }
            } else {
                // Spiele "Daneben"-Sound
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('daneben');
                }
            }

            this.elfmeterSchuesse[team]++;

            // Stelle sicher, dass Vue die Änderungen erkennt
            this.elfmeterSchuesse = { ...this.elfmeterSchuesse };
            this.elfmeterTore = { ...this.elfmeterTore };

            // Debug-Ausgabe
            console.log(`Schuss für ${team}: Tor=${istTor}, Tore=${this.elfmeterTore[team]}, Schüsse=${this.elfmeterSchuesse[team]}, Einzelspieler=${this.istEinzelspieler}, SchüsseProTeam=${this.elfmeterSchuesseProTeam}`);

            // Wechsle Schützen nur bei Mehrspieler
            if (!this.istEinzelspieler) {
                this.elfmeterAktuellerSchuetze = team === 'team1' ? 'team2' : 'team1';
            }

            // Prüfe ob reguläres Elfmeterschießen beendet
            if (this.elfmeterPhase === 'regulaer') {
                // Bei Einzelspieler: Prüfe ob die festgelegte Anzahl Schüsse erreicht ist
                if (this.istEinzelspieler) {
                    if (this.elfmeterSchuesse.team1 >= this.elfmeterSchuesseProTeam) {
                        // Elfmeterschießen beendet für Einzelspieler
                        this.elfmeterBeenden();
                        return;
                    }
                } else {
                    // Bei Mehrspieler: Prüfe ob beide Teams ihre Schüsse abgegeben haben
                    if (this.elfmeterSchuesse.team1 >= this.elfmeterSchuesseProTeam &&
                        this.elfmeterSchuesse.team2 >= this.elfmeterSchuesseProTeam) {

                        if (this.elfmeterTore.team1 === this.elfmeterTore.team2) {
                            // Unentschieden nach regulärem Elfmeterschießen
                            this.elfmeterPhase = 'sudden-death';
                            // Zeige Notification für Sudden Death
                            if (window.NotificationManager) {
                                window.NotificationManager.info('Sudden Death! Nächster Schuss entscheidet!');
                            }
                        } else {
                            // Elfmeterschießen beendet
                            this.elfmeterBeenden();
                        }
                    }
                }
            } else if (this.elfmeterPhase === 'sudden-death') {
                // Prüfe ob Sudden Death beendet
                if (this.elfmeterTore.team1 !== this.elfmeterTore.team2) {
                    this.elfmeterBeenden();
                }
            }
        },
        elfmeterBeenden() {
            this.elfmeterAktiv = false;
            this.spielBeendet = true;
            this.speichereSpielergebnis();
        },
        speichereSpielergebnis() {
            if (!this.aktuellesSpiel) return;

            // Speichere das Elfmeterschießen-Ergebnis
            const spielergebnis = {
                datum: new Date().toISOString(),
                spielTyp: 'elfmeterschiessen',
                team1: {
                    name: this.aktuellesSpiel.team1.name,
                    mannschaft: this.aktuellesSpiel.team1.mannschaft,
                    tore: this.aktuellesSpiel.tore.team1,
                    elfmeterTore: this.elfmeterTore.team1,
                    elfmeterSchuesse: this.elfmeterSchuesse.team1
                },
                team2: {
                    name: this.aktuellesSpiel.team2.name,
                    mannschaft: this.aktuellesSpiel.team2.mannschaft,
                    tore: this.aktuellesSpiel.tore.team2,
                    elfmeterTore: this.elfmeterTore.team2,
                    elfmeterSchuesse: this.elfmeterSchuesse.team2
                },
                sieger: this.aktuellesSpiel.tore.team1 > this.aktuellesSpiel.tore.team2 ? 'team1' :
                    this.aktuellesSpiel.tore.team2 > this.aktuellesSpiel.tore.team1 ? 'team2' : 'unentschieden'
            };

            // Lade bestehende Statistiken
            let statistiken = JSON.parse(localStorage.getItem('spielStatistiken') || '[]');
            statistiken.push(spielergebnis);
            localStorage.setItem('spielStatistiken', JSON.stringify(statistiken));
        },
        handleImageError(event) {
            event.target.src = 'assets/img/logos/default.png';
        },
        getBallColorClass(team) {
            if (!this.aktuellesSpiel || !this.aktuellesSpiel[team]) return '';

            const ballFarbe = this.aktuellesSpiel[team].ballFarbe;
            if (ballFarbe === 'schwarz') {
                return 'bg-dark text-white';
            } else if (ballFarbe === 'weiß') {
                return 'bg-light text-dark';
            } else {
                return 'text-white';
            }
        },
        getBallColorStyle(team) {
            if (!this.aktuellesSpiel || !this.aktuellesSpiel[team]) return '';

            const ballFarbe = this.aktuellesSpiel[team].ballFarbe;
            if (ballFarbe && ballFarbe.startsWith('#')) {
                return `background-color: ${ballFarbe}; color: ${this.getContrastColor(ballFarbe)};`;
            }
            return '';
        },
        getBallColorText(team) {
            if (!this.aktuellesSpiel || !this.aktuellesSpiel[team]) return 'Standard';

            // Für WM und Freundschaftsspiel nur Farben ohne Text anzeigen
            const spielTyp = localStorage.getItem('spielTyp');
            if (spielTyp === 'wm' || spielTyp === 'freundschaftsspiel') {
                return '&nbsp;';
            }

            const ballFarbe = this.aktuellesSpiel[team].ballFarbe;
            if (ballFarbe === 'schwarz') {
                return 'Schwarz';
            } else if (ballFarbe === 'weiß') {
                return 'Weiß';
            } else if (ballFarbe && ballFarbe.startsWith('#')) {
                return 'Eigene Farbe';
            }
            return 'Standard';
        },
        getContrastColor(hexColor) {
            // Entferne # falls vorhanden
            const hex = hexColor.replace('#', '');

            // Konvertiere zu RGB
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);

            // Berechne Helligkeit
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // Wähle Kontrastfarbe
            return brightness > 128 ? '#000000' : '#ffffff';
        },
        spielAbbrechen() {
            const modalElement = document.getElementById('abbrechenModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        },
        spielWirklichAbbrechen() {
            // Stoppe Hintergrundgeräusch
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.stop('stadionAtmosphaere');
            }

            // Schließe Modal
            const modalElement = document.getElementById('abbrechenModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            this.$router.push('/');
        },
        neuesSpiel() {
            if (!this.aktuellesSpiel) return;

            // Starte ein neues Elfmeterschießen mit den gleichen Teams
            this.spielBeendet = false;
            this.elfmeterAktiv = true;
            this.elfmeterTore = { team1: 0, team2: 0 };
            this.elfmeterSchuesse = { team1: 0, team2: 0 };
            this.elfmeterPhase = 'regulaer';
            this.elfmeterAktuellerSchuetze = 'team1';
            this.aktuellesSpiel.tore = { team1: 0, team2: 0 };
            this.spielStartZeit = Date.now();

            // Lade erneut die Einstellungen für die Schussanzahl
            const einstellungen = localStorage.getItem('spielEinstellungen');
            if (einstellungen) {
                const spielEinstellungen = JSON.parse(einstellungen);
                this.elfmeterSchuesseProTeam = spielEinstellungen.elfmeterSchuesse || 5;
            }
        },
        zurueckZurStartseite() {
            this.$router.push('/');
        },
        aendereHintergrundLautstaerke() {
            // Setze die Lautstärke für Hintergrundatmosphäre
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.setVolume('stadionAtmosphaere', this.hintergrundLautstaerke);
            }
        }
    },
    mounted() {
        // Lade Spiel-Einstellungen
        const einstellungen = localStorage.getItem('spielEinstellungen');
        if (!einstellungen) {
            this.$router.push('/');
            return;
        }

        try {
            const spielEinstellungen = JSON.parse(einstellungen);

            // Prüfe ob alle erforderlichen Daten vorhanden sind
            if (!spielEinstellungen || !spielEinstellungen.spieler || spielEinstellungen.spieler.length < 1) {
                console.error('Ungültige Spieleinstellungen gefunden - mindestens 1 Spieler erforderlich');
                this.$router.push('/');
                return;
            }

            // Erstelle das Elfmeterschießen-Spiel
            const spieler1 = spielEinstellungen.spieler[0];
            const spieler2 = spielEinstellungen.spieler[1] || spieler1; // Fallback auf Spieler 1 wenn nur einer vorhanden

            // Setze Spieleranzahl
            this.spielerAnzahl = spielEinstellungen.spieler.length;

            this.aktuellesSpiel = {
                team1: {
                    name: spieler1.name,
                    mannschaft: spieler1.mannschaft,
                    mannschaftFlagge: spieler1.mannschaftFlagge,
                    ballFarbe: spielEinstellungen.ballFarben.team1
                },
                team2: {
                    name: spieler2.name,
                    mannschaft: spieler2.mannschaft,
                    mannschaftFlagge: spieler2.mannschaftFlagge,
                    ballFarbe: spielEinstellungen.ballFarben.team2
                },
                tore: { team1: 0, team2: 0 }
            };

            this.spielStartZeit = Date.now();

            // Lade Elfmeterschießen-Einstellungen
            this.elfmeterSchuesseProTeam = spielEinstellungen.elfmeterSchuesse || 5;
            
            // Speichere Spieleinstellungen für Sound-Funktionalität
            this.spielEinstellungen = spielEinstellungen;

            // Initialisiere Sound
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.init();
            }

            // Starte Hintergrundgeräusch wenn aktiviert
            if (this.spielEinstellungen.hintergrundGerauesch) {
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('stadionAtmosphaere');
                }
            }
        } catch (error) {
            console.error('Fehler beim Laden der Spieleinstellungen:', error);
            this.$router.push('/');
        }
    },
    beforeUnmount() {
        // Stoppe Hintergrundgeräusch beim Verlassen
        if (window.SoundManagerHelper) {
            window.SoundManagerHelper.stop('stadionAtmosphaere');
        }
    }
};

// Exportiere für globale Verwendung
window.ElfmeterschiessenKomponente = ElfmeterschiessenKomponente; 