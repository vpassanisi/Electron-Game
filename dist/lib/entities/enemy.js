import { Entity } from "./entity.js";
import Vector from "../vector.js";
export class Enemy extends Entity {
    constructor(game, positionLeft, positionTop) {
        super(game);
        this.direction = new Vector([0, 0]);
        this.spriteHeight = 16;
        this.spriteWidth = 16;
        this.size = this.game.camera.offsetWidth * 0.005;
        this.height = this.spriteHeight * this.size;
        this.width = this.spriteWidth * this.size;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.hitboxScalarX = 4;
        this.hitboxScalarY = 3;
        this.speed = 4;
        this.friction = 3;
        this.hp = 10;
        this.animationFrame = 3;
        this.animationDelay = 10;
        this.queue = [
            (player) => {
                this.direction.add(new Vector([
                    player.positionLeft - this.positionLeft,
                    player.positionTop - this.positionTop,
                ]).scaleTo(1));
                return "persist";
            },
            () => {
                this.direction.multiply(this.speed * 0.1);
                return "persist";
            },
            () => {
                this.direction.multiply(this.friction * 0.1);
                return "persist";
            },
            () => {
                this.direction.clamp(this.speed * 0.3);
                return "persist";
            },
            () => {
                if (!this.animationDelay) {
                    this.animationDelay = 10;
                    if (!this.animationFrame) {
                        this.animationFrame = 3;
                    }
                    else {
                        this.animationFrame -= 1;
                    }
                }
                else {
                    this.animationDelay -= 1;
                }
                return "persist";
            },
        ];
    }
    get leftSide() {
        return this.positionLeft - this.hitboxScalarX * this.size;
    }
    get rightSide() {
        return this.positionLeft + this.hitboxScalarX * this.size;
    }
    get topSide() {
        return this.positionTop - this.hitboxScalarY * this.size;
    }
    get bottomSide() {
        return this.positionTop + this.hitboxScalarY * this.size;
    }
    setPositionLeft(x) {
        this.positionLeft = x + this.hitboxScalarX * this.size;
    }
    setPositionRight(x) {
        this.positionLeft = x - this.hitboxScalarX * this.size;
    }
    setPositionTop(x) {
        this.positionTop = x + this.hitboxScalarY * this.size;
    }
    setPositionBottom(x) {
        this.positionTop = x - this.hitboxScalarY * this.size;
    }
    update(player) {
        if (this.hp === 0)
            return false;
        for (let i = 0; i < this.queue.length; i++) {
            const type = this.queue[i](player);
            if (type !== "persist")
                this.queue.splice(i, 1);
        }
        this.positionLeft += this.direction.x;
        this.positionTop += this.direction.y;
        return true;
    }
    nonPlayerCollision(otherEntity) {
        const left = Math.abs(otherEntity.rightSide - this.leftSide);
        const right = Math.abs(otherEntity.leftSide - this.rightSide);
        const top = Math.abs(otherEntity.bottomSide - this.topSide);
        const bottom = Math.abs(otherEntity.topSide - this.bottomSide);
        const smallest = Math.min(right, left, top, bottom);
        if (right === smallest) {
            this.setPositionRight(otherEntity.leftSide);
            this.direction.x = 0;
        }
        if (left === smallest) {
            this.setPositionLeft(otherEntity.rightSide);
            this.direction.x = 0;
        }
        if (top === smallest) {
            this.setPositionTop(otherEntity.bottomSide);
            this.direction.y = 0;
        }
        if (bottom === smallest) {
            this.setPositionBottom(otherEntity.topSide);
            this.direction.y = 0;
        }
    }
    hit(damage) {
        this.hp -= damage;
    }
    playerCollision(player) {
        const callback = () => {
            player.direction.add(new Vector([
                player.positionLeft - this.positionLeft,
                player.positionTop - this.positionTop,
            ]).scaleTo(1));
            return "break";
        };
        return callback;
    }
    render() {
        if (this.hp) {
            this.game.ctx.drawImage(this.game.enemySpriteSheet, this.animationFrame * this.spriteWidth, 0, this.spriteHeight, this.spriteWidth, this.positionLeft - this.width / 2, this.positionTop - this.height / 2, this.height, this.width);
            if (this.game.state.debug) {
                this.game.ctx.fillStyle = "#fc03fcBB";
                this.game.ctx.fillRect(this.positionLeft - this.hitboxScalarX * this.size, this.positionTop - this.hitboxScalarY * this.size, this.hitboxScalarX * this.size * 2, this.hitboxScalarY * this.size * 2);
            }
        }
    }
}
//# sourceMappingURL=enemy.js.map