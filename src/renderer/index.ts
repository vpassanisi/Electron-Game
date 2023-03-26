import type { Preload } from "../main/preload";
import type { GameState } from "renderer/types";
import * as Pixi from "Pixi.js";
import Controller from "renderer/lib/Controller";
import Player from "renderer/lib/world/Player";
import Assets from "renderer/util/Assets";
import Events from "renderer/util/Events";
import NonPlayerEntities from "renderer/lib/NonPlayerEntities";
import PlayerProjectiles from "renderer/lib/PlayerProjectiles";
import CollisionEngine from "renderer/util/CollisionEngine";
import FloorMap from "renderer/lib/FloorMap";
import MouseOverInfo from "renderer/lib/world/UI/MouseOverInfo";
import GrabbedItem from "renderer/lib/world/UI/GrabbedItem";
import StashInventory from "renderer/lib/world/UI/StashInventory";
// import HealthBar from "renderer/lib/world/UI/HealthBar";
import SaveGame from "renderer/util/SaveGame";
import Vector from "renderer/vector";
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
  Ticker: Pixi.Ticker;
  NonPlayerEntities: NonPlayerEntities;
  PlayerProjectiles: PlayerProjectiles;
  CollisionEngine: CollisionEngine;
  zIndex: {
    background: number;
    wall: number;
    rock: number;
    bat: number;
    player: number;
  };
  FloorMap: FloorMap;
  Events: Events;
  MouseOverInfo: MouseOverInfo;
  GrabbedItem: GrabbedItem;
  stashInventory: StashInventory;
  // HealthBar: HealthBar;
  SaveGame: SaveGame;

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
    this.CollisionEngine = new CollisionEngine(this);
    this.MouseOverInfo = new MouseOverInfo(this);
    this.GrabbedItem = new GrabbedItem(this);
    this.stashInventory = new StashInventory(this);
    // this.HealthBar = new HealthBar(this);
    this.SaveGame = new SaveGame(this);

    this.World.sortableChildren = true;

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
    this.Player = new Player(this);

    this.FloorMap = new FloorMap(this);
    this.FloorMap.loadHideout();

    this.SaveGame.loadGame();

    this.Stage.eventMode = "static";
    this.Stage.on("click", (e) => this.Player.fireMouse(new Vector([e.clientX, e.clientY])));

    const animate = () => {
      this.Controller.update();
      this.Controller.buttonPressed();

      if (!this.state.paused) {
        this.Player.update();
        this.NonPlayerEntities.updateAll();
        this.PlayerProjectiles.updateAll();

        this.CollisionEngine.playerModelCollisions();
        this.CollisionEngine.projectileModelCollision();
        this.CollisionEngine.projectileNpeCollision();
        this.CollisionEngine.playerEntityCollision();
        this.CollisionEngine.npeModelCollision();

        this.Player.move();
        this.NonPlayerEntities.moveAll();
        this.PlayerProjectiles.moveAll();

        this.checkRoom();
      }

      this.debug();

      this.MouseOverInfo.update();
      this.GrabbedItem.update();

      this.Controller.clearJustPressed();
      this.Renderer.render(this.World);
    };

    this.Ticker.add(animate);
    this.Ticker.start();
  }

  checkRoom() {
    if (
      this.NonPlayerEntities.numberOfEntities === 0 &&
      this.FloorMap.currentRoom &&
      !this.FloorMap.currentRoom.isClear
    ) {
      this.FloorMap.currentRoom.clear();
    }
  }

  debug() {
    if (this.state.debug) {
      this.FloorMap.currentRoom?.debugGraphics.clear();

      this.Player.renderHitbox();
      this.FloorMap.currentRoom?.renderHitboxes();
    } else {
      this.FloorMap.currentRoom?.debugGraphics.clear();
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
    electron: Preload;
  }
}

window.GameInstance = new Game();
