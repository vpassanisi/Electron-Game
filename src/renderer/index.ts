import type { GameState } from "renderer/types";
import * as Pixi from "Pixi.js";
import Controller from "renderer/lib/Controller";
import Player from "renderer/lib/Player";
import Assets from "renderer/util/Assets";
import Events from "renderer/util/Events";
import NonPlayerEntities from "renderer/lib/NonPlayerEntities";
import PlayerProjectiles from "renderer/lib/PlayerProjectiles";
import UI from "renderer/lib/world/UI";
import FloorMap from "renderer/lib/FloorMap";
import { Detector, Engine, Events as E } from "matter-js";
export default class Game {
  canvas: HTMLCanvasElement;
  dimentions: {
    canvasWidth: number;
    canvasHeight: number;
    tileWidth: number;
    tileHeight: number;
  };
  Controller: Controller;
  state: GameState;
  Player: Player;
  Pixi: typeof Pixi;
  Assets: Assets;
  Renderer: Pixi.Renderer;
  World: Pixi.Container;
  Stage: Pixi.Container;
  UI: UI;
  Ticker: Pixi.Ticker;
  NonPlayerEntities: NonPlayerEntities;
  PlayerProjectiles: PlayerProjectiles;
  zIndex: {
    background: number;
    wall: number;
    rock: number;
    bat: number;
    player: number;
  };
  floorMap: FloorMap;
  Events: Events;
  MatterEngine: Engine;
  PlayerModelDetector: Detector;

  constructor() {
    this.canvas = document.getElementById("app") as HTMLCanvasElement;

    this.Renderer = new Pixi.Renderer({
      view: this.canvas,
      width: document.body.offsetWidth,
      height: document.body.offsetHeight,
    });

    this.dimentions = {
      canvasWidth: this.canvas.offsetWidth,
      canvasHeight: this.canvas.offsetHeight,
      tileWidth: this.canvas.offsetWidth / 15,
      tileHeight: this.canvas.offsetHeight / 9,
    };

    window.addEventListener("resize", () => {
      this.Renderer.resize(document.body.offsetWidth, document.body.offsetHeight);
    });

    this.Pixi = Pixi;
    this.Events = new Events(this);
    this.World = new Pixi.Container();
    this.Stage = new Pixi.Container();
    this.World.addChild(this.Stage);
    this.MatterEngine = Engine.create();
    this.MatterEngine.gravity.y = 0;
    this.PlayerModelDetector = Detector.create();

    this.Ticker = new Pixi.Ticker();
    this.Ticker.maxFPS = 60;

    this.state = {
      paused: false,
      debug: false,
    };

    this.Assets = new Assets(this);

    this.Stage.sortableChildren = true;

    this.NonPlayerEntities = new NonPlayerEntities(this);
    this.PlayerProjectiles = new PlayerProjectiles(this);
    this.zIndex = {
      background: 0,
      wall: 10,
      rock: 20,
      bat: 20,
      player: 1000,
    };

    this.Controller = new Controller(this);
    this.UI = new UI(this);
    this.Player = new Player(this);

    this.floorMap = new FloorMap(this);
    this.floorMap.loadHideout();

    const animate = (delta: number) => {
      this.Controller.update();
      this.Controller.buttonPressed();

      if (!this.state.paused) {
        Engine.update(this.MatterEngine, delta);
        this.Player.update();
        this.NonPlayerEntities.updateAll();
        this.PlayerProjectiles.updateAll();

        console.log(Detector.collisions(this.PlayerModelDetector));

        this.Player.move();
        this.NonPlayerEntities.moveAll();
        this.PlayerProjectiles.moveAll();

        this.Events.dispatchEvent("renderHitboxes");

        this.checkRoom();
      }

      this.UI.update();

      this.Controller.clearJustPressed();
      this.Renderer.render(this.World);
    };

    this.Ticker.add(animate);
    this.Ticker.start();
  }

  checkRoom() {
    if (
      this.NonPlayerEntities.numberOfEntities === 0 &&
      this.floorMap.currentRoom &&
      !this.floorMap.currentRoom.isClear
    ) {
      this.floorMap.currentRoom.clear();
    }
  }

  playerModelColisions() {}
  npeModelCollisions() {}
  playerNPECollisions() {}
  projectileModelCollisions() {}
  projectileNPECollisions() {}
}
declare global {
  interface Window {
    GameInstance: Game;
  }
}

// sharp textures
Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST;

window.GameInstance = new Game();
