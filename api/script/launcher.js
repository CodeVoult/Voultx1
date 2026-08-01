export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';

  // Detectar si la petición viene de Roblox o un ejecutor
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
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #050508; color: #fff; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
          .card { background: #0f0f19; border: 1px solid #ff3366; padding: 30px; border-radius: 12px; max-width: 380px; width: 90%; }
          h1 { color: #ff3366; font-size: 1.2rem; margin: 15px 0 10px; }
          p { color: #8a8b9b; font-size: 0.8rem; line-height: 1.4; }
        </style>
      </head>
      <body>
        <div class="card">
          <div style="font-size: 35px;">⚠️</div>
          <h1>ACCESS BLOCKED</h1>
          <p>Unauthorized request detected.<br>Access restricted to Roblox environment.</p>
        </div>
      </body>
      </html>
    `);
  }

  // Si entra desde Roblox
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(`
    print("CipherGate | Script cargado correctamente")
    
    game:GetService("StarterGui"):SetCore("SendNotification", {
        Title = "CipherGate",
        Text = "Script ejecutado con éxito",
        Duration = 5
    })
  `);
}
