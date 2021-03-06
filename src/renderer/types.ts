import Vector from "renderer/vector";

export interface GameState {
  paused: Boolean;
  debug: Boolean;
}
export interface hitboxVerts {
  verts: Vector[];
}

export interface hitboxDeltas {
  center: Vector;
  deltas: Vector[];
}

export type PlayerStats = {
  speed: number;
  health: number;
  fireDelay: number;
  shotSpeed: number;
};

export interface satResult {
  collision: boolean;
  axis: Vector;
  distance: number;
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
