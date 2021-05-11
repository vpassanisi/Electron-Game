import { Entity } from "./entity.js";
export class WallRight extends Entity {
    constructor(positionLeft, positionTop) {
        super();
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.height = this.camera.offsetHeight / 9;
        this.width = this.camera.offsetWidth / 15;
        this.spriteHeight = 16;
        this.spriteWidth = 16;
        this.center.style.position = "absolute";
        this.center.style.height = "1px";
        this.center.style.width = "1px";
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.top = `${this.positionTop}px`;
        this.center.style.backgroundColor = "black";
        this.sprite = document.createElement("canvas");
        this.sprite.style.position = "absolute";
        this.sprite.width = this.spriteWidth;
        this.sprite.height = this.spriteHeight;
        this.sprite.style.width = `${this.width}px`;
        this.sprite.style.height = `${this.height}px`;
        this.sprite.style.top = `-${this.height / 2}px`;
        this.sprite.style.left = `-${this.width / 2}px`;
        this.sprite.style.imageRendering = "pixelated";
        this.ctx = this.sprite.getContext("2d");
        this.img = new Image();
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, -16);
        };
        this.img.src = "./src/assets/environment/Final_Tileset.png";
        this.center.appendChild(this.sprite);
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
//# sourceMappingURL=wallRight.js.map