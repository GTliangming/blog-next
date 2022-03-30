import { Modal } from "antd";
import * as React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
const { Dragger } = Upload;
interface ImgUploadModalProps {
    visible: boolean;
    token: string;
    name: string;
    folderid: number;
    onCancel: (visible: boolean) => void;
}
interface ImgUploadModalState {
    fileKey: number;
}
export default class ImgUploadModal extends React.Component<ImgUploadModalProps, ImgUploadModalState>{
    constructor(props) {
        super(props);
        this.state = {
            fileKey: 0,
        };
    }
    // 获取上传凭证
    getUploadToken = () => {
        return {
            token: this.props.token,
            key: this.props.name + "/" + this.state.fileKey
        };
    }

    // 向后端存储上传文件的地址
    handleUploadChange = async (key: string, hash: string) => {
        const { folderid } = this.props;
        const result = await axios.post("https://api.netbugs.cn/api/img/saveimg", {
            src: `http://img.netbugs.cn/${key}`,
            folderid,
            hash
        });
        if (result.data.code === 200) {
            message.success("upload successfully!");
        }
    }
    getfileKey = () => {
        return Date.now() + Math.floor(Math.random() * (999999 - 100000) + 100000) + 1;
    }
    render() {
        const { visible, onCancel } = this.props;
        const props = {
            name: "file",
            data: this.getUploadToken(),
            beforeUpload: () => {
                this.setState({ fileKey: this.getfileKey() });
                return true;
            },
            action: "http://up-z1.qiniup.com",
            onChange: (info) => {
                const { status } = info.file;
                if (status === "done") {
                    const { key, hash } = info?.file.response;
                    this.handleUploadChange(key, hash);
                } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Modal
                onCancel={() => onCancel(false)}
                visible={visible}
                title="上传图片" >

                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击此处或拖拽文件到此处上传</p>
                    <p className="ant-upload-hint">每次只能上传一张</p>
                </Dragger>
            </Modal >
        );
    }
}