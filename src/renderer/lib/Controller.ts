import type Game from "../index";

export default class Controller {
  state: Gamepad | null;
  buttons: string[];
  buttonsCache: Record<string, GamepadButton>;
  buttonsStatus: Record<string, GamepadButton>;

  constructor() {
    this.state = null;
    this.buttons = ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Select", "Start"];
    this.buttonsCache = {};
    this.buttonsStatus = {};

    window.addEventListener("gamepadconnected", (e) => this.connect(e as GamepadEvent));
    window.addEventListener("gamepaddisconnected", (e) => this.disconnect(e as GamepadEvent));
  }

  connect(e: GamepadEvent) {
    this.state = e.gamepad || null;
    console.log("controller connected");
  }

  disconnect(e: GamepadEvent) {
    // Game.state.paused = true;
    this.state = null;
    console.log("controller disconnected");
  }

  update() {
    this.state = navigator.getGamepads()[this.state?.index ?? 0];
  }

  buttonPressed(Game: Game) {
    this.buttonsCache = this.buttonsStatus;
    this.buttonsStatus = {};

    if (this.state === null) return;

    for (let i = 0; i < this.buttons.length; i++) {
      if (this.state.buttons[i].pressed) {
        this.buttonsStatus[this.buttons[i]] = this.state.buttons[i];
      }
    }

    if (this.buttonsStatus["Start"] && !this.buttonsCache["Start"]) {
      Game.state.paused = !Game.state.paused;
    }

    if (Game.state.paused) return;

    if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
      Game.Player.fire("up");
    }
    if (this.buttonsStatus["A"] && !this.buttonsCache["A"]) {
      Game.Player.fire("down");
    }
    if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
      Game.Player.fire("left");
    }
    if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
      Game.Player.fire("right");
    }

    if (this.buttonsStatus["Select"] && !this.buttonsCache["Select"]) {
      Game.state.debug = !Game.state.debug;
      Game.Player.toggleHitBox();
      Game.NonPlayerEntities.forEach((e) => e.toggleHitBox());
      console.log(Game);
    }
  }
}
