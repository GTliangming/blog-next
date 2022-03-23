import * as React from "react";
import styled from "styled-components";
export const SideBar = styled.div`
    width: 34.72vw;
    font-family: "Open Sans",sans-serif;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(17,26,35,0);
    overflow: auto;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url(${require("./images/cover.jpeg")});
`;

export default class Index extends React.Component {
    static SHOW_NAV = true;
    render() {
        return (
            <React.Fragment>
                首页
            </React.Fragment>
        );
    }

}