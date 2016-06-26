import {combineReducers} from 'redux';

import playerReducer from './playerReducer';
import enemyReducer from './enemyReducer';
import bulletsReducer from './bulletsReducer';
import wallsReducer from './wallsReducer';
import scoreReducer from './scoreReducer';

export default combineReducers({
    player: playerReducer,
    enemy: enemyReducer,
    bullets: bulletsReducer,
    walls: wallsReducer,
    score: scoreReducer
});