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
      this.cellCenters = [];
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
          const centerX = cell.colNum * cell.width + cell.width / 2;
          const centerY = cell.rowNum * cell.height + cell.height / 2;
          this.cellCenters.push({ball: false, x: centerX, y: centerY });
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
      ctx.lineWidth = 7.5;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      // ctx.endPath();
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
  constructor(ballElement, dx, dy, ax, ay, ballRadius) {
    this.ballElement = ballElement
    this.dx = dx;
    this.dy = dy;
    this.ax = ax;
    this.ay = ay;
    this.x = ballElement.offsetLeft
    this.y = ballElement.offsetTop
    this.ballRadius = ballRadius
    // this.x = 515
    // this.y = 515
    // this.ballRadius = 20
  }

  update() {
    this.ballElement.style.left = this.x + "px";
    this.ballElement.style.top = this.y + "px";

    const cell = getClosestCell(this.x, this.y, maze.cellCenters)
    console.log(cell)

    // if (rightPressed==true || leftPressed==true || upPressed==true || downPressed == true) {
    //   let num = 5
    //   let colors = ctx.getImageData(this.x, this.y, num, num).data

    //   let col_sum = 0 
    //   for (let i=0; i<num**2; i++) {
    //     col_sum += colors[0+i*4]+colors[1+i*4]+colors[2+4*i];
    //   }
    //   console.log(colors, col_sum)

    //   if (col_sum < 500) {
    //     if ((rightPressed===true)) {
    //       console.log(this.x, this.x + 0.5*this.ballRadius)
    //       colors = ctx.getImageData(this.x + 0.5*this.ballRadius, this.y, 1, 1).data
    //       if (colors[0]+colors[1]+colors[2]<500) this.x = this.x + this.dx 
    //     }
    //     else if (leftPressed===true) {
    //       colors = ctx.getImageData(this.x - 0.5*this.ballRadius, this.y, 1, 1).data
    //       if (colors[0]+colors[1]+colors[2]<500) this.x = this.x - this.dx
    //     }
    //     else if (upPressed===true) {
    //       colors = ctx.getImageData(this.x, this.y - 0.5*this.ballRadius, 1, 1).data
    //       if (colors[0]+colors[1]+colors[2]<500) this.y = this.y - this.dy 
    //     }
    //     else if (downPressed===true){
    //       colors = ctx.getImageData(this.x, this.y + 0.5*this.ballRadius, 1, 1).data
    //       if (colors[0]+colors[1]+colors[2]<500) this.y = this.y + this.dy
    //     }
    //   }
    //   else { 
        if ((rightPressed===true)) {
          this.x = this.x + this.dx 
          console.log("right")
        }
        else if (leftPressed===true) {
          this.x = this.x - this.dx
          console.log("left")
        }
        else if (upPressed===true) {
          this.y = this.y - this.dy 
          console.log("up")
        }
        else if (downPressed===true){
          this.y = this.y + this.dy
          console.log("down")
        }

    //   }
    // }
  }
}

function getClosestCell(ballX, ballY, cellCenter) {
  let closestCell = null;
  let minDistance = Infinity; 
  let cellNum = 0

  for (let i = 0; i < cellCenter.length; i++) {
    const cell = cellCenter[i];
    console.log(cellCenter[i].x, ballX)
    const distance = Math.sqrt(Math.pow(ballX - cellCenter[i].x, 2) + Math.pow(ballY - cellCenter[i].y, 2));

    if (distance < minDistance) {
      minDistance = distance;
      closestCell = cell;
      cellNum = i
    }
  }
  return {closestCell, cellNum}
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

let screenWidth = window.screen.height;
let screenHeight = window.screen.width;
let mazeWidth = 0.6*screenWidth;
let mazeHeight = 0.6*screenHeight;

let rows = 11; 
let cols = 11; 

let maze = new Maze(mazeWidth, mazeWidth, rows, cols);
maze.setup();
maze.generateMaze();
console.log(maze.cellCenters, maze.cellCenters[0].y)

let ballRadius = 0.5*(mazeWidth/rows)
let ballElement = document.getElementById("ball");
ballElement.style.height = ballRadius+"px"
ballElement.style.width = ballRadius+"px"
let ball = new Ball(ballElement, 2, 2, 0, 0, ballRadius);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 50);