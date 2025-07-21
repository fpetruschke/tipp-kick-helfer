// Regeln Komponente
const RegelnKomponente = {
    template: `
        <div class="portrait-only">
            <div class="text-center mb-4">
                <h2 class="text-tipp-kick">
                    <span class="material-symbols-outlined me-2">rule</span>
                    TippKick Regeln
                </h2>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <span class="material-symbols-outlined me-2">sports_soccer</span>
                                Grundregeln
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="mb-2">• TippKick ist ein Tischfußball-Spiel mit einem kleinen Ball</li>
                                <li class="mb-2">• Das Spiel wird in zwei Halbzeiten gespielt</li>
                                <li class="mb-2">• Jeder Spieler steuert eine Mannschaft</li>
                                <li class="mb-2">• Der Ball wird durch Antippen der Stangen bewegt</li>
                                <li class="mb-2">• Ein Tor ist gültig, wenn der Ball ins gegnerische Tor rollt</li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <span class="material-symbols-outlined me-2">timer</span>
                                Spielzeit
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="mb-2">• Die Halbzeitlänge kann zwischen 1-10 Minuten gewählt werden</li>
                                <li class="mb-2">• Nach der ersten Halbzeit gibt es eine kurze Pause</li>
                                <li class="mb-2">• Nach der zweiten Halbzeit ist das Spiel beendet</li>
                                <li class="mb-2">• Bei Unentschieden nach regulärer Zeit endet das Spiel unentschieden</li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <span class="material-symbols-outlined me-2">groups</span>
                                Spielmodi
                            </h5>
                        </div>
                        <div class="card-body">
                            <h6>Freundschaftsspiel</h6>
                            <ul class="list-unstyled mb-3">
                                <li class="mb-2">• Spieler können beliebige Vereine oder Nationalmannschaften wählen</li>
                                <li class="mb-2">• Ideal für 2-4 Spieler</li>
                                <li class="mb-2">• Bei mehr als 2 Spielern wird automatisch ein Turnier gespielt</li>
                            </ul>

                            <h6>WM-Modus</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">• Nur Nationalmannschaften sind erlaubt</li>
                                <li class="mb-2">• Simuliert eine Weltmeisterschaft</li>
                                <li class="mb-2">• Bei mehr als 2 Spielern wird ein Turnier gespielt</li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <span class="material-symbols-outlined me-2">emoji_events</span>
                                Turniermodus
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="mb-2">• Wird automatisch aktiviert bei 3+ Spielern</li>
                                <li class="mb-2">• Jeder Spieler spielt gegen jeden anderen</li>
                                <li class="mb-2">• Die Spiele werden nacheinander abgehalten</li>
                                <li class="mb-2">• Am Ende gibt es einen Gesamtsieger</li>
                                <li class="mb-2">• Alle Ergebnisse werden in der Statistik gespeichert</li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <span class="material-symbols-outlined me-2">volume_up</span>
                                Sound-Features
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="mb-2">• Schiedsrichter-Pfeife bei Spielbeginn und Halbzeitende</li>
                                <li class="mb-2">• Torjubel bei jedem Tor</li>
                                <li class="mb-2">• Optionale Stadionatmosphäre als Hintergrundgeräusch</li>
                                <li class="mb-2">• Alle Sounds können in den Einstellungen konfiguriert werden</li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <span class="material-symbols-outlined me-2">tips_and_updates</span>
                                Tipps für besseres Spiel
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="mb-2">• Übe das Antippen der Stangen für präzise Schüsse</li>
                                <li class="mb-2">• Verteidige dein Tor aktiv</li>
                                <li class="mb-2">• Nutze verschiedene Schusstechniken</li>
                                <li class="mb-2">• Kommuniziere mit deinem Mitspieler</li>
                                <li class="mb-2">• Halte die Spielfläche sauber für optimales Ballverhalten</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-tipp-kick" @click="$router.push('/')">
                    <span class="material-symbols-outlined me-2">play_arrow</span>
                    Jetzt spielen!
                </button>
            </div>
        </div>
    `
};

// Exportiere für globale Verwendung
window.RegelnKomponente = RegelnKomponente;
