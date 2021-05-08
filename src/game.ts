import { Entity, Projectile } from "./lib/entities/index.js";
import Player from "./lib/player.js";
import Vector from "./lib/vector.js";
import { Room } from "./room.js";
import type { GameState } from "./types";

const Game = {
  start: document.timeline ? document.timeline.currentTime : performance.now(),
  root: document.getElementById("app"),
  init() {
    this.gamepad.init();
    this.initRoom();
    this.frame(this.start);
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
      Game.gamepad.controller = e.gamepad;
      console.log("connected");
    },
    disconnect: function (e: GamepadEvent) {
      delete this.controller;
      Game.state.paused = true;
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
        Game.state.paused = !Game.state.paused;
      }

      if (Game.state.paused) return;

      if (this.buttonsStatus["A"] && !this.buttonsCache["A"]) {
        Game.playerEntities[Game.playerEntities.length] = new Projectile(
          new Vector([Game.player.direction.x / 10, 5]),
          Game.player.positionLeft,
          Game.player.bottomSide,
          10,
          10
        );
      }
      if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
        Game.playerEntities[Game.playerEntities.length] = new Projectile(
          new Vector([5, Game.player.direction.y / 10]),
          Game.player.rightSide,
          Game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
        Game.playerEntities[Game.playerEntities.length] = new Projectile(
          new Vector([-5, Game.player.direction.y / 10]),
          Game.player.leftSide,
          Game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
        Game.playerEntities[Game.playerEntities.length] = new Projectile(
          new Vector([Game.player.direction.x / 10, -5]),
          Game.player.positionLeft,
          Game.player.topSide,
          10,
          10
        );
      }

      if (this.buttonsStatus["Select"] && !this.buttonsCache["Select"]) {
        console.log(Game.nonPlayerEntities);
      }
    },
    buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Select", "Start"],
    buttonsCache: {},
    buttonsStatus: {},
  },
  player: new Player(),
  initRoom() {
    const tileWidth = Game.root.offsetWidth / 15;
    const rowHeight = Game.root.offsetHeight / 9;

    Room.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (!tile.entity) return;
        Game.nonPlayerEntities[Game.nonPlayerEntities.length] = new tile.entity(
          tileWidth * (j + 1) - tileWidth / 2,
          rowHeight * (i + 1) - rowHeight / 2
        );
      });
    });
  },
  nonPlayerEntities: [] as Entity[],
  playerEntities: [] as Entity[],
  updatePlayerEntities() {
    Game.playerEntities.forEach((pe, i, arr) => {
      if (!pe.update(Game.player)) {
        pe.center.remove();
        arr.splice(i, 1);
      }
    });
  },
  updateNonPlayerEntities() {
    Game.nonPlayerEntities.forEach((npe, i, arr) => {
      if (!npe.update(Game.player)) {
        npe.center.remove();
        arr.splice(i, 1);
      }
    });
  },
  renderNonPlayerEntities() {
    Game.nonPlayerEntities.forEach((npe) => npe.render());
  },
  detectCollisions() {
    // pe vs npe
    for (let x = 0; x < Game.playerEntities.length; x++) {
      for (let y = 0; y < Game.nonPlayerEntities.length; y++) {
        const playerEntity = Game.playerEntities[x];
        const nonPlayerEntity = Game.nonPlayerEntities[y];

        if (!playerEntity || !nonPlayerEntity) continue;

        if (
          playerEntity.leftSide < nonPlayerEntity.rightSide &&
          playerEntity.rightSide > nonPlayerEntity.leftSide &&
          playerEntity.topSide < nonPlayerEntity.bottomSide &&
          playerEntity.bottomSide > nonPlayerEntity.topSide
        ) {
          Game.playerEntities[x].center.remove();
          Game.playerEntities.splice(x, 1);

          nonPlayerEntity.hit(2);
        }
      }
    }

    // npe vs npe
    for (let x = 0; x < Game.nonPlayerEntities.length; x++) {
      for (let y = 0; y < Game.nonPlayerEntities.length; y++) {
        if (x === y) continue;
        const entity1 = Game.nonPlayerEntities[x];
        const entity2 = Game.nonPlayerEntities[y];
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

    // npe vs player
    Game.nonPlayerEntities.forEach((npe) => {
      if (
        Game.player.leftSide < npe.rightSide &&
        Game.player.rightSide > npe.leftSide &&
        Game.player.topSide < npe.bottomSide &&
        Game.player.bottomSide > npe.topSide
      ) {
        Game.player.collision(npe.playerCollision(Game.player));
        npe.playerCollision(Game.player);
      }
    });
  },
  frame(time: number) {
    if (Game.gamepad.controller.connected) {
      Game.gamepad.update();
      Game.gamepad.buttonPressed();
    }

    if (!Game.state.paused) {
      Game.player.update({
        axes: [...Game.gamepad.controller.axes],
        state: Game.state,
      });
      Game.updatePlayerEntities();
      Game.updateNonPlayerEntities();
      Game.detectCollisions();

      Game.renderNonPlayerEntities();
      Game.player.render();
    }

    Game.scheduleFrame(time);
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

Game.init();
