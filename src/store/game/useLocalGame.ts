import type { State } from './game';

export const LOCAL_STORAGE_KEY = '2048_local';

export function useLocalGame(): State | null {
  const s = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!s) return null;

  return JSON.parse(s) as State;
}
