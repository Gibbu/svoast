import type { ToastComponentOptions } from './types';

let id: number = 1;

/**
 * Generate a unique ID for the toasts.
 */
export const ID = (): number => id++;

/**
 * The default options of SVoast.
 */
export const DEFAULT_OPTIONS: ToastComponentOptions = {
	closable: false,
	duration: 5000,
	infinite: false,
	rich: false
};

/**
 * Transforms the string value to a number.
 *
 * Supported identifiers: `ms`, `s`
 * @param value The value to be transformed.
 */
export const parseDuration = (value: number | string): number => {
	if (typeof value === 'number') return value;
	if (!/ms|s$/.test(value))
		throw new Error('[SVoast] `duration` prop was given a string but not a leading identifier (ms/s).');

	const duration: number = parseFloat(value.split(/ms|s/)[0]);

	if (/(?=ms)(?!s)/.test(value)) return duration;
	return duration * 1000;
};
