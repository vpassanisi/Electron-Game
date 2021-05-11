import { Entity } from "./entity.js";
export class Rock extends Entity {
    constructor(game, positionLeft, positionTop) {
        super(game);
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = this.game.camera.offsetHeight / 9;
        this.width = this.game.camera.offsetWidth / 15;
        this.spriteHeight = 16;
        this.spriteWidth = 16;
    }
    update(player) {
        return true;
    }
    hit(damage) { }
    nonPlayerCollision() { }
    render() {
        this.game.ctx.drawImage(this.game.envSpriteSheet, 336, 192, this.spriteHeight, this.spriteWidth, this.positionLeft - this.height / 2, this.positionTop - this.width / 2, this.height, this.width);
    }
    playerCollision(player) {
        const callback = () => {
            const left = Math.abs(player.rightSide - this.leftSide);
            const right = Math.abs(player.leftSide - this.rightSide);
            const top = Math.abs(player.bottomSide - this.topSide);
            const bottom = Math.abs(player.topSide - this.bottomSide);
            const smallest = Math.min(right, left, top, bottom);
            if (right === smallest) {
                player.setPositionLeft(this.rightSide);
                player.direction.x = 0;
            }
            else if (left === smallest) {
                player.setPositionRight(this.leftSide);
                player.direction.x = 0;
            }
            else if (top === smallest) {
                player.setPositionBottom(this.topSide);
                player.direction.y = 0;
            }
            else if (bottom === smallest) {
                player.setPositionTop(this.bottomSide);
                player.direction.y = 0;
            }
            return "break";
        };
        return callback;
    }
}
//# sourceMappingURL=rock.js.map