import { FullStat } from "renderer/types";
import { randomNumberBetween } from "renderer/util/generalUtil";
import S from "renderer/lib/world/Player/Stats";

const Stats = new S();

export class SuffixMod {
  text: string;
  statName: keyof typeof Stats.fullStats;
  mod: FullStat;
  constructor() {
    this.text = "";
    this.statName = "maxHealth";
    this.mod = {
      base: 0,
      factor: 0,
    };
  }
}

class FlatFireRate extends SuffixMod {
  constructor() {
    super();
    const value = randomNumberBetween(10, 50);
    this.text = `increase fire rate by ${value}`;
    this.statName = "fireDelay";
    this.mod = {
      base: -value,
      factor: 0,
    };
  }
}

class TotalFireRate extends SuffixMod {
  constructor() {
    super();
    const value = randomNumberBetween(10, 20);
    this.text = `increase fire rate by ${value}%`;
    this.statName = "fireDelay";
    this.mod = {
      base: 0,
      factor: -(value * 0.01),
    };
  }
}

export function getSuffixMod() {
  const mods: SuffixMod[] = [new FlatFireRate(), new TotalFireRate()];

  return mods[Math.floor(Math.random() * mods.length)];
}
