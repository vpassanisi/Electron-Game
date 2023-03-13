import type { AnimatedSprite, Container, Graphics } from "Pixi.js";
import type Game from "renderer/index";
import Vector from "renderer/vector";
import Projectile from "renderer/lib/Projectile";
import { Directions, Stats } from "renderer/types";
import { Bodies, Body, Composite, Vector as V, IChamfer } from "matter-js";

export default class Player {
  sprite: AnimatedSprite;
  direction: Vector;
  scalar: number;
  Game: Game;
  lastFired: number;
  hitBox: Body;
  graphics: Graphics;
  readonly _baseStats: Stats;

  constructor(Game: Game) {
    this.Game = Game;
    this.direction = new Vector();
    this._baseStats = {
      speed: 5,
      maxHealth: 100,
      minHealth: 0,
      currentHealth: 100,
      shotSpeed: 5,
      fireDelay: 200,
    };

    this.graphics = new Game.Pixi.Graphics();
    this.graphics.zIndex = this.Game.zIndex.player + 1;
    this.Game.World.addChild(this.graphics);

    this.lastFired = Date.now();
    this.scalar = 1;

    this.hitBox = Bodies.rectangle(
      Game.dimentions.canvasWidth / 2,
      Game.dimentions.canvasHeight / 2,
      50,
      50,
      {
        chamfer: {
          radius: 10,
        },
      }
    );

    this.hitBox.frictionAir = 2.5;

    Composite.add(this.Game.MatterEngine.world, this.hitBox);

    this.sprite = new Game.Pixi.AnimatedSprite(Game.Assets.playerDownTextures);
    this.sprite.animationSpeed = 0;
    this.sprite.play();
    this.sprite.zIndex = Game.zIndex.player;
    this.sprite.anchor.set(0.5, 0.6);
    this.sprite.scale.set(5, 5);
    this.sprite.position.set();
  }

  get stats() {
    return this.Game.UI.Inventory.Equipment.equipedList.reduce((prev, current) => {
      return current.prefixMod1.modify({ cur: prev, player: this });
    }, this._baseStats);
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
    if (analog.length) analog.normalize();

    this.direction = analog;

    const targetAngle = V.angle(
      this.hitBox.position,
      new Vector([this.hitBox.position.x + analog.x, this.hitBox.position.y + analog.y])
    );
    const force = 2;

    if (analog.x || analog.y) {
      Body.applyForce(this.hitBox, this.hitBox.position, {
        x: Math.cos(targetAngle) * force,
        y: Math.sin(targetAngle) * force,
      });
    }

    Body.setAngle(this.hitBox, 0);

    const { up, down, left, right } = this.Game.Controller.keys;
    switch (true) {
      case up:
        this.fire("up");
      case down:
        this.fire("down");
      case left:
        this.fire("left");
      case right:
        this.fire("right");
    }

    this.graphics.clear();
    if (this.Game.state.debug) {
      const path: number[] = [];
      this.hitBox.vertices.forEach((vert) => {
        path.push(vert.x);
        path.push(vert.y);
      });

      this.graphics.clear();
      this.graphics.beginFill(0xff00b8);
      this.graphics.drawPolygon(path);
      this.graphics.endFill();

      this.graphics.beginFill(0xffffff);
      this.graphics.drawCircle(this.hitBox.position.x, this.hitBox.position.y, 3);
      this.graphics.endFill();
    }
  }

  move() {
    this.sprite.position.set(this.hitBox.position.x, this.hitBox.position.y);
    this.setAnimatedTexture();
  }

  setAnimatedTexture() {
    const { x, y } = this.direction;
    const absx = Math.abs(x);
    const absy = Math.abs(y);

    switch (true) {
      case absy > absx && y < 0 && this.sprite.textures != this.Game.Assets.playerUpTextures:
        this.sprite.textures = this.Game.Assets.playerUpTextures;
        this.sprite.play();
        break;
      case absy > absx && y > 0 && this.sprite.textures != this.Game.Assets.playerDownTextures:
        this.sprite.textures = this.Game.Assets.playerDownTextures;
        this.sprite.play();
        break;
      case absx > absy && x < 0 && this.sprite.textures != this.Game.Assets.playerLeftTextures:
        this.sprite.textures = this.Game.Assets.playerLeftTextures;
        this.sprite.play();
        break;
      case absx > absy && x > 0 && this.sprite.textures != this.Game.Assets.playerRightTextures:
        this.sprite.textures = this.Game.Assets.playerRightTextures;
        this.sprite.play();
        break;
    }

    if (absy > absx) this.sprite.animationSpeed = absy / 20;
    else this.sprite.animationSpeed = absx / 20;
  }

  setRoom(container: Container) {
    this.Game.floorMap.currentRoom?.container?.removeChild(this.sprite);
    container.addChild(this.sprite);
  }

  fire(direction: Directions) {
    const { currentRoom } = this.Game.floorMap;
    if (!currentRoom) return;
    if (this.lastFired >= Date.now() - this.stats.fireDelay) return;
    const dir = new Vector();
    switch (true) {
      case direction === "up":
        dir.set([this.direction.x / 10, this.direction.y / 10 + this.stats.shotSpeed * -1]);
        break;
      case direction === "down":
        dir.set([this.direction.x / 10, this.direction.y / 10 + this.stats.shotSpeed]);
        break;
      case direction === "left":
        dir.set([this.direction.x / 10 + this.stats.shotSpeed * -1, this.direction.y / 10]);
        break;
      case direction === "right":
        dir.set([this.direction.x / 10 + this.stats.shotSpeed, this.direction.y / 10]);
        break;
    }
    this.Game.PlayerProjectiles.add(
      new Projectile(
        this.Game,
        currentRoom.container,
        new Vector([this.hitBox.position.x, this.hitBox.position.y]),
        dir
      )
    );
    this.lastFired = Date.now();
  }

  hit(damage: number) {
    this.stats.currentHealth -= damage;
  }
}
