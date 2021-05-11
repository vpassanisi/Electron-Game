import { Rock, Enemy, Wall, Door } from "../entities/index.js";
import type { TileType } from "../../types";

export const layout_1 = <TileType[][]>[
  [{entity:Wall,type:"TL"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"TR"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"}],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Enemy,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Rock,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Rock,bg:[1,27] },{bg:[1,27]},{bg:[1,27]},{entity:Enemy,bg:[1,27] },{bg:[1,27]},{bg:[1,27]},{entity:Rock,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Door,type:"R"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Rock,bg:[1,27] },{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Enemy,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"}],
  [{entity:Wall,type:"BL"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Door,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"BR"},],
  ]

export const layout_2 = <TileType[][]>[
  [{entity:Wall,type:"TL"},{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "TR" },],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"}],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Enemy,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"},],
  [{entity:Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{ entity: Wall, type: "R" },],
  [{entity:Door,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Rock,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{ entity: Wall, type: "R" },],
  [{entity: Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{ entity: Wall, type: "R" },],
  [{entity: Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Enemy,bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{ entity:Wall,type:"R"},],
  [{entity: Wall,type:"L"},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{bg:[1,27]},{entity:Wall,type:"R"}],
  [{entity: Wall,type:"BL"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Door,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"B"},{entity:Wall,type:"BR"},],
  ]

export const layout_3 = <TileType[][]>[
  [{entity:Wall,type:"TL"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Door,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"T"},{entity:Wall,type:"TR"},],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" }],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{ entity: Enemy },{},{},{},{},{},{},{entity:Door,type:"R"},],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" }],
  [{ entity: Wall, type: "BL" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "BR" },],
  ]

export const layout_4 = <TileType[][]>[
  [{ entity: Wall, type: "TL" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Door,type:"T"},{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "T" },{ entity: Wall, type: "TR" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" }],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{ entity: Enemy },{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Door,type:"L"},{},{},{},{},{},{},{ entity: Enemy },{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{ entity: Enemy },{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" },],
  [{ entity: Wall, type: "L" },{},{},{},{},{},{},{},{},{},{},{},{},{},{ entity: Wall, type: "R" }],
  [{ entity: Wall, type: "BL" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "B" },{ entity: Wall, type: "BR" },],
  ]
