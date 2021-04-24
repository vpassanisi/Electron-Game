import { Projectile, Enemy } from "./lib/entities.js";
import Player from "./lib/player.js";
import Vector from "./lib/vector.js";
import Hud from "./lib/hud.js";

const game = {
  start: document.timeline ? document.timeline.currentTime : performance.now(),
  root: document.getElementById("app"),
  init() {
    this.gamepad.init();
    this.hud = new Hud(this.player.speed, this.player.friction);
    this.initEnemies();
    this.frame(this.start);

    this.hud.speed["button_+"].addEventListener("click", () =>
      game.hud.speed.update(game.player.adjustSpeed(1))
    );
    this.hud.speed["button_-"].addEventListener("click", () =>
      game.hud.speed.update(game.player.adjustSpeed(-1))
    );

    this.hud.friction["button_+"].addEventListener("click", () =>
      game.hud.friction.update(game.player.adjustFriction(0.1))
    );
    this.hud.friction["button_-"].addEventListener("click", () =>
      game.hud.friction.update(game.player.adjustFriction(-0.1))
    );

    this.hud.size["button_+"].addEventListener("click", () => game.player.adjustSize(2));
    this.hud.size["button_-"].addEventListener("click", () => game.player.adjustSize(-2));
  },
  state: {
    paused: true,
  },
  gamepad: {
    init() {
      window.addEventListener("gamepadconnected", this.connect);
      window.addEventListener("gamepaddisconnected", this.disconnect);
    },
    controller: {},
    turbo: false,
    connect: function (e) {
      game.gamepad.controller = e.gamepad;
      console.log("connected");
    },
    disconnect: function (e) {
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
          new Vector([game.player.direction.x / 3, 5 + game.player.direction.y / 3]),
          game.player.positionLeft,
          game.player.positionTop + game.player.height / 2,
          10,
          10
        );
      }
      if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([5 + game.player.direction.x / 3, game.player.direction.y / 3]),
          game.player.positionLeft + game.player.width / 2,
          game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([-5 + game.player.direction.x / 3, game.player.direction.y / 3]),
          game.player.positionLeft - game.player.width / 2,
          game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
        game.playerEntities[game.playerEntities.length] = new Projectile(
          new Vector([game.player.direction.x / 3, -5 + game.player.direction[1] / 3]),
          game.player.positionLeft,
          game.player.positionTop - game.player.height / 2,
          10,
          10
        );
      }
    },
    buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Select", "Start"],
    buttonsCache: {},
    buttonsStatus: {},
    axesStatus: [],
  },
  player: new Player(),
  initEnemies() {
    this.nonPlayerEntities[this.nonPlayerEntities.length] = new Enemy(
      this.root.offsetWidth * Math.random(),
      this.root.offsetHeight * Math.random(),
      50,
      50,
      8
    );

    this.nonPlayerEntities[this.nonPlayerEntities.length] = new Enemy(
      this.root.offsetWidth * Math.random(),
      this.root.offsetHeight * Math.random(),
      50,
      50,
      8
    );
  },
  nonPlayerEntities: [],
  playerEntities: [],
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
      this.nonPlayerEntities[i].update({
        playerX: game.player.positionLeft,
        playerY: game.player.positionTop,
      });
    }
  },
  detectCollisions() {
    for (let x = 0; x < game.playerEntities.length; x++) {
      for (let y = 0; y < game.nonPlayerEntities.length; y++) {
        const entity1 = game.playerEntities[x];
        const entity2 = game.nonPlayerEntities[y];

        if (!entity1 || !entity2) continue;

        if (
          entity1.positionLeft - entity1.width / 2 < entity2.positionLeft + entity2.width / 2 &&
          entity1.positionLeft + entity1.width / 2 > entity2.positionLeft - entity2.width / 2 &&
          entity1.positionTop - entity1.height / 2 < entity2.positionTop + entity2.height / 2 &&
          entity1.positionTop + entity1.height / 2 > entity2.positionTop - entity2.height / 2
        ) {
          game.playerEntities[x].center.remove();
          game.playerEntities.splice(x, 1);
        }
      }
    }

    // const rect1 = this.player;
    // const rect2 = this.nonPlayerEntities[0];

    // if (
    //   rect1.positionLeft - rect1.width / 2 < rect2.positionLeft + rect2.width / 2 &&
    //   rect1.positionLeft + rect1.width / 2 > rect2.positionLeft - rect2.width / 2 &&
    //   rect1.positionTop - rect1.height / 2 < rect2.positionTop + rect2.height / 2 &&
    //   rect1.positionTop + rect1.height / 2 > rect2.positionTop - rect2.height / 2
    // ) {
    //   console.log("hit");
    // }
  },
  frame(time) {
    if (game.gamepad.controller.connected) {
      game.gamepad.update();
      game.gamepad.buttonPressed();
    }

    if (!game.state.paused) {
      game.player.update(game.gamepad.controller.axes);
      game.updatePlayerEntities();
      game.updateNonPlayerEntities();
      game.detectCollisions();
    }

    game.scheduleFrame(time);
  },
  scheduleFrame(time) {
    const elapsed = time - this.start;
    const roundedElapsed = Math.round(elapsed / 16) * 16;
    const targetNext = this.start + roundedElapsed + 16;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(this.frame), delay);
  },
};

game.init();
