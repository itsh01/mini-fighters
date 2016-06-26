'use strict';

import {createStore, combineReducers} from 'redux';
import draw from './draw/draw';
import reducer from './reducer/reducer';
import middleware from './middleware/middleware';

const canvas = document.getElementById('main');

let store = createStore(reducer, middleware);

window.addEventListener('keydown', function (e) {
    store.dispatch({type: 'KEY_DOWN', payload: e})
});
window.addEventListener('keyup', function (e) {
    store.dispatch({type: 'KEY_UP', payload: e})
});

const step = () => {
    draw(canvas, store.getState());
    store.dispatch({type: 'STEP'});
    window.requestAnimationFrame(step);
};

step();
