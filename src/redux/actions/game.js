import * as dirs from './directions';
import 'seedrandom';

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
export const SET_SEED = 'SET_SEED';
export const SET_USE_SEED = 'SET_USE_SEED';

export function startGame () {
  return (dispatch, getState) => {
    dispatch({type: START_GAME});
    setInterval(() => {
      const { grid, width, height, borders, prevGrid } = getState().game;
      const newGrid = tick(grid, width, height, borders);
      if (arraysEqual(newGrid, prevGrid)) {
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

export function setSeed (seed) {
  return {type: SET_SEED, seed: seed};
}

export function setUseSeed () {
  return {type: SET_USE_SEED};
}

export function reset (randomize) {
  return (dispatch, getState) => {
    let {isRunning, width, height, seed, useSeed} = getState().game;
    if (isRunning) {
      dispatch({type: STOP_GAME});
    }
    if (!useSeed) {
      Math.seedrandom();
      seed = Math.random() * 10000 | 0;
      dispatch(setSeed(seed.toString()));
      Math.seedrandom(seed);
    }
    dispatch({type: RESET, grid: createGrid(width, height, randomize, seed)});
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

export function createGrid (width, height, fillRandom, seed) {
  Math.seedrandom(seed);
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

  let count = 0;
  if (i === 0 && j === 0) {
    count = doCountNeightbours(grid, i, j, dirs.leftTopD(width, height, borders));
  } else if (i === 0 && j === width - 1) {
    count = doCountNeightbours(grid, i, j, dirs.rightTopD(width, height, borders));
  } else if (i === height - 1 && j === 0) {
    count = doCountNeightbours(grid, i, j, dirs.leftBottomD(width, height, borders));
  } else if (i === height - 1 && j === width - 1) {
    count = doCountNeightbours(grid, i, j, dirs.rightBottomD(width, height, borders));
  } else if (j === 0) {
    count = doCountNeightbours(grid, i, j, dirs.leftD(width, height, borders));
  } else if (j === width - 1) {
    count = doCountNeightbours(grid, i, j, dirs.rightD(width, height, borders));
  } else if (i === 0) {
    count = doCountNeightbours(grid, i, j, dirs.topD(width, height, borders));
  } else if (i === height - 1) {
    count = doCountNeightbours(grid, i, j, dirs.bottomD(width, height, borders));
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
  let newGrid = createGrid(width, height, false, null);
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
