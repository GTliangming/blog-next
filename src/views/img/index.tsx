import * as React from "react";

import { Input, Modal } from "antd";
import { ImgUploadContent } from "./common";
import AddItem, { ItemTypes } from "./components/addItem";
import Router from "next/router";

interface ImgUploadState {
    folderName: string;
    visible: boolean;
}
export default class ImgUpload extends React.Component<{}, ImgUploadState>{
    static COMMON_PAGE = true;

    constructor(props) {
        super(props);
        this.state = {
            folderName: "",
            visible: false,
        };
    }
    toDetailPage = () => {
        Router.push(`/img/detail/?name=${this.state.folderName}`);
    }
    render() {
        const { visible } = this.state;
        return (
            <ImgUploadContent>
                <AddItem type={ItemTypes.SHOW} onClick={this.toDetailPage} />
                <AddItem type={ItemTypes.ADD} onClick={() => this.setState({ visible: true })} />
                <Modal
                    onCancel={() => this.setState({ visible: false, folderName: "" })}
                    visible={visible}
                    title="输入文件夹名称"
                    okText="确定"
                    cancelText="取消"
                    onOk={this.toDetailPage}
                >
                    <Input onChange={(e) => this.setState({ folderName: e.target.value })} />
                </Modal>
            </ImgUploadContent>
        );
    }
}