import { writable } from 'svelte/store';
import type { ToastPosition } from '$lib';

export const position = writable<ToastPosition>('bottom-right');
