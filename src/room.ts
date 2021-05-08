import { Rock, Enemy, Wall } from "./lib/entities/index.js";
import type { Tile } from "./types";

export const Room = <Tile[][]>[
  [{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{  },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },],
  [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
  [{ entity: Wall },{},{},{},{},{},{},{},{},{},{},{ entity: Enemy },{},{},{ entity: Wall },],
  [{ entity: Wall },{},{},{},{},{},{},{ entity: Rock },{},{},{},{},{},{},{ entity: Wall },],
  [{ },{},{},{},{ entity: Rock },{},{},{ entity: Enemy },{},{},{ entity: Rock },{},{},{},{  },],
  [{ entity: Wall },{},{},{},{},{},{},{ entity: Rock },{},{},{},{},{},{},{ entity: Wall },],
  [{ entity: Wall },{},{},{},{},{},{},{},{},{},{},{ entity: Enemy },{},{},{ entity: Wall },],
  [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
  [{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{  },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },{ entity: Wall },],
];
