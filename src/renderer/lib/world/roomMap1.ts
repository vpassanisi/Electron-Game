import Wall from "renderer/lib/world/Model/Wall";
import Rock from "renderer/lib/world/Model/Rock";
import { BackgroundTypes } from "renderer/types";
import Bat from "renderer/lib/world/Entity/Bat";

export const backgrounds = [
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.carpetTopLeft,
    BackgroundTypes.carpetTop,
    BackgroundTypes.carpetTop,
    BackgroundTypes.carpetTop,
    BackgroundTypes.carpetTopRight,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.carpetLeft,
    BackgroundTypes.carpetCenter,
    BackgroundTypes.carpetCenter,
    BackgroundTypes.carpetCenter,
    BackgroundTypes.carpetRight,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.carpetBottomLeft,
    BackgroundTypes.carpetBottom,
    BackgroundTypes.carpetBottom,
    BackgroundTypes.carpetBottom,
    BackgroundTypes.carpetBottomRight,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    BackgroundTypes.wood,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
];

export const models = [
  [
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    Rock,
    null,
    null,
    null,
    Rock,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    Rock,
    null,
    null,
    null,
    Rock,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Wall,
  ],
  [
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
    Wall,
  ],
];

export const entities = [
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Bat,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
];
