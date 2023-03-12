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
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
    ]);

    const { x, y } = tileCoords;
    switch (true) {
      case x === 0:
        this.type = "left";
        this.texture = Game.Assets.leftDoorTexture;
        this.openTexture = Game.Assets.leftOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x - this.Game.dimentions.canvasWidth,
        });
        break;
      case x === 14:
        this.type = "right";
        this.texture = Game.Assets.rightDoorTexture;
        this.openTexture = Game.Assets.rightOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x + this.Game.dimentions.canvasWidth,
        });
        break;
      case y === 0:
        this.type = "top";
        this.texture = Game.Assets.topDoorTexture;
        this.openTexture = Game.Assets.topOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y - this.Game.dimentions.canvasHeight,
        });
        break;
      case y === 8:
        this.type = "bottom";
        this.texture = Game.Assets.bottomDoorTexture;
        this.openTexture = Game.Assets.bottomOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y + this.Game.dimentions.canvasHeight,
        });
        break;
      default:
        this.type = "top";
        this.texture = Game.Assets.bottomDoorTexture;
        this.openTexture = Game.Assets.bottomOpenDoorTexture;
        this.getAnimeParams = () => ({ coord: "y", target: 0 });
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;

    this.hitbox = new PolygonHitbox({
      Game,
      parent: room.container,
      args: {
        verts: [
          new Vector([this.sprite.x, this.sprite.y]),
          new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
          new Vector([
            this.sprite.x + this.sprite.width,
            this.sprite.y + this.sprite.height,
          ]),
          new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
        ],
      },
    });

    room.container.addChild(this.sprite);
  }

  async playerCollision() {
    const { x, y } = getAdjacentCoords(this.roomCoords, this.type);
    this.willLoad = this.Game.floorMap.grid[y]?.[x]?.room ?? null;
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
    this.Game.floorMap.setCurrentRoom(nextRoom);
    this.Game.Player.direction.x = 0;
    this.Game.Player.direction.y = 0;
    this.Game.Player.hitBox.moveTo(this.getDestinationCoords());
    this.Game.Player.move();
    setTimeout(() => (this.Game.state.paused = false), 200);
  }

  open() {
    this.isOpen = true;
    this.sprite.texture = this.openTexture;
    switch (true) {
      case this.type === "left":
        this.hitbox.setHitbox({
          verts: [
            new Vector([this.sprite.x, this.sprite.y]),
            new Vector([this.sprite.x + this.sprite.width / 2, this.sprite.y]),
            new Vector([
              this.sprite.x + this.sprite.width / 2,
              this.sprite.y + this.sprite.height,
            ]),
            new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
          ],
        });
        break;
      case this.type === "right":
        this.hitbox.setHitbox({
          verts: [
            new Vector([this.sprite.x + this.sprite.width / 2, this.sprite.y]),
            new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
            new Vector([
              this.sprite.x + this.sprite.width,
              this.sprite.y + this.sprite.height,
            ]),
            new Vector([
              this.sprite.x + this.sprite.width / 2,
              this.sprite.y + this.sprite.height,
            ]),
          ],
        });
        break;
      case this.type === "top":
        this.hitbox.setHitbox({
          verts: [
            new Vector([this.sprite.x, this.sprite.y]),
            new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
            new Vector([
              this.sprite.x + this.sprite.width,
              this.sprite.y + this.sprite.height / 2,
            ]),
            new Vector([this.sprite.x, this.sprite.y + this.sprite.height / 2]),
          ],
        });
        break;
      case this.type === "bottom":
        this.hitbox.setHitbox({
          verts: [
            new Vector([this.sprite.x, this.sprite.y + this.sprite.height / 2]),
            new Vector([
              this.sprite.x + this.sprite.width,
              this.sprite.y + this.sprite.height / 2,
            ]),
            new Vector([
              this.sprite.x + this.sprite.width,
              this.sprite.y + this.sprite.height,
            ]),
            new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
          ],
        });
        break;
    }
  }

  getDestinationCoords() {
    const { tileHeight, tileWidth } = this.Game.dimentions;
    switch (true) {
      case this.type === "left":
        return new Vector([
          tileWidth * 13 + tileWidth / 2,
          this.hitbox.center.y,
        ]);
      case this.type === "right":
        return new Vector([tileWidth + tileWidth / 2, this.hitbox.center.y]);
      case this.type === "top":
        return new Vector([
          this.hitbox.center.x,
          tileHeight * 7 + tileHeight / 2,
        ]);
      case this.type === "bottom":
        return new Vector([this.hitbox.center.x, tileHeight + tileHeight / 2]);
      default:
        return new Vector();
    }
  }

  remove() {}
  update() {}
  render() {}
}
