/* ============================================================
   JanSahay AI - Hero Particle Canvas Animation
   ============================================================ */

(function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [], animId;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : H + 10;
            this.r  = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -(Math.random() * 0.6 + 0.2);
            this.alpha = Math.random() * 0.5 + 0.1;
            const colors = ['124,58,237', '6,182,212', '236,72,153', '16,185,129'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    function drawConnections() {
        const maxDist = 100;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / maxDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        animId = requestAnimationFrame(loop);
    }

    function init() {
        resize();
        particles = Array.from({ length: 80 }, () => new Particle());
        if (animId) cancelAnimationFrame(animId);
        loop();
    }

    window.addEventListener('resize', () => { resize(); });
    // Wait for layout
    setTimeout(init, 100);
})();
