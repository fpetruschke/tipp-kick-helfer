// README Komponente
const ReadmeKomponente = {
    template: `
        <div class="portrait-only">
            <div class="text-center mb-4">
                <h2 class="text-tipp-kick">
                    <span class="material-symbols-outlined me-2">info</span>
                    Über TippKick Helfer
                </h2>
            </div>

            <div class="row">
                <div class="col-12">
                    <div v-if="loading" class="text-center">
                        <div class="spinner-border text-tipp-kick" role="status">
                            <span class="visually-hidden">Lade...</span>
                        </div>
                        <p class="mt-2">Lade Inhalte...</p>
                    </div>

                    <div v-else-if="error" class="alert alert-danger">
                        <span class="material-symbols-outlined me-2">error</span>
                        Fehler beim Laden der Inhalte: {{ error }}
                    </div>

                    <div v-else class="readme-content">
                        <div v-html="formattedContent"></div>
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
    `,
    data() {
        return {
            loading: true,
            error: null,
            readmeContent: ''
        }
    },
    computed: {
                formattedContent() {
            if (!this.readmeContent) return '';
            
            // Markdown zu HTML konvertieren
            let html = this.readmeContent
                // Code-Blöcke zuerst behandeln (um Konflikte zu vermeiden)
                .replace(/```([\s\S]*?)```/g, '<pre class="bg-light p-3 rounded border"><code>$1</code></pre>')
                
                // Horizontale Trennlinien
                .replace(/^---$/gm, '<hr class="my-4">')
                
                // Überschriften
                .replace(/^### (.*$)/gim, '<h3 class="text-tipp-kick mt-4 mb-3">$1</h3>')
                .replace(/^## (.*$)/gim, '<h2 class="text-tipp-kick mt-4 mb-3">$1</h2>')
                .replace(/^# (.*$)/gim, '<h1 class="text-tipp-kick mt-4 mb-3">$1</h1>')
                
                // Links
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-decoration-none text-tipp-kick">$1</a>')
                
                // Fett
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                
                // Kursiv
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                
                // Inline-Code
                .replace(/`([^`]+)`/g, '<code class="bg-light px-1 rounded">$1</code>');
            
            // Listen verarbeiten
            const lines = html.split('\n');
            let inList = false;
            let processedLines = [];
            
            for (let line of lines) {
                if (line.trim().startsWith('- ')) {
                    if (!inList) {
                        processedLines.push('<ul class="list-unstyled">');
                        inList = true;
                    }
                    processedLines.push(`<li class="mb-2">${line.trim().substring(2)}</li>`);
                } else {
                    if (inList) {
                        processedLines.push('</ul>');
                        inList = false;
                    }
                    if (line.trim()) {
                        processedLines.push(`<p class="mb-3">${line}</p>`);
                    }
                }
            }
            
            if (inList) {
                processedLines.push('</ul>');
            }
            
            html = processedLines.join('\n');
            
            // Doppelte Zeilenumbrüche entfernen
            html = html.replace(/<p class="mb-3"><\/p>/g, '');
            
            return html;
        }
    },
    mounted() {
        this.ladeReadme();
    },
    methods: {
        async ladeReadme() {
            try {
                this.loading = true;
                this.error = null;

                // README-Datei laden
                const response = await fetch('README.md');
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                this.readmeContent = await response.text();
            } catch (error) {
                console.error('Fehler beim Laden der README:', error);
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
};

// Exportiere für globale Verwendung
window.ReadmeKomponente = ReadmeKomponente; 