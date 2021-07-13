import Game from "src/renderer";
import Vector from "src/renderer/vector";
import Model from "./Model";

export default class Rock extends Model {
  constructor(Game: Game, type: string, coords: Vector) {
    super(Game, type, coords);
  }
}
