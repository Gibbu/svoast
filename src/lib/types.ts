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

export interface ToastFunctionOptions {
	/** Allow the toast to be closable. */
	closable?: boolean;
	/** The duration of the toast in milliseconds */
	duration?: number;
	/** A custom component to be rendered. */
	component?: ToastCustomComponent;
}

export interface ToastComponent {
	/** The unique ID of the toast. */
	id: number;
	/** The attention level of the toast. */
	type: ToastType;
	/** The message to display to the end user. */
	message: string;
	/** Allow the toast to be closable. */
	closable: boolean;
	/** The duration of the toast in milliseconds */
	duration: number;
}

export interface ToastComponentWithCustom extends ToastComponent {
	component: ToastCustomComponent;
}
