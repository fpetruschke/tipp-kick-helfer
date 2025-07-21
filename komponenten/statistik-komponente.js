// Globale Statistik Komponente
const GlobaleStatistikKomponente = {
    template: `
        <div class="portrait-only">
            <div class="text-center mb-4">
                <h2 class="text-tipp-kick">
                    <span class="material-symbols-outlined me-2">analytics</span>
                    Globale Statistik
                </h2>
            </div>

            <div v-if="spielerStatistiken.length === 0" class="text-center">
                <div class="card">
                    <div class="card-body">
                        <span class="material-symbols-outlined display-1 text-muted mb-3">analytics_off</span>
                        <h5>Keine Statistiken vorhanden</h5>
                        <p class="text-muted">Spiele ein paar Spiele, um Statistiken zu sehen!</p>
                        <button class="btn btn-tipp-kick" @click="$router.push('/')">
                            <span class="material-symbols-outlined me-2">play_arrow</span>
                            Spiel starten
                        </button>
                    </div>
                </div>
            </div>

            <div v-else>
                <!-- Filter -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <label class="form-label">Spieltyp</label>
                                <select class="form-select" v-model="filter.spielTyp">
                                    <option value="">Alle</option>
                                    <option value="freundschaftsspiel">Freundschaftsspiel</option>
                                    <option value="wm">WM</option>
                                    <option value="elfmeterschiessen">Elfmeterschießen</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Zeitraum</label>
                                <select class="form-select" v-model="filter.zeitraum">
                                    <option value="">Alle</option>
                                    <option value="7">Letzte 7 Tage</option>
                                    <option value="30">Letzte 30 Tage</option>
                                    <option value="90">Letzte 90 Tage</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Spieler-Statistiken -->
                <div class="card mb-4" v-for="statistik in gefilterteStatistiken" :key="statistik.spielerName">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <span class="material-symbols-outlined me-2">person</span>
                            {{ statistik.spielerName }}
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h6>Mannschaften</h6>
                                <ul class="list-unstyled">
                                    <li v-for="mannschaft in statistik.mannschaften" :key="mannschaft.name" class="mb-2">
                                        <div class="d-flex align-items-center">
                                            <img
                                                :src="mannschaft.flagge || 'assets/img/logos/default.png'"
                                                :alt="mannschaft.name"
                                                class="flagge-logo flagge-logo-statistik me-2"
                                                @error="handleImageError"
                                            >
                                            <div>
                                                <strong>{{ mannschaft.name }}</strong>
                                                <br>
                                                <small class="text-muted">
                                                    {{ mannschaft.spiele }} Spiele, {{ mannschaft.tore }} Tore
                                                </small>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-6">
                                <h6>Gesamtstatistik</h6>
                                <div class="row text-center">
                                    <div class="col-4">
                                        <div class="text-tipp-kick">
                                            <strong>{{ statistik.gesamtSpiele }}</strong>
                                            <br><small>Spiele</small>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="text-tipp-kick">
                                            <strong>{{ statistik.gesamtTore }}</strong>
                                            <br><small>Tore</small>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="text-tipp-kick">
                                            <strong>{{ statistik.durchschnittTore }}</strong>
                                            <br><small>Tore/Spiel</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detaillierte Spiele -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <span class="material-symbols-outlined me-2">list</span>
                            Detaillierte Spiele
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Datum</th>
                                        <th>Spieltyp</th>
                                        <th>Spieler</th>
                                        <th>Mannschaft</th>
                                        <th>Tore</th>
                                        <th v-if="filter.spielTyp === 'elfmeterschiessen'">Elfmeter</th>
                                        <th>Gegner</th>
                                        <th>Ergebnis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="spiel in gefilterteSpiele" :key="spiel.datum">
                                        <td>{{ formatiereDatum(spiel.datum) }}</td>
                                        <td>
                                            <span class="badge" :class="getSpielTypBadgeClass(spiel.spielTyp)">
                                                {{ getSpielTypText(spiel.spielTyp) }}
                                            </span>
                                        </td>
                                        <td>{{ spiel.spielerName }}</td>
                                        <td>{{ spiel.mannschaft }}</td>
                                        <td>{{ spiel.tore }}</td>
                                        <td v-if="filter.spielTyp === 'elfmeterschiessen'">
                                            <span v-if="spiel.elfmeterTore !== undefined">
                                                {{ spiel.elfmeterTore }}/{{ spiel.elfmeterSchuesse }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        <td>{{ spiel.gegner }}</td>
                                        <td>
                                            <span v-if="spiel.gewonnen" class="text-success">🏆 Gewonnen</span>
                                            <span v-else-if="spiel.verloren" class="text-danger">❌ Verloren</span>
                                            <span v-else class="text-warning">🤝 Unentschieden</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Zurück Button -->
                <div class="d-grid mt-4">
                    <button type="button" class="btn btn-outline-dark" @click="$router.push('/')">
                        <span class="material-symbols-outlined me-2">arrow_back</span>
                        Zurück
                    </button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            filter: {
                spielTyp: '',
                zeitraum: ''
            },
            spielerStatistiken: [],
            detaillierteSpiele: []
        }
    },
    computed: {
        gefilterteStatistiken() {
            return this.spielerStatistiken;
        },
        gefilterteSpiele() {
            let spiele = this.detaillierteSpiele;

            if (this.filter.spielTyp) {
                spiele = spiele.filter(s => s.spielTyp === this.filter.spielTyp);
            }

            if (this.filter.zeitraum) {
                const tage = parseInt(this.filter.zeitraum);
                const grenze = new Date();
                grenze.setDate(grenze.getDate() - tage);
                spiele = spiele.filter(s => new Date(s.datum) >= grenze);
            }

            return spiele.sort((a, b) => new Date(b.datum) - new Date(a.datum));
        }
    },
    methods: {
        formatiereDatum(datumString) {
            const datum = new Date(datumString);
            return datum.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        ladeStatistiken() {
            const statistiken = JSON.parse(localStorage.getItem('spielStatistiken') || '[]');
            this.verarbeiteStatistiken(statistiken);
        },
        verarbeiteStatistiken(statistiken) {
            const spielerMap = new Map();
            const spiele = [];

            statistiken.forEach(spiel => {
                // Team 1 verarbeiten
                this.verarbeiteSpieler(spiel.team1, spiel, spielerMap, spiele, spiel.team2);
                // Team 2 verarbeiten
                this.verarbeiteSpieler(spiel.team2, spiel, spielerMap, spiele, spiel.team1);
            });

            this.spielerStatistiken = Array.from(spielerMap.values()).map(statistik => ({
                ...statistik,
                mannschaften: Array.from(statistik.mannschaften.values()),
                durchschnittTore: (statistik.gesamtTore / statistik.gesamtSpiele).toFixed(1)
            }));
            this.detaillierteSpiele = spiele;
        },
        verarbeiteSpieler(team, spiel, spielerMap, spiele, gegner) {
            const spielerName = team.name;
            const mannschaft = team.mannschaft;
            const tore = team.tore;

            // Spieler-Statistik aktualisieren
            if (!spielerMap.has(spielerName)) {
                spielerMap.set(spielerName, {
                    spielerName,
                    mannschaften: new Map(),
                    gesamtSpiele: 0,
                    gesamtTore: 0
                });
            }

            const spielerStatistik = spielerMap.get(spielerName);
            spielerStatistik.gesamtSpiele++;
            spielerStatistik.gesamtTore += tore;

            // Mannschaft-Statistik aktualisieren
            if (!spielerStatistik.mannschaften.has(mannschaft)) {
                spielerStatistik.mannschaften.set(mannschaft, {
                    name: mannschaft,
                    land: spiel[`team${spiel.team1.name === spielerName ? '1' : '2'}`].mannschaftLand || 'Unbekannt',
                    flagge: spiel[`team${spiel.team1.name === spielerName ? '1' : '2'}`].mannschaftFlagge || 'assets/img/logos/default.png',
                    spiele: 0,
                    tore: 0
                });
            }

            const mannschaftStatistik = spielerStatistik.mannschaften.get(mannschaft);
            mannschaftStatistik.spiele++;
            mannschaftStatistik.tore += tore;

            // Detailliertes Spiel hinzufügen
            spiele.push({
                datum: spiel.datum,
                spielTyp: spiel.spielTyp,
                spielerName,
                mannschaft,
                mannschaftLand: spiel[`team${spiel.team1.name === spielerName ? '1' : '2'}`].mannschaftLand,
                mannschaftFlagge: spiel[`team${spiel.team1.name === spielerName ? '1' : '2'}`].mannschaftFlagge,
                tore,
                elfmeterTore: spiel[`team${spiel.team1.name === spielerName ? '1' : '2'}`].elfmeterTore || 0,
                elfmeterSchuesse: spiel[`team${spiel.team1.name === spielerName ? '1' : '2'}`].elfmeterSchuesse || 0,
                gegner: gegner.name,
                gewonnen: tore > gegner.tore,
                verloren: tore < gegner.tore
            });
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
        getSpielTypText(spielTyp) {
            switch (spielTyp) {
                case 'wm':
                    return 'WM';
                case 'elfmeterschiessen':
                    return 'Elfmeterschießen';
                case 'freundschaftsspiel':
                default:
                    return 'Freundschaft';
            }
        },
        getSpielTypBadgeClass(spielTyp) {
            switch (spielTyp) {
                case 'wm':
                    return 'bg-primary';
                case 'elfmeterschiessen':
                    return 'bg-warning';
                case 'freundschaftsspiel':
                default:
                    return 'bg-secondary';
            }
        }
    },
    mounted() {
        this.ladeStatistiken();
    }
};

// Exportiere für globale Verwendung
window.GlobaleStatistikKomponente = GlobaleStatistikKomponente;
