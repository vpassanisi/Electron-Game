import Wall from "./lib/world/Wall";

export interface GameState {
  paused: Boolean;
  debug: Boolean;
}

export interface TileTemplate {
  model?: ModelTemplate;
}

export interface ModelTemplate {
  class: typeof Wall;
  type: string;
}

export interface Tile {
  model?: Wall;
}
