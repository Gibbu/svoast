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

class ToastState {
	toasts = $state<ToastComponentWithCustom[]>([]);
	position = $state<ToastPosition>('bottom-left');
	#timeouts = new Map();

	#addToast(type: ToastType, message: string, { opts, id }: ToastAddOptions) {
		const uuid = id || ID();

		const customProps: Record<string, unknown> = opts?.component?.[1] || {};
		const { closable, component, infinite, rich, onMount, onRemove, duration } = objectMerge(
			DEFAULT_OPTIONS,
			opts
		) as Required<ToastFunctionOptions>;
		const DURATION = parseDuration(duration);

		const props: ToastComponentWithCustom = {
			id: uuid,
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

		this.#upsert(props, uuid);

		if (!infinite && type !== 'promise') {
			this.#timeouts.set(
				uuid,
				setTimeout(() => {
					this.removeById(uuid);
					onRemove?.();
				}, DURATION)
			);
		}

		return uuid;
	}
	#upsert(props: ToastComponentWithCustom, id: number) {
		if (this.toasts.find((toast) => toast.id === id)) {
			this.toasts = this.toasts.map((toast) => {
				if (toast.id === id) return { ...toast, ...props };
				return toast;
			});
		} else {
			this.toasts = this.position.includes('bottom') ? [...this.toasts, props] : [props, ...this.toasts];
		}
	}
	#removeTimeout(timeoutId: number) {
		const timeout = this.#timeouts.get(timeoutId);
		if (timeout) {
			clearTimeout(timeout);
			this.#timeouts.delete(timeoutId);
		}
	}

	removeById(id: number) {
		const toast = this.toasts.find((toast) => toast.id === id);
		if (!toast) return;

		this.toasts = this.toasts.filter((toast) => toast.id !== id);

		this.#removeTimeout(id);
	}
	removeByIndex(index: number) {
		const toast = this.toasts[index];
		if (!toast) return;

		this.toasts = this.toasts.filter((_, i) => index !== i);

		this.#removeTimeout(toast.id);
	}
	removeAll() {
		this.toasts = [];
		this.#timeouts.clear();
	}

	info: ToastFunction = (message, opts = DEFAULT_OPTIONS) => this.#addToast('info', message, { opts });
	attention: ToastFunction = (message, opts = DEFAULT_OPTIONS) => this.#addToast('attention', message, { opts });
	success: ToastFunction = (message, opts = DEFAULT_OPTIONS) => this.#addToast('success', message, { opts });
	warning: ToastFunction = (message, opts = DEFAULT_OPTIONS) => this.#addToast('warning', message, { opts });
	error: ToastFunction = (message, opts = DEFAULT_OPTIONS) => this.#addToast('error', message, { opts });
	promise: ToastPromiseFunction = (promise, opts) => {
		if (promise instanceof Promise === false) throw Error('`promise` is not a valid Promise.');

		const id = this.#addToast('promise', opts.loading, { opts });

		opts.onStart?.();

		promise
			.then((data) => {
				const message = typeof opts.success === 'string' ? opts.success : opts.success(data);
				this.#addToast('success', message, { opts, id });
				opts?.onSuccess?.(data);
			})
			.catch((err) => {
				const message = typeof opts.error === 'string' ? opts.error : opts.error(err);
				this.#addToast('error', message, { opts, id });
				opts?.onError?.(err);
			})
			.finally(() => {
				if (!opts?.infinite) {
					setTimeout(
						() => {
							this.removeById(id);
						},
						parseDuration(opts.duration || DEFAULT_OPTIONS.duration)
					);
				}
				opts?.onFinish?.();
			});

		return promise;
	};
}

export const toast = new ToastState();
