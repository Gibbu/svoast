import type { ToastComponentOptions } from './types';

let id: number = 1;
export const ID = (): number => id++;

export const DEFAULT_OPTIONS: ToastComponentOptions = {
	closable: false,
	duration: 5000,
	infinite: false,
	rich: false
};
