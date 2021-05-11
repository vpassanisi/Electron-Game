import { Enemy, Entity, Rock, Door } from "./lib/entities";
import { Wall } from "./lib/entities/wall";
import Player from "./lib/player";
import { Room } from "./lib/world/room";

export interface GameType {
  start: number;
  camera: HTMLElement;
  canvas: HTMLElement;
  ctx?: CanvasRenderingContext2D;
  playerSpriteSheet: HTMLImageElement;
  envSpriteSheet: HTMLImageElement;
  init: () => void;
  state: GameState;
  gamepad: GamepadType;
  player?: Player;
  loadRoomToTheRight: () => void;
  loadRoomToTheLeft: () => void;
  loadRoomToTheBottom: () => void;
  loadRoomToTheTop: () => void;
  initFloor: () => void;
  nonPlayerEntities: Array<Entity>;
  playerEntities: Array<Entity>;
  updatePlayerEntities: () => void;
  updateNonPlayerEntities: () => void;
  render: () => void;
  detectCollisions: () => void;
  frame: (time: number) => void;
  scheduleFrame: (timer: number) => void;
}

interface CurrentRoom {
  x: number;
  y: number;
}

export interface GameState {
  paused: boolean;
  elapsedTime: number;
  map: Room[][];
  currentRoom: CurrentRoom;
  debug: boolean;
}

export interface UpdateData {
  axes: number[];
  state: GameState;
}

export interface GamepadType {
  init: () => void;
  controller: Gamepad;
  turbo: boolean;
  connect: (e: GamepadEvent) => void;
  disconnect: (e: GamepadEvent) => void;
  update: () => void;
  buttonPressed: () => void;
  buttons: Array<string>;
}

export interface TileType {
  entity?: typeof Rock | typeof Enemy | typeof Door | typeof Wall;
  type?: string;
  mounted?: Entity;
  bg?: number[];
}
export interface RoomType {
  layout: TileType[][];
}
