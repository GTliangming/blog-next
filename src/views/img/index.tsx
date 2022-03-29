import * as React from "react";

import { Input, Modal } from "antd";
import axios from "axios";
import { ImgUploadContent } from "./common";
import AddItem, { ItemTypes } from "./components/addItem";
import Router from "next/router";

interface ImgUploadState {
    token: string;
    fileKey: number;
    folderName: string;
    visible: boolean;
}
export default class ImgUpload extends React.Component<{}, ImgUploadState>{
    static COMMON_PAGE = true;

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            fileKey: 0,
            folderName: "",
            visible: false,
        };
    }
    async componentDidMount() {
        this.getToken();
    }
    getToken = async () => {
        const result = await axios.get("http://api.netbugs.cn/api/common/qiniu");
        this.setState({
            token: result.data.token,
            fileKey: Date.now() + Math.floor(Math.random() * (999999 - 100000) + 100000) + 1
        });
    }
    // 获取上传凭证
    getUploadToken = () => {
        return {
            token: this.state.token,
            key: this.state.folderName + "/" + this.state.fileKey
        }
    }

    // 获取回传的文件地址
    handleUploadChange = info => {
        if (info.file.status === 'done') {
            // const imageKey = info.file.response.key
            // const uploadUrl = "http://cdn.yubuyun.com/" + imageKey;

            console.log(222, info);

        }
    }
    render() {
        const { visible } = this.state;
        return (
            <ImgUploadContent>

                {/* <Button>上传</Button>
                <Upload
                    name='file'
                    showUploadList={false}
                    multiple={true}
                    action='http://up-z1.qiniup.com'
                    data={() => this.getUploadToken()}
                    onChange={this.handleUploadChange}
                >
                    <Button>
                        Click to Upload
                    </Button>
                </Upload> */}
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.SHOW} />
                <AddItem type={ItemTypes.ADD} onClick={() => this.setState({ visible: true })} />
                <Modal
                    onCancel={() => this.setState({ visible: false, folderName: "" })}
                    visible={visible}
                    title="输入文件夹名称"
                    okText="确定"
                    cancelText="取消"
                    onOk={() => Router.push(`/img/detail/?name=${this.state.folderName}`)}
                >
                    <Input onChange={(e) => this.setState({ folderName: e.target.value })} />
                </Modal>
            </ImgUploadContent>
        );
    }
}