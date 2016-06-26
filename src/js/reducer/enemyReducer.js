
import util from '../util/util';

const {getEntityNextMove} = util.math;

const {MOVE_SPEED, KEYS} = util.CONST;

const SHOOTING = KEYS.SPACE;

const DIRECTIONS = {
    [KEYS.UP]: 'up',
    [KEYS.DOWN]: 'down',
    [KEYS.RIGHT]: 'turnRight',
    [KEYS.LEFT]: 'turnLeft'
};

const enemyInitialState = {
    pos: {
        x: 1200,
        y: 400
    },
    move: {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        turnRight: 0,
        turnLeft: 0
    },
    shooting: false,
    shootingDelay: 10,
    radius: 10,
    dir: 0,
    color: '#f00'
};

const getStateAppliedActionByKey = (state, key, enable) => {
    let {move} = state;
    let direction = DIRECTIONS[key];

    if (direction) {
        return {
            ...state,
            move: {
                ...move,
                [direction]: enable ? MOVE_SPEED : 0
            }
        }
    }

    if (key === SHOOTING) {
        return {
            ...state,
            shooting: enable
        }
    }

    return state;
};

export default function enemyReducer(state = enemyInitialState, action) {
    switch (action.type) {
        case 'STEP':
        {
            return getEntityNextMove(state);
        }

        case 'ENEMY_KEY_DOWN':
        {
            let {keyCode} = action.payload;
            return getStateAppliedActionByKey(state, keyCode, true);
        }
        case 'ENEMY_KEY_UP':
        {
            let {keyCode} = action.payload;
            return getStateAppliedActionByKey(state, keyCode, false);
        }
        case 'ENEMY_UPDATE_SHOOTING_DELAY':
        {
            return {
                ...state,
                shootingDelay: action.payload
            }
        }
        case 'ENEMY_BLOCKED':
        {
            let {move} = state;

            return {
                ...state,
                move: {
                    ...move,
                    up: 0,
                    down: 0,
                    left: 0,
                    right: 0
                }
            }
        }
    }

    return state;
};