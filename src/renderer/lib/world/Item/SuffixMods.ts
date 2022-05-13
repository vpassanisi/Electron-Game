import { PlayerStats } from "renderer/types";
import { randomNumberBetween } from "renderer/util/generalUtil";

export class SuffixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    this.text = "";
    this.modifyFlat = null;
    this.modifyTotal = null;
  }
}

class FlatFireRate implements SuffixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    const value = randomNumberBetween(10, 50);
    this.text = `increase fire rate by ${value}`;
    this.modifyFlat = (s: PlayerStats) => ({
      ...s,
      fireDelay: s.fireDelay - value,
    });
    this.modifyTotal = null;
  }
}

class TotalFireRate implements SuffixMod {
  text: string;
  modifyFlat: ((x: PlayerStats) => PlayerStats) | null;
  modifyTotal: ((x: PlayerStats) => PlayerStats) | null;
  constructor() {
    const value = randomNumberBetween(10, 20);
    this.text = `increase fire rate by ${value}%`;
    this.modifyFlat = (s: PlayerStats) => ({
      ...s,
      fireDelay: s.fireDelay - s.fireDelay * (value * 0.01),
    });
    this.modifyTotal = null;
  }
}

export function getSuffixMod() {
  const mods: SuffixMod[] = [new FlatFireRate(), new TotalFireRate()];

  return mods[Math.floor(Math.random() * mods.length)];
}
