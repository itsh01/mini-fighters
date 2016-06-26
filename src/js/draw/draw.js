import _ from 'lodash';

const rotate = (ctx, rad, x, y, func) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rad);

    func();

    ctx.restore();
};

const drawUnit = (ctx, player) => {
    let {pos} = player;

    rotate(ctx, player.dir, pos.x, pos.y, () => {
        // head
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(0, 0, player.radius, 0, 2 * Math.PI);
        ctx.fill();

        // gun
        ctx.fillRect(10, -20, 10, 30);

        // hand
        ctx.fillRect(-20, -8, 10, 15);
    });
};

const drawBullets = (ctx, bullets) => {
    _.forEach(bullets, function (bullet) {
        rotate(ctx, bullet.dir, bullet.pos.x, bullet.pos.y, () => {
            let radius = 5;
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fill();
        });
    });
};

const drawWalls = (ctx, walls) => {
    _.forEach(walls.frame, function (wall) {
        ctx.fillStyle = '#aaa';
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
};

const drawBackground = (ctx, canvas) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawScore = (ctx, score) => {
    ctx.font = "42px Tahoma";
    ctx.fillText('Player: ' + score.player + ' | Enemy: ' + score.enemy, 50, 40);
};

export default function draw(canvas, state) {
    let {player, enemy, bullets, walls, score} = state;
    let ctx = canvas.getContext('2d');

    drawBackground(ctx, canvas);
    drawUnit(ctx, player);
    drawUnit(ctx, enemy);
    drawBullets(ctx, bullets);
    drawWalls(ctx, walls);
    drawScore(ctx, score);

}