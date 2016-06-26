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

            let id = _.uniqueId('ball');
            let newBullet = {id, dir, pos};

            return state.concat(newBullet);
        }
        case 'BULLET_HIT':
        {
            let {id} = action.payload;

            return _.reject(state, {id});
        }
    }
    return state;
};