import type { CellGridCells } from '@/components/CellGrid/types';
import { writable } from 'svelte/store';
import { LOCAL_STORAGE_KEY, useLocalGame } from './useLocalGame';
import { initCellGrid } from '@/utils/initCellGrid';

export type State = {
  grid: CellGridCells;
  size: number;
  transitionDuration: number;
  score: number;
  isTransitionActive: boolean;
};

const local = useLocalGame();
export const game = writable<State>();

export function restartGame() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  game.update(() => {
    const state = {
      grid: initCellGrid(4),
      isTransitionActive: false,
      size: 4,
      score: 0,
      transitionDuration: 250,
    };
    state.grid[1][1].value = 2;

    return state;
  });
}

if (local) {
  game.update(() => ({
    ...local,
    isTransitionActive: false,
  }));
} else {
  restartGame();
}

game.subscribe((v) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(v));
});
