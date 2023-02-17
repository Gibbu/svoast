import { writable, get } from 'svelte/store';
import { ID, DEFAULT_OPTIONS } from './utils';

import type { ToastFunction, Toast, ToastType, ToastOptions, ToastPosition } from './types';

const createToast = (toasts?: Toast[]) => {
	const { subscribe, update } = writable<Toast[]>(toasts || []);

	const addToast = (type: ToastType, message: string, opts: ToastOptions = DEFAULT_OPTIONS) => {
		const uid = ID();

		update((toasts) => {
			if (get(position).includes('bottom')) {
				toasts = [...toasts, { id: uid, type, message, opts }];
			} else {
				toasts = [{ id: uid, type, message, opts }, ...toasts];
			}
			return toasts;
		});
		setTimeout(() => remove(uid), opts.duration || DEFAULT_OPTIONS.duration);
	};

	const remove = (id: number) => {
		update((toasts) => {
			toasts = toasts.filter((toast) => toast.id !== id);
			return toasts;
		});
	};

	const info: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('info', message, opts);
	const attention: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('attention', message, opts);
	const success: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('success', message, opts);
	const warning: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('warning', message, opts);
	const error: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('error', message, opts);

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

export const toast = createToast();
export const position = writable<ToastPosition>('bottom-left');
