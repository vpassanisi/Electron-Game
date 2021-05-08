import { Entity } from "./entity.js";
export class Wall extends Entity {
    constructor(positionLeft, positionTop) {
        super();
        this.root = document.getElementById("app");
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = this.root.offsetHeight / 9;
        this.width = this.root.offsetWidth / 15;
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
        this.hitBox.style.backgroundColor = "#8000ff";
        this.root.appendChild(this.center);
    }
    update(player) {
        return true;
    }
    hit(damage) { }
    nonPlayerCollision() { }
    render() { }
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
            if (left === smallest) {
                player.positionLeft = this.positionLeft + this.width / 2 + player.width / 2;
                player.direction.x = 0;
            }
            if (top === smallest) {
                player.positionTop = this.positionTop - this.height / 2 - player.height / 2;
                player.direction.y = 0;
            }
            if (bottom === smallest) {
                player.positionTop = this.positionTop + this.height / 2 + player.height / 2;
                player.direction.y = 0;
            }
            return "break";
        };
        return callback;
    }
}
//# sourceMappingURL=wall.js.map