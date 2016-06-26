
import util from '../util/util';

const {getEntityNextMove} = util.math;
const {getStateAppliedActionByKey} = util.stateUtil;

const playerInitialState = {
    pos: {
        x: 200,
        y: 200
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
    color: '#00f'
};

export default function playerReducer(state = playerInitialState, action) {
    switch (action.type) {
        case 'STEP':
        {
            return getEntityNextMove(state);
        }

        case 'KEY_DOWN':
        {
            return getStateAppliedActionByKey(state, action.payload.keyCode, true);
        }

        case 'KEY_UP':
        {
            return getStateAppliedActionByKey(state, action.payload.keyCode, false);
        }

        case 'UPDATE_SHOOTING_DELAY':
        {
            return {
                ...state,
                shootingDelay: action.payload
            }
        }

        case 'PLAYER_BLOCKED':
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