document.addEventListener("DOMContentLoaded", () => {
    const trapLinks = document.querySelectorAll(".trap-link");
    
    trapLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 1. Passer en plein écran sans changer de page
            let elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }

            // 2. Basculer l'affichage immédiatement
            document.getElementById("4chan-content").style.display = "none";
            document.getElementById("payload-wrapper").style.display = "block";

            // 3. Lancer l'animation du terminal
            startPanicScript();
        });
    });
});

function startPanicScript() {
    const term = document.getElementById("terminal");
    const container = document.getElementById("ransom-container");
    
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape" || e.key === "F11" || e.key === "Meta") {
            e.preventDefault();
        }
    });

    const logs = [
        "Initializing core exploit module...",
        "Bypassing Windows Defender telemetry... <span class='success'>SUCCESS</span>",
        "Escalating local privileges to SYSTEM... <span class='success'>SUCCESS</span>",
        "Disabling Task Manager & Registry Editor...",
        "Identifying local storage partitions...",
        "Volume C:\\ mounted. Volume D:\\ mounted.",
        "Executing RSA-4096 encryption subroutine...",
        "Encrypting C:\\Users\\... 14%",
        "Encrypting C:\\Users\\... 45%",
        "Encrypting C:\\Users\\... 89%",
        "Encrypting C:\\Users\\... <span class='success'>100% SUCCESS</span>",
        "Locating network drives...",
        "Uploading private decryption keys to C2 server [193.168.0.44]...",
        "Connection established. Keys permanently secured.",
        "<span class='critical'>CRITICAL SYSTEM CORRUPTION DETECTED.</span>",
        "<span class='critical'>INITIATING LOCKDOWN PROTOCOL...</span>"
    ];
    
    let i = 0;
    function printLog() {
        if (i < logs.length) {
            let line = document.createElement('div');
            line.innerHTML = logs[i];
            term.appendChild(line);
            window.scrollTo(0, document.body.scrollHeight);
            i++;
            setTimeout(printLog, Math.random() * 300 + 100);
        } else {
            setTimeout(() => {
                term.style.display = 'none';
                container.style.display = 'block';
                playBeep();
                startTimer();
            }, 800);
        }
    }
    
    setTimeout(printLog, 300);

    function playBeep() {
        let ctx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.5);
    }

    function startTimer() {
        let timerDisplay = document.getElementById("timer");
        let secondsLeft = 48 * 3600;
        
        setInterval(() => {
            secondsLeft--;
            let h = Math.floor(secondsLeft / 3600);
            let m = Math.floor((secondsLeft % 3600) / 60);
            let s = secondsLeft % 60;
            timerDisplay.innerText = 
                String(h).padStart(2, '0') + ":" + 
                String(m).padStart(2, '0') + ":" + 
                String(s).padStart(2, '0');
        }, 1000);
    }
}
