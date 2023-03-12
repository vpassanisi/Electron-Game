import room1 from "renderer/lib/world/Rooms/roomMap1";
import room2 from "renderer/lib/world/Rooms/roomMap2";
import StartingRoom from "renderer/lib/world/Rooms/StartingRoom";
import Hideout from "renderer/lib/world/Rooms/Hideout";
import { pickRandomly } from "renderer/util/generalUtil";

function getRandomRoom() {
  return pickRandomly([room1, room2]);
}

export { StartingRoom, Hideout, getRandomRoom };
