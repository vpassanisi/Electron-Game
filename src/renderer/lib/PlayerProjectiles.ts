import Game from "renderer";
import Projectile from "renderer/lib/Projectile";

export default class PlayerEntities {
  Game: Game;
  private _list: Projectile[];
  constructor(Game: Game) {
    this.Game = Game;
    this._list = [];
  }

  get list() {
    return this._list;
  }

  get numberOfEntities() {
    return this._list.length;
  }

  add(...e: Projectile[]) {
    this.list.push(...e);
  }

  remove(e: Projectile) {
    this._list = this.list.filter((p) => p.id != e.id);
  }

  deleteAll() {
    for (const p of this._list) {
      p.remove();
    }
  }

  updateAll() {
    for (const npe of this._list) {
      npe.update();
    }
  }

  moveAll() {
    for (const npe of this._list) {
      npe.move();
    }
  }

  set(e: Projectile[]) {
    this._list = e;
  }
}
