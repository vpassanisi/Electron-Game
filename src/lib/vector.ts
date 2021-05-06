export default class Vector {
  x: number;
  y: number;

  constructor([x, y]: number[] = [0, 0]) {
    this.x = x;
    this.y = y;
  }

  get value() {
    return [this.x, this.y];
  }
  get length() {
    return Math.sqrt((Math.abs(this.x) ^ 2) + (Math.abs(this.y) ^ 2));
  }

  set([x, y]: number[]) {
    this.x = x;
    this.y = y;
  }

  add(value: number | Vector) {
    if (typeof value === "number") {
      this.x += value;
      this.y += value;
    }
    if (typeof value === "object") {
      this.x += value.x;
      this.y += value.y;
    }

    return this;
  }

  subract(value: number | Vector) {
    if (typeof value === "number") {
      this.x -= value;
      this.y -= value;
    }
    if (typeof value === "object") {
      this.x -= value.x;
      this.y -= value.y;
    }

    return this;
  }

  multiply(value: number | Vector) {
    if (typeof value === "number") {
      this.x *= value;
      this.y *= value;
    }
    if (typeof value === "object") {
      this.x *= value.x;
      this.y *= value.y;
    }

    return this;
  }

  divide(value: number | Vector) {
    if (typeof value === "number") {
      this.x /= value;
      this.y /= value;
    }
    if (typeof value === "object") {
      this.x /= value.x;
      this.y /= value.y;
    }

    return this;
  }

  invert() {
    this.x = -this.x;
    this.y = -this.y;
  }

  clamp(num: number) {
    this.x = Math.max(Math.min(this.x, num), -num);
    this.x = Math.round(this.x * 1000) / 1000;

    this.y = Math.max(Math.min(this.y, num), -num);
    this.y = Math.round(this.y * 1000) / 1000;
  }

  quantize() {
    if (this.x < 0.005 && this.x > -0.005) this.x = 0;
    if (this.y < 0.005 && this.y > -0.005) this.y = 0;
  }

  scaleTo(factor: number) {
    return this.multiply(factor / this.length);
  }

  direction() {
    switch (true) {
      case Math.abs(this.x) < Math.abs(this.y) && this.y < 0:
        return "up";
      case Math.abs(this.x) < Math.abs(this.y) && this.y > 0:
        return "down";
      case Math.abs(this.x) > Math.abs(this.y) && this.x > 0:
        return "right";
      case Math.abs(this.x) > Math.abs(this.y) && this.x < 0:
        return "left";
      default:
        return console.log("it broke");
    }
  }
}
