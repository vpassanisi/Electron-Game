import Vector from "./vector.js";
export class Entity {
    constructor() {
        this.center = document.createElement("div");
    }
    get leftSide() {
        return this.positionLeft - this.width / 2;
    }
    get rightSide() {
        return this.positionLeft + this.width / 2;
    }
    get topSide() {
        return this.positionTop - this.height / 2;
    }
    get bottomSide() {
        return this.positionTop + this.height / 2;
    }
}
export class Projectile extends Entity {
    constructor(vector, positionLeft, positionTop, height, width) {
        super();
        this.root = document.getElementById("app");
        this.direction = vector;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = height;
        this.width = width;
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
        this.hitBox.style.backgroundColor = "#fff";
        this.root.appendChild(this.center);
        this.queue = [];
    }
    update() {
        for (let i = 0; i < this.queue.length; i++) {
            const type = this.queue[i]();
            if (type !== "persist")
                this.queue.splice(i, 1);
        }
        this.positionLeft += this.direction.x;
        this.positionTop += this.direction.y;
        if (this.positionLeft + this.width / 2 >= this.root.offsetWidth ||
            this.positionLeft <= this.width / 2 ||
            this.positionTop + this.height / 2 >= this.root.offsetHeight ||
            this.positionTop <= this.height / 2) {
            return false;
        }
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.top = `${this.positionTop}px`;
        return true;
    }
}
export class Enemy extends Entity {
    constructor(positionLeft, positionTop, height, width, speed, vector) {
        super();
        this.root = document.getElementById("app");
        this.direction = vector;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = height;
        this.width = width;
        this.speed = speed;
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
            ({ playerX, playerY }) => {
                this.direction.add(new Vector([playerX - this.positionLeft, playerY - this.positionTop]).scaleTo(1));
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
    update(updateObj) {
        if (this.hp === 0)
            return false;
        for (let i = 0; i < this.queue.length; i++) {
            const type = this.queue[i](updateObj);
            if (type !== "persist")
                this.queue.splice(i, 1);
        }
        this.positionLeft += this.direction.x;
        this.positionTop += this.direction.y;
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.top = `${this.positionTop}px`;
        return true;
    }
    collision(otherEntity) {
        this.queue.unshift(() => {
            this.direction.add(new Vector([
                this.positionLeft - otherEntity.positionLeft,
                this.positionTop - otherEntity.positionTop,
            ]).scaleTo(1));
            return "collision";
        });
    }
    hit(damage) {
        this.hp -= damage;
        this.flashFrames = 3;
    }
}
//# sourceMappingURL=entities.js.map