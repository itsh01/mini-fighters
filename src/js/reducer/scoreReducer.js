import _ from 'lodash';

const scoreInitialState = {
    player: 0,
    enemy: 0
};

export default function scoreReducer(state = scoreInitialState, action) {
    switch (action.type) {
        case 'PLAYER_ADD_SCORE':
        {
            return {
                ...state,
                player: state.player + action.payload
            }
        }
        case 'ENEMY_ADD_SCORE':
        {
            return {
                ...state,
                enemy: state.enemy + action.payload
            }
        }
    }
    return state;
};