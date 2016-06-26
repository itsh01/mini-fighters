import _ from 'lodash';
import {applyMiddleware} from 'redux';
import util from '../util/util';

const {KEYS} = util.CONST;
const KEYS_AS_ARRAY = _.keys(KEYS);

let {
    isHit,
    positionAsRect,
    getBulletStartingPoint,
    getEntityNextMove
    } = util.math;


const shootIfPossible = (entity, dispatch, prefix = '') => {
    if (!entity.shootingDelay) {
        dispatch({type: prefix + 'UPDATE_SHOOTING_DELAY', payload: 10});
        dispatch({
            type: 'CREATE_BULLET', payload: {
                dir: entity.dir,
                pos: getBulletStartingPoint(entity)
            }
        });
    } else {
        dispatch({type: prefix + 'UPDATE_SHOOTING_DELAY', payload: entity.shootingDelay - 1});
    }
};

const createBulletMiddleware = store => next => action => {
    if (action.type === 'STEP') {

        let {dispatch} = store;
        let {player, enemy} = store.getState();

        if (player.shooting) { shootIfPossible(player, dispatch); }
        if (enemy.shooting) { shootIfPossible(enemy, dispatch, 'ENEMY_'); }
    }

    return next(action);
};

const generateEnemyAction = () => {
    var keyName = KEYS_AS_ARRAY[_.random(KEYS_AS_ARRAY.length - 1)];
    var keyCode = KEYS[keyName];
    var enabled = _.random(1);

    var type = enabled ? 'ENEMY_KEY_DOWN' : 'ENEMY_KEY_UP';
    var payload = {keyCode};

    return {type, payload};
};

const enemyMiddleware = store => next => action => {
    if (action.type === 'STEP') {
        store.dispatch(generateEnemyAction());
    }

    return next(action);
};



const bulletHitMiddleware = store => next => action => {
    if (action.type === 'STEP') {

        let {player, enemy, bullets, walls} = store.getState();

        _.forEach(bullets, bullet => {

            let hitAction = {type: 'BULLET_HIT', payload: {id: bullet.id}};
            let bulletAsRect = positionAsRect(bullet.pos, 5);

            let playerAsRect = positionAsRect(player.pos, 10);
            if (isHit(playerAsRect, bulletAsRect)) {
                store.dispatch(hitAction);
                store.dispatch({type: 'PLAYER_ADD_SCORE', payload: -5});
                store.dispatch({type: 'ENEMY_ADD_SCORE', payload: 10});
                return next(action);
            }

            let enemyAsRect = positionAsRect(enemy.pos, 10);
            if (isHit(enemyAsRect, bulletAsRect)) {
                store.dispatch(hitAction);
                store.dispatch({type: 'ENEMY_ADD_SCORE', payload: -5});
                store.dispatch({type: 'PLAYER_ADD_SCORE', payload: 10});
                return next(action);
            }

            _.forEach(walls.frame, wall => {
                if (isHit(wall, bulletAsRect)) {
                    store.dispatch(hitAction);
                    return next(action);
                }
            });
        });
    }

    return next(action);
};
const wallsMiddleware = store => next => action => {
    if (action.type === 'STEP') {

        let {player, enemy, walls} = store.getState();
        let playerAsRect = positionAsRect(getEntityNextMove(player).pos, 15);
        let enemyAsRect = positionAsRect(getEntityNextMove(enemy).pos, 15);

        _.forEach(walls.frame, wall => {
            if (isHit(wall, playerAsRect)) {
                store.dispatch({type: 'PLAYER_BLOCKED'});
            }
        });

        _.forEach(walls.frame, wall => {
            if (isHit(wall, enemyAsRect)) {
                store.dispatch({type: 'ENEMY_BLOCKED'});
            }
        });
    }

    return next(action);
};

const middleware = applyMiddleware(
    createBulletMiddleware,
    enemyMiddleware,
    bulletHitMiddleware,
    wallsMiddleware
);

export default middleware;