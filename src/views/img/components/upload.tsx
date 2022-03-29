import { Button, Modal } from "antd";
import * as React from "react";
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
interface ImgUploadModalProps {
    visible: boolean;
    token: string;
    name: string;
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
            key: this.props.name + "/" + this.fileKey
        };
    }

    // 获取回传的文件地址
    handleUploadChange = info => {
        if (info.file.status === 'done') {
            // const imageKey = info.file.response.key
            // const uploadUrl = "http://cdn.yubuyun.com/" + imageKey;

            console.log(222, info);

        }
    }
    get fileKey() {
        return Date.now() + Math.floor(Math.random() * (999999 - 100000) + 100000) + 1;
    }
    render() {
        const { visible, onCancel } = this.props;
        const props = {
            name: "file",
            data: this.getUploadToken(),
            action: "http://up-z1.qiniup.com",
            onChange(info) {
                const { status } = info.file;
                if (status === "done") {
                    message.success(`${info.file.name} file uploaded successfully.`);
                    const { key, hash } = info?.file.response;
                    console.log(4444, key);
                } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onDrop(e) {
                console.log("Dropped files", e.dataTransfer.files);
            },
        };
        return (
            <Modal
                onCancel={() => onCancel(false)}
                visible={visible}
                title="上传图片" >
                {/* <Upload
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

                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </Modal >
        );
    }
}