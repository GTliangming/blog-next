import styled, { css } from "styled-components";
export const Nav = styled.nav`
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 9;
    box-shadow: 0 0 18px #000;
    transition: all .3s;
background-color: rgba(35, 35, 44, 1);
`;

export const NavContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 1200px;
    height: 60px;
    padding: 9px 0;
    margin: 0 auto;
`;
export const NavItem = styled.div`
    height: 44px;
    width: 70px;
    font-size: 20px;
    margin-right: 20px;
    border-radius: 14px;
    color: #fff;
    transition: all .2s;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover,&::selection{
        background: #1890ff;
    }
    &>a{
        color: #fff;
    }
`;

export const Footer = styled.footer`
    width: 100vw;
    text-align: center;
    position: fixed;
    left: 0;
    bottom:30px;
    &>a:hover{
        cursor: pointer;
       color: -webkit-link;
    }
`;


export const MainCounter = styled.main`
    width:100%;
    min-height:undefined;
    margin-top:0px;
    ${(props: { isShowNav: boolean }) =>
        !props.isShowNav &&
        css`
            min-height:calc(100vh - 60px);
        `
    }
    ${(props: { isShowNav: boolean }) =>
        props.isShowNav &&
        css`
            margin-top:60px;
        `
    }
`;
export const SideBarLeft = styled.div`
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
    background-image: url(${require("assets/images/cover.jpeg")});
`;
export const SideBarRightContent = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left:34.72vw;
`;
export const SideBarRight = styled.div`
    width: 100%;
    height: 100%;
    background-color: aqua;
`;