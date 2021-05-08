import { Enemy, Rock } from "./lib/entities";

export interface GameType {
  start: number;
  root: HTMLElement;
  state: GameState;
  gamepad: GamepadType;
}

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

export interface GamepadType {
  init: () => void;
  controller: Gamepad;
  turbo: boolean;
}
