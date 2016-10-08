function Zombie(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);

    this.dx = 31;
    this.dy = 52;
    this.setBox(-10, -47, 10, 5);
    this.type = LIVE;

    this.direction = 1;
    this.fireTime = 100;
    this.drawPeriodDelay = 0; //fire a ball when this variable is zero
    this.shooting = false;

    this.walkingRight = new Animation(ASSET_MANAGER.getAsset("./img/zombie.png"),
            this.game, 0, 1 * 62, 64, 62, 0.13, 7, true, true, false, this.dx, this.dy);

    this.walkingLeft = new Animation(ASSET_MANAGER.getAsset("./img/zombie.png"),
            this.game, 0, 2 * 62, 64, 62, 0.13, 7, true, true, false, this.dx, this.dy);

    this.fireRoad = new Animation(ASSET_MANAGER.getAsset("./img/firetrail.png"),
            this.game, 0, 0, 36, 50, 0.15, 16, true, true, false, this.dx, this.dy);

    this.gameOver = new Animation(ASSET_MANAGER.getAsset("./img/gameover.png"),
            this.game, 0, 0, 340, 35, 0.13, 22, true, true, false, this.dx, this.dy);
}

Zombie.prototype = new Entity();
Zombie.prototype.constructor = Zombie;

Zombie.prototype.update = function () {
    if (this.life <= 0) {
        document.getElementById("zombiesound").pause();
        this.removeFromWorld = true;
        return;
    }
    document.getElementById("zombiesound").play();
    document.getElementById("zombiesound").loop = true;
    if (this.x <= 0 || this.x >= this.game.maxX) {
        this.direction *= -1;
    }

    if (this.drawPeriodDelay === 0) {
        var fireRoad = new ZombieFire(this.game, this.x - this.direction * 20, this.y + 4);
        this.game.addEntity(fireRoad);
        this.drawPeriodDelay = 15;
    } else {
        this.drawPeriodDelay--;
    }

    this.x += 1 * this.direction;

    Entity.prototype.update.call(this);
}

Zombie.prototype.draw = function (ctx) {

    if (this.direction < 0) {
        this.walkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.direction > 0) {
        this.walkingRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }

    Entity.prototype.draw.call(this);
}