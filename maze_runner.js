const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let current;

class Maze {
    constructor(width, height, rows, columns) {
      this.width = width;
      this.height = height;
      this.rows = rows;
      this.cols = columns;
      this.grid = [];
      this.stack = [];
    }
  
    setup() {
      for (let r = 0; r < this.rows; r++) {
        let row = [];
        for (let c = 0; c < this.cols; c++) {
          let cell = new Cell(
            this.width,
            this.height,
            this.grid,
            this.rows,
            this.cols,
            r,
            c
          );
          row.push(cell);
        }
        this.grid.push(row);
      }
      current = this.grid[0][0];
    }
  
    generateMaze() {
      current.visited = true;
  
      while (true) {
        let next = current.getRandNeighbour();
        if (next) {
          next.visited = true;
          this.stack.push(current);
          current.removeWalls(current, next);
          current = next;
        } else if (this.stack.length > 0) {
          current = this.stack.pop();
        } else {
          break;
        }
      }
    }
  
    draw() {
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.style.background = "black";
  
      this.grid.forEach((row) => {
        row.forEach((cell) => {
          cell.show();
        });
      });
    }
  }
  
class Cell {
  constructor(
      parentWidth,
      parentHeight,
      parentGrid,
      rows,
      cols,
      rowNum,
      colNum
  ) {
      this.parentWidth = parentWidth;
      this.parentHeight = parentHeight;
      this.parentGrid = parentGrid;
      this.rows = rows;
      this.cols = cols;
      this.rowNum = rowNum;
      this.colNum = colNum;
      this.width = parentWidth / cols;
      this.height = parentHeight / rows;
      this.walls = {
      topWall: true,
      bottomWall: true,
      leftWall: true,
      rightWall: true,
      };
      this.visited = false;
      this.neighbours = [];
  }

  setNeighbours() {
      this.neighbours = [];
      let x = this.colNum;
      let y = this.rowNum;
      let left = this.colNum !== 0 ? this.parentGrid[y][x - 1] : undefined;
      let right =
      this.colNum !== this.cols - 1 ? this.parentGrid[y][x + 1] : undefined;
      let top = this.rowNum !== 0 ? this.parentGrid[y - 1][x] : undefined;
      let bottom =
      this.rowNum !== this.rows - 1 ? this.parentGrid[y + 1][x] : undefined;

      if (left && !left.visited) this.neighbours.push(left);
      if (right && !right.visited) this.neighbours.push(right);
      if (top && !top.visited) this.neighbours.push(top);
      if (bottom && !bottom.visited) this.neighbours.push(bottom);
  }

  getRandNeighbour() {
      this.setNeighbours();
      if (this.neighbours.length == 0) return undefined;
      let rand = Math.floor(Math.random() * this.neighbours.length);
      return this.neighbours[rand];
  }

  drawLine(fromX, fromY, toX, toY) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
  }

  removeWalls(cell1, cell2) {
      let XDiff = cell2.colNum - cell1.colNum;
      if (XDiff == 1) {
        cell1.walls.rightWall = false;
        cell2.walls.leftWall = false;
      } else if (XDiff == -1) {
        cell2.walls.rightWall = false;
        cell1.walls.leftWall = false;
      }
      let YDiff = cell2.rowNum - cell1.rowNum;
      if (YDiff == 1) {
        cell1.walls.bottomWall = false;
        cell2.walls.topWall = false;
      } else if (YDiff == -1) {
        cell2.walls.bottomWall = false;
        cell1.walls.topWall = false;
      }
  }

  drawWalls() {
      let fromX = 0;
      let fromY = 0;
      let toX = 0;
      let toY = 0;
      if (this.walls.topWall) {
        fromX = this.colNum * this.width;
        fromY = this.rowNum * this.height;
        toX = fromX + this.width;
        toY = fromY;
        this.drawLine(fromX, fromY, toX, toY);
      }
      if (this.walls.bottomWall) {
        fromX = this.colNum * this.width;
        fromY = this.rowNum * this.height + this.height;
        toX = fromX + this.width;
        toY = fromY;
        this.drawLine(fromX, fromY, toX, toY);
      }
      if (this.walls.leftWall) {
        fromX = this.colNum * this.width;
        fromY = this.rowNum * this.height;
        toX = fromX;
        toY = fromY + this.height;
        this.drawLine(fromX, fromY, toX, toY);
      }
      if (this.walls.rightWall) {
        fromX = this.colNum * this.width + this.width;
        fromY = this.rowNum * this.height;
        toX = fromX;
        toY = fromY + this.height;
        this.drawLine(fromX, fromY, toX, toY);
      }
  }

  show() {
      this.drawWalls();
      ctx.fillStyle = this.visited ? "black" : "white";
      ctx.fillRect(
        this.colNum * this.width + 1,
        this.rowNum * this.height + 1,
        this.width - 2,
        this.height - 2
      );
  }
}
  
class Ball {
  constructor(ballElement, dx, dy) {
    this.ballElement = ballElement
    this.dx = dx;
    this.dy = dy;
    this.x = ballElement.style.left
    this.y = ballElement.style.top
    // this.x = this.ballElement.style.left
    // this.y = this.ballElement.style.top
  }

  update() {

    // this.ballElement.scroll({top: 100,
    //   left: 100,
    //   behavior: "smooth",});
    this.x = 100;
    this.y = 100;

    console.log(this.x, this.y)

    // this.ballElement.style.left = this.x;
    // this.ballElement.style.top = this.y;

    // if ((rightPressed==true)) this.x = this.x + this.dx
    // else if (leftPressed==true) this.x = this.x - this.dx
    // else if (upPressed==true) this.y = this.y - this.dy
    // else if (downPressed==true) this.y = this.y + this.dy

    // if (this.x + this.dx > canvas.width - ballRadius)  this.x = canvas.width - ballRadius;
    // else if (this.x + this.dx < ballRadius) this.x = ballRadius;

    // if (this.y + this.dy > canvas.height - ballRadius) this.y = canvas.height - ballRadius;
    // else if (this.y + this.dy < ballRadius) this.y = ballRadius;
  }
}

function draw() {
    maze.draw();
    ball.update();
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

// Set dimensions to fit a mobile phone screen (16:9 ratio)
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let mazeWidth = screenWidth-5;
let mazeHeight = screenHeight-5;

// Set number of rows and columns
let rows = 16; // This can be adjusted based on desired cell size
let cols = 32; // This can be adjusted based on desired cell size

let maze = new Maze(mazeWidth, mazeHeight, rows, cols);
maze.setup();
maze.generateMaze();

// const ballRadius = 7.5;
// let ball = new Ball(mazeWidth/2-2*ballRadius, mazeHeight/2-2*ballRadius, maze.width/cols, maze.height/rows);
let ballElement = document.getElementById("ball");
// ballElement.scroll(0, 1000)
// ballElement.style.top = 100;
// let x = parseInt(ballElement.offsetLeft);
// let y = parseInt(ballElement.offsetTop);
let ball = new Ball(ballElement, 2, 2);

// let ballX = 0
// let ballY = mazeHeight / 2 - ball.y / 2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 100);
