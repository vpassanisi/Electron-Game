import { FullStat } from "renderer/types";
import { randomNumberBetween } from "renderer/util/generalUtil";
import S from "renderer/lib/world/Player/Stats";

const Stats = new S();

export class PrefixMod {
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

class FlatSpeed extends PrefixMod {
  constructor() {
    super();
    const value = randomNumberBetween(1, 20);
    this.text = `increase speed by ${value}`;
    this.statName = "speed";
    this.mod = {
      base: value,
      factor: 0,
    };
  }
}

class TotalSpeed extends PrefixMod {
  constructor() {
    super();
    const value = randomNumberBetween(1, 5);
    this.text = `increase speed by ${value}%`;
    this.statName = "speed";
    this.mod = {
      base: 0,
      factor: value * 0.01,
    };
  }
}

class FlatHealth extends PrefixMod {
  constructor() {
    super();
    const value = randomNumberBetween(1, 10);
    this.text = `increase health by ${value}`;
    this.statName = "maxHealth";
    this.mod = {
      base: value,
      factor: 0,
    };
  }
}

class TotalHealth extends PrefixMod {
  constructor() {
    super();
    const value = randomNumberBetween(1, 5);
    this.text = `increase health by ${value}%`;
    this.statName = "maxHealth";
    this.mod = {
      base: 0,
      factor: value * 0.01,
    };
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
