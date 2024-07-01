const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = 2;
const ballRadius = 10;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  if (x + dx > canvas.width - ballRadius)  x = canvas.width - ballRadius
  else if (x + dx < ballRadius) x = ballRadius
  else if (y + dy > canvas.height - ballRadius) y = canvas.height - ballRadius
  else if (y + dy < ballRadius) y = ballRadius

  if (rightPressed==true) x = x + dx
  else if (leftPressed==true) x = x - dx
  else if (upPressed==true) y = y - dy
  else if (downPressed==true) y = y + dy

}

function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "Up" || event.key === "ArrowUp") {
    upPressed = true; 
  } else if (event.key === "Down" || event.key === "ArrowDown") {
    downPressed = true; 
  } 
}

function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "Up" || event.key === "ArrowUp") {
    upPressed = false; 
  } else if (event.key === "Down" || event.key === "ArrowDown") {
    downPressed = false; 
  } 
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);