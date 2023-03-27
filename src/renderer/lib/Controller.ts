import type Game from "renderer/index";

class Keys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  v: boolean;
  f: boolean;
  tab: boolean;
  e: boolean;
  constructor() {
    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.v = false;
    this.f = false;
    this.tab = false;
    this.e = false;
  }
}
export default class Controller {
  Game: Game;
  Gamepad: Gamepad | null;
  keys: Keys;
  justPressed: Keys;
  buttons: string[];
  buttonsCache: Record<string, GamepadButton>;
  buttonsStatus: Record<string, GamepadButton>;

  constructor(Game: Game) {
    this.Game = Game;
    this.Gamepad = null;
    this.keys = new Keys();
    this.justPressed = new Keys();
    this.buttons = ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Select", "Start"];
    this.buttonsCache = {};
    this.buttonsStatus = {};

    window.addEventListener("gamepadconnected", (e) => this.connect(e as GamepadEvent));
    window.addEventListener("gamepaddisconnected", (e) => this.disconnect(e as GamepadEvent));

    document.body.onkeydown = (e) => this.onKeyDownCallback(e);
    document.body.onkeyup = (e) => this.onKeyUpCallback(e);

    this.Game.canvas.addEventListener("click", (e) => console.log(e.clientX, e.clientY));
  }

  connect(e: GamepadEvent) {
    this.Gamepad = e.gamepad || null;
    console.log("controller connected");
  }

  disconnect(e: GamepadEvent) {
    // Game.state.paused = true;
    this.Gamepad = null;
    console.log("controller disconnected");
  }

  update() {
    this.Gamepad = navigator.getGamepads()[this.Gamepad?.index ?? 0];
  }

  clearJustPressed() {
    this.justPressed = new Keys();
  }

  buttonPressed() {
    this.buttonsCache = this.buttonsStatus;
    this.buttonsStatus = {};

    if (this.Gamepad === null) return;

    for (let i = 0; i < this.buttons.length; i++) {
      if (this.Gamepad.buttons[i].pressed) {
        this.buttonsStatus[this.buttons[i]] = this.Gamepad.buttons[i];
      }
    }

    if (this.buttonsStatus["Start"] && !this.buttonsCache["Start"]) {
      this.Game.state.paused = !this.Game.state.paused;
    }

    if (this.Game.state.paused) return;

    if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
      this.Game.Player.fire("up");
    }
    if (this.buttonsStatus["A"] && !this.buttonsCache["A"]) {
      this.Game.Player.fire("down");
    }
    if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
      this.Game.Player.fire("left");
    }
    if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
      this.Game.Player.fire("right");
    }

    if (this.buttonsStatus["Select"] && !this.buttonsCache["Select"]) {
      this.Game.state.debug = !this.Game.state.debug;
      console.log(this.Game);
    }
  }

  private onKeyUpCallback(e: KeyboardEvent) {
    switch (true) {
      case e.code === "Space":
        console.log(this.Game);
        break;
      case e.code === "Escape":
        this.Game.state.paused = !this.Game.state.paused;
        break;
      case e.code === "KeyW":
        this.keys.w = false;
        break;
      case e.code === "KeyA":
        this.keys.a = false;
        break;
      case e.code === "KeyS":
        this.keys.s = false;
        break;
      case e.code === "KeyD":
        this.keys.d = false;
        break;
      case e.code === "ArrowUp":
        this.keys.up = false;
        break;
      case e.code === "ArrowDown":
        this.keys.down = false;
        break;
      case e.code === "ArrowLeft":
        this.keys.left = false;
        break;
      case e.code === "ArrowRight":
        this.keys.right = false;
        break;
      case e.code === "KeyV":
        this.keys.v = false;
        break;
      case e.code === "Tab":
        this.keys.tab = false;
        break;
      case e.code === "KeyF":
        this.keys.f = false;
        break;
      case e.code === "KeyE":
        this.keys.e = false;
        break;
    }
  }

  private onKeyDownCallback(e: KeyboardEvent) {
    switch (true) {
      case e.code === "KeyW":
        this.keys.w = true;
        this.justPressed.w = true;
        break;
      case e.code === "KeyA":
        this.keys.a = true;
        this.justPressed.a = true;
        break;
      case e.code === "KeyS":
        this.keys.s = true;
        this.justPressed.s = true;
        break;
      case e.code === "KeyD":
        this.keys.d = true;
        this.justPressed.d = true;
        break;
      case e.code === "KeyH":
        this.Game.state.debug = !this.Game.state.debug;
        break;
      case e.code === "ArrowUp":
        this.keys.up = true;
        this.justPressed.up = true;
        break;
      case e.code === "ArrowDown":
        this.keys.down = true;
        this.justPressed.down = true;
        break;
      case e.code === "ArrowLeft":
        this.keys.left = true;
        this.justPressed.left = true;
        break;
      case e.code === "ArrowRight":
        this.keys.right = true;
        this.justPressed.right = true;
        break;
      case e.code === "KeyV":
        this.keys.v = true;
        this.justPressed.v = true;
        break;
      case e.code === "KeyF":
        this.keys.f = true;
        this.justPressed.f = true;
        break;
      case e.code === "Tab":
        this.keys.tab = true;
        this.justPressed.tab = true;
        break;
      case e.code === "KeyE":
        this.keys.e = true;
        this.justPressed.e = true;
        break;
    }
  }
}
