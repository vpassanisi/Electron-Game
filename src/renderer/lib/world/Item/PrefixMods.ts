import { Stats, ModArgs } from "renderer/types";
import { randomNumberBetween } from "renderer/util/generalUtil";

export class PrefixMod {
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

class FlatSpeed implements PrefixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    const value = randomNumberBetween(1, 20);
    this.text = `increase speed by ${value}`;
    this.modify = ({ cur }) => ({
      ...cur,
      speed: cur.speed + value,
    });
  }
}

class TotalSpeed implements PrefixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    const value = randomNumberBetween(1, 5);
    this.text = `increase speed by ${value}%`;
    this.modify = ({ cur, player }) => ({
      ...cur,
      speed: cur.speed + player._baseStats.speed * (value * 0.01),
    });
  }
}

class FlatHealth implements PrefixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    const value = randomNumberBetween(1, 10);
    this.text = `increase health by ${value}`;
    this.modify = ({ cur }) => ({
      ...cur,
      maxHealth: cur.maxHealth + value,
    });
  }
}

class TotalHealth implements PrefixMod {
  text: string;
  modify: ({ cur, player }: ModArgs) => Stats;
  constructor() {
    const value = randomNumberBetween(1, 5);
    this.text = `increase health by ${value}%`;
    this.modify = ({ cur, player }) => ({
      ...cur,
      maxHealth: cur.maxHealth + player._baseStats.maxHealth * (value * 0.01),
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
