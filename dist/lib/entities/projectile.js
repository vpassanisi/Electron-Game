import { Entity } from "./entity.js";
export class Projectile extends Entity {
    constructor(game, vector, positionLeft, positionTop, size) {
        super(game);
        this.direction = vector;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = 5;
        this.width = 5;
        this.spriteHeight = 16;
        this.spriteWidth = 16;
        this.spriteX = 0;
        this.spriteY = 400;
        this.size = size;
        this.queue = [];
    }
    update(player) {
        for (let i = 0; i < this.queue.length; i++) {
            const type = this.queue[i](player);
            if (type !== "persist")
                this.queue.splice(i, 1);
        }
        this.positionLeft += this.direction.x;
        this.positionTop += this.direction.y;
        if (this.positionLeft >= this.game.camera.offsetWidth * (this.game.state.currentRoom.x + 1) ||
            this.positionLeft <= this.game.camera.offsetWidth * this.game.state.currentRoom.x ||
            this.positionTop >= this.game.camera.offsetHeight * (this.game.state.currentRoom.y + 1) ||
            this.positionTop <= this.game.camera.offsetHeight * this.game.state.currentRoom.y) {
            return false;
        }
        return true;
    }
    render() {
        this.game.ctx.fillStyle = "white";
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.positionLeft, this.positionTop, (this.height * this.size) / 2, 0, 2 * Math.PI);
        this.game.ctx.closePath();
        this.game.ctx.fill();
    }
}
//# sourceMappingURL=projectile.js.map