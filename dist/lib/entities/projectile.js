import { Entity } from "./entity.js";
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
    update(player) {
        for (let i = 0; i < this.queue.length; i++) {
            const type = this.queue[i](player);
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
//# sourceMappingURL=projectile.js.map