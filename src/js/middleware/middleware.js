
import {applyMiddleware} from 'redux';

import wallsMiddleware from './wallsMiddleware';
import bulletsMiddleware from './bulletsMiddleware';
import shootingMiddleware from './shootingMiddleware';
import enemyMiddleware from './enemyMiddleware';

const middleware = applyMiddleware(
    enemyMiddleware,
    shootingMiddleware,
    bulletsMiddleware,
    wallsMiddleware
);

export default middleware;