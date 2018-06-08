import { START_GAME, STOP_GAME, TICK,
  TOGGLE_CELL, CHANGE_SPEED, TOGGLE_BORDERS, RESET, CHANGE_WIDTH, CHANGE_HEIGHT,
  ADD_PATTERN, CHANGE_CELL_SIZE } from '../actions/game';
import { createGrid } from '../actions/game';

const initialState = {
  width: 40,
  height: 20,
  cellSize: 20,
  grid: createGrid(40, 20, true),
  prevGrid: [[]],
  borders: true,
  isRunning: false,
  speedRate: 50,
  nGenerations: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
  case START_GAME:
    return {...state, isRunning: true};
  case STOP_GAME:
    return {...state, isRunning: false};
  case TICK:
    return {...state, prevGrid: state.grid, grid: action.grid, nGenerations: state.nGenerations + 1};
  case TOGGLE_BORDERS:
    return {...state, borders: !state.borders};
  case RESET:
    return {...state, grid: action.grid, nGenerations: 0};
  case CHANGE_SPEED:
    return {...state, speedRate: action.speedRate};
  case CHANGE_WIDTH:
    return {...state, width: action.width};
  case CHANGE_HEIGHT:
    return {...state, height: action.height};
  case CHANGE_CELL_SIZE:
    return {...state, cellSize: action.cellSize};
  case TOGGLE_CELL:
    return {
      ...state, grid: state.grid.map(
        (sub, i) => {
          return sub.map((v, j) => {
            return (i===action.i&&j===action.j) ? !v: v
          });
        }
      )
    };
  case ADD_PATTERN:
    return {
      ...state, grid: state.grid.map(
        (sub, i) => {
          return sub.map((v, j) => {
            if (i >= action.i && i < action.i + action.pattern.length &&
              j >= action.j && j < action.j + action.pattern[0].length) {
              return action.pattern[i - action.i][j - action.j];
            }
            return v;
          });
        }
      )
    };
  default:
    return state;
  }
}
