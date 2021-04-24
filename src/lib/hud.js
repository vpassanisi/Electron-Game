class Speed {
  constructor(speed) {
    this.root = document.getElementById("app");
    this.container = document.createElement("div");
    this["button_+"] = document.createElement("button");
    this["button_-"] = document.createElement("button");
    this.num = document.createElement("span");

    this.container.id = "speed";
    this["button_+"].id = "speed_+";
    this["button_-"].id = "speed_-";

    this.container.innerHTML = "Speed: ";
    this["button_+"].innerHTML = "+";
    this["button_-"].innerHTML = "-";
    this.num.innerHTML = speed;

    this["button_-"].style.marginRight = "0.5rem";

    this.container.appendChild(this["button_+"]);
    this.container.appendChild(this["button_-"]);
    this.container.appendChild(this.num);

    this.root.appendChild(this.container);
  }

  update(speed) {
    this.num.innerHTML = speed;
  }
}

class Friction {
  constructor(friction) {
    this.root = document.getElementById("app");
    this.container = document.createElement("div");
    this["button_+"] = document.createElement("button");
    this["button_-"] = document.createElement("button");
    this.num = document.createElement("span");

    this.container.id = "friction";
    this["button_+"].id = "friction_+";
    this["button_-"].id = "friction_-";

    this.container.innerHTML = "Friction: ";
    this["button_+"].innerHTML = "+";
    this["button_-"].innerHTML = "-";
    this.num.innerHTML = friction;

    this["button_-"].style.marginRight = "0.5rem";

    this.container.appendChild(this["button_+"]);
    this.container.appendChild(this["button_-"]);
    this.container.appendChild(this.num);

    this.root.appendChild(this.container);
  }

  update(friction) {
    this.num.innerHTML = friction;
  }
}

class Size {
  constructor() {
    this.root = document.getElementById("app");
    this.container = document.createElement("div");
    this["button_+"] = document.createElement("button");
    this["button_-"] = document.createElement("button");

    this.container.innerHTML = "Size: ";
    this["button_+"].innerHTML = "+";
    this["button_-"].innerHTML = "-";

    this.container.appendChild(this["button_+"]);
    this.container.appendChild(this["button_-"]);

    this.root.appendChild(this.container);
  }
}

export default class Hud {
  constructor(speed, friction) {
    this.speed = new Speed(speed);
    this.friction = new Friction(friction);
    this.size = new Size();
  }
}
