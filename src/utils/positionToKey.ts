import type { Movement } from '@/composables/types';

export function positionToKey([x, y]: Movement): string {
  return `${x},${y}`;
}

export function keyToPosition(key: string): Movement {
  const [x, y] = key.split(',').map(Number);
  return [x, y];
}
