const game = {
  start: document.timeline ? document.timeline.currentTime : performance.now(),
  gamepad: {
    controller: {},
    turbo: false,
    connect: function (e) {
      game.gamepad.controller = e.gamepad;
      console.log("connected");
      game.frame(game.start);
    },
    disconnect: function (e) {
      delete this.controller;
      console.log("disconnected");
    },
    update: function () {
      this.controller = navigator.getGamepads()[this.controller.index];
    },
    buttonPressed: function () {},
    buttons: [],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: [],
  },
  player: {
    element: document.createElement("div"),
    create() {
      this.element.style.height = "10%";
      this.element.style.width = "5%";
      this.element.style.position = "absolute";
      this.element.style.top = "0px";
      this.element.style.left = "0px";
      this.element.style.backgroundColor = "#ff24cf";
      this.element.dataset.left = 0;
      this.element.dataset.top = 0;

      return this.element;
    },
    momentumLeft: 0,
    momentumTop: 0,
    updatePositionLeft() {
      const left = game.gamepad.controller.axes[0];
      const updated = parseInt(this.element.dataset.left) + parseInt(this.momentumLeft);

      this.element.dataset.left = updated;
      this.element.style.left = `${updated}px`;

      const friction = this.momentumLeft - this.momentumLeft / 15;
      const raw = Math.max(Math.min(friction + left, 100), -100);

      this.momentumLeft = (Math.round(raw * 1000) / 1000).toFixed(3);
    },
    updatePositionTop() {
      const top = game.gamepad.controller.axes[1];
      const updated = parseInt(this.element.dataset.top) + parseInt(this.momentumTop);

      this.element.dataset.top = updated;
      this.element.style.top = `${updated}px`;

      const friction = this.momentumTop - this.momentumTop / 15;
      const raw = Math.max(Math.min(friction + top, 100), -100);

      this.momentumTop = (Math.round(raw * 1000) / 1000).toFixed(3);
    },
  },
  queue: [],
  frame(time) {
    game.gamepad.update();
    game.player.updatePositionLeft();
    game.player.updatePositionTop();

    for (let i = 0; i < game.queue.length; i++) {
      this.queue[i]();
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
const root = document.getElementById("app");
root.appendChild(game.player.create());

window.addEventListener("gamepadconnected", game.gamepad.connect);
window.addEventListener("gamepaddisconnected", game.gamepad.disconnect);
