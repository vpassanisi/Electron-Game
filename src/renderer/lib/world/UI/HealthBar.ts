import Game from "renderer";

export default class HealthBar extends HTMLElement {
  Game: Game;
  bar: HTMLElement;

  constructor(Game: Game) {
    super();
    this.Game = Game;

    this.style.bottom = "5vh";
    this.style.left = "5vw";
    this.style.width = "25vw";
    this.style.height = "5vh";
    this.style.backgroundColor = "#000000C8";
    this.classList.add("absolute", "flex");

    this.bar = this.appendChild(document.createElement("div"));
    this.bar.style.backgroundColor = "red";
    this.bar.style.margin = "1vh";
    const percent =
      (this.Game.Player?.stats.currentHealth / this.Game.Player?._baseStats.maxHealth) * 100;
    this.bar.style.width = `${percent}%`;
  }

  update() {
    const percent =
      (this.Game.Player?.stats.currentHealth / this.Game.Player?._baseStats.maxHealth) * 100;

    this.bar.style.width = `${percent}%`;
  }

  connectedCallback() {
    console.log("connected");
  }
}

customElements.define("health-bar", HealthBar);
