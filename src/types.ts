import { Enemy, Entity, Rock } from "./lib/entities";

export interface GameState {
  paused: boolean;
  elapsedTime: number;
}

export interface UpdateData {
  axes: number[];
  state: GameState;
}

export interface Tile {
  entity?: typeof Rock | typeof Enemy;
}
