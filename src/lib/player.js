import Vector from "./vector.js";

export default class Player {
  constructor(positionLeft = 100, positionTop = 100, height = 50, width = 50, speed = 15) {
    this.root = document.getElementById("app");

    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.height = height;
    this.width = width;
    this.speed = speed;

    this.friction = 1;

    this.direction = new Vector([0, 0]);

    this.center = document.createElement("div");
    this.center.style.position = "absolute";
    this.center.style.height = "1px";
    this.center.style.width = "1px";
    this.center.style.top = "100px";
    this.center.style.left = "100px";
    this.center.style.backgroundColor = "black";

    this.hitBox = document.createElement("div");
    this.hitBox.style.height = `${this.height}px`;
    this.hitBox.style.width = `${this.width}px`;
    this.hitBox.style.position = "relative";
    this.hitBox.style.top = `-${this.height / 2}px`;
    this.hitBox.style.left = `-${this.width / 2}px`;
    this.hitBox.style.backgroundColor = "#ff24cf";

    this.center.appendChild(this.hitBox);
    this.root.appendChild(this.center);
  }

  update(axes) {
    const analog = new Vector([axes[0], axes[1]]);
    analog.multiply(this.speed * 0.1);
    this.direction.add(analog);

    this.direction.subract(
      new Vector([this.direction.x * (this.friction / 10), this.direction.y * (this.friction / 10)])
    );

    this.direction.quantize();
    this.direction.clamp(this.speed);

    this.positionLeft += this.direction.x;
    this.positionTop += this.direction.y;
    this.center.style.left = `${this.positionLeft}px`;
    this.center.style.top = `${this.positionTop}px`;
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

    this.hitBox.style.height = `${this.height}px`;
    this.hitBox.style.width = `${this.width}px`;

    this.hitBox.style.top = `-${this.height / 2}px`;
    this.hitBox.style.left = `-${this.width / 2}px`;
  }
}
