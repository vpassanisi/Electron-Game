import Model from "./lib/world/Model/Model";
export interface GameState {
  paused: Boolean;
  debug: Boolean;
}

export interface TileTemplate {
  model?: Models;
  modelType?: ModelTypes;
}

export interface Tile {
  model?: Model;
}

export enum Models {
  Wall = "Wall",
  Rock = "Rock",
  Door = "Door",
}

export enum ModelTypes {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
}
