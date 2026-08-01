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
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Outfit', sans-serif;
    background: #030304;
    color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  /* Fondo animado */
  canvas {
    position: fixed;
    inset: 0;
    z-index: 1;
  }

  /* Contenedor con borde plateado animado */
  .card-border-wrapper {
    position: relative;
    z-index: 10;
    width: 88%;
    max-width: 380px;
    border-radius: 22px;
    padding: 1.5px; /* Ancho del borde */
    background: linear-gradient(135deg, #e0e0e0, #444444, #ffffff, #222222, #b8b8b8);
    background-size: 300% 300%;
    animation: silverBorder 6s ease infinite;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.08), 0 25px 50px rgba(0, 0, 0, 0.9);
  }

  @keyframes silverBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Tarjeta Interna */
  .card {
    background: rgba(10, 10, 12, 0.88);
    border-radius: 21px;
    padding: 34px 22px 26px 22px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    text-align: center;
  }

  /* Icono de advertencia con resplandor plateado/dorado */
  .alert-icon {
    font-size: 40px;
    margin-bottom: 12px;
    display: inline-block;
    filter: drop-shadow(0 0 14px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
    animation: pulseIcon 3s ease-in-out infinite;
  }

  @keyframes pulseIcon {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Líneas plateadas con resplandor cromado */
  .silver-line-top {
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ffffff, #999999, transparent);
    margin: 0 auto 18px;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
  }

  /* Título ACCESS BLOCKED metálico plateado */
  h1 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 14px;
    background: linear-gradient(180deg, #ffffff 0%, #e0e0e0 40%, #888888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2));
  }

  .silver-line-bottom {
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ffffff, #888888, transparent);
    margin: 0 auto 20px;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
  }

  /* Separador punteado elegante */
  .dotted-divider {
    border-top: 1px dotted rgba(255, 255, 255, 0.25);
    margin: 0 auto 18px;
    width: 85%;
  }

  /* Mensaje explicativo */
  p {
    font-size: 11.5px;
    font-weight: 400;
    line-height: 1.6;
    color: #a0a0a5;
    letter-spacing: 0.6px;
    padding: 0 8px;
  }

  p span {
    color: #e0e0e0;
    font-weight: 500;
  }
</style>
</head>
<body>

<canvas id="particles"></canvas>

<div class="card-border-wrapper">
  <div class="card">
    <div class="alert-icon">⚠️</div>
    <div class="silver-line-top"></div>
    
    <h1>ACCESS BLOCKED</h1>
    
    <div class="silver-line-bottom"></div>
    <div class="dotted-divider"></div>
    
    <p>
      Unauthorized request detected · Access restricted to <span>Roblox environment</span>
    </p>
  </div>
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

  // Crear partículas plateadas brillantes
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 0.02 + 0.005
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

      p.alpha += p.twinkle;
      if (p.alpha > 0.9 || p.alpha < 0.2) p.twinkle = -p.twinkle;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, " + Math.abs(p.alpha) + ")";
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
