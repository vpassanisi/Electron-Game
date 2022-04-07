import type { Sprite, AnimatedSprite } from "Pixi.js";
import type Game from "renderer/index";
import Vector from "renderer/vector";
import Entity from "renderer/lib/world/Entity/Entity";
import Model from "renderer/lib/world/Model/Model";
import Projectile from "renderer/lib/world/Entity/Projectile";

export default class Player {
  speed: number;
  friction: number;
  direction: Vector;
  sprite: AnimatedSprite;
  scalar: number;
  Game: Game;
  hitBox: Sprite;
  fireDelay: number;
  lastFired: number;
  shotSpeed: number;

  constructor(Game: Game) {
    this.Game = Game;
    this.speed = 5;
    this.shotSpeed = 2;
    this.friction = 0.9;
    this.fireDelay = 200;
    this.lastFired = Date.now();
    this.direction = new Vector([0, 0]);
    this.scalar = 5;

    this.sprite = new Game.Pixi.AnimatedSprite(Game.Assets.playerDownTextures);
    this.sprite.animationSpeed = 0;
    this.sprite.play();
    this.sprite.zIndex = Game.zIndex.player;
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.anchor.set(0.29, 0.4);
    this.sprite.position.set(
      Game.canvas.offsetWidth * Game.startingRoom.x +
        Game.canvas.offsetWidth / 2,
      Game.canvas.offsetHeight * Game.startingRoom.y +
        Game.canvas.offsetHeight / 2
    );

    this.hitBox = new this.Game.Pixi.Sprite(Game.Pixi.Texture.WHITE);
    this.hitBox.zIndex = Game.zIndex.player;
    this.hitBox.tint = 0xff00b8;
    this.hitBox.scale.set(this.scalar / 2.5, this.scalar / 2.75);
    this.hitBox.position.set(
      Game.canvas.offsetWidth * Game.startingRoom.x +
        Game.canvas.offsetWidth / 2,
      Game.canvas.offsetHeight * Game.startingRoom.y +
        Game.canvas.offsetHeight / 2
    );

    Game.Stage.addChild(this.sprite);
    Game.Stage.addChild(this.hitBox);
  }

  get leftSide() {
    return this.hitBox.x;
  }
  get rightSide() {
    return this.hitBox.x + this.hitBox.width;
  }
  get topSide() {
    return this.hitBox.y;
  }
  get bottomSide() {
    return this.hitBox.y + this.hitBox.height;
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor(
        (this.hitBox.x +
          this.hitBox.width / 2 -
          this.Game.canvas.offsetWidth * this.Game.currentRoom.coords.x) /
          (this.Game.canvas.offsetWidth / 15)
      ),
      Math.floor(
        (this.hitBox.y +
          this.hitBox.height / 2 -
          this.Game.canvas.offsetHeight * this.Game.currentRoom.coords.y) /
          (this.Game.canvas.offsetHeight / 9)
      ),
    ]);
  }

  setPositionOfLeft(coord: number) {
    this.hitBox.position.set(coord, this.hitBox.position.y);
  }
  setPositionOfRight(coord: number) {
    this.hitBox.position.set(coord - this.hitBox.width, this.hitBox.position.y);
  }
  setPositionOfTop(coord: number) {
    this.hitBox.position.set(this.hitBox.position.x, coord);
  }
  setPositionOfBottom(coord: number) {
    this.hitBox.position.set(
      this.hitBox.position.x,
      coord - this.hitBox.height
    );
  }

  modelCollision(model: Model) {
    const left = Math.abs(this.rightSide - model.leftSide);
    const right = Math.abs(this.leftSide - model.rightSide);
    const top = Math.abs(this.bottomSide - model.topSide);
    const bottom = Math.abs(this.topSide - model.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    switch (true) {
      case right === smallest:
        this.direction.x = 0;
        this.setPositionOfLeft(model.rightSide);
        break;
      case left === smallest:
        this.direction.x = 0;
        this.setPositionOfRight(model.leftSide);
        break;
      case top === smallest:
        this.direction.y = 0;
        this.setPositionOfBottom(model.topSide);
        break;
      case bottom === smallest:
        this.direction.y = 0;
        this.setPositionOfTop(model.bottomSide);
        break;
    }
  }

  entityCollision(entity: Entity) {
    const left = Math.abs(this.rightSide - entity.leftSide);
    const right = Math.abs(this.leftSide - entity.rightSide);
    const top = Math.abs(this.bottomSide - entity.topSide);
    const bottom = Math.abs(this.topSide - entity.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    switch (true) {
      case right === smallest:
        this.direction.x = 0;
        this.setPositionOfLeft(entity.rightSide);
        break;
      case left === smallest:
        this.direction.x = 0;
        this.setPositionOfRight(entity.leftSide);
        break;
      case top === smallest:
        this.direction.y = 0;
        this.setPositionOfBottom(entity.topSide);
        break;
      case bottom === smallest:
        this.direction.y = 0;
        this.setPositionOfTop(entity.bottomSide);
        break;
    }
  }

  toggleHitBox() {
    this.hitBox.visible = !this.hitBox.visible;
  }

  update(Game: Game) {
    let analog = new Vector();
    if (Game.Controller.Gamepad) {
      analog.x = Game.Controller.Gamepad.axes[0] ?? 0;
      analog.y = Game.Controller.Gamepad.axes[1] ?? 0;
    }
    const { w, a, s, d } = Game.Controller.keys;
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

    this.hitBox.position.set(
      this.hitBox.position.x + this.direction.x,
      this.hitBox.position.y + this.direction.y
    );
  }

  move() {
    this.sprite.position.set(this.hitBox.x, this.hitBox.y);
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
    this.Game.PlayerEntities.push(
      new Projectile(
        this.Game,
        new Vector([this.hitBox.position.x, this.hitBox.position.y]),
        dir
      )
    );
    this.lastFired = Date.now();
  }
}
