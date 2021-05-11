import type { TileType, GameType } from "../../types";

export class Room {
  iX: number;
  iY: number;
  game: GameType;
  isOpen: boolean;
  tileWidth: number;
  tileHeight: number;
  roomWidth: number;
  roomHeight: number;
  layout: TileType[][];
  constructor(game: GameType, iX: number, iY: number, layout: TileType[][]) {
    this.iX = iX;
    this.iY = iY;
    this.layout = layout;
    this.game = game;
    this.isOpen = false;
    this.tileWidth = game.camera.offsetWidth / 15;
    this.tileHeight = game.camera.offsetHeight / 9;
    this.roomWidth = game.camera.offsetWidth;
    this.roomHeight = game.camera.offsetHeight;

    layout.forEach((row, i) => {
      row.forEach((tile, j, arr) => {
        if (!tile.entity) return;
        arr[j].mounted = new tile.entity(
          this.game,
          this.roomWidth * iX + (this.tileWidth * (j + 1) - this.tileWidth) + this.tileWidth / 2,
          this.roomHeight * iY +
            (this.tileHeight * (i + 1) - this.tileHeight) +
            this.tileHeight / 2,
          tile.type
        );
      });
    });
  }

  mount() {
    this.layout.forEach((row) => {
      row.forEach((tile) => {
        if (!tile.mounted) return;
        this.game.nonPlayerEntities[this.game.nonPlayerEntities.length] = tile.mounted;
      });
    });
  }

  unmount() {
    this.game.nonPlayerEntities = [];
  }

  open() {
    this.isOpen = true;
    this.layout.forEach((row) => {
      row.forEach((tile) => {
        if (tile.mounted?.constructor.name === "Door") {
          tile.mounted.open();
        }
      });
    });
  }
}
