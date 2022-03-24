import type Game from "renderer/index";
import Vector from "renderer/vector";
import { WallTypes, DoorTypes, BackgroundTypes, ModelTypes, Tile } from "renderer/types";
import Wall from "renderer/lib/world/Model/Wall";
import Door from "renderer/lib/world/Model/Door";
import Background from "renderer/lib/world/Background/Background";
import Rock from "renderer/lib/world/Model/Rock";
import Bat from "renderer/lib/world/Entity/Bat";
import Entity from "renderer/lib/world/Entity/Entity";
import Cell from "renderer/lib/world/Cell";

export default class Room {
    map: Tile[][]
    entities: Entity[]
    coords: Vector
    cell: Cell
    constructor(Game: Game, cell: Cell, roomCoords: Vector) {
        this.entities = [];
        this.coords = roomCoords;
        this.cell = cell;
        this.map = [
            [
                {model: new Wall(Game, WallTypes.topLeft, new Vector([0,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([1,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([2,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([3,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([4,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([5,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([6,0]), roomCoords)},
                {model: new Door(Game, DoorTypes.top, new Vector([7,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([8,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([9,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([10,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([11,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([12,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.top, new Vector([13,0]), roomCoords)},
                {model: new Wall(Game, WallTypes.topRight, new Vector([14,0]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.left, new Vector([0,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([5,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([6,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([7,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([8,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([9,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,1]), roomCoords), entity: new Bat(Game, new Vector([12,1]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,1]), roomCoords)},
                {model: new Wall(Game, WallTypes.right, new Vector([14,1]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.left, new Vector([0,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([5,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([6,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([7,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([8,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([9,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,2]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,2]), roomCoords)},
                {model: new Wall(Game, WallTypes.right, new Vector([14,2]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.left, new Vector([0,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,3]), roomCoords)},
                {model: new Rock(Game, ModelTypes.rock, new Vector([5,3]), roomCoords), background: new Background(Game, BackgroundTypes.carpetTopLeft, new Vector([5,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetTop, new Vector([6,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetTop, new Vector([7,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetTop, new Vector([8,3]), roomCoords)},
                {model: new Rock(Game, ModelTypes.rock, new Vector([9,3]), roomCoords), background: new Background(Game, BackgroundTypes.carpetTopRight, new Vector([9,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,3]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,3]), roomCoords)},
                {model: new Wall(Game, WallTypes.right, new Vector([14,3]), roomCoords)},
            ],
            [
                {model: new Door(Game, DoorTypes.left, new Vector([0,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetLeft, new Vector([5,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetCenter, new Vector([6,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetCenter, new Vector([7,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetCenter, new Vector([8,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetRight, new Vector([9,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,4]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,4]), roomCoords)},
                {model: new Door(Game, DoorTypes.right, new Vector([14,4]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.left, new Vector([0,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,5]), roomCoords)},
                {model: new Rock(Game, ModelTypes.rock, new Vector([5,5]), roomCoords), background: new Background(Game, BackgroundTypes.carpetBottomLeft, new Vector([5,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetBottom, new Vector([6,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetBottom, new Vector([7,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.carpetBottom, new Vector([8,5]), roomCoords)},
                {model: new Rock(Game, ModelTypes.rock, new Vector([9,5]), roomCoords), background: new Background(Game, BackgroundTypes.carpetBottomRight, new Vector([9,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,5]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,5]), roomCoords)},
                {model: new Wall(Game, WallTypes.right, new Vector([14,5]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.left, new Vector([0,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([5,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([6,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([7,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([8,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([9,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,6]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,6]), roomCoords)},
                {model: new Wall(Game, WallTypes.right, new Vector([14,6]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.left, new Vector([0,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([1,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([2,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([3,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([4,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([5,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([6,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([7,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([8,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([9,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([10,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([11,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([12,7]), roomCoords)},
                {background: new Background(Game, BackgroundTypes.wood, new Vector([13,7]), roomCoords)},
                {model: new Wall(Game, WallTypes.right, new Vector([14,7]), roomCoords)},
            ],
            [
                {model: new Wall(Game, WallTypes.bottomLeft, new Vector([0,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([1,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([2,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([3,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([4,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([5,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([6,8]), roomCoords)},
                {model: new Door(Game, DoorTypes.bottom, new Vector([7,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([8,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([9,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([10,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([11,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([12,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottom, new Vector([13,8]), roomCoords)},
                {model: new Wall(Game, WallTypes.bottomRight, new Vector([14,8]), roomCoords)},
            ],
        ]

        this.map.forEach((row) => {
            row.forEach((t) => t.entity && this.entities.push(t.entity))
        })
    }
}
