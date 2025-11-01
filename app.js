const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");

const gridSize = 40;
let snake = [{ x: 0, y: 19 }];
let direction = "right";
let food = {};
let score = 0;

for (let i = 0; i < gridSize * gridSize; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.id = `pixel${i + 1}`;
  gameContainer.appendChild(pixel);
}

function placeFood() {
  const randomX = Math.floor(Math.random() * gridSize);
  const randomY = Math.floor(Math.random() * gridSize);
  food = { x: randomX, y: randomY };
  draw();
}

function draw() {
  document.querySelectorAll(".pixel").forEach((p) => {
    p.classList.remove("snakeBodyPixel", "food");
  });

  snake.forEach((part) => {
    const index = part.y * gridSize + part.x + 1;
    const pixel = document.getElementById(`pixel${index}`);
    pixel.classList.add("snakeBodyPixel");
  });

  const foodIndex = food.y * gridSize + food.x + 1;
  document.getElementById(`pixel${foodIndex}`).classList.add("food");
}

function move() {
  const head = { ...snake[0] };

  if (direction === "up") head.y -= 1;
  if (direction === "down") head.y += 1;
  if (direction === "left") head.x -= 1;
  if (direction === "right") head.x += 1;

  if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize) {
    return gameOver();
  }

  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      return gameOver();
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function gameOver() {
  alert(`Game Over! Your score: ${score}`);
  location.reload();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

placeFood();
setInterval(move, 100);
