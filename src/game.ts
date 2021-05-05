import { Projectile, Enemy, Rock } from "./lib/entities.js";
import Player from "./lib/player.js";
import Vector from "./lib/vector.js";
import Hud from "./lib/hud.js";
import type { GameState } from "./types";

const game = {
  start: document.timeline ? document.timeline.currentTime : performance.now(),
  root: document.getElementById("app"),
  init() {
    this.gamepad.init();
    this.hud = new Hud(this.player.speed, this.player.friction);
    this.initEnemies();
    this.frame(this.start);

    this.hud.speed.buttonPlus.addEventListener("click", () =>
      this.hud.speed.update(game.player.adjustSpeed(1))
    );
    this.hud.speed.buttonMinus.addEventListener("click", () =>
      this.hud.speed.update(game.player.adjustSpeed(-1))
    );

    this.hud.friction.buttonPlus.addEventListener("click", () =>
      this.hud.friction.update(game.player.adjustFriction(0.1))
    );
    this.hud.friction.buttonMinus.addEventListener("click", () =>
      this.hud.friction.update(game.player.adjustFriction(-0.1))
    );

    this.hud.size.buttonPlus.addEventListener("click", () => game.player.adjustSize(2));
    this.hud.size.buttonMinus.addEventListener("click", () => game.player.adjustSize(-2));
  },
  state: <GameState>{
    paused: true,
    elapsedTime: 0,
  },
  gamepad: {
    init() {
      window.addEventListener("gamepadconnected", this.connect);
      window.addEventListener("gamepaddisconnected", this.disconnect);
    },
    controller: <Gamepad>{},
    turbo: false,
    connect: function (e: GamepadEvent) {
      game.gamepad.controller = e.gamepad;
      console.log("connected");
    },
    disconnect: function (e: GamepadEvent) {
      delete this.controller;
      game.state.paused = true;
      console.log("disconnected");
    },
    update: function () {
      this.controller = navigator.getGamepads()[this.controller.index];
    },
    buttonPressed: function () {
      this.buttonsCache = this.buttonsStatus;
      this.buttonsStatus = {};

      for (let i = 0; i < this.controller.buttons.length; i++) {
        if (this.controller.buttons[i].pressed) {
          this.buttonsStatus[this.buttons[i]] = this.controller.buttons[i];
        }
      }

      if (this.buttonsStatus["Start"] && !this.buttonsCache["Start"]) {
        game.state.paused = !game.state.paused;
      }

      if (game.state.paused) return;

      if (this.buttonsStatus["A"] && !this.buttonsCache["A"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([game.player.direction.x / 10, 5]),
          game.player.positionLeft,
          game.player.bottomSide,
          10,
          10
        );
      }
      if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([5, game.player.direction.y / 10]),
          game.player.rightSide,
          game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([-5, game.player.direction.y / 10]),
          game.player.leftSide,
          game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([game.player.direction.x / 10, -5]),
          game.player.positionLeft,
          game.player.topSide,
          10,
          10
        );
      }

      if (this.buttonsStatus["Select"] && !this.buttonsCache["Select"]) {
        console.log(game.nonPlayerEntities);
      }
    },
    buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Select", "Start"],
    buttonsCache: {},
    buttonsStatus: {},
  },
  player: new Player(),
  initEnemies() {
    let left = this.root.offsetWidth * Math.random();
    let top = this.root.offsetHeight * Math.random();
    this.nonPlayerEntities[this.nonPlayerEntities.length] = new Enemy(
      left,
      top,
      50,
      50,
      4,
      new Vector([game.player.positionLeft - left, game.player.positionTop - top])
    );

    left = this.root.offsetWidth * Math.random();
    top = this.root.offsetHeight * Math.random();
    this.nonPlayerEntities[this.nonPlayerEntities.length] = new Enemy(
      left,
      top,
      50,
      50,
      4,
      new Vector([game.player.positionLeft - left, game.player.positionTop - top])
    );

    left = this.root.offsetWidth * Math.random();
    top = this.root.offsetHeight * Math.random();
    this.nonPlayerEntities[this.nonPlayerEntities.length] = new Rock(left, top, 50, 50);
  },
  nonPlayerEntities: [] as (Enemy | Rock)[],
  playerEntities: [] as Projectile[],
  updatePlayerEntities() {
    for (let i = 0; i < game.playerEntities.length; i++) {
      if (!game.playerEntities[i].update()) {
        game.playerEntities[i].center.remove();
        game.playerEntities.splice(i, 1);
      }
    }
  },
  updateNonPlayerEntities() {
    for (let i = 0; i < game.nonPlayerEntities.length; i++) {
      const update = this.nonPlayerEntities[i].update({
        playerX: game.player.positionLeft,
        playerY: game.player.positionTop,
      });

      if (!update) {
        game.nonPlayerEntities[i].center.remove();
        game.nonPlayerEntities.splice(i, 1);
      }
    }
  },
  renderNonPlayerEntities() {
    game.nonPlayerEntities.forEach((npe) => npe.render());
  },
  detectCollisions() {
    for (let x = 0; x < game.playerEntities.length; x++) {
      for (let y = 0; y < game.nonPlayerEntities.length; y++) {
        const playerEntity = game.playerEntities[x];
        const nonPlayerEntity = game.nonPlayerEntities[y];

        if (!playerEntity || !nonPlayerEntity) continue;

        if (
          playerEntity.leftSide < nonPlayerEntity.rightSide &&
          playerEntity.rightSide > nonPlayerEntity.leftSide &&
          playerEntity.topSide < nonPlayerEntity.bottomSide &&
          playerEntity.bottomSide > nonPlayerEntity.topSide
        ) {
          game.playerEntities[x].center.remove();
          game.playerEntities.splice(x, 1);

          nonPlayerEntity.hit(2);
        }
      }
    }

    for (let x = 0; x < game.nonPlayerEntities.length; x++) {
      for (let y = 0; y < game.nonPlayerEntities.length; y++) {
        if (x === y) continue;
        const entity1 = game.nonPlayerEntities[x];
        const entity2 = game.nonPlayerEntities[y];
        if (!entity1 || !entity2) continue;

        if (
          entity1.leftSide < entity2.rightSide &&
          entity1.rightSide > entity2.leftSide &&
          entity1.topSide < entity2.bottomSide &&
          entity1.bottomSide > entity2.topSide
        ) {
          entity2.nonPlayerCollision(entity1);
        }
      }
    }

    game.nonPlayerEntities.forEach((npe) => {
      const player = game.player;
      if (
        player.positionLeft - player.width / 2 < npe.positionLeft + npe.width / 2 &&
        player.positionLeft + player.width / 2 > npe.positionLeft - npe.width / 2 &&
        player.positionTop - player.height / 2 < npe.positionTop + npe.height / 2 &&
        player.positionTop + player.height / 2 > npe.positionTop - npe.height / 2
      ) {
        player.collision(npe.playerCollision(player));
        npe.playerCollision(player);
      }
    });
  },
  frame(time: number) {
    if (game.gamepad.controller.connected) {
      game.gamepad.update();
      game.gamepad.buttonPressed();
    }

    if (!game.state.paused) {
      game.player.update({
        axes: [...game.gamepad.controller.axes],
        state: game.state,
      });
      game.updatePlayerEntities();
      game.updateNonPlayerEntities();
      game.detectCollisions();

      game.renderNonPlayerEntities();
      game.player.render();
    }

    game.scheduleFrame(time);
  },
  scheduleFrame(time: number) {
    const elapsed = time - this.start;
    const roundedElapsed = Math.round(elapsed / 16) * 16;
    this.state.elapsedTime = roundedElapsed;
    const targetNext = this.start + roundedElapsed + 16;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(this.frame), delay);
  },
};

game.init();
