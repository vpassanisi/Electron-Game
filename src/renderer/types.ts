import Background from "renderer/lib/world/Background/Background";
import Entity from "renderer/lib/world/Entity/Entity";
import Model from "renderer/lib/world/Model/Model";

export interface GameState {
  paused: Boolean;
  debug: Boolean;
}

export interface Tile {
  model?: Model;
  entity?: Entity;
  background?: Background;
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
  rock = "rock",
}

export enum WallTypes {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
}

export enum DoorTypes {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
}

export enum BackgroundTypes {
  wood = "wood",
  carpetTop = "top",
  carpetLeft = "left",
  carpetRight = "right",
  carpetBottom = "bottom",
  carpetCenter = "center",
  carpetTopLeft = "topLeft",
  carpetTopRight = "topRight",
  carpetBottomLeft = "bottomLeft",
  carpetBottomRight = "bottomRight",
}

export interface TileDef {
  model?: () => Model;
  background?: () => Background;
  entity?: () => Entity;
}
