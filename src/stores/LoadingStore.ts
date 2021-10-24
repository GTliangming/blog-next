import { observable, action } from "mobx";

import getSingletonStore from "./getSingletonStore";
import { getStore as getBodyFixedStore } from "./BodyFixedStore";

export class LoadingStore {
	@observable isLoading = false;
	@action
	showLoading = () => {
		getBodyFixedStore().stopScroll();
		this.isLoading = true;
	};
	hideLoading = () => {
		getBodyFixedStore().revertScroll();
		this.isLoading = false;
	};
}

export const getStore = getSingletonStore(LoadingStore);
