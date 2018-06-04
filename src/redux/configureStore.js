import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/index';

export default function (initialState = {}) {
    const store = createStore(reducer, initialState, composeWithDevTools());

    return store;
}
