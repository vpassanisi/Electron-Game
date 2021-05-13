/**
 * A Model is stationary and does not check for collisions with other models or entitites,
 * but other entities check for collisions with a Model
 */
export class Model {
    constructor(game) {
        this.game = game;
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
    open() { }
}
//# sourceMappingURL=model.js.map