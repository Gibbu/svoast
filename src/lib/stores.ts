import { writable, get } from 'svelte/store';
import { ID, DEFAULT_OPTIONS, parseDuration, objectMerge } from './utils';

import type {
	ToastFunction,
	ToastType,
	ToastPosition,
	ToastFunctionOptions,
	ToastComponentWithCustom,
	ToastPromiseFunction,
	ToastAddOptions
} from './types';

const TOASTS = writable<ToastComponentWithCustom[]>([]);

const addToast = (type: ToastType, message: string, { opts, id }: ToastAddOptions) => {
	const UUID = id || ID();

	const customProps: Record<string, unknown> = opts?.component?.[1] || {};
	const { closable, component, infinite, rich, onMount, onRemove, duration } = objectMerge(
		DEFAULT_OPTIONS,
		opts
	) as Required<ToastFunctionOptions>;
	const DURATION = parseDuration(duration);

	const props: ToastComponentWithCustom = {
		id: UUID,
		type,
		message,
		duration: DURATION,
		closable,
		component,
		infinite,
		rich,
		...customProps
	};

	if (typeof window !== 'undefined') onMount?.();

	upsert(props, UUID);

	if (!infinite && type !== 'promise') {
		setTimeout(() => {
			removeById(UUID);
			onRemove?.();
		}, DURATION);
	}

	return UUID;
};

const upsert = (props: ToastComponentWithCustom, id: number) => {
	if (get(TOASTS).find((toast) => toast.id === id)) {
		TOASTS.update((toasts) => {
			return toasts.map((toast) => {
				if (toast.id === id) return { ...toast, ...props };
				return toast;
			});
		});
	} else {
		TOASTS.update((toasts) => (toasts = get(position).includes('bottom') ? [...toasts, props] : [props, ...toasts]));
	}
};
const removeById = (id: number) => {
	if (get(TOASTS).find((el) => el.id === id)) TOASTS.update((toasts) => toasts.filter((toast) => toast.id !== id));
};
const removeByIndex = (index: number) => {
	if (get(TOASTS)[index]) TOASTS.update((toasts) => toasts.filter((_, i) => index !== i));
};
const removeAll = () => {
	TOASTS.set([]);
};

const info: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('info', message, { opts });
const attention: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('attention', message, { opts });
const success: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('success', message, { opts });
const warning: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('warning', message, { opts });
const error: ToastFunction = (message, opts = DEFAULT_OPTIONS) => addToast('error', message, { opts });
const promise: ToastPromiseFunction = (promise, opts) => {
	if (promise instanceof Promise === false) throw Error('`promise` is not a valid Promise.');

	const id = addToast('promise', opts.loading, { opts });

	opts?.onStart?.();

	promise
		.then((data) => {
			addToast('success', opts.success, { opts, id });
			opts?.onSuccess?.(data);
		})
		.catch((err) => {
			addToast('error', opts.error, { opts, id });
			opts?.onError?.(err);
		})
		.finally(() => {
			if (!opts?.infinite) {
				setTimeout(() => {
					removeById(id);
				}, parseDuration(opts.duration || DEFAULT_OPTIONS.duration));
			}
			opts?.onFinish?.();
		});
};

const createStore = () => {
	const { subscribe } = TOASTS;

	return {
		/**
		 * Add a info type toast.\
		 * Usually indicates information to the user, but isn’t important.
		 * @param message The message to be displayed in the toast.
		 * @param opts Options for the toast.
		 */
		info,
		/**
		 * Add an attention type toast.\
		 * Indicate to the user with important information.
		 * @param message The message to be displayed in the toast.
		 * @param opts Options for the toast.
		 */
		attention,
		/**
		 * Add a success type toast.\
		 * Indicates to the user something good has happened.
		 * @param message The message to be displayed in the toast.
		 * @param opts Options for the toast.
		 */
		success,
		/**
		 * Add a warning type toast.\
		 * Tell the user something may be wrong but isn’t critical.
		 * @param message The message to be displayed in the toast.
		 * @param opts Options for the toast.
		 */
		warning,
		/**
		 * Add an error type toast.\
		 * Alert the user something critical has happened.
		 * @param message The message to be displayed in the toast.
		 * @param opts Options for the toast.
		 */
		error,
		/**
		 * Add a promise toast chain.\
		 * Indicates to the user that something is happening in the background.
		 * @param promise The promise to be used.
		 * @param opts Options for the promise chain.
		 */
		promise,
		/**
		 * Remove a toast based on the unique ID.
		 * @param id The unique ID of the toast.
		 */
		removeById,
		/**
		 * Remove a toast based on the index.
		 * @param index The index of the toast
		 */
		removeByIndex,
		/**
		 * Removes all toasts.
		 */
		removeAll,
		subscribe
	};
};

export const toast = createStore();

export const position = writable<ToastPosition>('bottom-left');
