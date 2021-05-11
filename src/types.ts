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
  enemySpriteSheet: HTMLImageElement;
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
  check: boolean;
  timer: (timer: number) => void;
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
  /**
   * entity that will spawn on this tile
   */
  entity?: typeof Rock | typeof Enemy | typeof Door | typeof Wall;
  /**
   * string representing the type of the entity to be mounted
   */
  type?: string;
  /**
   * when the room is initialized, the entity for this tile will be instanctiated here
   */
  mounted?: Entity;
  /**
   * [x,y] index on the spritesheet to render for the background of the tile
   */
  bg?: number[];
}
export interface RoomType {
  layout: TileType[][];
}
