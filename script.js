const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const waveEl = document.getElementById("wave");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const startButton = document.getElementById("startButton");

const keys = {};
const stars = Array.from({ length: 90 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2 + 1,
  speed: Math.random() * 1.5 + 0.5
}));

let gameState;
let lastTime = 0;
let overlayMode = "start";

function resetGame() {
  gameState = {
    running: false,
    score: 0,
    lives: 3,
    wave: 1,
    enemySpeed: 1.3,
    spawnTimer: 0,
    spawnInterval: 950,
    bullets: [],
    enemies: [],
    particles: [],
    player: {
      x: canvas.width / 2,
      y: canvas.height - 70,
      width: 42,
      height: 54,
      speed: 6,
      cooldown: 0
    }
  };
  updateHud();
}

function updateHud() {
  scoreEl.textContent = gameState.score;
  livesEl.textContent = gameState.lives;
  waveEl.textContent = gameState.wave;
}

function startGame() {
  resetGame();
  gameState.running = true;
  overlayMode = "playing";
  overlay.classList.add("hidden");
}

function endGame() {
  gameState.running = false;
  overlayMode = "restart";
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "Mission Failed";
  overlayText.textContent = `Final score: ${gameState.score}. Press the button below or hit Enter to launch again.`;
  startButton.textContent = "Restart Mission";
}

function beatWave() {
  gameState.wave += 1;
  gameState.enemySpeed += 0.25;
  gameState.spawnInterval = Math.max(350, gameState.spawnInterval - 75);
  updateHud();

  overlayMode = "continue";
  overlay.classList.remove("hidden");
  overlayTitle.textContent = `Wave ${gameState.wave}`;
  overlayText.textContent = "Hostile fleet intensifying. Click continue or press Enter when you're ready.";
  startButton.textContent = "Continue";
  gameState.running = false;
}

function handleOverlayAction() {
  if (overlayMode === "continue") {
    gameState.running = true;
    overlayMode = "playing";
    overlay.classList.add("hidden");
    return;
  }

  startGame();
}

function spawnEnemy() {
  const size = Math.random() * 18 + 24;
  gameState.enemies.push({
    x: Math.random() * (canvas.width - size * 2) + size,
    y: -size,
    size,
    speed: gameState.enemySpeed + Math.random() * 0.9,
    wobble: Math.random() * Math.PI * 2,
    hp: 1
  });
}

function createBurst(x, y, color, amount = 12) {
  for (let i = 0; i < amount; i += 1) {
    gameState.particles.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      life: Math.random() * 24 + 20,
      color
    });
  }
}

function shoot() {
  const player = gameState.player;
  if (player.cooldown > 0) {
    return;
  }

  gameState.bullets.push({
    x: player.x,
    y: player.y - player.height / 2,
    width: 4,
    height: 18,
    speed: 8.5
  });
  player.cooldown = 12;
}

