import type { CellGridCells } from '@/components/CellGrid/types';

export function initCellGrid(size: number): CellGridCells {
  return new Array(size).fill(0).map(() =>
    new Array(size).fill(0).map((_) => ({
      value: 0,
    }))
  );
}
