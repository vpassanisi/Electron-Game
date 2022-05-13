import { PlayerStats } from "renderer/types";
import { randomNumberBetween } from "renderer/util/generalUtil";

export class PrefixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    this.text = "";
    this.modifyFlat = null;
    this.modifyTotal = null;
  }
}

class FlatSpeed implements PrefixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    const value = randomNumberBetween(1, 20);
    this.text = `increase speed by ${value}`;
    this.modifyFlat = (s: PlayerStats) => ({
      ...s,
      speed: s.speed + value,
    });
    this.modifyTotal = null;
  }
}

class TotalSpeed implements PrefixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    const value = randomNumberBetween(1, 5);
    this.text = `increase speed by ${value}%`;
    this.modifyFlat = null;
    this.modifyTotal = (s: PlayerStats) => ({
      ...s,
      speed: s.speed + s.speed * (value * 0.01),
    });
  }
}

class FlatHealth implements PrefixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    const value = randomNumberBetween(1, 10);
    this.text = `increase health by ${value}`;
    this.modifyFlat = (s: PlayerStats) => ({
      ...s,
      health: s.health + value,
    });
    this.modifyTotal = null;
  }
}

class TotalHealth implements PrefixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    const value = randomNumberBetween(1, 5);
    this.text = `increase health by ${value}%`;
    this.modifyFlat = null;
    this.modifyTotal = (s: PlayerStats) => ({
      ...s,
      health: s.health + s.health * (value * 0.01),
    });
  }
}

export function getPrefixMod() {
  const mods: PrefixMod[] = [
    new FlatSpeed(),
    new TotalSpeed(),
    new FlatHealth(),
    new TotalHealth(),
  ];

  return mods[Math.floor(Math.random() * mods.length)];
}
