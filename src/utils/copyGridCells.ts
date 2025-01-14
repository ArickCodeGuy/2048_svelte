import type { CellGridCells } from '@/components/CellGrid/types';
import { initCellGrid } from './initCellGrid';

export function copyGridCells(grid: CellGridCells): CellGridCells {
  const size = grid.length;

  const gridCopy = initCellGrid(size);

  for (let row = 0; row < size; row++) {
    for (let cell = 0; cell < size; cell++) {
      if (!grid[row][cell].value) continue;

      gridCopy[row][cell].value = grid[row][cell].value;
    }
  }

  return gridCopy;
}
