export function randomItemFromArray<T>(arr: T[]): T {
  const l = arr.length;
  const idx = Math.floor(Math.random() * l);

  return arr[idx];
}
