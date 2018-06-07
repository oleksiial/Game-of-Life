import { START_GAME, STOP_GAME, TICK,
  TOGGLE_CELL, CHANGE_SPEED, TOGGLE_BOUNDS, RESET, CHANGE_WIDTH, CHANGE_HEIGHT } from '../actions/game';
import { createGrid } from '../actions/game';

const initialState = {
  width: 15,
  height: 25,
  grid: createGrid(15, 25, true),
  bounds: true,
  isRunning: false,
  speedRate: 50
}

export default function (state = initialState, action) {
  switch (action.type) {
  case START_GAME:
    return {...state, isRunning: true};
  case STOP_GAME:
    return {...state, isRunning: false};
  case TICK:
    return {...state, grid: action.grid};
  case TOGGLE_BOUNDS:
    return {...state, bounds: !state.bounds};
  case RESET:
    return {...state, grid: action.grid};
  case CHANGE_SPEED:
    return {...state, speedRate: action.speedRate};
  case CHANGE_WIDTH:
    return {...state, width: action.width};
  case CHANGE_HEIGHT:
    return {...state, height: action.height};
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
  default:
    return state;
  }
}
