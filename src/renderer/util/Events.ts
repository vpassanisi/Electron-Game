import Game from "renderer";

export default class Events {
  Game: Game;
  list: Record<string, Record<number, () => void>>;

  constructor(Game: Game) {
    this.Game = Game;
    this.list = {
      setDoors: {},
      renderHitboxes: {},
      wPressed: {},
      aPressed: {},
      sPressed: {},
      dPressed: {},
      ePressed: {},
      updateUI: {},
    };
  }

  addListener(event: string, callback: () => void) {
    const callbacks = this.list[event];
    if (!callbacks) throw new Error(`Event ${event} does not exist`);
    const id = this.Game.Pixi.utils.uid();
    callbacks[id] = callback;
    return id;
  }

  removeListener(event: string, callbackId: number) {
    const callbacks = this.list[event];
    if (!callbacks) throw new Error(`Event ${event} does not exist`);
    delete callbacks[callbackId];
  }

  registerEvent(event: string) {
    this.list[event] = {};
  }

  dispatchEvent(event: string) {
    const callbacks = this.list[event];
    if (!callbacks) throw new Error(`Event ${event} does not exist`);
    for (const [id, callback] of Object.entries(callbacks)) callback();
  }
}
