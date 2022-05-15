import Vector from "renderer/vector";

// returns a new shuffled version of an array
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getAdjacentCoords(origin: Vector, direction: string): Vector {
  const adjacent = new Vector();

  switch (true) {
    case direction === "top":
      adjacent.x = origin.x;
      adjacent.y = origin.y - 1;
      break;
    case direction === "bottom":
      adjacent.x = origin.x;
      adjacent.y = origin.y + 1;
      break;
    case direction === "left":
      adjacent.x = origin.x - 1;
      adjacent.y = origin.y;
      break;
    case direction === "right":
      adjacent.x = origin.x + 1;
      adjacent.y = origin.y;
      break;
  }
  return adjacent;
}

export function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function dice(chance: number) {
  const rand = Math.random();
  if (chance > rand) return true;
  else return false;
}

export function pickRandomly<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
