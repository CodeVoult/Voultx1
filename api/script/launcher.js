export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';

  const isRoblox = userAgent.includes('Roblox') || userAgent.includes('RobloxStudio');

  if (!isRoblox) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(403).send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CodeVault • Access Restricted</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #000;
    color: #e8e8e8;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  canvas {
    position: fixed;
    inset: 0;
    z-index: 1;
  }

  /* Card premium */
  .card {
    position: relative;
    z-index: 10;
    width: 90%;
    max-width: 340px;
    padding: 36px 28px;
    background: rgba(18, 18, 20, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 22px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.03),
      0 25px 50px -12px rgba(0, 0, 0, 0.7);
    text-align: center;
    opacity: 0;
    transform: translateY(18px) scale(0.97);
    animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
  }

  @keyframes cardIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Línea superior sutil */
  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 18%;
    right: 18%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  }

  /* Icono */
  .icon {
    width: 54px;
    height: 54px;
    margin: 0 auto 22px;
    border-radius: 16px;
    background: linear-gradient(145deg, rgba(255, 70, 70, 0.18), rgba(255, 40, 40, 0.06));
    border: 1px solid rgba(255, 80, 80, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    animation: float 4.5s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  h1 {
    font-size: 18.5px;
    font-weight: 600;
    letter-spacing: -0.3px;
    margin-bottom: 5px;
    background: linear-gradient(180deg, #f5f5f5 0%, #b0b0b0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 11.5px;
    color: #8a8a8a;
    font-weight: 400;
    margin-bottom: 18px;
    letter-spacing: 0.4px;
  }

  .divider {
    width: 28px;
    height: 1px;
    background: rgba(255, 255, 255, 0.14);
    margin: 0 auto 18px;
  }

  p {
    font-size: 13px;
    line-height: 1.55;
    color: #9a9a9a;
    margin-bottom: 22px;
  }

  p strong {
    color: #d0d0d0;
    font-weight: 500;
  }

  /* Badge */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    font-size: 10.5px;
    color: #aaa;
    letter-spacing: 0.5px;
  }

  .badge span {
    width: 5px;
    height: 5px;
    background: #ff3b3b;
    border-radius: 50%;
    box-shadow: 0 0 8px #ff3b3b;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .footer {
    margin-top: 20px;
    font-size: 10px;
    color: #555;
    letter-spacing: 0.9px;
  }
</style>
</head>
<body>

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
  const count = 70;

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.4 + 0.25
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Partículas
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(255, 255, 255, \${p.alpha})\`;
      ctx.fill();
    });

    // Conexiones suaves
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = \`rgba(255, 255, 255, \${0.045 - dist / 2400})\`;
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

  // Si entra desde Roblox
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(`
loadstring(game:HttpGet("https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/script.lua"))()
  `);
}
