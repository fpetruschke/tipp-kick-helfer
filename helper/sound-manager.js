// Erweiterter Sound-Manager mit Fallback-System
const SoundManagerHelper = {
    sounds: {},
    fallbacks: {},
    isInitialized: false,

    // Initialisiere Sounds mit Fallback-System
    init() {
        if (this.isInitialized) return;

        // Haupt-Sounds (externe URLs)
        this.sounds = {
            torjubel: new Howl({
                src: ['assets/audio/torjubel.wav'],
                volume: 0.3,
                onloaderror: () => this.handleSoundError('torjubel')
            }),
            schiedsrichterPfeife: new Howl({
                src: ['assets/audio/schiedsrichter-pfeife.wav'],
                volume: 0.7,
                onloaderror: () => this.handleSoundError('schiedsrichterPfeife')
            }),
            stadionAtmosphaere: new Howl({
                src: ['assets/audio/stadion-atmosphaere.mp3'],
                volume: 0.3,
                loop: true,
                onloaderror: () => this.handleSoundError('stadionAtmosphaere')
            }),
            daneben: new Howl({
                src: ['assets/audio/daneben.mp3'],
                volume: 0.5,
                onloaderror: () => this.handleSoundError('daneben')
            })
        };

        // Fallback-Sounds (lokale WAV-Dateien)
        this.fallbacks = {
            torjubel: new Howl({
                src: ['assets/audio/torjubel.wav'],
                volume: 0.3
            }),
            schiedsrichterPfeife: new Howl({
                src: ['assets/audio/schiedsrichter-pfeife.wav'],
                volume: 0.7
            }),
            stadionAtmosphaere: new Howl({
                src: ['assets/audio/stadion-atmosphaere.mp3'],
                volume: 0.3,
                loop: true
            }),
            daneben: new Howl({
                src: ['assets/audio/daneben.mp3'],
                volume: 0.5
            })
        };

        this.isInitialized = true;
    },

    // Behandle Sound-Lade-Fehler
    handleSoundError(soundName) {
        console.warn(`Sound ${soundName} konnte nicht geladen werden, verwende Fallback`);
        // Markiere Haupt-Sound als nicht verfügbar
        this.sounds[soundName] = null;
    },

    // Spiele Sound mit Fallback
    play(soundName) {
        try {
            if (this.sounds[soundName] && this.sounds[soundName].state() === 'loaded') {
                // Für Hintergrundatmosphäre: Random Start-Position
                if (soundName === 'stadionAtmosphaere') {
                    const randomPosition = Math.random() * 100; // 0-100%
                    this.sounds[soundName].seek(randomPosition);
                }
                this.sounds[soundName].play();
            } else if (this.fallbacks[soundName]) {
                // Für Hintergrundatmosphäre: Random Start-Position
                if (soundName === 'stadionAtmosphaere') {
                    const randomPosition = Math.random() * 100; // 0-100%
                    this.fallbacks[soundName].seek(randomPosition);
                }
                this.fallbacks[soundName].play();
            } else {
                console.warn(`Kein Sound verfügbar für: ${soundName}`);
            }
        } catch (error) {
            console.error(`Fehler beim Abspielen von ${soundName}:`, error);
        }
    },

    // Setze Lautstärke für Hintergrundatmosphäre
    setVolume(soundName, volume) {
        try {
            if (this.sounds[soundName]) {
                this.sounds[soundName].volume(volume / 100);
            }
            if (this.fallbacks[soundName]) {
                this.fallbacks[soundName].volume(volume / 100);
            }
        } catch (error) {
            console.error(`Fehler beim Setzen der Lautstärke für ${soundName}:`, error);
        }
    },

    // Stoppe Sound
    stop(soundName) {
        try {
            if (this.sounds[soundName] && this.sounds[soundName].playing()) {
                this.sounds[soundName].stop();
            }
            if (this.fallbacks[soundName] && this.fallbacks[soundName].playing()) {
                this.fallbacks[soundName].stop();
            }
        } catch (error) {
            console.error(`Fehler beim Stoppen von ${soundName}:`, error);
        }
    },

    // Prüfe ob Sound verfügbar ist
    isAvailable(soundName) {
        return (this.sounds[soundName] && this.sounds[soundName].state() === 'loaded') ||
            (this.fallbacks[soundName] && this.fallbacks[soundName].state() === 'loaded');
    }
};

// Exportiere für globale Verwendung
window.SoundManagerHelper = SoundManagerHelper;
