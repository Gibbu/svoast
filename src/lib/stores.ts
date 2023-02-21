import { writable, get } from 'svelte/store';
import { ID, DEFAULT_OPTIONS } from './utils';

import type { ToastFunction, Toast, ToastType, ToastOptions, ToastPosition } from './types';

const createToast = () => {
	const { subscribe, update } = writable<Toast[]>([]);

	const addToast = (type: ToastType, message: string, opts: ToastOptions = DEFAULT_OPTIONS) => {
		const uid = ID();

		let customProps: Record<string, any> = opts.component?.[1] || {};
		const props: Toast = { id: uid, type, message, opts, ...customProps };

		update((toasts) => {
			if (get(position).includes('bottom')) {
				toasts = [...toasts, props];
			} else {
				toasts = [props, ...toasts];
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
