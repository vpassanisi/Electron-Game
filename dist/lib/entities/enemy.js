import { Entity } from "./entity.js";
import Vector from "../vector.js";
export class Enemy extends Entity {
    constructor(positionLeft, positionTop) {
        super();
        this.root = document.getElementById("app");
        this.direction = new Vector([0, 0]);
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = this.root.offsetHeight / 7 - 20;
        this.width = this.root.offsetWidth / 13 - 20;
        this.speed = 4;
        this.friction = 3;
        this.hitBox = document.createElement("div");
        this.center.appendChild(this.hitBox);
        this.center.style.position = "absolute";
        this.center.style.height = "1px";
        this.center.style.width = "1px";
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.top = `${this.positionTop}px`;
        this.center.style.backgroundColor = "black";
        this.hitBox.style.height = `${this.height}px`;
        this.hitBox.style.width = `${this.width}px`;
        this.hitBox.style.position = "relative";
        this.hitBox.style.top = `-${this.height / 2}px`;
        this.hitBox.style.left = `-${this.width / 2}px`;
        this.hitBox.style.backgroundColor = "#ff0000";
        this.root.appendChild(this.center);
        this.hp = 10;
        this.flashFrames = 0;
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
                if (this.flashFrames) {
                    this.flashFrames -= 1;
                    this.hitBox.style.backgroundColor = "#fff";
                }
                else {
                    this.hitBox.style.backgroundColor = "#ff0000";
                }
                return "persist";
            },
        ];
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
        const right = Math.abs(otherEntity.rightSide - this.leftSide);
        const left = Math.abs(otherEntity.leftSide - this.rightSide);
        const top = Math.abs(otherEntity.bottomSide - this.topSide);
        const bottom = Math.abs(otherEntity.topSide - this.bottomSide);
        const smallest = Math.min(right, left, top, bottom);
        if (right === smallest) {
            this.positionLeft = otherEntity.positionLeft + otherEntity.width / 2 + this.width / 2;
            this.direction.x = 0;
        }
        if (left === smallest) {
            this.positionLeft = otherEntity.positionLeft - otherEntity.width / 2 - this.width / 2;
            this.direction.x = 0;
        }
        if (top === smallest) {
            this.positionTop = otherEntity.positionTop + otherEntity.height / 2 + this.height / 2;
            this.direction.y = 0;
        }
        if (bottom === smallest) {
            this.positionTop = otherEntity.positionTop - otherEntity.height / 2 - this.height / 2;
            this.direction.y = 0;
        }
    }
    hit(damage) {
        this.hp -= damage;
        this.flashFrames = 3;
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
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.top = `${this.positionTop}px`;
    }
}
//# sourceMappingURL=enemy.js.map