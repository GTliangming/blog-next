
import * as React from "react";
import styled, { css } from "styled-components";


const AddItemContent = styled.div`
    width:13.9vw;
    height:12.5vw;
    margin-right:15px;
    margin-bottom:15px;
    background-size: contain;
    background-image: url(${require("assets/images/folder.jpeg")});
    background-repeat: no-repeat;
    border-radius:25px;
    background-color: #f2f2f2;
    background-position-y: 10px;
    position:relative;
    ${(props: { type: ItemTypes }) =>
        props.type === ItemTypes.ADD &&
        css`
          background-image: url(${require("assets/images/addFolder.jpeg")});
          background-position-x: 15px;    
    `};
`;
const FolderName = styled.div`
    position: absolute;
    top: 50%;
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #333;
`;


export enum ItemTypes {
    SHOW = "SHOW",
    ADD = "ADD"
}


export interface ImgItemProps {
    type: ItemTypes,
    folderName?: string;
    onClick?: () => void;
}

export default class AddItem extends React.Component<ImgItemProps, {}>{
    render() {
        const { type, onClick } = this.props;
        return (
            <AddItemContent type={type} onClick={onClick}>
                {type === ItemTypes.SHOW && <FolderName>名称</FolderName>}
            </AddItemContent>
        );
    }
}