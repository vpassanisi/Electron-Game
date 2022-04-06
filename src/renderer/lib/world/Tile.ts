import Model from "renderer/lib/world/Model/Model";
import Background from "renderer/lib/world/Background/Background";
import type Entity from "renderer/lib/world/Entity/Entity";
import type Game from "renderer";
import type Vector from "renderer/vector";

export default class Tile {
  background?: Background;
  model?: Model;
  entity?: Entity;
  Game: Game;
  tileCoords: Vector;
  roomCoords: Vector;

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.Game = Game;
    this.tileCoords = tileCoords;
    this.roomCoords = roomCoords;
  }
}
