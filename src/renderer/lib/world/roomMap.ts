import { TileTemplate, Models, ModelTypes } from "../../types";

const TopWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.top,
}

const LeftWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.left,
}

const RightWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.right,
}

const BottomWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.bottom,
}

const TopLeftWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.topLeft,
}

const TopRightWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.topRight,
}

const BottomLeftWall: TileTemplate = {
    model: Models.Wall,
    modelType: ModelTypes.bottomLeft,
}

const BottomRightWall: TileTemplate = {
    model:Models.Wall,
    modelType: ModelTypes.bottomRight,
}

const LeftDoor: TileTemplate = {
    model: Models.Door,
    modelType: ModelTypes.left,
}

const RightDoor: TileTemplate = {
    model: Models.Door,
    modelType: ModelTypes.right,
}

const TopDoor: TileTemplate = {
    model: Models.Door,
    modelType: ModelTypes.top,
}

const BottomDoor: TileTemplate = {
    model: Models.Door,
    modelType: ModelTypes.bottom,
}

const Room: TileTemplate[][] = [
[TopLeftWall, TopWall, TopWall, TopWall, TopWall, TopWall, TopWall, TopDoor, TopWall, TopWall, TopWall, TopWall, TopWall, TopWall, TopRightWall],
[LeftWall, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightWall],
[LeftWall, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightWall],
[LeftWall, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightWall],
[LeftDoor, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightDoor],
[LeftWall, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightWall],
[LeftWall, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightWall],
[LeftWall, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, RightWall],
[BottomLeftWall, BottomWall, BottomWall, BottomWall, BottomWall, BottomWall, BottomWall, BottomDoor, BottomWall, BottomWall, BottomWall, BottomWall, BottomWall, BottomWall, BottomRightWall],
]

export { Room }
