import type { Movement } from '@/composables/types';

export type CellGridCells = CellGridCell[][];

export type CellGridCell = {
  value: number;
  transform: Movement;
};
