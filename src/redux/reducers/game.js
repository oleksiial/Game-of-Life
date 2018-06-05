import { START_GAME } from '../actions/game';

const initialState = {
  width: 30,
  height: 30,
  grid: [[]],
  bounds: true,
  isRunning: false,
  speedRate: 2
}

export default function (state = initialState, action) {
  switch (action.type) {
  case START_GAME:
    return {...state, isRunning: true};
  default:
    return state;
  }
}
