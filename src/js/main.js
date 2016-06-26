'use strict';

import {createStore, combineReducers} from 'redux';
import draw from './draw/draw';
import reducer from './reducer/reducer';
import middleware from './middleware/middleware';

const mapEventsToActions = (dispatch) => {
    window.addEventListener('keydown', function (e) {
        dispatch({type: 'KEY_DOWN', payload: e})
    });
    window.addEventListener('keyup', function (e) {
        dispatch({type: 'KEY_UP', payload: e})
    });
};
const step = (canvas, store) => {
    draw(canvas, store.getState());
    store.dispatch({type: 'STEP'});
    window.requestAnimationFrame(step.bind(null, canvas, store));
};

const main = () => {
    const canvas = document.getElementById('main');
    let store = createStore(reducer, middleware);

    mapEventsToActions(store.dispatch);
    step(canvas, store);
};

main();
