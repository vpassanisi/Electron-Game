import type { AnimatedSprite } from "Pixi.js";
import type Game from "renderer/index";
import Vector from "renderer/vector";
import Projectile from "renderer/lib/Projectile";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export default class Player {
  speed: number;
  friction: number;
  direction: Vector;
  sprite: AnimatedSprite;
  scalar: number;
  Game: Game;
  hitBox: PolygonHitbox;
  fireDelay: number;
  lastFired: number;
  shotSpeed: number;

  constructor(Game: Game) {
    this.Game = Game;
    this.speed = 5;
    this.shotSpeed = 5;
    this.friction = 0.9;
    this.fireDelay = 200;
    this.lastFired = Date.now();
    this.direction = new Vector([0, 0]);
    this.scalar = 5;

    const p1 = new Vector([
      Game.canvas.offsetWidth * Game.startingRoom.x +
        Game.canvas.offsetWidth / 2,
      Game.canvas.offsetHeight * Game.startingRoom.y +
        Game.canvas.offsetHeight / 2,
    ]);
    this.hitBox = new PolygonHitbox(Game, [
      p1,
      new Vector([p1.x + 20, p1.y]),
      new Vector([p1.x + 20, p1.y + 20]),
      new Vector([p1.x, p1.y + 20]),
    ]);
    this.hitBox.scale(this.scalar * 0.4);

    this.sprite = new Game.Pixi.AnimatedSprite(Game.Assets.playerDownTextures);
    this.sprite.animationSpeed = 0;
    this.sprite.play();
    this.sprite.zIndex = Game.zIndex.player;
    this.sprite.anchor.set(0.5, 0.6);
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.position.set(this.hitBox.center.x, this.hitBox.center.y);

    Game.Stage.addChild(this.sprite);
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor(
        (this.hitBox.center.x -
          this.Game.canvas.offsetWidth * this.Game.currentRoom.coords.x) /
          (this.Game.canvas.offsetWidth / 15)
      ),
      Math.floor(
        (this.hitBox.center.y -
          this.Game.canvas.offsetHeight * this.Game.currentRoom.coords.y) /
          (this.Game.canvas.offsetHeight / 9)
      ),
    ]);
  }

  update() {
    let analog = new Vector();
    if (this.Game.Controller.Gamepad) {
      analog.x = this.Game.Controller.Gamepad.axes[0] ?? 0;
      analog.y = this.Game.Controller.Gamepad.axes[1] ?? 0;
    }
    const { w, a, s, d } = this.Game.Controller.keys;
    if (w) analog.y = -1;
    if (a) analog.x = -1;
    if (s) analog.y = 1;
    if (d) analog.x = 1;

    analog.deadZone().multiply(this.speed * 0.1);

    this.direction.add(analog);

    // slow down the player smoothly
    this.direction.multiply(this.friction);

    this.direction.quantize();
    this.direction.clamp(this.speed);

    this.hitBox.move(this.direction);
  }

  move() {
    this.sprite.position.set(this.hitBox.center.x, this.hitBox.center.y);
    this.setAnimatedTexture();
  }

  setAnimatedTexture() {
    const { x, y } = this.direction;
    const absx = Math.abs(x);
    const absy = Math.abs(y);

    switch (true) {
      case absy > absx &&
        y < 0 &&
        this.sprite.textures != this.Game.Assets.playerUpTextures:
        this.sprite.textures = this.Game.Assets.playerUpTextures;
        this.sprite.play();
        break;
      case absy > absx &&
        y > 0 &&
        this.sprite.textures != this.Game.Assets.playerDownTextures:
        this.sprite.textures = this.Game.Assets.playerDownTextures;
        this.sprite.play();
        break;
      case absx > absy &&
        x < 0 &&
        this.sprite.textures != this.Game.Assets.playerLeftTextures:
        this.sprite.textures = this.Game.Assets.playerLeftTextures;
        this.sprite.play();
        break;
      case absx > absy &&
        x > 0 &&
        this.sprite.textures != this.Game.Assets.playerRightTextures:
        this.sprite.textures = this.Game.Assets.playerRightTextures;
        this.sprite.play();
        break;
    }

    if (absy > absx) this.sprite.animationSpeed = absy / 20;
    else this.sprite.animationSpeed = absx / 20;
  }

  fire(direction: string) {
    if (this.lastFired >= Date.now() - this.fireDelay) return;
    const dir = new Vector();
    switch (true) {
      case direction === "up":
        dir.set([
          this.direction.x / 10,
          this.direction.y / 10 + this.shotSpeed * -1,
        ]);
        break;
      case direction === "down":
        dir.set([
          this.direction.x / 10,
          this.direction.y / 10 + this.shotSpeed,
        ]);
        break;
      case direction === "left":
        dir.set([
          this.direction.x / 10 + this.shotSpeed * -1,
          this.direction.y / 10,
        ]);
        break;
      case direction === "right":
        dir.set([
          this.direction.x / 10 + this.shotSpeed,
          this.direction.y / 10,
        ]);
        break;
    }
    this.Game.PlayerProjectiles.add(
      new Projectile(
        this.Game,
        new Vector([this.hitBox.center.x, this.hitBox.center.y]),
        dir
      )
    );
    this.lastFired = Date.now();
  }
}
