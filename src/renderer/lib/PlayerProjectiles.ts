import Game from "renderer";
import Projectile from "renderer/lib/Projectile";

export default class PlayerEntities {
  Game: Game;
  private _list: Record<string, Projectile>;
  constructor(Game: Game) {
    this.Game = Game;
    this._list = {};
  }

  get list() {
    return this._list;
  }

  get numberOfEntities() {
    return Object.keys(this._list).length;
  }

  add(e: Projectile) {
    this.list[e.id] = e;
  }

  remove(e: Projectile) {
    delete this._list[e.id];
  }

  deleteAll() {
    for (const p in this._list) {
      this._list[p].remove();
    }
  }

  updateAll() {
    for (const p in this._list) {
      this._list[p].update();
    }
  }

  moveAll() {
    for (const p in this._list) {
      this._list[p].move();
    }
  }
}
