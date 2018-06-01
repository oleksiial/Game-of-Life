export default class GameLogic {
  constructor(callback) {
    this.size = 30;
    this.grid = this.createGrid(this.size, this.size, true);
    this.delay = 100;
    this.callback = callback;
  }

  createGrid = (width, height, fillRandom) => {
    var result = [];
    for (var i = 0 ; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
          if (fillRandom) {
            result[i][j] = (Math.random() * 2 | 0) === 1 ? true: false
          } else {
            result[i][j] = false;
          }
        }
    }
    return result;
  }

  startTicker = () => {
    if (this.ticker === undefined) {
      this.ticker = setInterval(this.tick, this.delay);
    }
  }

  stopTicker = () => {
    clearInterval(this.ticker);
    this.ticker = undefined;
  }

  setSpeed = (speedRate) => {
    this.stopTicker();
    this.delay = 1000 / speedRate;
    this.startTicker();
  }

  resetGrid = () => {
    this.stopTicker();
    this.grid = this.createGrid(this.size, this.size, false);
    this.callback();
  }

  randomize = () => {
    this.stopTicker();
    this.grid = this.createGrid(this.size, this.size, true);
    this.callback();
  }

  swapCell = (i, j) => {
    this.grid[i][j] = !this.grid[i][j];
    this.callback();
  }

  countNeightbours = (i, j) => {
    let count = 0;
    const directions = [[-1, -1],[-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let d of directions) {
      if(this.grid[i+d[0]][j+d[1]] === true) {
        count++;
      }
    }
    return count;
  }

  tick = () => {
    let newGrid = this.createGrid(this.size, this.size, false);
    for (var i = 1; i < this.size - 1; i++) {
      for (var j = 1; j < this.size - 1; j++) {
        const count = this.countNeightbours(i, j);
        newGrid[i][j] = false;
        if (this.grid[i][j] === true && (count === 2 || count === 3)) {
            newGrid[i][j] = true;
        }
        if (this.grid[i][j] === false && count === 3) {
          newGrid[i][j] = true;
        }
      }
    }
    this.grid = newGrid;
    this.callback();
  }
}
