export interface GameState {
  paused: boolean;
  elapsedTime: number;
}

export interface UpdateData {
  axes: number[];
  state: GameState;
}
