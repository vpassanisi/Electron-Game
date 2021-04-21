const game = {
  start: document.timeline ? document.timeline.currentTime : performance.now(),
  root: document.getElementById("app"),
  init() {
    this.gamepad.init();
    this.hud.init();
    this.root.appendChild(this.player.create());
    this.frame(this.start);
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
    center: document.createElement("div"),
    boundingBox: document.createElement("div"),
    create() {
      this.center.appendChild(this.boundingBox);
      this.center.style.position = "absolute";
      this.center.style.height = "1px";
      this.center.style.width = "1px";
      this.center.style.top = "100px";
      this.center.style.left = "100px";
      this.center.style.backgroundColor = "black";
      this.center.dataset.left = 100;
      this.center.dataset.top = 100;

      this.boundingBox.style.height = `${this.height}px`;
      this.boundingBox.style.width = `${this.width}px`;
      this.boundingBox.style.position = "relative";
      this.boundingBox.style.top = `-${this.height / 2}px`;
      this.boundingBox.style.left = `-${this.width / 2}px`;
      this.boundingBox.style.backgroundColor = "#ff24cf";

      return this.center;
    },
    height: 50,
    width: 50,
    momentumLeft: 0,
    momentumTop: 0,
    speed: 3,
    friction: 6,
    updatePositionLeft() {
      const left = game.gamepad.controller.axes[0] * this.speed;

      const updatedMmtm = this.momentumLeft - this.momentumLeft / this.friction;
      const raw = Math.max(Math.min(updatedMmtm + left, this.speed * 3), -(this.speed * 3));
      this.momentumLeft = (Math.round(raw * 1000) / 1000).toFixed(3);

      let updated = parseInt(this.center.dataset.left) + parseInt(this.momentumLeft);

      if (updated + this.width / 2 > game.root.offsetWidth) {
        updated = game.root.offsetWidth - this.width / 2;
      }
      if (updated < this.width / 2) {
        updated = this.width / 2;
      }

      this.center.dataset.left = updated;
      this.center.style.left = `${updated}px`;
    },
    updatePositionTop() {
      const top = game.gamepad.controller.axes[1] * this.speed;

      const updatedMmtm = this.momentumTop - this.momentumTop / this.friction;
      const raw = Math.max(Math.min(updatedMmtm + top, this.speed * 3), -(this.speed * 3));
      this.momentumTop = (Math.round(raw * 1000) / 1000).toFixed(3);

      let updated = parseInt(this.center.dataset.top) + parseInt(this.momentumTop);

      if (updated + this.height / 2 > game.root.offsetHeight) {
        updated = game.root.offsetHeight - this.height / 2;
      }
      if (updated < this.height / 2) {
        updated = this.height / 2;
      }

      this.center.dataset.top = updated;
      this.center.style.top = `${updated}px`;
    },
    adjustSpeed(ammount) {
      this.speed += ammount;
      game.hud.speed.update(this.speed);
    },
    adjustFriction(ammount) {
      this.friction += ammount;
      if (this.friction < 1) this.friction = 1;
      game.hud.friction.update(this.friction);
    },
    adjustSize(ammount) {
      ammount = ammount * 2;
      this.height += ammount;
      this.width += ammount;

      this.boundingBox.style.height = `${this.height}px`;
      this.boundingBox.style.width = `${this.width}px`;

      this.boundingBox.style.top = `-${this.height / 2}px`;
      this.boundingBox.style.left = `-${this.width / 2}px`;
    },
  },
  hud: {
    init() {
      this.speed.init();
      this.friction.init();
      this.size.init();
    },
    speed: {
      init() {
        this.container.id = "speed";
        this["button_+"].id = "speed_+";
        this["button_-"].id = "speed_-";

        this.container.innerHTML = "Speed: ";
        this["button_+"].innerHTML = "+";
        this["button_-"].innerHTML = "-";
        this.num.innerHTML = game.player.speed;

        this["button_-"].style.marginRight = "0.5rem";

        this.container.appendChild(this["button_+"]);
        this.container.appendChild(this["button_-"]);
        this.container.appendChild(this.num);

        this["button_+"].addEventListener("click", () => game.player.adjustSpeed(0.5));
        this["button_-"].addEventListener("click", () => game.player.adjustSpeed(-0.5));

        game.root.appendChild(this.container);
      },
      container: document.createElement("div"),
      "button_+": document.createElement("button"),
      "button_-": document.createElement("button"),
      num: document.createElement("span"),
      update(speed) {
        this.num.innerHTML = speed;
      },
    },
    friction: {
      init() {
        this.container.id = "friction";
        this["button_+"].id = "friction_+";
        this["button_-"].id = "friction_-";

        this.container.innerHTML = "Friction: ";
        this["button_+"].innerHTML = "+";
        this["button_-"].innerHTML = "-";
        this.num.innerHTML = game.player.friction;

        this["button_-"].style.marginRight = "0.5rem";

        this.container.appendChild(this["button_+"]);
        this.container.appendChild(this["button_-"]);
        this.container.appendChild(this.num);

        this["button_+"].addEventListener("click", () => game.player.adjustFriction(-1));
        this["button_-"].addEventListener("click", () => game.player.adjustFriction(1));

        game.root.appendChild(this.container);
      },
      container: document.createElement("div"),
      "button_+": document.createElement("button"),
      "button_-": document.createElement("button"),
      num: document.createElement("span"),
      update(friction) {
        this.num.innerHTML = friction;
      },
    },
    size: {
      init() {
        this.container.innerHTML = "Size: ";
        this["button_+"].innerHTML = "+";
        this["button_-"].innerHTML = "-";

        this.container.appendChild(this["button_+"]);
        this.container.appendChild(this["button_-"]);

        this["button_+"].addEventListener("click", () => game.player.adjustSize(2));
        this["button_-"].addEventListener("click", () => game.player.adjustSize(-2));

        game.root.appendChild(this.container);
      },
      container: document.createElement("div"),
      "button_+": document.createElement("button"),
      "button_-": document.createElement("button"),
    },
  },
  queue: [],
  frame(time) {
    if (game.gamepad.controller.connected) {
      game.gamepad.update();
      game.player.updatePositionLeft();
      game.player.updatePositionTop();
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
