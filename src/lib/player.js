import Vector from "./vector.js";

export default class Player {
  constructor(positionLeft = 100, positionTop = 100, height = 64, width = 64, speed = 15) {
    this.root = document.getElementById("app");

    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.height = height;
    this.width = width;
    this.speed = speed;

    this.friction = 9;

    this.direction = new Vector([0, 0]);

    this.center = document.createElement("div");
    this.center.style.position = "absolute";
    this.center.style.height = "1px";
    this.center.style.width = "1px";
    this.center.style.top = "100px";
    this.center.style.left = "100px";
    this.center.style.backgroundColor = "black";

    // this.hitBox = document.createElement("div");
    // this.hitBox.style.height = `${this.height}px`;
    // this.hitBox.style.width = `${this.width}px`;
    // this.hitBox.style.position = "relative";
    // this.hitBox.style.top = `-${this.height / 2}px`;
    // this.hitBox.style.left = `-${this.width / 2}px`;
    // this.hitBox.style.backgroundColor = "#ff24cf";

    this.sprite = document.createElement("canvas");
    this.sprite.width = 16;
    this.sprite.height = 16;
    this.sprite.style.width = `${this.width}px`;
    this.sprite.style.height = `${this.height}px`;
    this.sprite.style.imageRendering = "pixelated";

    this.ctx = this.sprite.getContext("2d");
    this.img = new Image();
    this.img.onload = () => {
      this.ctx.drawImage(this.img, -24, -24);
    };
    this.img.src = "./assets/player/idle_down1.png";

    this.animationFrame = 1;
    this.animationDelay = 10;

    this.center.appendChild(this.sprite);
    this.root.appendChild(this.center);
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

  update({ axes, state }) {
    const analog = new Vector([axes[0], axes[1]]).multiply(this.speed * 0.1);

    this.direction.add(analog);

    // slow down the player smoothly
    this.direction.multiply(this.friction * 0.1);

    this.direction.quantize();
    this.direction.clamp(this.speed);

    this.positionLeft += this.direction.x;
    this.positionTop += this.direction.y;

    if (this.leftSide < 0) this.positionLeft = this.width / 2;
    if (this.rightSide > this.root.offsetWidth)
      this.positionLeft = this.root.offsetWidth - this.width / 2;

    if (this.topSide < 0) this.positionTop = this.height / 2;
    if (this.bottomSide > this.root.offsetHeight)
      this.positionTop = this.root.offsetHeight - this.height / 2;

    this.center.style.left = `${this.positionLeft}px`;
    this.center.style.top = `${this.positionTop}px`;

    this.animate(state);
  }

  animate(state) {
    console.log(this.animationFrame, this.animationDelay);
    if (this.animationDelay === 0) {
      this.img = new Image();
      this.img.onload = () => {
        this.ctx.drawImage(this.img, -24, -24);
      };
      this.img.src = `./assets/player/idle_down${this.animationFrame}.png`;
      this.animationDelay = 10;

      if (this.animationFrame === 4) {
        this.animationFrame = 1;
      } else {
        this.animationFrame += 1;
      }
    }

    this.animationDelay -= 1;
  }

  adjustSpeed(ammount) {
    this.speed += ammount;
    if (this.speed < 0) this.speed = 0;
    this.speed = Math.round(this.speed * 100) / 100;
    return this.speed;
  }

  adjustFriction(ammount) {
    this.friction += ammount;
    if (this.friction < 0) this.friction = 0;
    this.friction = Math.round(this.friction * 100) / 100;
    return this.friction;
  }

  adjustSize(ammount) {
    ammount = ammount * 2;
    this.height += ammount;
    this.width += ammount;

    this.sprite.style.height = `${this.height}px`;
    this.sprite.style.width = `${this.width}px`;

    this.sprite.style.top = `-${this.height / 2}px`;
    this.sprite.style.left = `-${this.width / 2}px`;
  }
}
