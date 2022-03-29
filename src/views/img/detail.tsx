import { Button, Divider, Empty, PageHeader } from "antd";
import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import { ImgUploadContent } from "./common";
import axios from "axios";
import ImgUploadModal from "./components/upload";
const FolderDetailContent = styled(ImgUploadContent)`
    .site-page-header{
        display: block;
        width:100% ;
    }
`;
interface FolderDetailProps {
    name: string;
}
interface FolderDetailState {
    visible: boolean;
    token: string;
}
export default class FolderDetail extends React.Component<FolderDetailProps, FolderDetailState>{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            token: null
        };
    }
    componentDidMount() {
        console.log(222, this.props);
        this.getToken();
    }
    // 获取七牛上传token
    getToken = async () => {
        const result = await axios.get("http://api.netbugs.cn/api/common/qiniu");
        this.setState({
            token: result.data.token
        });
    }
    changeUploadModal = (visible: boolean) => {
        this.setState({ visible });
    }
    render() {
        const { token, visible } = this.state;
        const { name } = this.props;
        return (
            <FolderDetailContent>
                <PageHeader
                    className="site-page-header"
                    onBack={() => Router.back()}
                    title={name}
                    subTitle="点击返回列表页"
                    extra={[
                        <Button key="1" type="primary" onClick={() => this.changeUploadModal(true)}>点击上传</Button>
                    ]}
                />
                <Divider style={{ marginTop: 0 }} />
                <Empty style={{ width: "100%" }} />
                <ImgUploadModal token={token} visible={visible} name={name} onCancel={() => this.changeUploadModal(false)} />
            </FolderDetailContent>
        );
    }
}