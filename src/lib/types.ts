import type { ComponentType } from 'svelte';

/**
 * The position of the toasts.
 *
 * The will also effect how the toasts stack on each other.
 */
export type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

/** The type of toast. */
export type ToastType = 'info' | 'attention' | 'success' | 'warning' | 'error';

/** Simple helper to define the internal functions. */
export type ToastFunction = (message: string, opts?: ToastFunctionOptions) => void;

/**
 * The custom component to rendered.
 *
 * First index will be the component.\
 * Second index will be any props you wish to pass down to your component.
 */
export type ToastCustomComponent = [ComponentType, Record<string, unknown>];

/** Toast component props. */
export type ToastComponentOptions = Required<
	Omit<ToastFunctionOptions, 'component' | 'onMount' | 'onRemove'>
>;

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

export interface ToastFunctionOptions extends ToastLifeCycles {
	/** Allow the toast to be dismissed. */
	closable?: boolean;
	/**
	 * The duration of the toast in milliseconds.
	 *
	 * Can also accept string values such as: `1s`, `1.75s`, `1500ms`
	 */
	duration?: number | string;
	/**
	 * The custom component to rendered.
	 *
	 * First index will be the component.\
	 * Second index will be any props you wish to pass down to your component.
	 */
	component?: ToastCustomComponent;
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
export interface ToastComponentWithCustom extends ToastComponent {
	component: ToastCustomComponent;
}
