export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';

  // Detectar si la petición viene de Roblox o de un ejecutor
  const isRoblox = userAgent.includes('Roblox') || userAgent.includes('RobloxStudio');

  if (!isRoblox) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(403).send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CIPHERGATE // ACCESS RESTRICTED</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #030308;
      color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #particles-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .card {
      position: relative;
      z-index: 2;
      background: rgba(10, 10, 20, 0.75);
      border: 1px solid rgba(0, 240, 255, 0.3);
      border-radius: 16px;
      padding: 40px 30px;
      max-width: 420px;
      width: 90%;
      text-align: center;
      box-shadow: 0 0 50px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(255, 42, 109, 0.05);
      backdrop-filter: blur(12px);
    }
    .card::before {
      content: '';
      position: absolute;
      top: -1px; left: 20%; right: 20%; height: 2px;
      background: linear-gradient(90deg, transparent, #00f0ff, transparent);
    }
    .warning-icon {
      font-size: 3rem;
      margin-bottom: 15px;
      display: inline-block;
      filter: drop-shadow(0 0 15px #ff2a6d);
      animation: pulse 2s infinite alternate;
    }
    @keyframes pulse {
      0% { transform: scale(1); filter: drop-shadow(0 0 10px #ff2a6d); }
      100% { transform: scale(1.1); filter: drop-shadow(0 0 25px #ff2a6d); }
    }
    h1 {
      color: #ff2a6d;
      font-size: 1.4rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 12px;
      text-shadow: 0 0 12px rgba(255,42,109,0.6);
    }
    .line {
      height: 1px;
      background: linear-gradient(90deg, transparent, #00f0ff, transparent);
      margin: 20px auto;
      width: 80%;
    }
    p {
      color: #a0a5c0;
      font-size: 0.85rem;
      line-height: 1.6;
    }
    .tag {
      display: inline-block;
      margin-top: 25px;
      background: rgba(0, 240, 255, 0.1);
      border: 1px solid rgba(0, 240, 255, 0.4);
      color: #00f0ff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.75rem;
      letter-spacing: 2px;
      font-family: monospace;
      text-shadow: 0 0 8px rgba(0,240,255,0.5);
    }
  </style>
</head>
<body>
  <canvas id="particles-canvas"></canvas>

  <div class="card">
    <div class="warning-icon">⚠️</div>
    <h1>ACCESS BLOCKED</h1>
    <div class="line"></div>
    <p>Unauthorized request detected.<br>Access is restricted exclusively to the Roblox environment.</p>
    <div class="tag">CIPHERGATE // ACTIVE SHIELD</div>
  </div>

  <script>
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.3 ? '#00f0ff' : '#ff2a6d';
        this.alpha = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>
    `);
  }

  // Si entra desde Roblox/Ejecutor -> ÚNICAMENTE ejecuta el loadstring de tu script
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(`
loadstring(game:HttpGet("https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/script.lua"))()
  `);
}
