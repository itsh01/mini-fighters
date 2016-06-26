
const getCanvasSize = () => {
    let canvas = document.getElementById('main');
    return {height: canvas.height, width: canvas.width};
};

const CANVAS_SIZE = getCanvasSize();

const wallsInitialState = {
    frame: [
        {x: 50, y: 50, width: CANVAS_SIZE.width - 100, height: 10}, // top
        {x: 50, y: 50, width: 10, height: CANVAS_SIZE.height - 100}, // left
        {x: CANVAS_SIZE.width - 50, y: 50, width: 10, height: CANVAS_SIZE.height - 100}, // right
        {x: 50, y: CANVAS_SIZE.height - 50, width: CANVAS_SIZE.width - 90, height: 10} // bottom
    ],
    extras: []
};


export default function wallsReducer(state = wallsInitialState) {
    return state;
};