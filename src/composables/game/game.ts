import { game, type State } from '@/store/game/game';
import type { CellGridCells } from '@/store/game/types';
import { addGridCellValue } from '@/utils/addGridCellValue';
import { isGridsEqual } from '@/utils/isGridsEqual';
import { move, type Direction } from '@/utils/move';

let state: State;
game.subscribe((v) => (state = v));

function handleUpdate(oldState: CellGridCells, newState: CellGridCells) {
  state.isTransitionActive = true;

  game.update((v) => ({
    ...v,
    grid: oldState,
  }));
  setTimeout(() => {
    addGridCellValue(newState);

    game.update((o) => ({
      ...o,
      grid: newState,
    }));

    state.isTransitionActive = false;
  }, state.transitionDuration);
}

function keyToDirection(key: KeyboardEvent['key']): Direction | undefined {
  switch (key.toLocaleUpperCase()) {
    case 'W':
      return 'UP';
    case 'S':
      return 'DOWN';
    case 'D':
      return 'RIGHT';
    case 'A':
      return 'LEFT';
  }
}

function tryMove(dir: Direction): void {
  const [oldState, newState, score] = move(state.grid, dir);
  if (isGridsEqual(oldState, newState)) return;
  state.score += score;
  handleUpdate(oldState, newState);
}

function handleKeyPress(e: KeyboardEvent): void {
  if (state.isTransitionActive) return;

  const dir = keyToDirection(e.key);
  if (!dir) return;

  tryMove(dir);
}

let touchX: number | null = null,
  touchY: number | null = null,
  touchDx = 0,
  touchDy = 0;

function handleTouchEnd(e: TouchEvent) {
  // min diff
  if (Math.abs(Math.abs(touchDx) - Math.abs(touchDy)) < 40) return;

  let dir: Direction;
  if (Math.abs(touchDx) > Math.abs(touchDy)) {
    if (touchDx > 0) dir = 'RIGHT';
    else dir = 'LEFT';
  } else {
    if (touchDy > 0) dir = 'DOWN';
    else dir = 'UP';
  }

  tryMove(dir);
}

function handleTouchMove(e: TouchEvent) {
  if (!touchX || !touchY) return;

  const { clientX, clientY } = e.touches[0];
  touchDx = clientX - touchX;
  touchDy = clientY - touchY;
}

function handleTouchStart(e: TouchEvent) {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;

  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd, {
    once: true,
  });
}

function useHandlers(): void {
  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('touchstart', handleTouchStart);
}

export function initGame() {
  useHandlers();
}
