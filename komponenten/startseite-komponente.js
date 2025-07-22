// Startseite Komponente
const StartseiteKomponente = {
    template: `
        <div class="portrait-only">
            <div class="text-center mb-4">
                <h1 class="display-4 text-tipp-kick mb-3">
                    <img src="assets/img/logos/default.png" alt="Tipp-Kick-Helfer Logo" height="48" class="me-2">
                    Tipp-Kick-Helfer
                </h1>
                <p class="lead">Dein digitaler Helfer für das Tischfußball-Spiel</p>
            </div>

            <div class="row g-4">
                <div class="col-12 col-md-6">
                    <div class="card card-game card-game-spiel h-100" @click="starteFreundschaftsspiel">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">sports_soccer</span>
                                Freundschaftsspiel
                            </h3>
                            <p class="card-text">Spiele gegen Freunde mit beliebigen Vereinen</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game card-game-spiel h-100" @click="starteWM">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">sports_soccer</span>
                                WM
                            </h3>
                            <p class="card-text">Spiele mit Nationalmannschaften</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game card-game-spiel h-100" @click="starteElfmeterschiessen">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">sports_soccer</span>
                                Elfmeterschießen
                            </h3>
                            <p class="card-text">Spiele nur Elfmeterschießen</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game card-game-spiel h-100" @click="starteTraining">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">fitness_center</span>
                                Training
                            </h3>
                            <p class="card-text">Übe das Schießen von verschiedenen Positionen</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game h-100" @click="zeigeStatistik">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">analytics</span>
                                Globale Statistik
                            </h3>
                            <p class="card-text">Siehe deine Spielstatistiken</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game h-100" @click="zeigeRegeln">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">menu_book</span>
                                Regeln
                            </h3>
                            <p class="card-text">Lerne die TippKick Regeln</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game h-100" @click="zeigeEinstellungen">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">settings</span>
                                Einstellungen
                            </h3>
                            <p class="card-text">Verwalte deine App-Einstellungen</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6">
                    <div class="card card-game h-100" @click="zeigeReadme">
                        <div class="card-body text-center">
                            <h3 class="card-title">
                                <span class="material-symbols-outlined me-2">info</span>
                                Über das Projekt
                            </h3>
                            <p class="card-text">Informationen über TippKick Helfer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        starteFreundschaftsspiel() {
            // Speichere Spieltyp im localStorage
            localStorage.setItem('spielTyp', 'freundschaftsspiel');
            this.$router.push('/spiel-einstellungen');
        },
        starteWM() {
            // Speichere Spieltyp im localStorage
            localStorage.setItem('spielTyp', 'wm');
            this.$router.push('/spiel-einstellungen');
        },
        starteElfmeterschiessen() {
            // Speichere Spieltyp im localStorage
            localStorage.setItem('spielTyp', 'elfmeterschiessen');
            this.$router.push('/spiel-einstellungen');
        },
        starteTraining() {
            // Speichere Spieltyp im localStorage
            localStorage.setItem('spielTyp', 'training');
            this.$router.push('/spiel-einstellungen');
        },
        zeigeStatistik() {
            this.$router.push('/statistik');
        },
        zeigeRegeln() {
            this.$router.push('/regeln');
        },
        zeigeEinstellungen() {
            this.$router.push('/einstellungen');
        },
        zeigeReadme() {
            this.$router.push('/readme');
        }
    }
};

// Exportiere für globale Verwendung
window.StartseiteKomponente = StartseiteKomponente;
