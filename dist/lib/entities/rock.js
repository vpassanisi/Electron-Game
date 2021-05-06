import { Entity } from "./entity.js";
import Vector from "../vector.js";
export class Rock extends Entity {
    constructor(positionLeft, positionTop) {
        super();
        this.root = document.getElementById("app");
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = this.root.offsetHeight / 7;
        this.width = this.root.offsetWidth / 13;
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
        this.hitBox.style.backgroundColor = "#ffff00";
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
            const away = new Vector([
                player.positionLeft - this.positionLeft,
                player.positionTop - this.positionTop,
            ]).direction();
            if (away === "up") {
                player.positionTop = this.positionTop - this.height / 2 - player.height / 2;
                player.direction.y = 0;
            }
            if (away === "down") {
                player.positionTop = this.positionTop + this.height / 2 + player.height / 2;
                player.direction.y = 0;
            }
            if (away === "left") {
                player.positionLeft = this.positionLeft - this.width / 2 - player.width / 2;
                player.direction.x = 0;
            }
            if (away === "right") {
                player.positionLeft = this.positionLeft + this.width / 2 + player.width / 2;
                player.direction.x = 0;
            }
            return "break";
        };
        return callback;
    }
}
//# sourceMappingURL=rock.js.map