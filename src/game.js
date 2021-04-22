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
    buttonPressed: function () {
      this.buttonsCache = this.buttonsStatus;
      this.buttonsStatus = {};

      for (let i = 0; i < this.controller.buttons.length; i++) {
        if (this.controller.buttons[i].pressed) {
          this.buttonsStatus[this.buttons[i]] = this.controller.buttons[i];
        }
      }

      if (this.buttonsStatus["A"] && !this.buttonsCache["A"]) {
        const l = game.queue.push({ ...game.projectile });

        game.queue[l - 1].create(
          [game.player.direction[0] / 3, 5 + game.player.direction[1] / 3],
          game.player.positionLeft,
          game.player.positionTop + game.player.height / 2,
          10,
          10
        );
      }
      if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
        const l = game.queue.push({ ...game.projectile });

        game.queue[l - 1].create(
          [5 + game.player.direction[0] / 3, game.player.direction[1] / 3],
          game.player.positionLeft + game.player.width / 2,
          game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
        const l = game.queue.push({ ...game.projectile });

        game.queue[l - 1].create(
          [-5 + game.player.direction[0] / 3, game.player.direction[1] / 3],
          game.player.positionLeft - game.player.width / 2,
          game.player.positionTop,
          10,
          10
        );
      }
      if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
        const l = game.queue.push({ ...game.projectile });

        game.queue[l - 1].create(
          [game.player.direction[0] / 3, -5 + game.player.direction[1] / 3],
          game.player.positionLeft,
          game.player.positionTop - game.player.height / 2,
          10,
          10
        );
      }
    },
    buttons: ["A", "B", "X", "Y"],
    buttonsCache: {},
    buttonsStatus: {},
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

      this.boundingBox.style.height = `${this.height}px`;
      this.boundingBox.style.width = `${this.width}px`;
      this.boundingBox.style.position = "relative";
      this.boundingBox.style.top = `-${this.height / 2}px`;
      this.boundingBox.style.left = `-${this.width / 2}px`;
      this.boundingBox.style.backgroundColor = "#ff24cf";

      return this.center;
    },
    positionTop: 100,
    positionLeft: 100,
    height: 50,
    width: 50,
    direction: [0, 0],
    speed: 15,
    friction: 1,
    updateDirection() {
      const updated = this.direction.map((val, i) => {
        val += game.gamepad.controller.axes[i] * (this.speed * 0.1);
        val -= val * (this.friction / 10);
        val = Math.max(Math.min(val, this.speed), -this.speed);
        if (val < 0.005 && val > -0.005) val = 0;
        return Math.round(val * 1000) / 1000;
      });

      if (this.positionLeft + this.width / 2 > game.root.offsetWidth) {
        this.positionLeft = game.root.offsetWidth - this.width / 2;
      }
      if (this.positionLeft < this.width / 2) {
        this.positionLeft = this.width / 2;
      }
      if (this.positionTop + this.height / 2 > game.root.offsetHeight) {
        this.positionTop = game.root.offsetHeight - this.height / 2;
      }
      if (this.positionTop < this.height / 2) {
        this.positionTop = this.height / 2;
      }
      this.direction = updated;

      this.positionLeft += this.direction[0];
      this.positionTop += this.direction[1];
      this.center.style.left = `${this.positionLeft}px`;
      this.center.style.top = `${this.positionTop}px`;
    },
    adjustSpeed(ammount) {
      this.speed += ammount;
      if (this.speed < 0) this.speed = 0;
      this.speed = Math.round(this.speed * 100) / 100;
      game.hud.speed.update(this.speed);
    },
    adjustFriction(ammount) {
      this.friction += ammount;
      if (this.friction < 0) this.friction = 0;
      this.friction = Math.round(this.friction * 100) / 100;
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
  projectile: {
    direction: [0, 0],
    positionLeft: 0,
    positionTop: 0,
    height: 0,
    width: 0,
    index: 0,
    create(vector, positionLeft, positionTop, height, width) {
      this.direction = vector;
      this.positionLeft = positionLeft;
      this.positionTop = positionTop;
      this.height = height;
      this.width = width;

      this.center = document.createElement("div");
      this.boundingBox = document.createElement("div");

      this.center.appendChild(this.boundingBox);
      this.center.style.position = "absolute";
      this.center.style.height = "1px";
      this.center.style.width = "1px";
      this.center.style.left = `${this.positionLeft}px`;
      this.center.style.top = `${this.positionTop}px`;
      this.center.style.backgroundColor = "black";

      this.boundingBox.style.height = `${this.height}px`;
      this.boundingBox.style.width = `${this.width}px`;
      this.boundingBox.style.position = "relative";
      this.boundingBox.style.top = `-${this.height / 2}px`;
      this.boundingBox.style.left = `-${this.width / 2}px`;
      this.boundingBox.style.backgroundColor = "#fff";

      game.root.appendChild(this.center);
    },
    update() {
      this.positionLeft += this.direction[0];
      this.positionTop += this.direction[1];

      if (
        this.positionLeft + this.width / 2 >= game.root.offsetWidth ||
        this.positionLeft <= this.width / 2 ||
        this.positionTop + this.height / 2 >= game.root.offsetHeight ||
        this.positionTop <= this.height / 2
      ) {
        this.delete();
      }

      this.center.style.left = `${this.positionLeft}px`;
      this.center.style.top = `${this.positionTop}px`;
    },
    delete() {
      this.boundingBox.remove();
      this.center.remove();
      game.queue.splice(this.index, 1);
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

        this["button_+"].addEventListener("click", () => game.player.adjustFriction(0.1));
        this["button_-"].addEventListener("click", () => game.player.adjustFriction(-0.1));

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
      game.gamepad.buttonPressed();
      game.player.updateDirection();
    }

    for (let i = 0; i < game.queue.length; i++) {
      game.queue[i].index = i;
      game.queue[i].update();
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
