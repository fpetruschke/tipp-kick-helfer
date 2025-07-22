// Spiel Komponente
const SpielKomponente = {
    template: `
        <div>
            <!-- Spiel-Interface -->
            <div v-if="spielEinstellungen && !spielBeendet" class="text-center">
                <!-- Timer -->
                <div class="game-timer mb-4">
                    {{ formatierteZeit(verbleibendeZeit) }}
                </div>

                <!-- Teams -->
                <div class="row">
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
                            <button
                                class="btn btn-tipp-kick btn-lg"
                                @click="torGeschossen('team1')"
                            >
                                <span class="material-symbols-outlined">sports_soccer</span>
                                Tor!
                            </button>
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
                            <button
                                class="btn btn-tipp-kick btn-lg"
                                @click="torGeschossen('team2')"
                            >
                                <span class="material-symbols-outlined">sports_soccer</span>
                                Tor!
                            </button>
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
                    <button class="btn btn-outline-danger" @click="spielAbbrechen">
                        <span class="material-symbols-outlined me-2">stop</span>
                        Spiel abbrechen
                    </button>
                </div>
            </div>

            <!-- Spiel beendet -->
            <div v-else-if="spielEinstellungen && spielBeendet" class="text-center">
                <h2 class="text-tipp-kick mb-4">Spiel beendet!</h2>
                <div class="row">
                    <div class="col-6">
                        <h4>{{ aktuellesSpiel.team1.name }}</h4>
                        <div class="display-4">{{ aktuellesSpiel.tore.team1 }}</div>
                    </div>
                    <div class="col-6">
                        <h4>{{ aktuellesSpiel.team2.name }}</h4>
                        <div class="display-4">{{ aktuellesSpiel.tore.team2 }}</div>
                    </div>
                </div>
                <div class="mt-4">
                    <h3 v-if="aktuellesSpiel.tore.team1 > aktuellesSpiel.tore.team2">
                        🏆 {{ aktuellesSpiel.team1.name }} gewinnt!
                    </h3>
                    <h3 v-else-if="aktuellesSpiel.tore.team2 > aktuellesSpiel.tore.team1">
                        🏆 {{ aktuellesSpiel.team2.name }} gewinnt!
                    </h3>
                    <h3 v-else>
                        🤝 Unentschieden!
                    </h3>
                </div>
                <div class="mt-4">
                    <button v-if="aktuellesSpiel.tore.team1 !== aktuellesSpiel.tore.team2" class="btn btn-tipp-kick" @click="spielBeenden">
                        <span class="material-symbols-outlined me-2">check</span>
                        Bestätigen
                    </button>
                    <div v-else class="d-grid gap-2">
                        <button class="btn btn-tipp-kick" @click="unentschiedenAkzeptieren">
                            <span class="material-symbols-outlined me-2">check</span>
                            Unentschieden akzeptieren
                        </button>
                        <button class="btn btn-outline-tipp-kick" @click="verlaengerungStarten">
                            <span class="material-symbols-outlined me-2">timer</span>
                            Verlängerung spielen
                        </button>
                        <button class="btn btn-outline-tipp-kick" @click="elfmeterschiessenStarten">
                            <span class="material-symbols-outlined me-2">sports_soccer</span>
                            Elfmeterschießen
                        </button>
                    </div>
                </div>
            </div>

            <!-- Lade-Zustand -->
            <div v-else class="text-center">
                <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
                    <div>
                        <div class="spinner-border text-tipp-kick" role="status">
                            <span class="visually-hidden">Lade...</span>
                        </div>
                        <p class="mt-3">Spiel wird geladen...</p>
                    </div>
                </div>
            </div>

            <!-- Bereitschafts-Modal -->
            <div class="modal fade" id="bereitschaftModal" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Spieler bereit?</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="team-display text-center">
                                        <div class="mb-3">
                                            <img
                                                :src="aktuellesSpiel ? (aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                :alt="aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : ''"
                                                class="flagge-logo flagge-logo-spiel mb-2"
                                                @error="handleImageError"
                                            >
                                            <h6>{{ aktuellesSpiel ? aktuellesSpiel.team1.name : '' }}</h6>
                                            <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : '' }}</small>
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
                                        <div class="text-tipp-kick">
                                            <strong>Tore: {{ aktuellesSpiel ? aktuellesSpiel.tore.team1 : 0 }}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="team-display text-center">
                                        <div class="mb-3">
                                            <img
                                                :src="aktuellesSpiel ? (aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                :alt="aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : ''"
                                                class="flagge-logo flagge-logo-spiel mb-2"
                                                @error="handleImageError"
                                            >
                                            <h6>{{ aktuellesSpiel ? aktuellesSpiel.team2.name : '' }}</h6>
                                            <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : '' }}</small>
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
                                        <div class="text-tipp-kick">
                                            <strong>Tore: {{ aktuellesSpiel ? aktuellesSpiel.tore.team2 : 0 }}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3 text-center">
                                <strong>Spiel {{ aktuellesSpiel ? aktuellesSpiel.spielNummer : 1 }} von {{ gesamtSpiele }}</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-tipp-kick" @click="spielStarten">
                                <span class="material-symbols-outlined me-2">play_arrow</span>
                                Bereit!
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Halbzeit-Modal -->
            <div class="modal fade" id="halbzeitModal" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Halbzeit-Statistik</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="team-display text-center">
                                        <div class="mb-3">
                                            <img
                                                :src="aktuellesSpiel ? (aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                :alt="aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : ''"
                                                class="flagge-logo flagge-logo-spiel mb-2"
                                                @error="handleImageError"
                                            >
                                            <h6>{{ aktuellesSpiel ? aktuellesSpiel.team1.name : '' }}</h6>
                                            <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : '' }}</small>
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
                                        <div class="text-tipp-kick mb-3">
                                            <strong>Tore: {{ aktuellesSpiel ? aktuellesSpiel.tore.team1 : 0 }}</strong>
                                        </div>
                                        <div v-if="halbzeitTore.team1.length > 0">
                                            <h6 class="text-muted">Torschützen:</h6>
                                            <ul class="list-unstyled">
                                                <li v-for="tor in halbzeitTore.team1" :key="tor.zeit" class="mb-1">
                                                    <small>{{ tor.zeit }} - {{ tor.spieler }}</small>
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-else class="text-muted">
                                            <small>Noch keine Tore</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="team-display text-center">
                                        <div class="mb-3">
                                            <img
                                                :src="aktuellesSpiel ? (aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                :alt="aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : ''"
                                                class="flagge-logo flagge-logo-spiel mb-2"
                                                @error="handleImageError"
                                            >
                                            <h6>{{ aktuellesSpiel ? aktuellesSpiel.team2.name : '' }}</h6>
                                            <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : '' }}</small>
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
                                        <div class="text-tipp-kick mb-3">
                                            <strong>Tore: {{ aktuellesSpiel ? aktuellesSpiel.tore.team2 : 0 }}</strong>
                                        </div>
                                        <div v-if="halbzeitTore.team2.length > 0">
                                            <h6 class="text-muted">Torschützen:</h6>
                                            <ul class="list-unstyled">
                                                <li v-for="tor in halbzeitTore.team2" :key="tor.zeit" class="mb-1">
                                                    <small>{{ tor.zeit }} - {{ tor.spieler }}</small>
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-else class="text-muted">
                                            <small>Noch keine Tore</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-tipp-kick" @click="halbzeitModalSchliessen">
                                <span class="material-symbols-outlined me-2">arrow_forward</span>
                                Weiter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Verlängerungs-Modal -->
            <div class="modal fade" id="verlaengerungModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Verlängerung konfigurieren</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Halbzeitlänge der Verlängerung</label>
                                <div class="row align-items-center">
                                    <div class="col-8">
                                        <input
                                            type="range"
                                            class="form-range"
                                            min="0.5"
                                            max="5"
                                            step="0.5"
                                            v-model="verlaengerungHalbzeitLaenge"
                                        >
                                        <div class="d-flex justify-content-between">
                                            <small>30 Sek</small>
                                            <small>{{ formatierteHalbzeitLaenge(verlaengerungHalbzeitLaenge) }}</small>
                                            <small>5 Min</small>
                                        </div>
                                    </div>
                                    <div class="col-4 text-center">
                                        <div class="text-tipp-kick">
                                            <strong>{{ formatierteSpielLaenge(verlaengerungSpielLaenge) }}</strong>
                                            <br><small>Gesamtverlängerung</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="alert alert-info">
                                <span class="material-symbols-outlined me-2">info</span>
                                Die Verlängerung wird als reguläres Spiel mit verkürzter Zeit gespielt.
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Abbrechen
                            </button>
                            <button type="button" class="btn btn-tipp-kick" @click="verlaengerungBestatigen">
                                <span class="material-symbols-outlined me-2">play_arrow</span>
                                Verlängerung starten
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Elfmeterschießen-Modal -->
            <div class="modal fade" id="elfmeterschiessenModal" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Elfmeterschießen</h5>
                        </div>
                        <div class="modal-body">
                            <!-- Aktueller Schütze - wird deutlich hervorgehoben -->
                            <div class="text-center mb-4">
                                <div v-if="elfmeterAktuellerSchuetze === 'team1'" class="current-shooter team1-active">
                                    <div class="card border-primary">
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <img
                                                    :src="aktuellesSpiel ? (aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                    :alt="aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : ''"
                                                    class="img-fluid mb-2"
                                                    style="max-height: 60px; max-width: 70px;"
                                                    @error="handleImageError"
                                                >
                                                <h4 class="text-primary">{{ aktuellesSpiel ? aktuellesSpiel.team1.name : 'Team 1' }}</h4>
                                                <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : '' }}</small>
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
                                                    :src="aktuellesSpiel ? (aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                    :alt="aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : ''"
                                                    class="img-fluid mb-2"
                                                    style="max-height: 60px; max-width: 70px;"
                                                    @error="handleImageError"
                                                >
                                                <h4 class="text-primary">{{ aktuellesSpiel ? aktuellesSpiel.team2.name : 'Team 2' }}</h4>
                                                <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : '' }}</small>
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

                            <!-- Schuss-Ergebnis Buttons -->
                            <div class="row mb-4">
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
                                        <span class="material-symbols-outlined me-2">block</span>
                                        Ball gehalten
                                    </button>
                                </div>
                            </div>

                            <!-- Stand -->
                            <div class="row">
                                <div class="col-6">
                                    <div class="team-display text-center">
                                        <div class="mb-3">
                                            <img
                                                :src="aktuellesSpiel ? (aktuellesSpiel.team1.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                :alt="aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : ''"
                                                class="img-fluid mb-2"
                                                style="max-height: 40px; max-width: 50px;"
                                                @error="handleImageError"
                                            >
                                            <h6>{{ aktuellesSpiel ? aktuellesSpiel.team1.name : 'Team 1' }}</h6>
                                            <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team1.mannschaft : '' }}</small>
                                        </div>
                                        <div class="text-tipp-kick">
                                            <strong>Elfmeter: {{ elfmeterTore.team1 }}/{{ elfmeterSchuesse.team1 }}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="team-display text-center">
                                        <div class="mb-3">
                                            <img
                                                :src="aktuellesSpiel ? (aktuellesSpiel.team2.mannschaftFlagge || 'assets/img/logos/default.png') : 'assets/img/logos/default.png'"
                                                :alt="aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : ''"
                                                class="img-fluid mb-2"
                                                style="max-height: 40px; max-width: 50px;"
                                                @error="handleImageError"
                                            >
                                            <h6>{{ aktuellesSpiel ? aktuellesSpiel.team2.name : 'Team 2' }}</h6>
                                            <small class="text-muted">{{ aktuellesSpiel ? aktuellesSpiel.team2.mannschaft : '' }}</small>
                                        </div>
                                        <div class="text-tipp-kick">
                                            <strong>Elfmeter: {{ elfmeterTore.team2 }}/{{ elfmeterSchuesse.team2 }}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Phase Info -->
                            <div class="mt-4 text-center">
                                <div v-if="elfmeterPhase === 'regulaer'">
                                    <h6>Reguläres Elfmeterschießen ({{ elfmeterSchuesseProTeam }} Schüsse pro Team)</h6>
                                    <p class="text-muted">Schuss {{ Math.min(elfmeterSchuesse.team1, elfmeterSchuesse.team2) + 1 }} von {{ elfmeterSchuesseProTeam }}</p>
                                </div>
                                <div v-else-if="elfmeterPhase === 'sudden-death'">
                                    <h6 class="text-danger">Sudden Death</h6>
                                    <p class="text-muted">Nächster Schuss entscheidet!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Abbrechen-Confirm-Modal -->
            <div class="modal fade" id="abbrechenModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Spiel abbrechen?</h5>
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
            spielEinstellungen: null,
            turnierSpiele: [],
            aktuellesSpiel: null,
            aktuellerSpielIndex: 0,
            verbleibendeZeit: 0,
            spielBeendet: false,
            halbzeitTore: { team1: [], team2: [] },
            timer: null,
            spielStartZeit: null,
            hintergrundLautstaerke: 30,
            // Verlängerung
            verlaengerungHalbzeitLaenge: 2,
            verlaengerungAktiv: false,
            // Elfmeterschießen
            elfmeterTore: { team1: 0, team2: 0 },
            elfmeterSchuesse: { team1: 0, team2: 0 },
            elfmeterPhase: 'regulaer', // 'regulaer' oder 'sudden-death'
            elfmeterAktuellerSchuetze: 'team1',
            elfmeterAktiv: false,
            elfmeterSchuesseProTeam: 5
        }
    },
    computed: {
        verlaengerungSpielLaenge() {
            return this.verlaengerungHalbzeitLaenge * 2;
        },
        gesamtSpiele() {
            return this.turnierSpiele.length;
        },
        ballFarben() {
            return this.spielEinstellungen && this.spielEinstellungen.ballFarben ? this.spielEinstellungen.ballFarben : { team1: 'schwarz', team2: 'weiß' };
        },
        ballFarbenTyp() {
            return this.spielEinstellungen && this.spielEinstellungen.ballFarbenTyp ? this.spielEinstellungen.ballFarbenTyp : { team1: 'standard', team2: 'standard' };
        }
    },
    methods: {
        formatierteZeit(sekunden) {
            const minuten = Math.floor(sekunden / 60);
            const restSekunden = sekunden % 60;
            return `${minuten}:${restSekunden.toString().padStart(2, '0')}`;
        },
        initialisiereTurnier() {
            if (!this.spielEinstellungen || !this.spielEinstellungen.spieler) {
                console.error('Keine Spieleinstellungen gefunden');
                this.$router.push('/');
                return;
            }

            const spieler = this.spielEinstellungen.spieler;

            // Prüfe ob alle Spieler gültige Daten haben
            const ungueltigeSpieler = spieler.filter(s => !s.name || !s.mannschaft);
            if (ungueltigeSpieler.length > 0) {
                console.error('Ungültige Spielerdaten gefunden');
                this.$router.push('/');
                return;
            }

            if (spieler.length === 2) {
                // Direktes Spiel
                this.turnierSpiele = [{
                    team1: spieler[0],
                    team2: spieler[1],
                    spielNummer: 1,
                    gesamtSpiele: 1
                }];
            } else {
                // Turniermodus
                this.erstelleTurnierSpiele(spieler);
            }

            this.starteNaechstesSpiel();
        },
        erstelleTurnierSpiele(spieler) {
            const spiele = [];
            let spielNummer = 1;

            // Erstelle alle möglichen Paarungen
            for (let i = 0; i < spieler.length; i++) {
                for (let j = i + 1; j < spieler.length; j++) {
                    spiele.push({
                        team1: spieler[i],
                        team2: spieler[j],
                        spielNummer: spielNummer,
                        gesamtSpiele: spiele.length + 1
                    });
                    spielNummer++;
                }
            }

            this.turnierSpiele = spiele;
        },
        starteNaechstesSpiel() {
            if (!this.turnierSpiele || this.aktuellerSpielIndex >= this.turnierSpiele.length) {
                // Turnier beendet
                this.$router.push('/');
                return;
            }

            const aktuellesSpiel = this.turnierSpiele[this.aktuellerSpielIndex];
            if (!aktuellesSpiel || !aktuellesSpiel.team1 || !aktuellesSpiel.team2) {
                console.error('Ungültige Spieldaten gefunden');
                this.$router.push('/');
                return;
            }

            this.aktuellesSpiel = {
                ...aktuellesSpiel,
                tore: { team1: 0, team2: 0 },
                halbzeit: 1,
                halbzeitTore: { team1: [], team2: [] }
            };

            const halbzeitLaenge = this.spielEinstellungen ? this.spielEinstellungen.halbzeitLaenge : 5;
            this.verbleibendeZeit = halbzeitLaenge * 60;
            this.spielBeendet = false;
            this.halbzeitTore = { team1: [], team2: [] };

            // Zeige Bereitschafts-Modal
            this.$nextTick(() => {
                const modalElement = document.getElementById('bereitschaftModal');
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                } else {
                    console.error('Bereitschafts-Modal nicht gefunden');
                }
            });
        },
        spielStarten() {
            // Schließe Modal
            const modalElement = document.getElementById('bereitschaftModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            // Starte Timer
            this.spielStartZeit = Date.now();
            this.timer = setInterval(() => {
                this.verbleibendeZeit--;

                if (this.verbleibendeZeit <= 0) {
                    this.halbzeitBeenden();
                }
            }, 1000);

            // Spiele Schiedsrichter-Pfeife
            SoundManager.play('schiedsrichterPfeife');

            // Starte Hintergrundgeräusch
            if (this.spielEinstellungen && this.spielEinstellungen.hintergrundGerauesch) {
                SoundManager.play('stadionAtmosphaere');
                // Setze initiale Lautstärke
                this.aendereHintergrundLautstaerke();
            }
        },
        torGeschossen(team) {
            const spielzeit = Math.floor((Date.now() - this.spielStartZeit) / 1000);
            const halbzeitLaenge = this.spielEinstellungen ? this.spielEinstellungen.halbzeitLaenge : 5;
            const zeitString = this.formatierteZeit(halbzeitLaenge * 60 - spielzeit);

            this.aktuellesSpiel.tore[team]++;
            this.halbzeitTore[team].push({
                zeit: zeitString,
                spieler: this.aktuellesSpiel[team].name
            });

            // Spiele Torjubel
            SoundManager.play('torjubel');
        },
        halbzeitBeenden() {
            // Stoppe Timer
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }

            // Spiele Schiedsrichter-Pfeife
            SoundManager.play('schiedsrichterPfeife');

            if (this.aktuellesSpiel.halbzeit === 1) {
                // Erste Halbzeit beendet
                this.aktuellesSpiel.halbzeit = 2;
                const halbzeitLaenge = this.spielEinstellungen ? this.spielEinstellungen.halbzeitLaenge : 5;
                this.verbleibendeZeit = halbzeitLaenge * 60;

                // Zeige Halbzeit-Modal
                this.$nextTick(() => {
                    const modalElement = document.getElementById('halbzeitModal');
                    if (modalElement) {
                        const modal = new bootstrap.Modal(modalElement);
                        modal.show();
                    } else {
                        console.error('Halbzeit-Modal nicht gefunden');
                    }
                });
            } else {
                // Zweite Halbzeit beendet
                this.spielBeendet = true;
            }
        },
        halbzeitModalSchliessen() {
            // Schließe Halbzeit-Modal
            const modalElement = document.getElementById('halbzeitModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            // Starte zweite Halbzeit
            this.spielStartZeit = Date.now();
            this.timer = setInterval(() => {
                this.verbleibendeZeit--;

                if (this.verbleibendeZeit <= 0) {
                    if (this.verlaengerungAktiv) {
                        this.verlaengerungHalbzeitBeenden();
                    } else {
                        this.halbzeitBeenden();
                    }
                }
            }, 1000);

            // Spiele Schiedsrichter-Pfeife
            SoundManager.play('schiedsrichterPfeife');
        },
        spielAbbrechen() {
            this.$nextTick(() => {
                const modalElement = document.getElementById('abbrechenModal');
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                } else {
                    console.error('Abbrechen-Modal nicht gefunden');
                }
            });
        },
        spielWirklichAbbrechen() {
            // Stoppe Timer und Sounds
            if (this.timer) {
                clearInterval(this.timer);
            }
            SoundManager.stop('stadionAtmosphaere');

            // Schließe Modal
            const modalElement = document.getElementById('abbrechenModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            // Zurück zur Startseite
            this.$router.push('/');
        },
        spielBeenden() {
            // Speichere Spielergebnis
            this.speichereSpielergebnis();

            // Nächstes Spiel
            this.aktuellerSpielIndex++;
            this.starteNaechstesSpiel();
        },
        speichereSpielergebnis() {
            const spielergebnis = {
                datum: new Date().toISOString(),
                spielTyp: this.spielEinstellungen ? this.spielEinstellungen.spielTyp : 'freundschaftsspiel',
                halbzeitLaenge: this.spielEinstellungen ? this.spielEinstellungen.halbzeitLaenge : 5,
                team1: {
                    name: this.aktuellesSpiel.team1.name,
                    mannschaft: this.aktuellesSpiel.team1.mannschaft,
                    mannschaftLand: this.aktuellesSpiel.team1.mannschaftLand,
                    mannschaftFlagge: this.aktuellesSpiel.team1.mannschaftFlagge,
                    tore: this.aktuellesSpiel.tore.team1
                },
                team2: {
                    name: this.aktuellesSpiel.team2.name,
                    mannschaft: this.aktuellesSpiel.team2.mannschaft,
                    mannschaftLand: this.aktuellesSpiel.team2.mannschaftLand,
                    mannschaftFlagge: this.aktuellesSpiel.team2.mannschaftFlagge,
                    tore: this.aktuellesSpiel.tore.team2
                },
                halbzeitTore: this.halbzeitTore,
                verlaengerung: this.verlaengerungAktiv,
                verlaengerungHalbzeitLaenge: this.verlaengerungHalbzeitLaenge,
                elfmeterschiessen: this.elfmeterAktiv,
                elfmeterTore: this.elfmeterTore,
                elfmeterSchuesse: this.elfmeterSchuesse
            };

            // Lade bestehende Statistiken
            let statistiken = JSON.parse(localStorage.getItem('spielStatistiken') || '[]');
            statistiken.push(spielergebnis);
            localStorage.setItem('spielStatistiken', JSON.stringify(statistiken));
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
        getBallColorClass(team) {
            if (this.ballFarbenTyp[team] === 'custom') {
                return '';
            }
            return this.ballFarben[team] === 'schwarz' ? 'ball-color-black' : 'ball-color-white';
        },
        getBallColorStyle(team) {
            if (this.ballFarbenTyp[team] === 'custom') {
                return {
                    backgroundColor: this.ballFarben[team],
                    color: this.getContrastColor(this.ballFarben[team]),
                    border: '1px solid #ccc'
                };
            }
            return {};
        },
        getBallColorText(team) {
            // Für WM und Freundschaftsspiel nur Farben ohne Text anzeigen
            const spielTyp = localStorage.getItem('spielTyp');
            if (spielTyp === 'wm' || spielTyp === 'freundschaftsspiel') {
                return '&nbsp;';
            }
            
            if (this.ballFarbenTyp[team] === 'custom') {
                return 'Custom';
            }
            return this.ballFarben[team];
        },
        getContrastColor(hexColor) {
            // Einfache Kontrastberechnung für bessere Lesbarkeit
            const hex = hexColor.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 128 ? '#000' : '#fff';
        },
        aendereHintergrundLautstaerke() {
            // Ändere die Lautstärke des Hintergrundgeräuschs
            const neueLautstaerke = this.hintergrundLautstaerke / 100;

            // Aktualisiere Haupt-Sound
            if (SoundManager.sounds.stadionAtmosphaere && SoundManager.sounds.stadionAtmosphaere.playing()) {
                SoundManager.sounds.stadionAtmosphaere.volume(neueLautstaerke);
            }

            // Aktualisiere Fallback-Sound
            if (SoundManager.fallbacks.stadionAtmosphaere && SoundManager.fallbacks.stadionAtmosphaere.playing()) {
                SoundManager.fallbacks.stadionAtmosphaere.volume(neueLautstaerke);
            }
        },
        // Unentschieden-Methoden
        unentschiedenAkzeptieren() {
            // Akzeptiere das Unentschieden und beende das Spiel
            this.spielBeenden();
        },
        verlaengerungStarten() {
            // Zeige Verlängerungs-Modal
            this.$nextTick(() => {
                const modalElement = document.getElementById('verlaengerungModal');
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                }
            });
        },
        verlaengerungBestatigen() {
            // Schließe Modal
            const modalElement = document.getElementById('verlaengerungModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            // Starte Verlängerung
            this.verlaengerungAktiv = true;
            this.spielBeendet = false;
            this.verbleibendeZeit = this.verlaengerungHalbzeitLaenge * 60;
            this.halbzeitTore = { team1: [], team2: [] };

            // Starte Timer
            this.spielStartZeit = Date.now();
            this.timer = setInterval(() => {
                this.verbleibendeZeit--;

                if (this.verbleibendeZeit <= 0) {
                    this.verlaengerungHalbzeitBeenden();
                }
            }, 1000);

            // Spiele Schiedsrichter-Pfeife
            SoundManager.play('schiedsrichterPfeife');

            // Starte Hintergrundgeräusch
            if (this.spielEinstellungen && this.spielEinstellungen.hintergrundGerauesch) {
                SoundManager.play('stadionAtmosphaere');
                this.aendereHintergrundLautstaerke();
            }
        },
        verlaengerungHalbzeitBeenden() {
            // Stoppe Timer
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }

            // Spiele Schiedsrichter-Pfeife
            SoundManager.play('schiedsrichterPfeife');

            if (this.aktuellesSpiel.halbzeit === 1) {
                // Erste Halbzeit der Verlängerung beendet
                this.aktuellesSpiel.halbzeit = 2;
                this.verbleibendeZeit = this.verlaengerungHalbzeitLaenge * 60;

                // Zeige Halbzeit-Modal
                this.$nextTick(() => {
                    const modalElement = document.getElementById('halbzeitModal');
                    if (modalElement) {
                        const modal = new bootstrap.Modal(modalElement);
                        modal.show();
                    }
                });
            } else {
                // Zweite Halbzeit der Verlängerung beendet
                this.verlaengerungAktiv = false;
                this.spielBeendet = true;
            }
        },
        elfmeterschiessenStarten() {
            // Lade Elfmeterschießen-Einstellungen
            const einstellungen = localStorage.getItem('spielEinstellungen');
            if (einstellungen) {
                const spielEinstellungen = JSON.parse(einstellungen);
                this.elfmeterSchuesseProTeam = spielEinstellungen.elfmeterSchuesse || 5;
            }

            // Initialisiere Elfmeterschießen
            this.elfmeterAktiv = true;
            this.elfmeterTore = { team1: 0, team2: 0 };
            this.elfmeterSchuesse = { team1: 0, team2: 0 };
            this.elfmeterPhase = 'regulaer';
            this.elfmeterAktuellerSchuetze = 'team1';

            // Zeige Elfmeterschießen-Modal
            this.$nextTick(() => {
                const modalElement = document.getElementById('elfmeterschiessenModal');
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                }
            });
        },
        elfmeterSchussErgebnis(istTor) {
            const team = this.elfmeterAktuellerSchuetze;
            const spieler = this.aktuellesSpiel[team].name;
            const zeitString = this.formatierteZeit(Math.floor((Date.now() - this.spielStartZeit) / 1000));

            if (istTor) {
                this.elfmeterTore[team]++;
                SoundManager.play('torjubel');
            }

            this.elfmeterSchuesse[team]++;

            // Wechsle Schützen
            this.elfmeterAktuellerSchuetze = team === 'team1' ? 'team2' : 'team1';

            // Prüfe ob reguläres Elfmeterschießen beendet
            if (this.elfmeterPhase === 'regulaer' &&
                this.elfmeterSchuesse.team1 >= this.elfmeterSchuesseProTeam &&
                this.elfmeterSchuesse.team2 >= this.elfmeterSchuesseProTeam) {

                if (this.elfmeterTore.team1 === this.elfmeterTore.team2) {
                    // Unentschieden nach regulärem Elfmeterschießen
                    this.elfmeterPhase = 'sudden-death';
                } else {
                    // Elfmeterschießen beendet
                    this.elfmeterBeenden();
                }
            } else if (this.elfmeterPhase === 'sudden-death') {
                // Prüfe ob Sudden Death beendet
                if (this.elfmeterTore.team1 !== this.elfmeterTore.team2) {
                    this.elfmeterBeenden();
                }
            }
        },
        elfmeterBeenden() {
            // Schließe Modal
            const modalElement = document.getElementById('elfmeterschiessenModal');
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }

            // Markiere Sieger
            if (this.elfmeterTore.team1 > this.elfmeterTore.team2) {
                this.aktuellesSpiel.tore.team1++;
            } else {
                this.aktuellesSpiel.tore.team2++;
            }

            this.elfmeterAktiv = false;
            this.spielBeendet = true;
        },
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
            this.spielEinstellungen = JSON.parse(einstellungen);

            // Prüfe ob alle erforderlichen Daten vorhanden sind
            if (!this.spielEinstellungen || !this.spielEinstellungen.spieler || this.spielEinstellungen.spieler.length === 0) {
                console.error('Ungültige Spieleinstellungen gefunden');
                this.$router.push('/');
                return;
            }

            this.initialisiereTurnier();
        } catch (error) {
            console.error('Fehler beim Laden der Spieleinstellungen:', error);
            this.$router.push('/');
        }
    },
    beforeUnmount() {
        // Cleanup
        if (this.timer) {
            clearInterval(this.timer);
        }
        SoundManager.stop('stadionAtmosphaere');
    }
};

// Exportiere für globale Verwendung
window.SpielKomponente = SpielKomponente;
