import * as React from "react";

import { Button, Upload } from "antd";
import axios from "axios";

interface ForsState {
    token: string;
    fileKey: number;
    folderName: string;
}
export default class Fors extends React.Component<{}, ForsState>{
    static COMMON_PAGE = true;

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            fileKey: 0,
            folderName: "新建",
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
        return (
            <React.Fragment>
                <Button>上传</Button>


                <Upload
                    name='file'

                    multiple={true}
                    action='http://up-z1.qiniup.com'
                    data={() => this.getUploadToken()}
                    onChange={this.handleUploadChange}
                >
                    <Button>
                        Click to Upload
                    </Button>
                </Upload>
            </React.Fragment>
        );
    }
}