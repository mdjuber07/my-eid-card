function openGift() {
    document.querySelector('.card').classList.remove('hidden');
    document.querySelector('.card').style.transform = 'translateX(-50%) scale(1)';
    document.querySelector('.envelope').style.display = 'none';
}

// Fireworks Animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.particles = [];
        for (let i = 0; i < 30; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    
    update() {
        this.particles.forEach(p => p.update());
    }

    draw() {
        this.particles.forEach(p => p.draw());
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [];
setInterval(() => {
    fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
}, 500);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.particles[0].opacity <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}
animate();
