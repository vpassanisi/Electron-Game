class Speed {
  root: HTMLElement;
  container: HTMLElement;
  buttonPlus: HTMLElement;
  buttonMinus: HTMLElement;
  num: HTMLElement;

  constructor(speed: number) {
    this.root = document.getElementById("root");
    this.container = document.createElement("div");
    this.buttonPlus = document.createElement("button");
    this.buttonMinus = document.createElement("button");
    this.num = document.createElement("span");

    this.container.id = "speed";
    this.buttonPlus.id = "speed_+";
    this.buttonMinus.id = "speed_-";

    this.container.innerHTML = "Speed: ";
    this.buttonPlus.innerHTML = "+";
    this.buttonMinus.innerHTML = "-";
    this.num.innerHTML = speed.toString();

    this.buttonMinus.style.marginRight = "0.5rem";

    this.container.appendChild(this.buttonPlus);
    this.container.appendChild(this.buttonMinus);
    this.container.appendChild(this.num);

    this.root.appendChild(this.container);
  }

  update(speed: number) {
    this.num.innerHTML = speed.toString();
  }
}

class Friction {
  root: HTMLElement;
  container: HTMLElement;
  buttonPlus: HTMLElement;
  buttonMinus: HTMLElement;
  num: HTMLElement;

  constructor(friction: number) {
    this.root = document.getElementById("root");
    this.container = document.createElement("div");
    this.buttonPlus = document.createElement("button");
    this.buttonMinus = document.createElement("button");
    this.num = document.createElement("span");

    this.container.id = "friction";
    this.buttonPlus.id = "friction_+";
    this.buttonMinus.id = "friction_-";

    this.container.innerHTML = "Friction: ";
    this.buttonPlus.innerHTML = "+";
    this.buttonMinus.innerHTML = "-";
    this.num.innerHTML = friction.toString();

    this.buttonMinus.style.marginRight = "0.5rem";

    this.container.appendChild(this.buttonPlus);
    this.container.appendChild(this.buttonMinus);
    this.container.appendChild(this.num);

    this.root.appendChild(this.container);
  }

  update(friction: number) {
    this.num.innerHTML = friction.toString();
  }
}

class Size {
  root: HTMLElement;
  container: HTMLElement;
  buttonPlus: HTMLElement;
  buttonMinus: HTMLElement;

  constructor() {
    this.root = document.getElementById("root");
    this.container = document.createElement("div");
    this.buttonPlus = document.createElement("button");
    this.buttonMinus = document.createElement("button");

    this.container.innerHTML = "Size: ";
    this.buttonPlus.innerHTML = "+";
    this.buttonMinus.innerHTML = "-";

    this.container.appendChild(this.buttonPlus);
    this.container.appendChild(this.buttonMinus);

    this.root.appendChild(this.container);
  }
}

export default class Hud {
  speed: Speed;
  friction: Friction;
  size: Size;

  constructor(speed: number, friction: number) {
    this.speed = new Speed(speed);
    this.friction = new Friction(friction);
    this.size = new Size();
  }
}
