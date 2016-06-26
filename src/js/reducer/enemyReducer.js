
import util from '../util/util';

const {getEntityNextMove} = util.math;
const {getStateAppliedActionByKey} = util.stateUtil;

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

export default function enemyReducer(state = enemyInitialState, action) {
    switch (action.type) {
        case 'STEP':
        {
            return getEntityNextMove(state);
        }

        case 'ENEMY_KEY_DOWN':
        {
            return getStateAppliedActionByKey(state, action.payload.keyCode, true);
        }

        case 'ENEMY_KEY_UP':
        {
            return getStateAppliedActionByKey(state, action.payload.keyCode, false);
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