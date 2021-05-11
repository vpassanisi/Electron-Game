import { Entity } from "./entity.js";
export class WallLeft extends Entity {
    constructor(game, positionLeft, positionTop) {
        super(game);
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = this.camera.offsetHeight / 9;
        this.width = this.camera.offsetWidth / 15;
        this.spriteHeight = 16;
        this.spriteWidth = 16;
        this.spriteX = 32;
        this.spriteY = 16;
    }
    update(player) {
        return true;
    }
    hit(damage) { }
    nonPlayerCollision() { }
    render() {
        this.game.ctx.drawImage(this.game.envSpriteSheet, this.spriteX, this.spriteY, this.spriteHeight, this.spriteWidth, this.positionLeft, this.positionTop, this.height, this.width);
    }
    playerCollision(player) {
        const callback = () => {
            const right = Math.abs(player.rightSide - this.leftSide);
            const left = Math.abs(player.leftSide - this.rightSide);
            const top = Math.abs(player.bottomSide - this.topSide);
            const bottom = Math.abs(player.topSide - this.bottomSide);
            const smallest = Math.min(right, left, top, bottom);
            if (right === smallest) {
                player.positionLeft = this.positionLeft - this.width / 2 - player.width / 2;
                player.direction.x = 0;
            }
            else if (left === smallest) {
                player.positionLeft = this.positionLeft + this.width / 2 + player.width / 2;
                player.direction.x = 0;
            }
            else if (top === smallest) {
                player.positionTop = this.positionTop - this.height / 2 - player.height / 2;
                player.direction.y = 0;
            }
            else if (bottom === smallest) {
                player.positionTop = this.positionTop + this.height / 2 + player.height / 2;
                player.direction.y = 0;
            }
            return "break";
        };
        return callback;
    }
}
//# sourceMappingURL=wallLeft.js.map