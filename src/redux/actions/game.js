export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const TICK = 'TICK';
export const CHANGE_SIZE = 'CHANGE_SIZE';
export const CHANGE_SPEED = 'CHANGE_SPEED';
export const TOGGLE_BOUNDS = 'TOGGLE_BOUNDS';

export function startGame () {
  return (dispatch, getState) => {
    dispatch({type: START_GAME});
    let a = 0;
    setInterval(() => {
      console.log('tick', a++);
    }, 1000 / getState().game.speedRate);
  }
}
