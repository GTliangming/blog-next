import * as React from "react";
import { getStore as getLoadingStore } from "stores/LoadingStore";
const loadingStore = getLoadingStore();
export default class New extends React.Component {
    static SHOW_NAV = false;

    testLoading = (show: boolean = true) => {
        if (show) {
            loadingStore.showLoading();
            return;
        }
        loadingStore.hideLoading();
    }
    render() {
        return <div>新的
            <br />
            <span onClick={() => this.testLoading()}>我是按钮 测试loading</span>
        </div>;
    }

}