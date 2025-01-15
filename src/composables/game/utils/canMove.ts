import type { Movement } from '@/composables/types';
import type { CellGridCells } from '@/store/game/types';

export function canMove(grid: CellGridCells, [dx, dy]: Movement): boolean {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const v = grid[y][x].value;
      if (!grid[y][x].value || !grid[y + dy]?.[x + dx]) continue;

      if (grid[y + dy][x + dx].value === 0 || v === grid[y + dy][x + dx].value)
        return true;
    }
  }

  return false;
}

export function isGameOver(grid: CellGridCells): boolean {
  const dirs: Movement[] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (const m of dirs) {
    if (canMove(grid, m)) return false;
  }

  return true;
}
