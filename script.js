const madnessTexts = [
    "> ejecutando /MMM/protocolo_oculto...\n> error: acceso parcial permitido...\n> mensaje: \"Él ya te eligió.\"\n\n[ _observando_ ]",
    "> cargando fragmentos...\n> advertencia: anomalía en el audio.\n> mensaje: \"¿Estás escuchando realmente?\"",
    "> acceso al archivo: /sombra_oculta/.rec\n> resultado: CORRUPTO\n> nota: \"Demasiado tarde para detenerlo.\"",
    "> protocolo /madness/ activado\n> mensaje: \"No deberías haber reproducido eso.\"\n\n[ presencia detectada ]",
    "> error de decodificación...\n> voz no reconocida\n> mensaje interceptado: \"Ella lo oyó antes que tú...\""
];

document.addEventListener("DOMContentLoaded", function () {
    const ambientAudio = document.getElementById('ambient');
    const podcastAudio = document.getElementById('podcast');

    // Intenta reproducir el audio ambiental al cargar
    if (ambientAudio) {
        ambientAudio.volume = 0.15;
        ambientAudio.play().catch((err) => {
            console.warn("Autoplay bloqueado o error en ambient:", err);
        });
    }

    // Manejo de conflicto entre ambient y podcast
    if (podcastAudio && ambientAudio) {
        podcastAudio.addEventListener('play', () => {
            if (!ambientAudio.paused) ambientAudio.pause();
        });

        podcastAudio.addEventListener('pause', () => {
            ambientAudio.play().catch(() => {}); // Evita error si autoplay bloqueado
        });

        podcastAudio.addEventListener('ended', () => {
            ambientAudio.play().catch(() => {});
        });
    }

    // Botón de play/pause personalizado
    const playButton = document.querySelector('.play-btn');
    if (playButton && podcastAudio) {
        playButton.addEventListener('click', () => {
            if (podcastAudio.paused) {
                podcastAudio.play();
                playButton.textContent = 'Pause';
            } else {
                podcastAudio.pause();
                playButton.textContent = 'Play';
            }
        });
    }
});

function triggerMadness() {
    const body = document.body;
    body.classList.add('no-cursor', 'distort');

    const ambient = document.getElementById('ambient');
    if (ambient) {
        ambient.volume = 0.15;
        ambient.play().catch(() => {});
    }

    const screamSfx = document.getElementById('scream-sfx');
    if (screamSfx) {
        screamSfx.play();
    }

    const message = madnessTexts[Math.floor(Math.random() * madnessTexts.length)];

    const injected = document.createElement('div');
    injected.style.position = 'fixed';
    injected.style.bottom = '10px';
    injected.style.left = '10px';
    injected.style.color = 'crimson';
    injected.style.fontFamily = "'Share Tech Mono', monospace";
    injected.style.fontSize = '0.9rem';
    injected.style.backgroundColor = 'rgba(0,0,0,0.8)';
    injected.style.padding = '1rem';
    injected.style.zIndex = '9999';
    injected.style.boxShadow = '0 0 20px red';
    injected.style.whiteSpace = 'pre-wrap';
    injected.style.animation = 'glitch 0.3s infinite alternate';
    injected.style.maxWidth = '300px';
    injected.style.wordWrap = 'break-word';
    document.body.appendChild(injected);

    let i = 0;
    function typeText() {
        if (i < message.length) {
            injected.innerText += message.charAt(i);
            i++;
            setTimeout(typeText, 35 + Math.random() * 30);
        }
    }
    typeText();

    let flashes = 0;
    const flashInterval = setInterval(() => {
        body.style.backgroundColor = flashes % 2 === 0 ? '#111' : '#000';
        flashes++;
        if (flashes > 12) {
            clearInterval(flashInterval);
            body.style.backgroundColor = '#000';
        }
    }, 100);

    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes glitch {
        0% { text-shadow: 1px 0 red, -1px 0 blue; }
        20% { text-shadow: -1px 0 red, 1px 0 blue; }
        40% { text-shadow: 2px 0 red, -2px 0 blue; }
        60% { text-shadow: -2px 0 red, 2px 0 blue; }
        80% { text-shadow: 1px 0 red, -1px 0 blue; }
        100% { text-shadow: 0 0 red, 0 0 blue; }
    }`;
    document.head.appendChild(style);
}
