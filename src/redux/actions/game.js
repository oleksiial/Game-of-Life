export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const TICK = 'TICK';
export const CHANGE_WIDTH = 'CHANGE_WIDTH';
export const CHANGE_HEIGHT = 'CHANGE_HEIGHT';
export const CHANGE_SPEED = 'CHANGE_SPEED';
export const TOGGLE_BORDERS = 'TOGGLE_BORDERS';
export const TOGGLE_CELL = 'TOGGLE_CELL';
export const RESET = 'RESET';
export const ADD_PATTERN = 'ADD_PATTERN';
export const CHANGE_CELL_SIZE = 'CHANGE_CELL_SIZE';

export function startGame () {
  return (dispatch, getState) => {
    dispatch({type: START_GAME});
    setInterval(() => {
      const { grid, width, height, borders, prevGrid } = getState().game;
      const newGrid = tick(grid, width, height, borders);
      if (arraysEqual(newGrid, prevGrid)) {
        console.log(newGrid, prevGrid);
        dispatch(stopGame());
      }
      dispatch({type: TICK, grid: newGrid});
    }, 1000 / getState().game.speedRate);
  }
}

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    for (let j = 0; j < a[0].length; ++j) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}

export function stopGame () {
  for (let i = 0; i < 9999; i++) {
    clearInterval(i);
  }

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

export function changeWidth (width) {
  return (dispatch, getState) => {
    if (getState().game.isRunning) {
      dispatch({type: STOP_GAME});
    }
    dispatch({type: CHANGE_WIDTH, width: width});
    dispatch(reset(false));
  }
}

export function changeHeight (height) {
  return (dispatch, getState) => {
    if (getState().game.isRunning) {
      dispatch({type: STOP_GAME});
    }
    dispatch({type: CHANGE_HEIGHT, height: height});
    dispatch(reset(false));
  }
}

export function changeCellSize (size) {
  return {type: CHANGE_CELL_SIZE, cellSize: size};
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
    type: TOGGLE_BORDERS
  };
}

export function changeSpeed (value) {
  return (dispatch, getState) => {
    dispatch({type: CHANGE_SPEED, speedRate: value});
    if (getState().game.isRunning) {
      dispatch(stopGame());
      dispatch(startGame());
    }
  }
}

export function addPattern (pattern, i, j) {
  return {type:ADD_PATTERN, pattern: pattern, i: i, j: j};
}

export function createGrid (width, height, fillRandom) {
  var result = [];
  for (var i = 0; i < height; i++) {
    result[i] = [];
    for (var j = 0; j < width; j++) {
      if (fillRandom) {
        result[i][j] = ((Math.random() * 4) | 0) === 1 ? true : false;
      } else {
        result[i][j] = false;
      }
    }
  }
  return result;
}

const countNeightbours = (grid, i, j, width, height, borders) => {
  const midD = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let leftD, rightD, leftTopD, rightTopD;
  let topD, bottomD, leftBottomD, rightBottomD;
  if (borders) {
    leftD = [[-1, 0], [-1, 1], [0, 1], [1, 0], [1, 1]];
    rightD = [[-1, -1], [-1, 0], [0, -1], [1, -1], [1, 0]];
    leftTopD = [[0, 1], [1, 0], [1, 1]];
    rightTopD = [[0, -1], [1, -1], [1, 0]];
    topD = [[0, -1], [1, -1], [1, 0], [0, 1], [1, 1]];
    bottomD = [[-1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
    leftBottomD = [[-1, 0], [-1, 1], [0, 1]];
    rightBottomD = [[-1, -1], [-1, 0], [0, -1]];
  } else {
    leftD = [[-1, width - 1], [-1, 0], [-1, 1], [0, width - 1], [0, 1], [1, width - 1], [1, 0], [1, 1]];
    rightD = [[-1, -1], [-1, 0], [-1, 1 - width], [0, -1], [0, 1 - width], [1, -1], [1, 0], [1, 1 - width]];
    leftTopD = [[height - 1, width - 1], [height - 1, 0], [height - 1, 1], [0, width - 1], [0, 1], [1, width - 1], [1, 0], [1, 1]];
    rightTopD = [[height - 1, -1], [height - 1, 0], [height - 1, 1 - width], [0, -1], [0, 1 - width], [1, -1], [1, 0], [1, 1 - width]];
    topD = [[height - 1, -1], [0, -1], [1, -1], [height - 1, 0], [1, 0], [height - 1, 1], [0, 1], [1, 1]];
    bottomD = [[-1, -1], [0, -1], [1 - height, -1], [-1, 0], [1 - height, 0], [-1, 1], [0, 1], [1 - height, 1]];
    leftBottomD = [[-1, width - 1], [-1, 0], [-1, 1], [0, width - 1], [0, 1], [1 - height, width - 1], [1 - height, 0], [1 - height, 1]];
    rightBottomD = [[-1, -1], [-1, 0], [-1, 1 - width], [0, -1], [0, 1 - width], [1 - height, -1], [1 - height, 0], [1 - height, 1 - width]];
  }

  let count = 0;
  if (i === 0 && j === 0) {
    count = doCountNeightbours(grid, i, j, leftTopD);
  } else if (i === 0 && j === width - 1) {
    count = doCountNeightbours(grid, i, j, rightTopD);
  } else if (i === height - 1 && j === 0) {
    count = doCountNeightbours(grid, i, j, leftBottomD);
  } else if (i === height - 1 && j === width - 1) {
    count = doCountNeightbours(grid, i, j, rightBottomD);
  } else if (j === 0) {
    count = doCountNeightbours(grid, i, j, leftD);
  } else if (j === width - 1) {
    count = doCountNeightbours(grid, i, j, rightD);
  } else if (i === 0) {
    count = doCountNeightbours(grid, i, j, topD);
  } else if (i === height - 1) {
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

const tick = (grid, width, height, borders) => {
  let newGrid = createGrid(width, height, false);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const count = countNeightbours(grid, i, j, width, height, borders);
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
