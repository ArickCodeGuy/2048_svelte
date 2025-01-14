import type { CellGridCells } from '@/components/CellGrid/types';
import type { Movement } from '@/composables/type';
import { initCellGrid } from './initCellGrid';
import { copyGridCells } from './copyGridCells';
import { positionToKey } from './positionToKey';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function directionToMovement(d: Direction): Movement {
  switch (d) {
    case 'UP':
      return [0, -1];
    case 'DOWN':
      return [0, 1];
    case 'LEFT':
      return [-1, 0];
    case 'RIGHT':
      return [1, 0];
  }
}

function isWithinBounds(grid: CellGridCells, x: number, y: number): boolean {
  const h = grid.length;
  const w = grid[0].length;

  return x >= 0 && x < w && y >= 0 && y < h;
}

function tryMove(
  grid: CellGridCells,
  x: number,
  y: number,
  [dx, dy]: Movement,
  moved: Set<string>
): Movement {
  let nx = x,
    ny = y;
  let v = grid[y][x].value;
  grid[y][x].value = 0;

  while (
    isWithinBounds(grid, nx + dx, ny + dy) &&
    !grid[ny + dy][nx + dx].value
  ) {
    nx += dx;
    ny += dy;
  }

  // merge
  if (
    grid[ny + dy]?.[nx + dx]?.value === v &&
    // ignore already merged
    // no more than 1 merge in 1 move
    !moved.has(positionToKey([nx + dx, ny + dy]))
  ) {
    ny += dy;
    nx += dx;
    v *= 2;
  }

  grid[ny][nx].value = v;

  return [nx - x, ny - y];
}

/** modifies original array. Applies transform. Returns score */
export function move(
  grid: CellGridCells,
  direction: Direction
): [CellGridCells, CellGridCells, number] {
  const h = grid.length,
    w = grid[0].length,
    gridArea = w * h;

  let score = 0;

  const oldState = copyGridCells(grid);

  const moved = new Set<string>();

  const move = directionToMovement(direction);

  const newState = initCellGrid(h);

  let i: number, dir: number;

  if (direction === 'UP' || direction === 'LEFT') {
    i = 0;
    dir = 1;
  } else {
    i = gridArea - 1;
    dir = -1;
  }

  while (i >= 0 && i < gridArea) {
    const cell = i % h,
      row = (i - cell) / h;

    i += dir;

    if (!oldState[row][cell].value) continue;

    newState[row][cell].value = oldState[row][cell].value;

    const transform = tryMove(newState, cell, row, move, moved);

    if (transform[0] || transform[1]) {
      if (
        oldState[row][cell].value !==
        newState[row + transform[1]][cell + transform[0]].value
      ) {
        moved.add(positionToKey([cell + transform[0], row + transform[1]]));
        score += oldState[row][cell].value;
      }
      oldState[row][cell].transform = transform;
    }
  }

  return [oldState, newState, score];
}
