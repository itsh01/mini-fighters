import _ from 'lodash';

const bulletsInitialState = [];

export default function bulletsReducer(state = bulletsInitialState, action) {
    switch (action.type) {
        case 'STEP':
        {
            return _.map(state, function (bullet) {
                let {dir, pos} = bullet;

                let xDiff = -Math.sin(dir) * -6;
                let yDiff = Math.cos(dir) * -6;

                return {
                    ...bullet,
                    pos: {
                        x: pos.x + xDiff,
                        y: pos.y + yDiff
                    }
                };
            });
        }
        case 'CREATE_BULLET':
        {
            let {dir, pos} = action.payload;
            let newBullet = {dir, pos, id: _.uniqueId('bullet')};

            return state.concat(newBullet);
        }
        case 'BULLET_HIT':
        {
            return _.reject(state, {id: action.payload.id});
        }
    }
    return state;
};