import type Game from "renderer/index";
import Vector from "renderer/vector";
import { WallTypes, TileDef, DoorTypes, BackgroundTypes, ModelTypes } from "renderer/types";
import Wall from "renderer/lib/world/Model/Wall";
import Door from "renderer/lib/world/Model/Door";
import Background from "renderer/lib/world/Background/Background";
import Rock from "renderer/lib/world/Model/Rock";
import Bat from "renderer/lib/world/Entity/Bat";

export default function Room(Game: Game, roomCoords: Vector): TileDef[][] {
    return [
        [
            {model: () => new Wall(Game, WallTypes.topLeft, new Vector([0,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([1,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([2,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([3,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([4,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([5,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([6,0]), roomCoords)},
            {model: () => new Door(Game, DoorTypes.top, new Vector([7,0]))},
            {model: () => new Wall(Game, WallTypes.top, new Vector([8,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([9,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([10,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([11,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([12,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.top, new Vector([13,0]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.topRight, new Vector([14,0]), roomCoords)},
        ],
        [
            {model: () => new Wall(Game, WallTypes.left, new Vector([0,1]), roomCoords)},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([5,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([6,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([7,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([8,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([9,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,1])), entity: () => new Bat(Game, new Vector([12,1]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,1]))},
            {model: () => new Wall(Game, WallTypes.right, new Vector([14,1]), roomCoords)},
        ],
        [
            {model: () => new Wall(Game, WallTypes.left, new Vector([0,2]), roomCoords)},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([5,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([6,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([7,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([8,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([9,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,2]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,2]))},
            {model: () => new Wall(Game, WallTypes.right, new Vector([14,2]), roomCoords)},
        ],
        [
            {model: () => new Wall(Game, WallTypes.left, new Vector([0,3]), roomCoords)},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,3]))},
            {model: () => new Rock(Game, ModelTypes.rock, new Vector([5,3])), background: () => new Background(Game, BackgroundTypes.carpetTopLeft, new Vector([5,3]))},
            {background: () => new Background(Game, BackgroundTypes.carpetTop, new Vector([6,3]))},
            {background: () => new Background(Game, BackgroundTypes.carpetTop, new Vector([7,3]))},
            {background: () => new Background(Game, BackgroundTypes.carpetTop, new Vector([8,3]))},
            {model: () => new Rock(Game, ModelTypes.rock, new Vector([9,3])), background: () => new Background(Game, BackgroundTypes.carpetTopRight, new Vector([9,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,3]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,3]))},
            {model: () => new Wall(Game, WallTypes.right, new Vector([14,3]), roomCoords)},
        ],
        [
            {model: () => new Door(Game, DoorTypes.left, new Vector([0,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,4]))},
            {background: () => new Background(Game, BackgroundTypes.carpetLeft, new Vector([5,4]))},
            {background: () => new Background(Game, BackgroundTypes.carpetCenter, new Vector([6,4]))},
            {background: () => new Background(Game, BackgroundTypes.carpetCenter, new Vector([7,4]))},
            {background: () => new Background(Game, BackgroundTypes.carpetCenter, new Vector([8,4]))},
            {background: () => new Background(Game, BackgroundTypes.carpetRight, new Vector([9,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,4]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,4]))},
            {model: () => new Door(Game, DoorTypes.right, new Vector([14,4]))},
        ],
        [
            {model: () => new Wall(Game, WallTypes.left, new Vector([0,5]), roomCoords)},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,5]))},
            {model: () => new Rock(Game, ModelTypes.rock, new Vector([5,5])), background: () => new Background(Game, BackgroundTypes.carpetBottomLeft, new Vector([5,5]))},
            {background: () => new Background(Game, BackgroundTypes.carpetBottom, new Vector([6,5]))},
            {background: () => new Background(Game, BackgroundTypes.carpetBottom, new Vector([7,5]))},
            {background: () => new Background(Game, BackgroundTypes.carpetBottom, new Vector([8,5]))},
            {model: () => new Rock(Game, ModelTypes.rock, new Vector([9,5])), background: () => new Background(Game, BackgroundTypes.carpetBottomRight, new Vector([9,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,5]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,5]))},
            {model: () => new Wall(Game, WallTypes.right, new Vector([14,5]), roomCoords)},
        ],
        [
            {model: () => new Wall(Game, WallTypes.left, new Vector([0,6]), roomCoords)},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([5,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([6,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([7,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([8,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([9,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,6]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,6]))},
            {model: () => new Wall(Game, WallTypes.right, new Vector([14,6]), roomCoords)},
        ],
        [
            {model: () => new Wall(Game, WallTypes.left, new Vector([0,7]), roomCoords)},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([1,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([2,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([3,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([4,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([5,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([6,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([7,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([8,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([9,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([10,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([11,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([12,7]))},
            {background: () => new Background(Game, BackgroundTypes.wood, new Vector([13,7]))},
            {model: () => new Wall(Game, WallTypes.right, new Vector([14,7]), roomCoords)},
        ],
        [
            {model: () => new Wall(Game, WallTypes.bottomLeft, new Vector([0,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([1,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([2,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([3,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([4,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([5,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([6,8]), roomCoords)},
            {model: () => new Door(Game, DoorTypes.bottom, new Vector([7,8]))},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([8,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([9,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([10,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([11,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([12,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottom, new Vector([13,8]), roomCoords)},
            {model: () => new Wall(Game, WallTypes.bottomRight, new Vector([14,8]), roomCoords)},
        ],
    ]
}
