// Initialisation des animations AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksA = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Fermer le menu quand on clique sur un lien
    navLinksA.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Effet de typing pour le texte d'introduction
    const roles = ["Développeur Web", "Étudiant en BUT Info", "Passionné de Tech"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;

    function type() {
        const typingText = document.querySelector('.typing-text');
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Barre de progression du scroll
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Animation des cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    // Gestion du thème clair/sombre
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme') || 'dark';
    
    root.setAttribute('data-theme', storedTheme);
    themeToggle.innerHTML = storedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Gestion du formulaire de contact
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

        try {
            // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            form.reset();
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
            
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Erreur';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
        }
    });

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation des barres de compétences
    const animateSkillBars = () => {
        document.querySelectorAll('.progress-line span').forEach(span => {
            const percent = span.getAttribute('data-percent');
            span.style.width = percent + '%';
        });
    };

    // Observer pour les animations de compétences
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(skillsSection);
    }

    // Console Interactive
    class PortfolioConsole {
        constructor() {
            this.output = document.querySelector('.console-output');
            this.input = document.querySelector('.console-input');
            this.commands = {
                'aide': () => this.showHelp(),
                'clear': () => this.clear(),
                'apropos': () => this.about(),
                'competences': () => this.skills(),
                'projets': () => this.projects(),
                'contact': () => this.contact(),
                'social': () => this.social(),
                'ascii': () => this.showAscii(),
                'theme': () => this.toggleTheme(),
                'date': () => this.showDate(),
                'citation': () => this.showQuote(),
                'ascii-art': () => this.generateAsciiArt(),
                'couleurs': () => this.changeColors(),
                'matrix': () => this.startMatrix(),
                'playlist': () => this.showPlaylist(),
                // Commandes secrètes
                'konami': () => this.konamiCode(),
                'coffee': () => this.coffeeTime(),
                'disco': () => this.discoMode(),
                '42': () => this.showAnswer()
            };

            // Variables pour les animations
            this.matrixInterval = null;
            this.discoInterval = null;
            this.matrixChars = 'ノハㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩㄪㄫㄬ';

            // Message de bienvenue
            this.print(`
Bienvenue sur la Console Portfolio de Noah ! 
Tapez 'aide' pour voir les commandes disponibles.
            `, 'info');

            // Gestionnaire d'entrée
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.executeCommand();
                }
            });

            // Séquence Konami
            this.konamiSequence = [];
            document.addEventListener('keydown', (e) => {
                const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
                this.konamiSequence.push(e.keyCode);
                
                // Garder seulement les 10 dernières touches
                if (this.konamiSequence.length > 10) {
                    this.konamiSequence.shift();
                }

                // Vérifier si la séquence correspond au code Konami
                if (this.konamiSequence.length === 10 && 
                    this.konamiSequence.every((code, index) => code === konamiCode[index])) {
                    this.konamiCode();
                    this.konamiSequence = [];
                }
            });
        }

        executeCommand() {
            const commandText = this.input.value.trim().toLowerCase();
            this.print(`> ${commandText}`, 'command');
            this.input.value = '';

            if (commandText === '') {
                return;
            }

            const command = this.commands[commandText];
            if (command) {
                command();
            } else {
                this.print(`Commande non reconnue. Tapez 'aide' pour voir les commandes disponibles.`, 'error');
            }
        }

        konamiCode() {
            const art = `
    ⠀⠀⠀⠀⠀⠀⢀⣤⣀⣀⣀⠀⠻⣷⣄
    ⠀⠀⠀⠀⢀⣴⣿⣿⣿⡿⠋⠀⠀⠀⠹⣿⣦⡀
    ⠀⠀⢀⣴⣿⣿⣿⣿⣏⠀⠀⠀⠀⠀⠀⢹⣿⣧
    ⠀⠀⠙⢿⣿⡿⠋⠻⣿⣿⣦⡀⠀⠀⠀⢸⣿⣿⡆
    ⠀⠀⠀⠀⠉⠀⠀⠀⠈⠻⣿⣿⣦⡀⠀⢸⣿⣿⡇
    ⠀⠀⠀⠀⢀⣀⣄⡀⠀⠀⠈⠻⣿⣿⣶⣿⣿⣿⠁
    ⠀⠀⠀⣠⣿⣿⢿⣿⣶⣶⣶⣶⣾⣿⣿⣿⣿⡁
    ⢠⣶⣿⣿⠋⠀⠀⠉⠛⠿⠿⠿⠿⠿⠛⠻⣿⣿⣦⡀
    ⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⡿
            `;
            this.print(art, 'konami');
            this.print("🎮 Code Konami activé ! Mode invincible ON", 'success');
            document.body.classList.add('konami-mode');
            setTimeout(() => {
                document.body.classList.remove('konami-mode');
                this.print("Mode invincible désactivé", 'info');
            }, 10000);
        }

        coffeeTime() {
            const coffee = `
         )))
        ((((
         )))
      .-------.
    .'         '.
    |  .-'~'-.  |
    |  |     |  |
    |  |     |  |
    |  |     |  |         _____
    |  |     |  |     _.-~     ~-.
    |  |     |  |    /     __     \\
    |  |     |  |   /     /  \\     \\
    |  |     |  |  |     |    |     |
    |  |     |  |  |     |    |     |
    |  |     |  |  |     |    |     |
    |   '-._.-'   |  \\     \\__/     /
    |             |   \\            /
    |    HOT      |    '.        .'
    |   COFFEE    |      '-....-'
    '.           .'
      '-._____.-'
            `;
            this.print(coffee, 'coffee');
            this.print("☕ Pause café ! Rechargez votre énergie", 'success');
            
            // Effet sonore de café qui coule
            setTimeout(() => {
                this.print("*glou glou glou*", 'coffee');
            }, 1000);
            
            setTimeout(() => {
                this.print("Ahhh, ça fait du bien !", 'success');
            }, 2000);
        }

        showHelp() {
            this.print(`
Commandes disponibles :
- aide        : Affiche ce message d'aide
- apropos     : À propos de moi
- competences : Mes compétences techniques
- projets     : Voir mes projets
- contact     : Informations de contact
- social      : Liens réseaux sociaux
- ascii       : Affiche un art ASCII
- theme       : Change le thème clair/sombre
- date        : Affiche la date actuelle
- clear       : Efface la console

Commandes amusantes :
- citation    : Citations aléatoires de programmation
- ascii-art   : Générateur d'art ASCII
- couleurs    : Changer les couleurs de la console
- matrix      : Animation style Matrix
- playlist    : Afficher ma playlist musicale
            `, 'info');
        }

        print(text, className = '') {
            const p = document.createElement('p');
            p.className = className;
            p.innerHTML = text;
            this.output.appendChild(p);
        }

        clear() {
            this.output.innerHTML = '';
        }

        scrollToBottom() {
            this.output.scrollTop = this.output.scrollHeight;
        }

        about() {
            this.print(`
 À propos de moi :
Je suis Noah, un développeur web passionné et étudiant.
Actuellement en BUT Informatique.
Passionné par la création d'expériences web belles et fonctionnelles.
            `, 'info');
        }

        skills() {
            this.print(`
 Compétences techniques :

Frontend :
- HTML5, CSS3, JavaScript
- React, Vue.js
- Bootstrap, Tailwind

Backend :
- PHP, Node.js
- MySQL, MongoDB
- Express, Laravel

Outils :
- Git, GitHub
- VS Code
- Docker
            `, 'success');
        }

        projects() {
            this.print(`
 Projets principaux :

1. Site Portfolio
   - Portfolio personnel construit avec des technologies modernes
   - Console interactive (vous l'utilisez actuellement !)

2. Plateforme E-commerce
   - Application web full-stack
   - Construite avec React et Node.js

3. Application de Gestion de Tâches
   - Application web responsive
   - Mises à jour en temps réel avec WebSocket
            `, 'info');
        }

        contact() {
            this.print(`
 Informations de contact :
Email : noah.chaumay@example.com
Téléphone : +33 6 XX XX XX XX
Localisation : France
            `, 'info');
        }

        social() {
            this.print(`
 Réseaux sociaux :
GitHub : github.com/noahchaumay
LinkedIn : linkedin.com/in/noahchaumay
Twitter : @noahchaumay
            `, 'info');
        }

        showAscii() {
            const frames = [
                `
    +------------------+
    |                  |
    |                  |
    |                  |
    |                  |
    |     Loading.     |
    |                  |
    |                  |
    +------------------+
        [___________]
                `,
                `
    +------------------+
    |                  |
    |                  |
    |                  |
    |                  |
    |     Loading..    |
    |                  |
    |                  |
    +------------------+
        [___________]
                `,
                `
    +------------------+
    |                  |
    |                  |
    |                  |
    |                  |
    |     Loading...   |
    |                  |
    |                  |
    +------------------+
        [___________]
                `,
                `
    +------------------+
    |     ********     |
    |    **********    |
    |   ************   |
    |   ************   |
    |    **********    |
    |     ********     |
    |      ******      |
    +------------------+
        [___________]
                `,
                `
    +------------------+
    |    Welcome to    |
    |                  |
    |   Noah's World   |
    |                  |
    |    < Hello />    |
    |                  |
    |    Dev & Code    |
    +------------------+
        [___________]
                `
            ];

            let currentFrame = 0;
            
            const showNextFrame = () => {
                if (currentFrame < frames.length) {
                    // Effacer le frame précédent si ce n'est pas le premier
                    if (currentFrame > 0) {
                        const lines = frames[currentFrame - 1].split('\n').length;
                        for (let i = 0; i < lines; i++) {
                            this.output.lastChild?.remove();
                        }
                    }
                    
                    this.print(frames[currentFrame], 'ascii-art');
                    currentFrame++;

                    // Délais différents selon le frame
                    let delay = 1000; // Délai par défaut
                    if (currentFrame <= 3) {
                        delay = 1200; // Plus lent pour le loading
                    } else if (currentFrame === 4) {
                        delay = 1500; // Plus lent pour l'animation d'étoiles
                    } else {
                        delay = 2000; // Encore plus lent pour le message final
                    }

                    setTimeout(showNextFrame, delay);
                }
            };

            // Démarrer l'animation
            showNextFrame();
        }

        toggleTheme() {
            document.documentElement.setAttribute('data-theme',
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
            this.print('Thème changé ! ', 'success');
        }

        showDate() {
            const now = new Date();
            this.print(now.toLocaleString('fr-FR'), 'info');
        }

        showQuote() {
            const quotes = [
                "Le code est comme l'humour. Quand vous devez l'expliquer, il est mauvais. - Cory House",
                "La simplicité est la sophistication suprême. - Leonardo da Vinci",
                "Le meilleur moyen de prédire l'avenir est de le créer. - Alan Kay",
                "La programmation n'est pas à propos des ordinateurs, mais à propos de la façon de penser. - Edsger Dijkstra",
                "La perfection est atteinte non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il n'y a plus rien à retirer. - Antoine de Saint-Exupéry",
                "Le code est poésie. - WordPress",
                "Les programmeurs d'aujourd'hui sont les sorciers du futur. - Gabe Newell",
                "La vie est comme programmer. Si tout est parfait, quelque chose ne va pas. - Anonymous",
                "Le bug le plus difficile à trouver est celui que vous ne cherchez pas. - Anonymous",
                "Il y a deux façons d'écrire des programmes sans erreurs. Seule la troisième fonctionne. - Alan J. Perlis"
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            this.print(randomQuote, 'quote');
        }

        generateAsciiArt() {
            const arts = [
                `
   /\\___/\\
  (  o o  )
  (  =^=  ) 
   (______)
`,
                `
    _____
   |     |
   | ^ ^ |
   | === |
   |     |
   |_____|
`,
                `
   /\\_/\\
  ( o.o )
   > ^ <
`,
                `
    /\\__/\\
   /      \\
  |  ^  ^  |
  |  (__)  |
   \\      /
    \\____/
`,
                `
   |\\---/|
   | o_o |
    \\_^_/
`
            ];
            const randomArt = arts[Math.floor(Math.random() * arts.length)];
            this.print(randomArt, 'ascii-art');
        }

        changeColors() {
            const colors = [
                { name: 'Néon', primary: '#0ff', text: '#fff', bg: '#111' },
                { name: 'Forêt', primary: '#4CAF50', text: '#E8F5E9', bg: '#1B5E20' },
                { name: 'Océan', primary: '#03A9F4', text: '#E1F5FE', bg: '#01579B' },
                { name: 'Sunset', primary: '#FF9800', text: '#FFF3E0', bg: '#E65100' },
                { name: 'Lavande', primary: '#9C27B0', text: '#F3E5F5', bg: '#4A148C' }
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            document.documentElement.style.setProperty('--primary-color', randomColor.primary);
            document.documentElement.style.setProperty('--text-color', randomColor.text);
            document.documentElement.style.setProperty('--bg-color', randomColor.bg);

            this.print(`Thème changé : ${randomColor.name}`, 'success');
        }

        startMatrix() {
            if (this.matrixInterval) {
                clearInterval(this.matrixInterval);
                this.matrixInterval = null;
                return;
            }

            this.print('Animation Matrix démarrée. Tapez "matrix" à nouveau pour arrêter.', 'info');
            
            let lines = [];
            const width = 40;
            const height = 15;

            for (let i = 0; i < width; i++) {
                lines[i] = Math.floor(Math.random() * height);
            }

            this.matrixInterval = setInterval(() => {
                let output = '';
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        if (y === lines[x]) {
                            output += this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
                        } else {
                            output += ' ';
                        }
                    }
                    output += '\n';
                }

                // Mise à jour des positions
                for (let i = 0; i < width; i++) {
                    lines[i]++;
                    if (lines[i] >= height) {
                        lines[i] = 0;
                    }
                }

                // Effacer les anciennes lignes et afficher la nouvelle frame
                const oldLines = this.output.querySelectorAll('.matrix');
                oldLines.forEach(line => line.remove());
                this.print(output, 'matrix');
            }, 100);
        }

        showPlaylist() {
            const playlistArt = `
╔══════════════════════════════════════════════════╗
║             🎵 Du poulet braisé 🎵               ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  🎧 Une sélection de mes morceaux préférés      ║
║  🎼 Artistes : HOUDI, Yvnnis, Stony Stone...    ║
║  📊 365 titres                                   ║
║                                                  ║
║  Quelques morceaux :                            ║
║  ├─ CROISETTE - Yvnnis                         ║
║  ├─ Ti amo - Danyl, Stony Stone                ║
║  ├─ SENSATION - HOUDI                          ║
║  ├─ VIN ITALIEN - Yvnnis                       ║
║  └─ MONACO - HOUDI                             ║
║                                                  ║
║  🌐 Écoutez sur Spotify :                       ║
║  https://spoti.fi/5GWeTzO9VW2Z                  ║
╚══════════════════════════════════════════════════╝
`;
            this.print(playlistArt, 'playlist-art');

            // Afficher quelques informations supplémentaires
            this.print(`
Pour écouter la playlist complète, cliquez sur le lien Spotify ci-dessus.
Cette playlist reflète mon goût pour la musique française moderne, 
avec un mélange de rap et de pop qui m'accompagne pendant mes sessions de code.
            `, 'playlist-info');
        }

        // Commandes secrètes
        discoMode() {
            if (this.discoInterval) {
                clearInterval(this.discoInterval);
                this.discoInterval = null;
                document.body.classList.remove('disco-mode');
                this.changeColors(); // Retour aux couleurs normales
                return;
            }

            this.print("🎵 Mode disco activé ! Let's dance !", 'success');
            document.body.classList.add('disco-mode');
            
            const colors = [
                '#FF0000', // Rouge
                '#00FF00', // Vert
                '#0000FF', // Bleu
                '#FFFF00', // Jaune
                '#FF00FF', // Magenta
                '#00FFFF'  // Cyan
            ];
            
            let colorIndex = 0;
            this.discoInterval = setInterval(() => {
                document.documentElement.style.setProperty('--primary-color', colors[colorIndex]);
                colorIndex = (colorIndex + 1) % colors.length;
            }, 500);

            // Animation de texte disco
            const discoText = `
    ▄▄▄▄▄▄▄▄▄▄▄▄▄
    █  DISCO MODE   █
    █   ♪♫♪♫♪♫♪♫   █
    █  Let's Dance! █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀
`;
            this.print(discoText, 'disco-text');

            // Arrêt automatique après 30 secondes
            setTimeout(() => {
                if (this.discoInterval) {
                    clearInterval(this.discoInterval);
                    this.discoInterval = null;
                    document.body.classList.remove('disco-mode');
                    this.changeColors();
                    this.print("🎵 Mode disco désactivé", 'info');
                }
            }, 30000);
        }

        showAnswer() {
            const answer = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠛⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;
            this.print(answer, 'answer');
            this.print(`
🌌 La réponse à la vie, l'univers et tout le reste est 42
🚀 "N'oubliez pas votre serviette !" - Le Guide du voyageur galactique
            `, 'success');
        }
    }

    // Initialiser la console quand le DOM est chargé
    new PortfolioConsole();

    // Ajouter des effets de scale et d'alerte sur les éléments de hobbies
    document.querySelectorAll('.hobby-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });

        item.addEventListener('click', () => {
            alert(`You clicked on ${item.querySelector('span').textContent}`);
        });
    });
});