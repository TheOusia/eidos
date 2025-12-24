export const getPersistentState = <T>(key: string, defaultValue: T): T => {
	const storedValue = localStorage.getItem(key);
	return storedValue
		? storedValue.includes("{")
			? JSON.parse(storedValue)
			: defaultValue
		: defaultValue;
};

export const setPersistentState = <T>(key: string, value: T) => {
	try {
		const v = JSON.stringify(value);
		localStorage.setItem(key, v);
	} catch (_) {
		localStorage.setItem(key, value as string);
	}
};
