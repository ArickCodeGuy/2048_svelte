import type { CellGridCells } from '@/components/CellGrid/types';
import { randomItemFromArray } from './randomItemFromArray';

export function addGridCellValue(grid: CellGridCells): void {
  const emptyCells: [number, number][] = [];

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value) return;

      emptyCells.push([x, y]);
    });
  });

  if (!emptyCells.length) {
    throw new Error('No empty cells');
  }

  const [x, y] = randomItemFromArray(emptyCells);
  const v = randomItemFromArray([2, 4]);

  grid[y][x].value = v;
}
