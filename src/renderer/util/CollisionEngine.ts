import Game from "renderer";
import Hitbox from "renderer/lib/Hitbox";
import Vector from "renderer/vector";

export default class CollisionEngine {
  Game: Game;
  constructor(Game: Game) {
    this.Game = Game;
  }

  checkAll() {}

  playerModelColisions() {
    const { x, y } = this.Game.Player.currentTileCoords;
    const checkFirst = [
      this.Game.currentRoom.map[y - 1]?.[x],
      this.Game.currentRoom.map[y]?.[x - 1],
      this.Game.currentRoom.map[y]?.[x + 1],
      this.Game.currentRoom.map[y + 1]?.[x],
    ];
    const checkSecond = [
      this.Game.currentRoom.map[y - 1]?.[x - 1],
      this.Game.currentRoom.map[y - 1]?.[x + 1],
      this.Game.currentRoom.map[y]?.[x],
      this.Game.currentRoom.map[y + 1]?.[x - 1],
      this.Game.currentRoom.map[y + 1]?.[x + 1],
    ];

    checkFirst.forEach((tile) => {
      if (!tile.model) return;
      const col = this.sat(this.Game.Player.hitBox, tile.model.hitbox);
      if (col) {
        console.log(col);
      }
    });
    checkSecond.forEach((tile) => {
      if (!tile.model) return;
      const col = this.sat(this.Game.Player.hitBox, tile.model.hitbox);
      if (col) {
        console.log(col);
      }
    });
  }

  sat(hitbox1: Hitbox, hitbox2: Hitbox) {
    const perpendicularEdges: Vector[] = [];
    hitbox1.edges.forEach((edge) => {
      perpendicularEdges.push(new Vector([edge.y * -1, edge.x]));
    });
    hitbox2.edges.forEach((edge) => {
      perpendicularEdges.push(new Vector([edge.y * -1, edge.x]));
    });

    let dotProducts1: number[] = [];
    let dotProducts2: number[] = [];
    for (const perpEdge of perpendicularEdges) {
      dotProducts1 = [];
      dotProducts2 = [];
      hitbox1.points.forEach((point) => {
        dotProducts1.push(this.dotProduct(point, perpEdge));
      });

      hitbox2.points.forEach((point) => {
        dotProducts2.push(this.dotProduct(point, perpEdge));
      });

      const max1 = Math.max(...dotProducts1);
      const min1 = Math.min(...dotProducts1);
      const max2 = Math.max(...dotProducts2);
      const min2 = Math.min(...dotProducts2);

      if ((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1)) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  dotProduct(v1: Vector, v2: Vector) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}
