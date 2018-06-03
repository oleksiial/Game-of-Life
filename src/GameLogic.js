export default class GameLogic {
  constructor() {
    this.size = 30;
    this.grid = this.createGrid(this.size, this.size, true);
    this.delay = 70;
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
          result[i][j] = ((Math.random() * 2) | 0) === 1 ? true : false;
        } else {
          result[i][j] = false;
        }
      }
    }
    return result;
  };

  startTicker = () => {
    if (this.ticker === undefined) {
      this.ticker = setInterval(this.tick, this.delay);
    }
  };

  stopTicker = () => {
    clearInterval(this.ticker);
    this.ticker = undefined;
  };

  setSpeed = speedRate => {
    this.stopTicker();
    this.delay = 1000 / speedRate;
    this.startTicker();
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
    console.log(this.grid);
    this.callback();
  };

  countNeightbours = (i, j) => {
    const midD = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const leftD = [[-1, this.size - 1], [-1, 0], [-1, 1], [0, this.size - 1], [0, 1], [1, this.size - 1], [1, 0], [1, 1]];
    const rightD = [[-1, -1], [-1, 0], [-1, 1 - this.size], [0, -1], [0, 1 - this.size], [1, -1], [1, 0], [1, 1 - this.size]];
    const leftTopD = [[this.size - 1, this.size - 1], [this.size - 1, 0], [this.size - 1, 1], [0, this.size - 1], [0, 1], [1, this.size - 1], [1, 0], [1, 1]];
    const rightTopD = [[this.size - 1, -1], [this.size - 1, 0], [this.size - 1, 1 - this.size], [0, -1], [0, 1 - this.size], [1, -1], [1, 0], [1, 1 - this.size]];
    const topD = [[this.size - 1, -1], [0, -1], [1, -1], [this.size - 1, 0], [1, 0], [this.size - 1, 1], [0, 1], [1, 1]];
    const bottomD = [[-1, -1], [0, -1], [1 - this.size, -1], [-1, 0], [1 - this.size, 0], [-1, 1], [0, 1], [1 - this.size, 1]];
    const leftBottomD = [[-1, this.size - 1], [-1, 0], [-1, 1], [0, this.size - 1], [0, 1], [1 - this.size, this.size - 1], [1 - this.size, 0], [1 - this.size, 1]];
    const rightBottomD = [[-1, -1], [-1, 0], [-1, 1 - this.size], [0, -1], [0, 1 - this.size], [1 - this.size, -1], [1 - this.size, 0], [1 - this.size, 1 - this.size]];

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
    this.grid = newGrid;
    this.callback();
  };
}
