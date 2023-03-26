import { FullStat } from "renderer/types";

export default class Stats {
  fullStats: {
    maxHealth: FullStat;
    fireDelay: FullStat;
    shotSpeed: FullStat;
    speed: FullStat;
  };
  constructor() {
    this.fullStats = {
      maxHealth: {
        base: 100,
        factor: 1,
      },
      fireDelay: {
        base: 200,
        factor: 1,
      },
      shotSpeed: {
        base: 5,
        factor: 1,
      },
      speed: {
        base: 5,
        factor: 1,
      },
    };
  }

  get maxHealth() {
    return this.fullStats.maxHealth.base * this.fullStats.maxHealth.factor;
  }

  get fireDelay() {
    return this.fullStats.fireDelay.base * this.fullStats.fireDelay.factor;
  }

  get shotSpeed() {
    return this.fullStats.shotSpeed.base * this.fullStats.shotSpeed.factor;
  }

  get speed() {
    return this.fullStats.speed.base * this.fullStats.speed.factor;
  }

  updateStat(key: keyof typeof this.fullStats, stat: FullStat) {
    this.fullStats[key].base += stat.base;
    this.fullStats[key].factor += stat.factor;
  }
}
