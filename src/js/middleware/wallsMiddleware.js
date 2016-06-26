
import _ from 'lodash';
import util from '../util/util';

let {
    isHit,
    positionAsRect,
    getEntityNextMove
    } = util.math;

const entityAsRect = entity => {
    return _.chain(entity)
        .thru(getEntityNextMove)
        .get('pos')
        .thru(_.partialRight(positionAsRect, 15))
        .value();
};

const wallsMiddleware = store => next => action => {
    if (action.type === 'STEP') {

        let {player, enemy, walls} = store.getState();
        let playerAsRect = entityAsRect(player);
        let enemyAsRect = entityAsRect(enemy);

        _.forEach(walls.frame, wall => {
            if (isHit(wall, playerAsRect)) {
                store.dispatch({type: 'PLAYER_BLOCKED'});
            }

            if (isHit(wall, enemyAsRect)) {
                store.dispatch({type: 'ENEMY_BLOCKED'});
            }
        });
    }

    return next(action);
};

export default wallsMiddleware;