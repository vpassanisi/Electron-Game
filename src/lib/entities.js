import Vector from "./vector.js";

class Entity {
  constructor() {
    this.center = document.createElement("div");
  }

  update() {
    return true;
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
  }

  update() {
    this.positionLeft += this.direction.x;
    this.positionTop += this.direction.y;

    if (
      this.positionLeft + this.width / 2 >= this.root.offsetWidth ||
      this.positionLeft <= this.width / 2 ||
      this.positionTop + this.height / 2 >= this.root.offsetHeight ||
      this.positionTop <= this.height / 2
    ) {
      return false;
    }

    this.center.style.left = `${this.positionLeft}px`;
    this.center.style.top = `${this.positionTop}px`;

    return true;
  }
}

export class Enemy extends Entity {
  constructor(positionLeft, positionTop, height, width, speed) {
    super();

    this.root = document.getElementById("app");

    this.direction = new Vector();
    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.height = height;
    this.width = width;

    this.speed = speed;
    this.friction = 2;

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
  }

  update({ playerX, playerY }) {
    this.direction.set([playerX - this.positionLeft, playerY - this.positionTop]);
    this.direction.multiply(this.speed * 0.01);
    this.direction.subract(this.direction.multiply(this.friction / 10));
    this.direction.clamp(this.speed * 0.3);

    this.positionLeft += this.direction.x;
    this.positionTop += this.direction.y;
    this.center.style.left = `${this.positionLeft}px`;
    this.center.style.top = `${this.positionTop}px`;
  }
}
