import * as React from "react";
import axios from "axios";
import { Input, Modal, message } from "antd";
import { ImgUploadContent } from "./common";
import AddItem, { ItemTypes } from "./components/addItem";
import Router from "next/router";
export interface FolderItem {
    id: number;
    foldername: string;
    src?: string;
}
interface ImgUploadState {
    folderName: string;
    visible: boolean;
    folderList: FolderItem[];
}
export default class ImgUpload extends React.Component<{}, ImgUploadState>{
    static COMMON_PAGE = true;

    constructor(props) {
        super(props);
        this.state = {
            folderName: "",
            visible: false,
            folderList: []
        };
    }
    componentDidMount() {
        this.getFolderList();
    }
    getFolderList = async () => {
        const result = await axios.get("https://api.netbugs.cn/api/img/getfolderlist");
        this.setState({ folderList: result.data.result.slice(1) });
    }
    saveAndToDetailPage = async () => {
        const result = await axios.post("https://api.netbugs.cn/api/img/savefolder", {
            foldername: this.state.folderName
        });
        if (result.data.code === 200) {
            Router.push(`/img/detail/?name=${this.state.folderName}&id=${result.data.result.id}`);
            return;
        }
        message.error(result.data.message);
    }
    toDetailPage = (item: { id: number, foldername: string }) => {
        Router.push(`/img/detail/?name=${item.foldername}&id=${item.id}`);
    }
    render() {
        const { visible, folderList } = this.state;
        return (
            <ImgUploadContent>
                {
                    folderList.map(item => <AddItem key={item.id} type={ItemTypes.SHOW} folderName={item.foldername} onClick={() => this.toDetailPage(item)} />)
                }
                <AddItem type={ItemTypes.ADD} onClick={() => this.setState({ visible: true })} />
                <Modal
                    onCancel={() => this.setState({ visible: false, folderName: "" })}
                    visible={visible}
                    title="输入文件夹名称"
                    okText="确定"
                    cancelText="取消"
                    onOk={this.saveAndToDetailPage}
                >
                    <Input onChange={(e) => this.setState({ folderName: e.target.value })} />
                </Modal>
            </ImgUploadContent>
        );
    }
}