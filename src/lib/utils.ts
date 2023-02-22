import type { ToastFunctionOptions } from './types';

let id: number = 1;
export const ID = (): number => id++;

export const DEFAULT_OPTIONS: Required<Omit<ToastFunctionOptions, 'component'>> = {
	closable: false,
	duration: 5000
};

export const sleep = async (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, delay);
	});
};
