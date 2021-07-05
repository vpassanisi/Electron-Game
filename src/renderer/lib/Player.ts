import type * as PIXI from "Pixi.js";
import type Game from "../index";
import Vector from "../vector";

export default class Player {
  x: number;
  y: number;
  speed: number;
  friction: number;
  direction: Vector;
  texture: PIXI.Texture | undefined;
  sprite: PIXI.Sprite | undefined;

  constructor(Game: Game) {
    this.x = 100;
    this.y = 100;
    this.speed = 20;
    this.friction = 0.9;
    this.direction = new Vector([0, 0]);

    this.texture = new Game.Pixi.Texture(
      Game.playerBaseTexture,
      new Game.Pixi.Rectangle(0, 0, 16, 16)
    );
    this.sprite = new Game.Pixi.Sprite(this.texture);
    const scalar = Game.pixiApp.view.width / 175;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.scale.set(scalar, scalar);
    Game.pixiApp.stage.addChild(this.sprite);
  }

  update(Game: Game) {
    const analog = new Vector([
      Game.Controller.state?.axes[0] ?? 0,
      Game.Controller.state?.axes[1] ?? 0,
    ]).multiply(this.speed * 0.1);

    this.direction.add(analog);

    // slow down the player smoothly
    this.direction.multiply(this.friction);

    this.direction.quantize();
    this.direction.clamp(this.speed);
  }

  render() {
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.sprite?.position.set(this.x, this.y);
  }

  fire(direction: string) {
    console.log(direction);
  }
}
