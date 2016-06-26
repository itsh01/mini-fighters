
import util from '../util/util';

let {getBulletStartingPoint} = util.math;

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

const shootingMiddleware = store => next => action => {
    if (action.type === 'STEP') {

        let {dispatch} = store;
        let {player, enemy} = store.getState();

        if (player.shooting) { shootIfPossible(player, dispatch); }
        if (enemy.shooting) { shootIfPossible(enemy, dispatch, 'ENEMY_'); }
    }

    return next(action);
};

export default shootingMiddleware;