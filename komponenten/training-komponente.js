// Training Komponente
const TrainingKomponente = {
    template: `
        <div class="portrait-only">
            <!-- Spiel-Interface -->
            <div v-if="spielEinstellungen && !trainingBeendet" class="text-center">
                <!-- Fortschritt -->
                <div class="mb-4">
                    <div class="progress mb-2">
                        <div 
                            class="progress-bar bg-tipp-kick" 
                            :style="{ width: fortschrittProzent + '%' }"
                        ></div>
                    </div>
                    <small class="text-muted">
                        Runde {{ aktuelleRunde }} von {{ spielEinstellungen.trainingRunden }} | 
                        Schuss {{ aktuellerSchuss }} von {{ gesamtSchuesse }}
                    </small>
                </div>

                <!-- Aktueller Spieler -->
                <div class="mb-4">
                    <div class="card border-primary">
                        <div class="card-body text-center">
                            <div class="mb-3">
                                <img
                                    v-if="aktuellerSpieler.mannschaftFlagge"
                                    :src="aktuellerSpieler.mannschaftFlagge"
                                    :alt="aktuellerSpieler.mannschaft"
                                    class="flagge-logo flagge-logo-spiel-gross mb-2"
                                    @error="handleImageError"
                                >
                                <h4 class="text-primary">{{ aktuellerSpieler.name }}</h4>
                                <small class="text-muted">{{ aktuellerSpieler.mannschaft }}</small>
                            </div>
                            <h5 class="text-primary">DEIN SCHUSS!</h5>
                            <p class="text-muted">Gib das Ergebnis deines Schusses ein:</p>
                        </div>
                    </div>
                </div>

                <!-- Fußballfeld -->
                <div class="football-field-container mb-4">
                    <div class="football-field" ref="footballField">
                        <!-- Mittellinie -->
                        <div class="center-line"></div>
                        
                        <!-- Mittlerer Kreis -->
                        <div class="center-circle"></div>
                        
                        <!-- Strafraum -->
                        <div class="penalty-area penalty-area-top"></div>
                        <div class="penalty-area penalty-area-bottom"></div>
                        
                        <!-- Torraum -->
                        <div class="goal-area goal-area-top"></div>
                        <div class="goal-area goal-area-bottom"></div>
                        
                        <!-- Ecken-Markierungen -->
                        <div class="corner-flag top-left"></div>
                        <div class="corner-flag top-right"></div>
                        <div class="corner-flag bottom-left"></div>
                        <div class="corner-flag bottom-right"></div>
                        
                        <!-- Tor -->
                        <div class="goal goal-top"></div>
                        <div class="goal goal-bottom"></div>
                        
                        <!-- Spieler-Position -->
                        <div 
                            class="player-position"
                            :style="spielerPositionStyle"
                        >
                            <span class="material-symbols-outlined">person</span>
                        </div>
                        
                        <!-- Ball -->
                        <div 
                            class="ball"
                            :style="ballStyle"
                            :class="{ 'ball-moving': ballBewegtSich }"
                        ></div>
                    </div>
                </div>

                <!-- Schuss-Buttons -->
                <div class="mb-4">
                    <div class="row">
                        <div class="col-6">
                            <button 
                                class="btn btn-success btn-lg w-100 mb-2"
                                @click="schussErgebnis(true)"
                            >
                                <span class="material-symbols-outlined">sports_soccer</span>
                                Tor!
                            </button>
                        </div>
                        <div class="col-6">
                            <button 
                                class="btn btn-danger btn-lg w-100 mb-2"
                                @click="schussErgebnis(false)"
                            >
                                <span class="material-symbols-outlined">close</span>
                                Daneben
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Statistik für aktuellen Spieler -->
                <div class="row mb-4">
                    <div class="col-6">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Tore ({{ aktuellerSpieler.name }})</h5>
                                <div class="display-6 text-success">{{ toreProSpieler[aktuellerSpielerIndex] || 0 }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Quote ({{ aktuellerSpieler.name }})</h5>
                                <div class="display-6 text-tipp-kick">{{ torQuoteProSpieler[aktuellerSpielerIndex] || 0 }}%</div>
                            </div>
                        </div>
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
                <div class="mt-4">
                    <button type="button" class="btn btn-outline-dark" @click="trainingAbbrechen">
                        <span class="material-symbols-outlined me-2">close</span>
                        Training abbrechen
                    </button>
                </div>
            </div>

            <!-- Training beendet -->
            <div v-if="trainingBeendet" class="text-center">
                <div class="mb-4">
                    <h2 class="text-tipp-kick">Training beendet!</h2>
                    <p class="lead">Deine Ergebnisse:</p>
                </div>

                <!-- Gesamtstatistik -->
                <div class="row mb-4">
                    <div class="col-6">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Gesamt Tore</h5>
                                <div class="display-6 text-success">{{ gesamtTore }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Gesamt Quote</h5>
                                <div class="display-6 text-tipp-kick">{{ gesamtTorQuote }}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Spieler-spezifische Statistiken -->
                <div v-if="spielEinstellungen.spieler.length > 1" class="mb-4">
                    <h4 class="text-tipp-kick mb-3">Ergebnisse pro Spieler:</h4>
                    <div class="row">
                        <div v-for="(spieler, index) in spielEinstellungen.spieler" :key="index" class="col-12 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex align-items-center mb-2">
                                        <img
                                            v-if="spieler.mannschaftFlagge"
                                            :src="spieler.mannschaftFlagge"
                                            :alt="spieler.mannschaft"
                                            class="flagge-logo flagge-logo-klein me-2"
                                            @error="handleImageError"
                                        >
                                        <h5 class="card-title mb-0">{{ spieler.name }}</h5>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="text-center">
                                                <small class="text-muted">Tore</small>
                                                <div class="h4 text-success mb-0">{{ toreProSpieler[index] || 0 }}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-center">
                                                <small class="text-muted">Quote</small>
                                                <div class="h4 text-tipp-kick mb-0">{{ torQuoteProSpieler[index] || 0 }}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-tipp-kick btn-lg" @click="neuesTraining">
                        <span class="material-symbols-outlined me-2">refresh</span>
                        Neues Training
                    </button>
                    <button type="button" class="btn btn-outline-dark" @click="$router.push('/')">
                        <span class="material-symbols-outlined me-2">home</span>
                        Zur Startseite
                    </button>
                </div>
            </div>

            <!-- Abbrechen Modal -->
            <div class="modal fade" id="abbrechenModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Training abbrechen?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Möchtest du das Training wirklich abbrechen? Alle Fortschritte gehen verloren.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                            <button type="button" class="btn btn-danger" @click="trainingWirklichAbbrechen">Ja, abbrechen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            spielEinstellungen: null,
            trainingBeendet: false,
            aktuellerSpielerIndex: 0,
            aktuelleRunde: 1,
            aktuellerSchuss: 1,
            toreProSpieler: {}, // Tore pro Spieler speichern
            schuesseProSpieler: {}, // Schüsse pro Spieler speichern
            schussAbgegeben: false,
            ballBewegtSich: false,
            spielerPosition: { x: 0, y: 0 },
            ballPosition: { x: 0, y: 0 },
            hintergrundLautstaerke: 50
        }
    },
    computed: {
        gesamtSchuesse() {
            if (!this.spielEinstellungen) return 0;
            return this.spielEinstellungen.spieler.length * this.spielEinstellungen.trainingRunden;
        },
        fortschrittProzent() {
            if (!this.spielEinstellungen) return 0;
            return ((this.aktuellerSchuss - 1) / this.gesamtSchuesse) * 100;
        },
        aktuellerSpieler() {
            if (!this.spielEinstellungen) return { name: '', mannschaft: '' };
            return this.spielEinstellungen.spieler[this.aktuellerSpielerIndex];
        },
        torQuoteProSpieler() {
            const quotes = {};
            if (!this.spielEinstellungen) return quotes;

            this.spielEinstellungen.spieler.forEach((spieler, index) => {
                const schuesse = this.schuesseProSpieler[index] || 0;
                const tore = this.toreProSpieler[index] || 0;

                if (schuesse > 0) {
                    quotes[index] = Math.round((tore / schuesse) * 100);
                } else {
                    quotes[index] = 0;
                }
            });

            return quotes;
        },
        gesamtTore() {
            return Object.values(this.toreProSpieler).reduce((sum, tore) => sum + tore, 0);
        },
        gesamtTorQuote() {
            if (this.aktuellerSchuss === 1) return 0;
            return Math.round((this.gesamtTore / (this.aktuellerSchuss - 1)) * 100);
        },
        spielerPositionStyle() {
            return {
                left: this.spielerPosition.x + '%',
                top: this.spielerPosition.y + '%'
            };
        },
        ballStyle() {
            return {
                left: this.ballPosition.x + '%',
                top: this.ballPosition.y + '%'
            };
        }
    },
    methods: {
        initialisiereTraining() {
            // Lade Spieleinstellungen
            const einstellungen = localStorage.getItem('spielEinstellungen');
            if (einstellungen) {
                this.spielEinstellungen = JSON.parse(einstellungen);
            } else {
                this.$router.push('/spiel-einstellungen');
                return;
            }

            // Prüfe ob es Training ist
            if (this.spielEinstellungen.spielTyp !== 'training') {
                this.$router.push('/');
                return;
            }

            // Initialisiere Tore und Schüsse pro Spieler
            this.spielEinstellungen.spieler.forEach((spieler, index) => {
                this.toreProSpieler[index] = 0;
                this.schuesseProSpieler[index] = 0;
            });

            // Initialisiere Sound
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.init();
            }

            // Starte Hintergrundgeräusch
            if (this.spielEinstellungen.hintergrundGerauesch) {
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('stadionAtmosphaere');
                }
            }

            // Generiere erste Position
            this.generiereNeuePosition();
        },
        generiereNeuePosition() {
            // Generiere zufällige Position auf dem Feld
            // X: 10% bis 80% (nicht zu nah an den Seiten)
            // Y: 20% bis 80% (nicht zu nah an Tor oder Grundlinie)
            this.spielerPosition = {
                x: Math.random() * 70 + 10,
                y: Math.random() * 60 + 20
            };

            // Ball startet bei Spieler-Position
            this.ballPosition = { ...this.spielerPosition };
            this.schussAbgegeben = false;
            this.ballBewegtSich = false;
        },
        schussErgebnis(istTor) {
            // Markiere Schuss als abgegeben, falls noch nicht geschehen
            if (!this.schussAbgegeben) {
                this.schussAbgegeben = true;
                this.ballBewegtSich = true;

                // Spiele Schuss-Sound
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('schiedsrichterPfeife');
                }
            }

                        // Erhöhe Schüsse für aktuellen Spieler
            if (!this.schuesseProSpieler[this.aktuellerSpielerIndex]) {
                this.schuesseProSpieler[this.aktuellerSpielerIndex] = 0;
            }
            this.schuesseProSpieler[this.aktuellerSpielerIndex]++;

            if (istTor) {
                // Erhöhe Tore für aktuellen Spieler
                if (!this.toreProSpieler[this.aktuellerSpielerIndex]) {
                    this.toreProSpieler[this.aktuellerSpielerIndex] = 0;
                }
                this.toreProSpieler[this.aktuellerSpielerIndex]++;
                
                // Spiele Tor-Sound
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('torjubel');
                }
            } else {
                // Spiele "Daneben"-Sound
                if (window.SoundManagerHelper) {
                    window.SoundManagerHelper.play('daneben');
                }
            }

            // Ball bewegt sich zum Tor
            this.ballPosition = { x: 50, y: 10 }; // Tor-Position

            setTimeout(() => {
                this.naechsterSchuss();
            }, 1000);
        },
        naechsterSchuss() {
            this.aktuellerSchuss++;

            // Prüfe ob Training beendet
            if (this.aktuellerSchuss > this.gesamtSchuesse) {
                this.trainingBeenden();
                return;
            }

            // Nächster Spieler
            this.aktuellerSpielerIndex++;
            if (this.aktuellerSpielerIndex >= this.spielEinstellungen.spieler.length) {
                this.aktuellerSpielerIndex = 0;
                this.aktuelleRunde++;
            }

            // Generiere neue Position
            this.generiereNeuePosition();
        },
        trainingBeenden() {
            this.trainingBeendet = true;

            // Stoppe Hintergrundgeräusch
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.stop('stadionAtmosphaere');
            }
        },
        trainingAbbrechen() {
            const modal = new bootstrap.Modal(document.getElementById('abbrechenModal'));
            modal.show();
        },
        trainingWirklichAbbrechen() {
            // Stoppe Hintergrundgeräusch
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.stop('stadionAtmosphaere');
            }

            // Schließe das Modal ordnungsgemäß
            const modal = bootstrap.Modal.getInstance(document.getElementById('abbrechenModal'));
            if (modal) {
                modal.hide();
            }

            // Entferne das Backdrop manuell falls es noch existiert
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }

            // Entferne die modal-open Klasse vom body
            document.body.classList.remove('modal-open');

            this.$router.push('/');
        },
        neuesTraining() {
            this.$router.push('/spiel-einstellungen');
        },
        aendereHintergrundLautstaerke() {
            // Setze die Lautstärke für Hintergrundatmosphäre
            if (window.SoundManagerHelper) {
                window.SoundManagerHelper.setVolume('stadionAtmosphaere', this.hintergrundLautstaerke);
            }
        },
        handleImageError(event) {
            event.target.src = 'assets/img/logos/default.png';
        }
    },
    mounted() {
        this.initialisiereTraining();
    },
    beforeUnmount() {
        // Stoppe Hintergrundgeräusch beim Verlassen
        if (window.SoundManagerHelper) {
            window.SoundManagerHelper.stop('stadionAtmosphaere');
        }
    }
};

// Exportiere für globale Verwendung
window.TrainingKomponente = TrainingKomponente;
