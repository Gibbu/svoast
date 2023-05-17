export const debounce = (fn: Function, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const fakeApi = (min: number, max: number) => {
	return new Promise((resolve, reject) => {
		const success = Math.random() < 0.5;

		setTimeout(() => {
			if (success) resolve(true);
			else reject(false);
		}, Math.floor(Math.random() * (max - min + 1) + min) * 1000);
	});
};
