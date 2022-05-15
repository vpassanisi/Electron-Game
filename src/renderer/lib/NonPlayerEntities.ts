import type Game from "renderer";
import Entity from "renderer/lib/world/Entity";

export default class NonPlayerEntities {
  Game: Game;
  private _list: Record<number, Entity>;
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

  add(e: Entity) {
    this.list[e.id] = e;
  }

  remove(e: Entity) {
    delete this._list[e.id];
  }

  updateAll() {
    for (const key in this._list) {
      this._list[key].update();
    }
  }

  moveAll() {
    for (const key in this._list) {
      this._list[key].move();
    }
  }

  set(e: Entity[]) {
    this._list = e.reduce((prev, e) => {
      prev[e.id] = e;
      return prev;
    }, {} as Record<number, Entity>);
  }
}
