import type { CellGridCells } from '@/components/CellGrid/types';

export const isGridsEqual = (
  grid1: CellGridCells,
  grid2: CellGridCells
): boolean => {
  for (let row = 0; row < grid1.length; row++) {
    for (let col = 0; col < grid1.length; col++) {
      if (grid1[row][col].value !== grid2[row][col].value) return false;
    }
  }

  return true;
};
