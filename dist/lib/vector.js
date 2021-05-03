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
        this.x = x;
        this.y = y;
    }
    add(value) {
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
    subract(value) {
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
    multiply(value) {
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
    divide(value) {
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
    clamp(num) {
        this.x = Math.max(Math.min(this.x, num), -num);
        this.x = Math.round(this.x * 1000) / 1000;
        this.y = Math.max(Math.min(this.y, num), -num);
        this.y = Math.round(this.y * 1000) / 1000;
    }
    quantize() {
        if (this.x < 0.005 && this.x > -0.005)
            this.x = 0;
        if (this.y < 0.005 && this.y > -0.005)
            this.y = 0;
    }
    scaleTo(factor) {
        return this.multiply(factor / this.length);
    }
}
//# sourceMappingURL=vector.js.map