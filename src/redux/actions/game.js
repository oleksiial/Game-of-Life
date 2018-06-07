export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const TICK = 'TICK';
export const CHANGE_SIZE = 'CHANGE_SIZE';
export const CHANGE_SPEED = 'CHANGE_SPEED';
export const TOGGLE_BOUNDS = 'TOGGLE_BOUNDS';
export const TOGGLE_CELL = 'TOGGLE_CELL';
export const RESET = 'RESET';

export function startGame () {
  return (dispatch, getState) => {
    dispatch({type: START_GAME});
    setInterval(() => {
      console.log(getState().game.bounds);
      const { grid, width, height, bounds } = getState().game;
      dispatch({type: TICK, grid: tick(grid, width, bounds)});
    }, 1000 / getState().game.speedRate);
  }
}

export function stopGame () {
  for (var i = 0; i < 99999; i++)
    clearInterval(i);

  return {type: STOP_GAME};
}

export function reset (randomize) {
  return (dispatch, getState) => {
    if (getState().game.isRunning) {
      dispatch({type: STOP_GAME});
    }
    dispatch({type: RESET, grid: createGrid(getState().game.width, getState().game.height, randomize)});
  }
}

export function toggleCell (i, j) {
  return {
    type: TOGGLE_CELL,
    i: i,
    j: j
  };
}

export function toggleBounds () {
  return {
    type: TOGGLE_BOUNDS
  };
}

export function changeSpeed (value) {
  return (dispatch, getState) => {
    dispatch({type: CHANGE_SPEED, speedRate: value});
    if (getState().game.isRunning) {
      console.log('restart');
      dispatch(stopGame());
      dispatch(startGame());
    }
  }
}

export function createGrid (width, height, fillRandom) {
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
}

const countNeightbours = (grid, i, j, size, bounds) => {
  const midD = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let leftD, rightD, leftTopD, rightTopD;
  let topD, bottomD, leftBottomD, rightBottomD;
  if (bounds) {
    leftD = [[-1, 0], [-1, 1], [0, 1], [1, 0], [1, 1]];
    rightD = [[-1, -1], [-1, 0], [0, -1], [1, -1], [1, 0]];
    leftTopD = [[0, 1], [1, 0], [1, 1]];
    rightTopD = [[0, -1], [1, -1], [1, 0]];
    topD = [[0, -1], [1, -1], [1, 0], [0, 1], [1, 1]];
    bottomD = [[-1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
    leftBottomD = [[-1, 0], [-1, 1], [0, 1]];
    rightBottomD = [[-1, -1], [-1, 0], [0, -1]];
  } else {
    leftD = [[-1, size - 1], [-1, 0], [-1, 1], [0, size - 1], [0, 1], [1, size - 1], [1, 0], [1, 1]];
    rightD = [[-1, -1], [-1, 0], [-1, 1 - size], [0, -1], [0, 1 - size], [1, -1], [1, 0], [1, 1 - size]];
    leftTopD = [[size - 1, size - 1], [size - 1, 0], [size - 1, 1], [0, size - 1], [0, 1], [1, size - 1], [1, 0], [1, 1]];
    rightTopD = [[size - 1, -1], [size - 1, 0], [size - 1, 1 - size], [0, -1], [0, 1 - size], [1, -1], [1, 0], [1, 1 - size]];
    topD = [[size - 1, -1], [0, -1], [1, -1], [size - 1, 0], [1, 0], [size - 1, 1], [0, 1], [1, 1]];
    bottomD = [[-1, -1], [0, -1], [1 - size, -1], [-1, 0], [1 - size, 0], [-1, 1], [0, 1], [1 - size, 1]];
    leftBottomD = [[-1, size - 1], [-1, 0], [-1, 1], [0, size - 1], [0, 1], [1 - size, size - 1], [1 - size, 0], [1 - size, 1]];
    rightBottomD = [[-1, -1], [-1, 0], [-1, 1 - size], [0, -1], [0, 1 - size], [1 - size, -1], [1 - size, 0], [1 - size, 1 - size]];
  }

  let count = 0;
  if (i === 0 && j === 0) {
    count = doCountNeightbours(grid, i, j, leftTopD);
  } else if (i === 0 && j === size - 1) {
    count = doCountNeightbours(grid, i, j, rightTopD);
  } else if (i === size - 1 && j === 0) {
    count = doCountNeightbours(grid, i, j, leftBottomD);
  } else if (i === size - 1 && j === size - 1) {
    count = doCountNeightbours(grid, i, j, rightBottomD);
  } else if (j === 0) {
    count = doCountNeightbours(grid, i, j, leftD);
  } else if (j === size - 1) {
    count = doCountNeightbours(grid, i, j, rightD);
  } else if (i === 0) {
    count = doCountNeightbours(grid, i, j, topD);
  } else if (i === size - 1) {
    count = doCountNeightbours(grid, i, j, bottomD);
  } else
    count = doCountNeightbours(grid, i, j, midD);
  return count;
};

const doCountNeightbours = (grid, i, j, directions) => {
  let count = 0;
  for (let d of directions) {
    if (grid[i + d[0]][j + d[1]] === true) {
      count++;
    }
  }
  return count;
};

const tick = (grid, size, bounds) => {
  let newGrid = createGrid(size, size, false);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const count = countNeightbours(grid, i, j, size, bounds);
      newGrid[i][j] = false;
      if (grid[i][j] === true && (count === 2 || count === 3)) {
        newGrid[i][j] = true;
      }
      if (grid[i][j] === false && count === 3) {
        newGrid[i][j] = true;
      }
    }
  }
  return newGrid;
};
