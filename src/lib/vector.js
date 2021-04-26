export default class Vector {
  constructor([x, y] = [0, 0]) {
    this.x = x;
    this.y = y;
  }
  get value() {
    return [this.x, this.y];
  }
  get length() {
    return Math.sqrt((Math.abs(this.x) ^ 2) + (Math.abs(this.y) ^ 2));
  }

  set([x, y]) {
    x ??= 0;
    y ??= 0;

    this.x = x;
    this.y = y;
  }

  add(val) {
    val ??= 0;

    if (typeof val === "object") {
      this.x += val.x;
      this.y += val.y;
    }
    if (typeof val === "number") {
      this.x += val;
      this.y += val;
    }
  }

  subract(val) {
    val ??= 0;

    if (typeof val === "object") {
      this.x -= val.x;
      this.y -= val.y;
    }
    if (typeof val === "number") {
      this.x -= val;
      this.y -= val;
    }
  }

  multiply(val) {
    val ??= 0;

    if (typeof val === "object") {
      this.x *= val.x;
      this.y *= val.y;
    }
    if (typeof val === "number") {
      this.x *= val;
      this.y *= val;
    }

    return this;
  }

  divide(val) {
    val ??= 0;

    if (typeof val === "object") {
      this.x /= val.x;
      this.y /= val.y;
    }
    if (typeof val === "number") {
      this.x /= val;
      this.y /= val;
    }
  }

  invert() {
    this.x = -this.x;
    this.y = -this.y;
  }

  clamp(val) {
    val ??= 0;

    this.x = Math.max(Math.min(this.x, val), -val);
    this.x = Math.round(this.x * 1000) / 1000;

    this.y = Math.max(Math.min(this.y, val), -val);
    this.y = Math.round(this.y * 1000) / 1000;
  }

  quantize() {
    if (this.x < 0.005 && this.x > -0.005) this.x = 0;
    if (this.y < 0.005 && this.y > -0.005) this.y = 0;
  }

  scaleTo(num) {
    return this.multiply(num / this.length);
  }
}
