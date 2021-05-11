import type { GameType } from "../../types";
import { Room } from "./room.js";
import * as layouts from "./layouts.js";

export const Map = (game: GameType) =>
  <Room[][]>[
    [new Room(game, 0, 0, layouts.layout_1), new Room(game, 1, 0, layouts.layout_2)],
    [new Room(game, 0, 1, layouts.layout_3), new Room(game, 1, 1, layouts.layout_4)],
  ];
