import anime from "animejs";
import type { Texture, Sprite } from "Pixi.js";
import Game from "renderer/index";
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
  getAnimeParams: () => {
    coord: string;
    target: number;
  };
  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.Game = Game;
    this.willLoad = null;
    this.isOpen = false;
    this.roomCoords = roomCoords;
    this.position = new Vector([
      Game.canvas.offsetWidth * roomCoords.x +
        (Game.canvas.offsetWidth / 15) * tileCoords.x,
      Game.canvas.offsetHeight * roomCoords.y +
        (Game.canvas.offsetHeight / 9) * tileCoords.y,
    ]);

    const { x, y } = tileCoords;
    switch (true) {
      case x === 0:
        this.type = "left";
        this.texture = Game.Assets.leftDoorTexture;
        this.openTexture = Game.Assets.leftOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x - this.Game.canvas.offsetWidth,
        });
        break;
      case x === 14:
        this.type = "right";
        this.texture = Game.Assets.rightDoorTexture;
        this.openTexture = Game.Assets.rightOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x + this.Game.canvas.offsetWidth,
        });
        break;
      case y === 0:
        this.type = "top";
        this.texture = Game.Assets.topDoorTexture;
        this.openTexture = Game.Assets.topOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y - this.Game.canvas.offsetHeight,
        });
        break;
      case y === 8:
        this.type = "bottom";
        this.texture = Game.Assets.bottomDoorTexture;
        this.openTexture = Game.Assets.bottomOpenDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y + this.Game.canvas.offsetHeight,
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
    this.sprite.width = Game.canvas.offsetWidth / 15;
    this.sprite.height = Game.canvas.offsetHeight / 9;

    this.hitbox = new PolygonHitbox(Game, {
      verts: [
        new Vector([this.sprite.x, this.sprite.y]),
        new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
        new Vector([
          this.sprite.x + this.sprite.width,
          this.sprite.y + this.sprite.height,
        ]),
        new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
      ],
    });

    Game.Stage.addChild(this.sprite);
  }

  async playerCollision() {
    const { x, y } = getAdjacentCoords(this.roomCoords, this.type);
    this.willLoad = this.Game.floorGrid[y]?.[x]?.room ?? null;
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
    this.Game.currentRoom = nextRoom;
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
    switch (true) {
      case this.type === "left":
        return new Vector([
          this.hitbox.center.x - (this.Game.canvas.offsetWidth / 15) * 2,
          this.hitbox.center.y,
        ]);
      case this.type === "right":
        return new Vector([
          this.hitbox.center.x + (this.Game.canvas.offsetWidth / 15) * 2,
          this.hitbox.center.y,
        ]);
      case this.type === "top":
        return new Vector([
          this.hitbox.center.x,
          this.hitbox.center.y - (this.Game.canvas.offsetHeight / 9) * 2,
        ]);
      case this.type === "bottom":
        return new Vector([
          this.hitbox.center.x,
          this.hitbox.center.y + (this.Game.canvas.offsetHeight / 9) * 2,
        ]);
      default:
        return new Vector();
    }
  }

  remove() {}
  update() {}
  render() {}
}
