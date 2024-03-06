<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Obstacle Course Game</title>
<style>
    canvas {
        border: 1px solid black;
        display: block;
        margin: 0 auto;
    }
</style>
</head>
<body>
<canvas id="gameCanvas" width="800" height="400"></canvas>

<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5
};

const obstacles = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    obstacles.forEach((obstacle) => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function update() {
    // Move player
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < canvas.height - player.height) {
        player.y += player.speed;
    }

    // Move obstacles
    obstacles.forEach((obstacle) => {
        obstacle.x -= obstacle.speed;
        
        // Remove obstacle if it goes offscreen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.shift();
        }
        
        // Check collision
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            alert('Game Over! You hit an obstacle.');
            location.reload(); // Restart the game
        }
    });

    // Generate new obstacle
    if (Math.random() < 0.02) {
        obstacles.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 20),
            width: 20,
            height: 20,
            color: 'red',
            speed: 3
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

gameLoop();
</script>
</body>
</html>
