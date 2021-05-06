export class Entity {
    constructor() {
        this.center = document.createElement("div");
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
    update(player) {
        return true;
    }
    hit(damage) { }
    nonPlayerCollision(nonPlayerEntity) { }
    playerCollision(player) {
        const x = () => "";
        return x;
    }
    render() { }
}
//# sourceMappingURL=entity.js.map