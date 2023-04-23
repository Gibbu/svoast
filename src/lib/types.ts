import type { ComponentType } from 'svelte';

export type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

export type ToastType = 'info' | 'attention' | 'success' | 'warning' | 'error';

export type ToastFunction = (message: string, opts?: ToastFunctionOptions) => void;

export type ToastCustomComponent = [ComponentType, Record<string, unknown>];

export type ToastComponentOptions = Required<
	Omit<ToastFunctionOptions, 'component' | 'onMount' | 'onRemove'>
>;

export interface ToastLifeCycles {
	onMount?: () => void;
	onRemove?: () => void;
}

export interface ToastFunctionOptions extends ToastLifeCycles {
	/** Allow the toast to be dismissed. */
	closable?: boolean;
	/** The duration of the toast in milliseconds */
	duration?: number | string;
	/** A custom component to be rendered. */
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

export interface ToastComponentWithCustom extends ToastComponent {
	component: ToastCustomComponent;
}
