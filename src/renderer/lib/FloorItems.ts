import type Game from "renderer";
import { Item } from "renderer/lib/world/Item";

export default class FloorItems {
  Game: Game;
  private _list: Record<number, Item>;
  constructor(Game: Game) {
    this.Game = Game;
    this._list = {};
  }

  get list() {
    return this._list;
  }

  get numberOfItems() {
    return Object.keys(this._list).length;
  }

  add(e: Item) {
    this.list[e.id] = e;
  }

  remove(e: Item) {
    delete this._list[e.id];
  }
}
