import { writable, get } from 'svelte/store';
import { ID, DEFAULT_OPTIONS, sleep } from './utils';

import type {
	ToastFunction,
	ToastType,
	ToastPosition,
	ToastFunctionOptions,
	ToastComponentWithCustom
} from './types';

const TOASTS = writable<ToastComponentWithCustom[]>([]);

const insert = (type: ToastType, message: string, opts: ToastFunctionOptions = DEFAULT_OPTIONS) => {
	const id = ID();

	const customProps: Record<string, unknown> = opts?.component?.[1] || {};
	const { duration, closable, component } = opts as Required<ToastFunctionOptions>;

	const props: ToastComponentWithCustom = {
		id,
		type,
		message,
		duration,
		closable,
		component,
		...customProps
	};

	TOASTS.update(
		(toasts) => (toasts = get(position).includes('bottom') ? [...toasts, props] : [props, ...toasts])
	);

	remove(id, opts.duration || DEFAULT_OPTIONS.duration);
};

/**
 * Remove a toast based on the ID.
 * @param id The unique ID of the toast.
 * @param delay The delay to remove the toast in milliseconds.
 */
const remove = async (id: number, delay?: number) => {
	if (delay) await sleep(delay);
	TOASTS.update((toasts) => toasts.filter((toast) => toast.id !== id));
};

const createStore = () => {
	const { subscribe } = TOASTS;

	/**
	 * Add a info type toast.
	 * @param message The message to be displayed in the toast.
	 * @param opts Options for the toast.
	 */
	const info: ToastFunction = (message, opts = DEFAULT_OPTIONS) => insert('info', message, opts);
	/**
	 * Add an attention type toast.
	 * @param message The message to be displayed in the toast.
	 * @param opts Options for the toast.
	 */
	const attention: ToastFunction = (message, opts = DEFAULT_OPTIONS) => insert('attention', message, opts);
	/**
	 * Add a success type toast.
	 * @param message The message to be displayed in the toast.
	 * @param opts Options for the toast.
	 */
	const success: ToastFunction = (message, opts = DEFAULT_OPTIONS) => insert('success', message, opts);
	/**
	 * Add a warning type toast.
	 * @param message The message to be displayed in the toast.
	 * @param opts Options for the toast.
	 */
	const warning: ToastFunction = (message, opts = DEFAULT_OPTIONS) => insert('warning', message, opts);
	/**
	 * Add an error type toast.
	 * @param message The message to be displayed in the toast.
	 * @param opts Options for the toast.
	 */
	const error: ToastFunction = (message, opts = DEFAULT_OPTIONS) => insert('error', message, opts);

	return {
		info,
		attention,
		success,
		warning,
		error,
		remove,
		subscribe
	};
};

export const toast = createStore();

export const position = writable<ToastPosition>('bottom-left');
