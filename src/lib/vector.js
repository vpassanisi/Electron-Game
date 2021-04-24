export default class Vector {
  constructor([x, y] = [0, 0]) {
    this.x = x;
    this.y = y;
  }
  get value() {
    return [this.x, this.y];
  }

  set([x, y]) {
    this.x = x;
    this.y = y;
  }

  add(val) {
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
    if (typeof val === "object") {
      this.x *= val.x;
      this.y *= val.y;
    }
    if (typeof val === "number") {
      this.x *= val;
      this.y *= val;
    }
  }

  divide(val) {
    if (typeof val === "object") {
      this.x /= val.x;
      this.y /= val.y;
    }
    if (typeof val === "number") {
      this.x /= val;
      this.y /= val;
    }
  }

  clamp(val) {
    this.x = Math.max(Math.min(this.x, val), -val);
    this.x = Math.round(this.x * 1000) / 1000;

    this.y = Math.max(Math.min(this.y, val), -val);
    this.y = Math.round(this.y * 1000) / 1000;
  }

  quantize() {
    if (this.x < 0.005 && this.x > -0.005) this.x = 0;
    if (this.y < 0.005 && this.y > -0.005) this.y = 0;
  }
}