function update(delta) {
  const player = gameState.player;

  if (keys.ArrowLeft || keys.a || keys.A) {
    player.x -= player.speed;
  }
  if (keys.ArrowRight || keys.d || keys.D) {
    player.x += player.speed;
  }

  player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));
  player.cooldown = Math.max(0, player.cooldown - 1);

  gameState.spawnTimer += delta;
  if (gameState.spawnTimer >= gameState.spawnInterval) {
    spawnEnemy();
    gameState.spawnTimer = 0;
  }

  for (const star of stars) {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = -4;
      star.x = Math.random() * canvas.width;
    }
  }

  for (let i = gameState.bullets.length - 1; i >= 0; i -= 1) {
    const bullet = gameState.bullets[i];
    bullet.y -= bullet.speed;
    if (bullet.y + bullet.height < 0) {
      gameState.bullets.splice(i, 1);
    }
  }

  for (let i = gameState.enemies.length - 1; i >= 0; i -= 1) {
    const enemy = gameState.enemies[i];
    enemy.y += enemy.speed;
    enemy.x += Math.sin(enemy.wobble) * 1.1;
    enemy.wobble += 0.04;

    if (enemy.y - enemy.size > canvas.height) {
      gameState.enemies.splice(i, 1);
      gameState.lives -= 1;
      updateHud();
      if (gameState.lives <= 0) {
        endGame();
        return;
      }
    }
  }

  for (let i = gameState.particles.length - 1; i >= 0; i -= 1) {
    const particle = gameState.particles[i];
    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.life -= 1;
    if (particle.life <= 0) {
      gameState.particles.splice(i, 1);
    }
  }

  for (let e = gameState.enemies.length - 1; e >= 0; e -= 1) {
    const enemy = gameState.enemies[e];

    const playerHit =
      enemy.x + enemy.size > player.x - player.width / 2 &&
      enemy.x - enemy.size < player.x + player.width / 2 &&
      enemy.y + enemy.size > player.y - player.height / 2 &&
      enemy.y - enemy.size < player.y + player.height / 2;

    if (playerHit) {
      createBurst(enemy.x, enemy.y, "#ff6b6b", 20);
      gameState.enemies.splice(e, 1);
      gameState.lives -= 1;
      updateHud();
      if (gameState.lives <= 0) {
        endGame();
        return;
      }
      continue;
    }

    for (let b = gameState.bullets.length - 1; b >= 0; b -= 1) {
      const bullet = gameState.bullets[b];
      const hit =
        bullet.x < enemy.x + enemy.size &&
        bullet.x + bullet.width > enemy.x - enemy.size &&
        bullet.y < enemy.y + enemy.size &&
        bullet.y + bullet.height > enemy.y - enemy.size;

      if (hit) {
        gameState.bullets.splice(b, 1);
        gameState.enemies.splice(e, 1);
        createBurst(enemy.x, enemy.y, "#6ef2ff");
        gameState.score += 100;
        updateHud();

        if (gameState.score > 0 && gameState.score % 1000 === 0) {
          beatWave();
          return;
        }
        break;
      }
    }
  }
}

function drawPlayer() {
  const player = gameState.player;
  const left = player.x - player.width / 2;
  const top = player.y - player.height / 2;

  ctx.save();
  ctx.translate(left, top);

  ctx.fillStyle = "#6ef2ff";
  ctx.beginPath();
  ctx.moveTo(player.width / 2, 0);
  ctx.lineTo(player.width, player.height);
  ctx.lineTo(player.width / 2, player.height - 14);
  ctx.lineTo(0, player.height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.moveTo(player.width / 2, 11);
  ctx.lineTo(player.width / 2 + 5, 28);
  ctx.lineTo(player.width / 2 - 5, 28);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ff7b54";
  ctx.fillRect(player.width / 2 - 4, player.height - 3, 8, 10);

  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillRect(star.x, star.y, star.size, star.size);
  }

  for (const bullet of gameState.bullets) {
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }

  for (const enemy of gameState.enemies) {
    const gradient = ctx.createRadialGradient(enemy.x, enemy.y, 4, enemy.x, enemy.y, enemy.size);
    gradient.addColorStop(0, "#ffdc73");
    gradient.addColorStop(1, "#ff5d73");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const particle of gameState.particles) {
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = Math.max(0, particle.life / 30);
    ctx.fillRect(particle.x, particle.y, 3, 3);
    ctx.globalAlpha = 1;
  }

  drawPlayer();
}

function gameLoop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  if (gameState.running) {
    update(delta);
  }
  draw();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;

  if (event.key === " " || event.code === "Space") {
    event.preventDefault();
    if (gameState.running) {
      shoot();
    }
  }

  if (event.key === "Enter" && !gameState.running) {
    handleOverlayAction();
  }
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

startButton.addEventListener("click", handleOverlayAction);

resetGame();
draw();
requestAnimationFrame(gameLoop);
