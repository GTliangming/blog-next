const getSingletonStore = <T>(Store: new (...args: any[]) => T): (() => T) => {
	let store: T = null;
	if (!__SERVER__) {
		return function () {
			if (store === null) {
				store = new Store();
			}
			return store;
		};
	}
	return function () {
		return new Store();
	};
};

export default getSingletonStore;
