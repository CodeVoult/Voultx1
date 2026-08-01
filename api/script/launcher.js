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
<title>ZYROX • Access Restricted</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #050505;
    color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .bg {
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 120, 255, 0.08), transparent),
      radial-gradient(ellipse 60% 40% at 80% 100%, rgba(80, 80, 180, 0.05), transparent);
    z-index: 0;
  }

  canvas {
    position: fixed;
    inset: 0;
    z-index: 1;
    opacity: 0.4;
  }

  .card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 420px;
    padding: 48px 40px;
    background: rgba(15, 15, 18, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.03),
      0 25px 50px -12px rgba(0, 0, 0, 0.6);
    text-align: center;
  }

  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  }

  .icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 28px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(255, 80, 80, 0.15), rgba(255, 50, 50, 0.05));
    border: 1px solid rgba(255, 80, 80, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  h1 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.3px;
    margin-bottom: 8px;
    color: #fff;
  }

  .subtitle {
    font-size: 13px;
    color: #888;
    font-weight: 400;
    margin-bottom: 28px;
    letter-spacing: 0.3px;
  }

  .divider {
    width: 40px;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    margin: 0 auto 28px;
  }

  p {
    font-size: 14.5px;
    line-height: 1.65;
    color: #999;
    margin-bottom: 32px;
  }

  p strong {
    color: #ccc;
    font-weight: 500;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    font-size: 11.5px;
    color: #aaa;
    letter-spacing: 0.4px;
  }

  .badge span {
    width: 6px;
    height: 6px;
    background: #ff4d4d;
    border-radius: 50%;
    box-shadow: 0 0 8px #ff4d4d;
  }

  .footer {
    margin-top: 28px;
    font-size: 11px;
    color: #555;
    letter-spacing: 1px;
  }
</style>
</head>
<body>

<div class="bg"></div>
<canvas id="particles"></canvas>

<div class="card">
  <div class="icon">🛡</div>
  
  <h1>Access Restricted</h1>
  <div class="subtitle">CodeVault System Protection</div>
  
  <div class="divider"></div>
  
  <p>
    This resource is exclusively available within the <strong>Roblox client</strong>.<br>
    Browser access has been blocked for security reasons.
  </p>
  
  <div class="badge">
    <span></span>
    PROTECTION ACTIVE
  </div>
  
  <div class="footer">Protected by CodeVault</div>
</div>

<script>
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  let w, h;
  const particles = [];

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.2 + 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(255, 255, 255, " + (0.04 - dist / 2500) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
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
