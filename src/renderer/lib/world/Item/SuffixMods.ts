import { ModArgs, Stats } from "renderer/types";
import { randomNumberBetween } from "renderer/util/generalUtil";

export class SuffixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    this.text = "";
    this.modify = () => ({
      currentHealth: 0,
      fireDelay: 0,
      maxHealth: 0,
      minHealth: 0,
      shotSpeed: 0,
      speed: 0,
    });
  }
}

class FlatFireRate implements SuffixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    const value = randomNumberBetween(10, 50);
    this.text = `increase fire rate by ${value}`;
    this.modify = ({ cur, player }) => ({
      ...cur,
      fireDelay: cur.fireDelay - value,
    });
  }
}

class TotalFireRate implements SuffixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    const value = randomNumberBetween(10, 20);
    this.text = `increase fire rate by ${value}%`;
    this.modify = ({ cur, player }) => ({
      ...cur,
      fireDelay: cur.fireDelay - player._baseStats.fireDelay * (value * 0.01),
    });
  }
}

export function getSuffixMod() {
  const mods: SuffixMod[] = [new FlatFireRate(), new TotalFireRate()];

  return mods[Math.floor(Math.random() * mods.length)];
}
