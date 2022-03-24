import type Game from "renderer/index";
import Cell from "renderer/lib/world/Cell";
import Vector from "renderer/vector";

export default function makeFloorGrid(Game: Game) {
  return [
    [
      new Cell(Game, new Vector([0,0])),
      new Cell(Game, new Vector([1,0])),
      new Cell(Game, new Vector([2,0])),
      new Cell(Game, new Vector([3,0])),
      new Cell(Game, new Vector([4,0])),
      new Cell(Game, new Vector([5,0])),
      new Cell(Game, new Vector([6,0])),
      new Cell(Game, new Vector([7,0])),
      new Cell(Game, new Vector([8,0])),
    ],
    [
      new Cell(Game, new Vector([0,1])),
      new Cell(Game, new Vector([1,1])),
      new Cell(Game, new Vector([2,1])),
      new Cell(Game, new Vector([3,1])),
      new Cell(Game, new Vector([4,1])),
      new Cell(Game, new Vector([5,1])),
      new Cell(Game, new Vector([6,1])),
      new Cell(Game, new Vector([7,1])),
      new Cell(Game, new Vector([8,1])),
    ],
    [
      new Cell(Game, new Vector([0,2])),
      new Cell(Game, new Vector([1,2])),
      new Cell(Game, new Vector([2,2])),
      new Cell(Game, new Vector([3,2])),
      new Cell(Game, new Vector([4,2])),
      new Cell(Game, new Vector([5,2])),
      new Cell(Game, new Vector([6,2])),
      new Cell(Game, new Vector([7,2])),
      new Cell(Game, new Vector([8,2])),
    ],
    [
      new Cell(Game, new Vector([0,3])),
      new Cell(Game, new Vector([1,3])),
      new Cell(Game, new Vector([2,3])),
      new Cell(Game, new Vector([3,3])),
      new Cell(Game, new Vector([4,3])),
      new Cell(Game, new Vector([5,3])),
      new Cell(Game, new Vector([6,3])),
      new Cell(Game, new Vector([7,3])),
      new Cell(Game, new Vector([8,3])),
    ],
    [
      new Cell(Game, new Vector([0,4])),
      new Cell(Game, new Vector([1,4])),
      new Cell(Game, new Vector([2,4])),
      new Cell(Game, new Vector([3,4])),
      new Cell(Game, new Vector([4,4])),
      new Cell(Game, new Vector([5,4])),
      new Cell(Game, new Vector([6,4])),
      new Cell(Game, new Vector([7,4])),
      new Cell(Game, new Vector([8,4])),
    ],
    [
      new Cell(Game, new Vector([0,5])),
      new Cell(Game, new Vector([1,5])),
      new Cell(Game, new Vector([2,5])),
      new Cell(Game, new Vector([3,5])),
      new Cell(Game, new Vector([4,5])),
      new Cell(Game, new Vector([5,5])),
      new Cell(Game, new Vector([6,5])),
      new Cell(Game, new Vector([7,5])),
      new Cell(Game, new Vector([8,5])),
    ],
    [
      new Cell(Game, new Vector([0,6])),
      new Cell(Game, new Vector([1,6])),
      new Cell(Game, new Vector([2,6])),
      new Cell(Game, new Vector([3,6])),
      new Cell(Game, new Vector([4,6])),
      new Cell(Game, new Vector([5,6])),
      new Cell(Game, new Vector([6,6])),
      new Cell(Game, new Vector([7,6])),
      new Cell(Game, new Vector([8,6])),
    ]
  ]
}