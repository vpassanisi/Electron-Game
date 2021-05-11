import { Rock, Enemy, Wall } from "./lib/entities/index.js";
const Room1 = {
    layout: [
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, { entity: Rock }, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{}, {}, {}, {}, { entity: Rock }, {}, {}, { entity: Enemy }, {}, {}, { entity: Rock }, {}, {}, {}, {},],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, { entity: Rock }, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
    ]
};
const Room2 = {
    layout: [
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{}, {}, {}, {}, {}, {}, {}, { entity: Rock }, {}, {}, {}, {}, {}, {}, {},],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
    ]
};
const Room3 = {
    layout: [
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, {}, {}, {}, {}, {},],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
    ]
};
const Room4 = {
    layout: [
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{}, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, {}, {}, {}, {}, {},],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, { entity: Enemy }, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall },],
        [{ entity: Wall }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { entity: Wall }],
        [{ entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, {}, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall }, { entity: Wall },],
    ]
};
export const Map = {
    map: [
        [Room1, Room2],
        [Room3, Room4],
    ]
};
//# sourceMappingURL=layouts.js.map