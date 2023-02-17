import type { ToastOptions } from './types';

let id: number = 1;
export const ID = (): number => id++;

export const DEFAULT_OPTIONS: Required<ToastOptions> = {
	closable: false,
	duration: 5000
};
