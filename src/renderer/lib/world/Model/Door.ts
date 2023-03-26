import anime from "animejs";
import type { Texture, Sprite } from "Pixi.js";
import type Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import Room from "renderer/lib/world/Room";
import { getAdjacentCoords } from "renderer/util/generalUtil";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export default class Door implements Model {
  position: Vector;
  texture: Texture;
  openTexture: Texture;
  sprite: Sprite;
  willLoad: Room | null;
  Game: Game;
  type: string;
  roomCoords: Vector;
  isOpen: boolean;
  hitbox: PolygonHitbox;
  sensor: PolygonHitbox | null;
  room: Room;
  getAnimeParams: () => {
    coord: string;
    target: number;
  };

  constructor(Game: Game, room: Room, tileCoords: Vector, roomCoords: Vector) {
    this.Game = Game;
    this.willLoad = null;
    this.isOpen = false;
    this.roomCoords = roomCoords;
    this.room = room;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x + Game.dimentions.tileWidth / 2,
      Game.dimentions.tileHeight * tileCoords.y + Game.dimentions.tileHeight / 2,
    ]);

    const { x, y } = tileCoords;
    switch (true) {
      case x === 0:
        this.type = "left";
        this.texture = Game.Assets.textures.leftDoorTexture;
        this.openTexture = Game.Assets.textures.leftOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x - this.Game.dimentions.canvasWidth,
        });
        break;
      case x === 14:
        this.type = "right";
        this.texture = Game.Assets.textures.rightDoorTexture;
        this.openTexture = Game.Assets.textures.rightOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x + this.Game.dimentions.canvasWidth,
        });
        break;
      case y === 0:
        this.type = "top";
        this.texture = Game.Assets.textures.topDoorTexture;
        this.openTexture = Game.Assets.textures.topOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y - this.Game.dimentions.canvasHeight,
        });
        break;
      case y === 8:
        this.type = "bottom";
        this.texture = Game.Assets.textures.bottomDoorTexture;
        this.openTexture = Game.Assets.textures.bottomOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y + this.Game.dimentions.canvasHeight,
        });
        break;
      default:
        this.type = "top";
        this.texture = Game.Assets.textures.bottomDoorTexture;
        this.openTexture = Game.Assets.textures.bottomOpenDoorTexture;
        this.getAnimeParams = () => ({ coord: "y", target: 0 });
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;

    this.hitbox = new PolygonHitbox({
      Game,
      hitboxDimentions: {
        center: this.position,
        height: this.Game.dimentions.tileHeight,
        width: this.Game.dimentions.tileWidth,
      },
    });

    this.sensor = null;

    room.container.addChild(this.sprite);
  }

  async playerCollision() {
    const { x, y } = getAdjacentCoords(this.roomCoords, this.type);
    this.willLoad = this.Game.FloorMap.grid[y]?.[x]?.room ?? null;
    this.willLoad && this.isOpen && (await this.moveStage(this.willLoad));
  }

  private async moveStage(nextRoom: Room) {
    this.Game.state.paused = true;
    const params = this.getAnimeParams();
    await anime({
      targets: [this.Game.Stage.pivot],
      [params.coord]: params.target,
      round: 1,
      duration: 300,
      easing: "easeInQuad",
    }).finished;
    this.Game.PlayerProjectiles.deleteAll();
    this.Game.Player.setRoom(nextRoom.container);
    this.Game.FloorMap.setCurrentRoom(nextRoom);
    this.Game.Player.direction.x = 0;
    this.Game.Player.direction.y = 0;
    this.Game.Player.hitBox.moveTo(this.getDestinationCoords());
    this.Game.Player.move();
    setTimeout(() => (this.Game.state.paused = false), 200);
  }

  open() {
    this.isOpen = true;
    this.sprite.texture = this.openTexture;
  }

  getDestinationCoords() {
    const { tileHeight, tileWidth } = this.Game.dimentions;
    switch (true) {
      case this.type === "left":
        return new Vector([tileWidth * 13 + tileWidth / 2, this.hitbox.center.y]);
      case this.type === "right":
        return new Vector([tileWidth + tileWidth / 2, this.hitbox.center.y]);
      case this.type === "top":
        return new Vector([this.hitbox.center.x, tileHeight * 7 + tileHeight / 2]);
      case this.type === "bottom":
        return new Vector([this.hitbox.center.x, tileHeight + tileHeight / 2]);
      default:
        return new Vector();
    }
  }

  playerSensorCollision() {}
  remove() {}
  update() {}
  render() {}
}
