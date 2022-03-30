import { Button, Divider, Empty, PageHeader } from "antd";
import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import { ImgUploadContent } from "./common";
import axios from "axios";
import ImgUploadModal from "./components/upload";
import { FolderItem } from ".";
const FolderDetailContent = styled(ImgUploadContent)`
    .site-page-header{
        display: block;
        width:100% ;
    }
`;
const ImgListBox = styled.div`
    width:100% ;
    display:flex ;
    justify-content:start ;
    flex-wrap:wrap;
    &>div{
        width:304px;
        height:404px;
        border: 1px solid #f2f2f2 ;
        margin-right:15px ;
        margin-bottom:15px ;
        display:flex ;
        align-items:center ;
        align-content:center ;
        border-radius:10px ;
        img{
            width:100% ;
            display:block ;
        }
    }
`;
interface FolderDetailProps {
    name: string;
    id: number;
}
interface FolderDetailState {
    visible: boolean;
    token: string;
    imgList: FolderItem[]
}
export default class FolderDetail extends React.Component<FolderDetailProps, FolderDetailState>{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            token: null,
            imgList: []
        };
    }
    async componentDidMount() {
        await this.getToken();
        await this.getImgList();
    }
    // 获取七牛上传token
    getToken = async () => {
        const result = await axios.get("https://api.netbugs.cn/api/img/qiniu");
        this.setState({
            token: result.data.token
        });
    }
    getImgList = async () => {
        const result = await axios.get(`https://api.netbugs.cn/api/img/getlist?id=${this.props.id}`);
        if (result.data.code === 200) {
            this.setState({
                imgList: result.data.result
            });
        }
    }
    onOk = () => {
        this.getImgList();
        this.setState({ visible: false });
    }
    changeUploadModal = (visible: boolean) => {
        this.setState({ visible });
    }
    render() {
        const { token, visible, imgList } = this.state;
        const { name, id } = this.props;
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
                {imgList.length === 0 ? <Empty style={{ width: "100%" }} /> :
                    <ImgListBox>
                        {
                            imgList.map(item => <div><img src={item.src} key={item.id} title={item.foldername} /></div>)
                        }
                    </ImgListBox>
                }

                <ImgUploadModal token={token} visible={visible} folderid={id} name={name} onOk={this.onOk} onCancel={() => this.changeUploadModal(false)} />
            </FolderDetailContent>
        );
    }
}