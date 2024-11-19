import type { Component } from 'svelte';

/**
 * The position of the toasts.
 *
 * The will also effect how the toasts stack on each other.
 */
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

/** The type of toast. */
export type ToastType = 'info' | 'attention' | 'success' | 'warning' | 'error' | 'promise';

/** Simple helper to define the internal functions. */
export type ToastFunction = (message: string, opts?: ToastFunctionOptions) => void;

export type ToastPromiseFunction = <T>(promise: Promise<T>, opts: ToastPromiseOptions<T>) => Promise<T>;

/**
 * The custom component to rendered.
 *
 * First index will be the component.\
 * Second index will be any props you wish to pass down to your component.
 */
export type ToastCustomComponent<T extends Record<string, any>> = [Component<T>, Record<string, unknown>];

/** Toast component props. */
export type ToastComponentOptions = Required<Omit<ToastFunctionOptions, 'component' | 'onMount' | 'onRemove'>>;

export interface ToastAddOptions {
	id?: number;
	opts?: ToastFunctionOptions;
}

export interface ToastPromiseOptions<T> extends Partial<ToastFunctionOptions> {
	/** The loading message of the promise. */
	loading: string;
	/** The text to be displayed if the promise is resolved. */
	success: string | ((data: T) => string);
	/** The text to be displayed if the promise is rejected. */
	error: string | ((error: unknown) => string);
	/** Function the run when the promise has started. */
	onStart?: () => void;
	/**
	 * Function to run when the promise has been resolved.
	 * @param data Any data returned back from the request.
	 */
	onSuccess?: <T = any>(data: T) => void;
	/**
	 * Function to run when the promise has been rejected.
	 * @param data Any data returned back from the request.
	 */
	onError?: <T = any>(data: T) => void;
	/** Function to run when the promise has ended, no matter the result. */
	onFinish?: () => void;
}

/** The toast animation properties. */
export interface ToastAnimation {
	/** The starting scale size. */
	start: number;
	/** The starting opacity. */
	opacity: number;
	/** How long it should take for the toast to be done with the animation. */
	duration: number;
}

export interface ToastLifeCycles {
	/** Run when the toast has been added to the store. */
	onMount?: () => void;
	/** Run when the toast has been removed from the store. */
	onRemove?: () => void;
}

export interface ToastFunctionOptions<T extends Record<string, any> = any> extends ToastLifeCycles {
	/** Allow the toast to be dismissed. */
	closable?: boolean;
	/**
	 * The duration of the toast in milliseconds.
	 *
	 * Can also accept string values such as: `1s`, `1.75s`, `1500ms`.
	 *
	 * The duration used for a promise type will be the duration of the success or error toast.
	 */
	duration?: number | string;
	/**
	 * The custom component to rendered.
	 *
	 * First index will be the component.\
	 * Second index will be any props you wish to pass down to your component.
	 */
	component?: ToastCustomComponent<T>;
	/** Never remove the toast. */
	infinite?: boolean;
	/**
	 * Allow the use of HTML in the message.\
	 * **CAUTION**: Make sure to sanitize ALL content provided by users.
	 */
	rich?: boolean;
}

export interface ToastComponent extends ToastComponentOptions {
	/** The unique ID of the toast. */
	id: number;
	/** The attention level of the toast. */
	type: ToastType;
	/** The message to display to the end user. */
	message: string;
}

/** Object interface to tell if there's a `component` prop. */
export interface ToastComponentWithCustom<T extends Record<string, any> = any> extends ToastComponent {
	component: ToastCustomComponent<T>;
}
