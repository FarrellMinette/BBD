const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const ballRadius = 20;
let originX = canvas.width / 2;
let originY = canvas.height / 2;
let ballX = originX;
let ballY = originY;
let dx = 0;
let dy = 0;

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function updateBallPosition() {
    let ballXCoordinate = ballX - originX;
    let ballYCoordinate = ballY - originY;
    let addXRadius = ballRadius;
    let addYRadius = ballRadius;
    let addXAdjustment;
    let addYAdjustment

    if (ballXCoordinate > 0) {
        addXRadius = ballRadius;
        addXAdjustment = -5;;
    } else {
        addXRadius = -ballRadius;
        addXAdjustment = 5;
    }

    if (ballYCoordinate > 0) {
        addYRadius = ballRadius;
        addYAdjustment = -5;
    } else {
        addYRadius = -ballRadius;
        addYAdjustment = 5;
    }

  if ((Math.sqrt(Math.pow(ballXCoordinate + dx + addXRadius + addXAdjustment, 2) + Math.pow(ballYCoordinate + dy + addYRadius + addYAdjustment, 2)) > (canvas.width / 2))) {
    dx = 0;
    dy = 0;
  }
  ballX += dx;
  ballY += dy;
//   console.log(ballX)
//   console.log(ballY)
//   console.log()
//   console.log()
//   console.log(dx)
//   console.log(dy)
}

function handleOrientation(event) {
  let tiltY = -event.gamma; // left-to-right tilt in degrees [-90, 90]
  let tiltX = event.beta; // front-to-back tilt in degrees [-180, 180
  dx = tiltX / 10; // adjust speed
  dy = tiltY / 10; // adjust speed
}

function gameLoop() {
  updateBallPosition();
  drawBall();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("deviceorientation", handleOrientation)
gameLoop();