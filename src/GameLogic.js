export default class GameLogic {
  constructor() {
    this.size = 30;
    this.grid = this.createGrid(this.size, this.size, true);
    this.prevGrid = [];
    this.bounds = true;
    this.isRunning = false;
    this.speedRate = 50;
  }

    setCallbackOnChangeState = callback => {
      this.callback = callback;
    };

    createGrid = (width, height, fillRandom) => {
      var result = [];
      for (var i = 0; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
          if (fillRandom) {
            result[i][j] = ((Math.random() * 4) | 0) === 1 ? true : false;
          } else {
            result[i][j] = false;
          }
        }
      }
      return result;
    };

    startTicker = () => {
      if (!this.isRunning) {
        this.ticker = setInterval(this.tick, 10000 / this.speedRate);
        this.isRunning = true;
        this.callback();
      }
    };

    stopTicker = () => {
      clearInterval(this.ticker);
      this.isRunning = false;
      this.callback();
    };

    setSpeed = speedRate => {
      this.speedRate = speedRate;
      if (this.isRunning) {
        this.stopTicker();
        this.startTicker();
      }
      this.callback();
    };

    resetGrid = () => {
      this.stopTicker();
      this.grid = this.createGrid(this.size, this.size, false);
      this.callback();
    };

    randomize = () => {
      this.stopTicker();
      this.grid = this.createGrid(this.size, this.size, true);
      this.callback();
    };

    swapCell = (i, j) => {
      this.grid[i][j] = !this.grid[i][j];
      this.callback();
    };

    toggleBounds = () => {
      this.bounds = !this.bounds;
      this.callback();
    };

    countNeightbours = (i, j) => {
      const midD = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      let leftD, rightD, leftTopD, rightTopD;
      let topD, bottomD, leftBottomD, rightBottomD;
      if (this.bounds) {
        leftD = [[-1, 0], [-1, 1], [0, 1], [1, 0], [1, 1]];
        rightD = [[-1, -1], [-1, 0], [0, -1], [1, -1], [1, 0]];
        leftTopD = [[0, 1], [1, 0], [1, 1]];
        rightTopD = [[0, -1], [1, -1], [1, 0]];
        topD = [[0, -1], [1, -1], [1, 0], [0, 1], [1, 1]];
        bottomD = [[-1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
        leftBottomD = [[-1, 0], [-1, 1], [0, 1]];
        rightBottomD = [[-1, -1], [-1, 0], [0, -1]];
      } else {
        leftD = [[-1, this.size - 1], [-1, 0], [-1, 1], [0, this.size - 1], [0, 1], [1, this.size - 1], [1, 0], [1, 1]];
        rightD = [[-1, -1], [-1, 0], [-1, 1 - this.size], [0, -1], [0, 1 - this.size], [1, -1], [1, 0], [1, 1 - this.size]];
        leftTopD = [[this.size - 1, this.size - 1], [this.size - 1, 0], [this.size - 1, 1], [0, this.size - 1], [0, 1], [1, this.size - 1], [1, 0], [1, 1]];
        rightTopD = [[this.size - 1, -1], [this.size - 1, 0], [this.size - 1, 1 - this.size], [0, -1], [0, 1 - this.size], [1, -1], [1, 0], [1, 1 - this.size]];
        topD = [[this.size - 1, -1], [0, -1], [1, -1], [this.size - 1, 0], [1, 0], [this.size - 1, 1], [0, 1], [1, 1]];
        bottomD = [[-1, -1], [0, -1], [1 - this.size, -1], [-1, 0], [1 - this.size, 0], [-1, 1], [0, 1], [1 - this.size, 1]];
        leftBottomD = [[-1, this.size - 1], [-1, 0], [-1, 1], [0, this.size - 1], [0, 1], [1 - this.size, this.size - 1], [1 - this.size, 0], [1 - this.size, 1]];
        rightBottomD = [[-1, -1], [-1, 0], [-1, 1 - this.size], [0, -1], [0, 1 - this.size], [1 - this.size, -1], [1 - this.size, 0], [1 - this.size, 1 - this.size]];
      }

      let count = 0;
      if (i === 0 && j === 0) {
        count = this.doCountNeightbours(i, j, leftTopD);
      } else if (i === 0 && j === this.size - 1) {
        count = this.doCountNeightbours(i, j, rightTopD);
      } else if (i === this.size - 1 && j === 0) {
        count = this.doCountNeightbours(i, j, leftBottomD);
      } else if (i === this.size - 1 && j === this.size - 1) {
        count = this.doCountNeightbours(i, j, rightBottomD);
      } else if (j === 0) {
        count = this.doCountNeightbours(i, j, leftD);
      } else if (j === this.size - 1) {
        count = this.doCountNeightbours(i, j, rightD);
      } else if (i === 0) {
        count = this.doCountNeightbours(i, j, topD);
      } else if (i === this.size - 1) {
        count = this.doCountNeightbours(i, j, bottomD);
      } else
        count = this.doCountNeightbours(i, j, midD);
      return count;
    };

    doCountNeightbours = (i, j, directions) => {
      let count = 0;
      for (let d of directions) {
        if (this.grid[i + d[0]][j + d[1]] === true) {
          count++;
        }
      }
      return count;
    };

    tick = () => {
      let newGrid = this.createGrid(this.size, this.size, false);
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
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

      if (this.arraysEqual(this.prevGrid, newGrid)) {
        this.stopTicker();
      }

      this.prevGrid = this.grid;
      this.grid = newGrid;
      this.callback();
    };

    arraysEqual = (a, b) => {
      if (a === b) return true;
      if (a === null || b === null) return false;
      if (a.length !== b.length) return false;

      for (let i = 0; i < a.length; ++i) {
        for (let j = 0; j < a.length; ++j) {
          if (a[i][j] !== b[i][j]) return false;
        }
      }
      return true;
    }
}
