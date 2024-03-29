import Model from "renderer/lib/world/Model";
import Background from "renderer/lib/world/Background";
import type Entity from "renderer/lib/world/Entity";
import type Game from "renderer";
import type Vector from "renderer/vector";
import Room from "renderer/lib/world/Room";

export default class Tile {
  background?: Background;
  model?: Model;
  entity?: Entity;
  Game: Game;
  tileCoords: Vector;
  roomCoords: Vector;
  room: Room;

  constructor(Game: Game, room: Room, tileCoords: Vector, roomCoords: Vector) {
    this.Game = Game;
    this.room = room;
    this.tileCoords = tileCoords;
    this.roomCoords = roomCoords;
  }
}
