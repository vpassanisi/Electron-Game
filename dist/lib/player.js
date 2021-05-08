import Vector from "./vector.js";
export default class Player {
    constructor(positionLeft, positionTop, size = 4, speed = 15) {
        this.root = document.getElementById("app");
        this.size = size;
        this.width = 8 * this.size;
        this.height = 6 * this.size;
        this.spriteWidth = 16;
        this.spriteHeight = 16;
        this.positionLeft = positionLeft || 128;
        this.positionTop = positionTop || this.root.offsetHeight / 2;
        this.speed = speed;
        this.friction = 9;
        this.direction = new Vector([0, 0]);
        this.center = document.createElement("div");
        this.center.style.position = "absolute";
        this.center.style.height = "1px";
        this.center.style.width = "1px";
        this.center.style.top = `${this.positionTop}px`;
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.backgroundColor = "black";
        this.sprite = document.createElement("canvas");
        this.sprite.style.position = "absolute";
        this.sprite.width = this.spriteWidth;
        this.sprite.height = this.spriteHeight;
        this.sprite.style.width = `${this.spriteWidth * this.size}px`;
        this.sprite.style.height = `${this.spriteHeight * this.size}px`;
        this.sprite.style.top = `-${(this.spriteHeight * this.size) / 1.3}px`;
        this.sprite.style.left = `-${(this.spriteWidth * this.size) / 1.9}px`;
        this.sprite.style.imageRendering = "pixelated";
        this.sprite.style.zIndex = "10";
        this.hitBox = document.createElement("div");
        this.hitBox.style.width = `${this.width}px`;
        this.hitBox.style.height = `${this.height}px`;
        this.hitBox.style.position = "absolute";
        this.hitBox.style.top = `-${this.height / 2}px`;
        this.hitBox.style.left = `-${this.width / 2}px`;
        // this.hitBox.style.backgroundColor = "#ff8800ee";
        this.ctx = this.sprite.getContext("2d");
        this.img = new Image();
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, 0);
        };
        this.img.src = "./src/assets/player/knight_idle_spritesheet.png";
        this.center.appendChild(this.sprite);
        this.center.appendChild(this.hitBox);
        this.root.appendChild(this.center);
        this.queue = [
            ({ axes }) => {
                const analog = new Vector([axes[0], axes[1]]).multiply(this.speed * 0.1);
                this.direction.add(analog);
                return "persist";
            },
            () => {
                // slow down the player smoothly
                this.direction.multiply(this.friction * 0.1);
                return "persist";
            },
            () => {
                this.direction.quantize();
                this.direction.clamp(this.speed);
                return "persist";
            },
        ];
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
    update(updateData) {
        for (let i = 0; i < this.queue.length; i++) {
            const action = this.queue[i](updateData);
            if (action !== "persist")
                this.queue.splice(i, 1);
            if (action === "break")
                break;
        }
        this.positionLeft += this.direction.x;
        this.positionTop += this.direction.y;
    }
    adjustSpeed(ammount) {
        this.speed += ammount;
        if (this.speed < 0)
            this.speed = 0;
        this.speed = Math.round(this.speed * 100) / 100;
        return this.speed;
    }
    adjustFriction(ammount) {
        this.friction += ammount;
        if (this.friction < 0)
            this.friction = 0;
        this.friction = Math.round(this.friction * 100) / 100;
        return this.friction;
    }
    adjustSize(ammount) {
        this.size += ammount;
        this.width = 9 * this.size;
        this.height = 12 * this.size;
        this.sprite.style.width = `${this.spriteWidth * this.size}px`;
        this.sprite.style.height = `${this.spriteHeight * this.size}px`;
        this.sprite.style.top = `-${(this.spriteHeight * this.size) / 1.7}px`;
        this.sprite.style.left = `-${(this.spriteWidth * this.size) / 1.9}px`;
    }
    collision(callback) {
        callback();
    }
    render() {
        this.center.style.left = `${this.positionLeft}px`;
        this.center.style.top = `${this.positionTop}px`;
    }
    fire() { }
}
//# sourceMappingURL=player.js.map