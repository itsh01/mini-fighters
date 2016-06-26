
import util from '../util/util';

const {KEYS} = util.CONST;
const KEYS_AS_ARRAY = _.keys(KEYS);

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

export default enemyMiddleware;