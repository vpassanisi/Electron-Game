import type Game from "renderer";
import type Vector from "renderer/vector";

interface args {
  key: string;
  position: Vector;
  Game: Game;
  side: string;
}

export default class InteractionPrompt extends HTMLElement {
  constructor({ key, position, Game, side }: args) {
    super();
    this.innerHTML = key;
    const halfTileWidth = Game.dimentions.tileWidth / 2;
    const halfTileHeight = Game.dimentions.tileWidth / 2;
    const left = side === "left" ? position.x - halfTileWidth : position.x + halfTileWidth * 0.4;

    this.classList.add(
      "absolute",
      "text-white",
      "flex",
      "items-center",
      "justify-center",
      "h-4",
      "w-4",
      "transition-all",
      "duration-300"
    );
    this.style.backgroundColor = "#000000C8";
    this.style.left = `${left}px`;
    this.style.top = `${position.y - halfTileHeight}px`;
    this.style.paddingBottom = "2px";
    this.style.opacity = "0";
    this.style.transform = "translateY(10px)";
    this.style.zIndex = "1";
  }

  set show(s: boolean) {
    if (s) {
      this.style.opacity = "1";
      this.style.transform = "translateY(0)";
    } else {
      this.style.opacity = "0";
      this.style.transform = "translateY(10px)";
    }
  }
}

customElements.define("interaction-prompt", InteractionPrompt);
