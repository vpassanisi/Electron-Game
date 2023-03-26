import type Vector from "renderer/vector";
import type Entity from "renderer/lib/world/Entity";
import type Model from "renderer/lib/world/Model";
import type Assets from "renderer/util/Assets";
import type { PrefixMod } from "renderer/lib/world/Item/PrefixMods";
import type { SuffixMod } from "renderer/lib/world/Item/SuffixMods";

export type ItemTypes = keyof Assets["itemTextures"];

export interface ItemSaveData {
  itemType: ItemTypes;
  prefixMod1: PrefixMod | null;
  suffixMod1: SuffixMod | null;
}
export interface GameState {
  paused: Boolean;
  debug: Boolean;
}

export type FullStat = {
  base: number;
  factor: number;
};

export interface satResult {
  collision: boolean;
  axis: Vector;
  distance: number;
}

export enum BackgroundTypes {
  wood = "wood",
  carpetTop = "top",
  carpetLeft = "left",
  carpetRight = "right",
  carpetBottom = "bottom",
  carpetCenter = "center",
  carpetTopLeft = "topLeft",
  carpetTopRight = "topRight",
  carpetBottomLeft = "bottomLeft",
  carpetBottomRight = "bottomRight",
}

export type Directions = "up" | "down" | "left" | "right";

export interface RoomMapMeta {
  name: string;
}

export interface RoomMap {
  meta: RoomMapMeta;
  backgrounds: (BackgroundTypes | null)[][];
  models: (typeof Model | null)[][];
  entities: (typeof Entity | null)[][];
}
