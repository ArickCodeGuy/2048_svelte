import { idGenerator } from '@/utils/idGenerator';
import type { Component } from 'svelte';
import { writable } from 'svelte/store';

const genId = idGenerator();

export type Popup<T = unknown> = {
  id: number;
  component: Component;
  props?: T;
};

export type Popups = Popup[];

export const popups = writable<Popups>([]);

export function pushPopup(popup: Omit<Popup, 'id'>): Popup['id'] {
  const id = genId();

  popups.update((v) => {
    v.push({ id, ...popup });
    return v;
  });

  return id;
}

export function closePopup(popupId: Popup['id']): void {
  popups.update((v) => v.filter(({ id }) => id !== popupId));
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  popups.update(() => []);
});
