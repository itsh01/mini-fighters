
import util from '../util/util';

let {isHit, positionAsRect} = util.math;

const bulletHitPlayer = (dispatch, hitAction) => {
    dispatch(hitAction);
    dispatch({type: 'PLAYER_ADD_SCORE', payload: -5});
    dispatch({type: 'ENEMY_ADD_SCORE', payload: 10});
};

const bulletHitEnemy = (dispatch, hitAction) => {
    dispatch(hitAction);
    dispatch({type: 'ENEMY_ADD_SCORE', payload: -5});
    dispatch({type: 'PLAYER_ADD_SCORE', payload: 10});
};

const bulletsMiddleware = store => next => action => {
    if (action.type === 'STEP') {

        let {player, enemy, bullets, walls} = store.getState();
        let {dispatch} = store;

        _.forEach(bullets, bullet => {

            let hitAction = {type: 'BULLET_HIT', payload: {id: bullet.id}};
            let bulletAsRect = positionAsRect(bullet.pos, 5);
            let playerAsRect = positionAsRect(player.pos, 10);
            let enemyAsRect = positionAsRect(enemy.pos, 10);

            if (isHit(playerAsRect, bulletAsRect)) {
                bulletHitPlayer(dispatch, hitAction);
                return next(action);
            }

            if (isHit(enemyAsRect, bulletAsRect)) {
                bulletHitEnemy(dispatch, hitAction);
                return next(action);
            }

            _.forEach(walls.frame, wall => {
                if (isHit(wall, bulletAsRect)) {
                    dispatch(hitAction);
                    return next(action);
                }
            });
        });
    }

    return next(action);
};

export default bulletsMiddleware;