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
<title>Access Blocked</title>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Fira Code', monospace;
    background: #050505;
    color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  /* Fondo de estrellas/partículas */
  canvas {
    position: fixed;
    inset: 0;
    z-index: 1;
  }

  /* Card estilo imagen */
  .card {
    position: relative;
    z-index: 10;
    width: 88%;
    max-width: 380px;
    padding: 32px 20px 24px 20px;
    background: rgba(10, 10, 12, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    text-align: center;
  }

  /* Icono de advertencia animado */
  .alert-icon {
    font-size: 38px;
    margin-bottom: 8px;
    display: inline-block;
    filter: drop-shadow(0 0 12px rgba(255, 204, 0, 0.6));
  }

  /* Línea brillante debajo del icono */
  .line-top {
    width: 60px;
    height: 3px;
    background: #ffffff;
    margin: 0 auto 16px;
    border-radius: 2px;
    box-shadow: 0 0 10px #ffffff, 0 0 18px rgba(255, 255, 255, 0.8);
  }

  /* Título ACCESS BLOCKED */
  h1 {
    font-family: 'Fira Code', monospace;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 3px;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 12px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  /* Línea brillante debajo del título */
  .line-bottom {
    width: 110px;
    height: 3px;
    background: #ffffff;
    margin: 0 auto 20px;
    border-radius: 2px;
    box-shadow: 0 0 10px #ffffff, 0 0 18px rgba(255, 255, 255, 0.8);
  }

  /* Separador punteado */
  .dotted-divider {
    border-top: 1px dotted rgba(255, 255, 255, 0.2);
    margin: 0 auto 18px;
    width: 90%;
  }

  /* Mensaje explicativo */
  p {
    font-family: 'Fira Code', monospace;
    font-size: 10.5px;
    line-height: 1.7;
    color: #888888;
    letter-spacing: 0.5px;
    padding: 0 10px;
  }
</style>
</head>
<body>

<canvas id="particles"></canvas>

<div class="card">
  <div class="alert-icon">⚠️</div>
  <div class="line-top"></div>
  
  <h1>ACCESS BLOCKED</h1>
  
  <div class="line-bottom"></div>
  <div class="dotted-divider"></div>
  
  <p>
    Unauthorized request detected · Access restricted to Roblox environment
  </p>
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

  // Generar partículas flotantes (estrellas)
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2
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
      ctx.fillStyle = "rgba(255, 255, 255, " + p.alpha + ")";
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
</script>

</body>
</html>
    `);
  }

  // Si entra desde Roblox/Ejecutor
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(`
loadstring(game:HttpGet("https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/script.lua"))()
  `);
}
