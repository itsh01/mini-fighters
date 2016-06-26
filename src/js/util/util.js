const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    SPACE: 32
};

const MOVE_SPEED = 3;


const isHit = (rect1, rect2) => {
    let {x, y, width: w, height: h} = rect1,
        {x: x2, y: y2, width: w2, height: h2} = rect2;

    return !(x + w < x2 || x2 + w2 < x || y + h < y2 || y2 + h2 < y);
};

const positionAsRect = (pos, radius = 5) => {
    return {
        x: pos.x - radius,
        y: pos.y - radius,
        width: radius * 2,
        height: radius * 2
    };
};

const getBulletStartingPoint = player => {
    let cannonDistance = 25;
    let cannonRelativeAngle = Math.PI / 4;
    let cannonAngle = player.dir + cannonRelativeAngle;

    let xDiff = -Math.sin(cannonAngle) * cannonDistance;
    let yDiff = Math.cos(cannonAngle) * cannonDistance;
    return {
        x: player.pos.x - xDiff,
        y: player.pos.y - yDiff
    };
};

const getEntityNextMove = state => {
    let {dir, move} = state;

    let relativeXDiff = move.right - move.left;
    let relativeYDiff = move.down - move.up;

    let xDiff = Math.cos(dir) * relativeXDiff - Math.sin(dir) * relativeYDiff;
    let yDiff = Math.cos(dir) * relativeYDiff + Math.sin(dir) * relativeXDiff;

    return {
        ...state,
        pos: {
            x: state.pos.x + xDiff,
            y: state.pos.y + yDiff
        },
        dir: state.dir + (move.turnRight - move.turnLeft) * Math.PI / 90
    };
};

const util = {
    CONST: {
        KEYS,
        MOVE_SPEED
    },
    math: {
        positionAsRect,
        isHit,
        getBulletStartingPoint,
        getEntityNextMove
    }
};

export default util;