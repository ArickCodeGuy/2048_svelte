import type { Movement } from '@/composables/type';

export function positionToKey([x, y]: Movement): string {
  return `${x},${y}`;
}

export function keyToPosition(key: string): Movement {
  const [x, y] = key.split(',').map(Number);
  return [x, y];
}
