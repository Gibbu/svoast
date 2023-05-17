import type { ToastComponentOptions, ToastAnimation, ToastFunctionOptions } from './types';

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
 * Default animation for the toasts.
 */
export const DEFAULT_ANIMATION: ToastAnimation = {
	start: 0.75,
	opacity: 0,
	duration: 150
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

/**
 * Shallow merges two objects while replacing the same keys.
 * @param original The original object to be overwritten.
 * @param newObject The object to be added to the original object, replacing existing keys.
 */
export const objectMerge = <TOriginal extends Record<string, any>, TNew extends Record<string, any> | undefined>(
	original: TOriginal,
	newObject: TNew
): TOriginal & TNew => {
	return {
		...original,
		...newObject
	};
};
