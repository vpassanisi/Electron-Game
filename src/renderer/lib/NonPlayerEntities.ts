import Game from "renderer";
import Entity from "renderer/lib/world/Entity";

export default class NonPlayerEntities {
  Game: Game;
  private _list: Entity[];
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

  add(...e: Entity[]) {
    this.list.push(...e);
  }

  remove(e: Entity) {
    this._list = this.list.filter((npe) => npe.id != e.id);
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

  set(e: Entity[]) {
    this._list = e;
  }
}
