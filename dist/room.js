import { Rock, Enemy, Wall } from "./lib/entities/index.js";
export const Room = [
    [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
    [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
    [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, { entity: Wall },],
    [{ entity: Wall }, {}, {}, {}, {}, {}, {}, { entity: Rock }, {}, {}, {}, {}, {}, {}, { entity: Wall },],
    [{}, {}, {}, {}, { entity: Rock }, {}, {}, { entity: Enemy }, {}, {}, { entity: Rock }, {}, {}, {}, {},],
    [{ entity: Wall }, {}, {}, {}, {}, {}, {}, { entity: Rock }, {}, {}, {}, {}, {}, {}, { entity: Wall },],
    [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, { entity: Wall },],
    [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
    [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
];
//# sourceMappingURL=room.js.map