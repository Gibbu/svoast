import type { ToastPosition } from '$lib';

class SiteSettings {
	position = $state<ToastPosition>('bottom-right');
}

export const settings = new SiteSettings();
