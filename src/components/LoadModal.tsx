import * as React from "react";
import { observer } from "mobx-react";
import styled, { css, keyframes } from "styled-components";
import { getStore } from "stores/LoadingStore";

const Container = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1999;
	transform: translateZ(0);
	justify-content: center;
	align-items: center;
	display: flex;
    top: 0px;
	background-color: rgb(51, 51, 68,0.5);
    ${(props: { isNav: boolean }) =>
        props.isNav &&
        css`
         top:60px;
		`
    }
`;
const swordOne = keyframes`
    0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }

    100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }

`;
const swordTwo = keyframes`
    0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }

    100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
`;
const swordThree = keyframes`
    0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }

    100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }

`;
const Loader = styled.div`
    position: relative;
    margin: 200px auto;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    &>span{
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &:nth-child(1) {
            left: 0%;
            top: 0%;
            border-bottom: 3px solid #EFEFFA;
            animation: ${swordOne} 1s linear infinite;
		}
		&:nth-child(2) {
			right: 0%;
            top: 0%;
            animation:  ${swordTwo} 1s linear infinite;
            border-right: 3px solid #EFEFFA;
		}
		&:nth-child(3) {
			right: 0%;
            bottom: 0%;
            animation: ${swordThree} 1s linear infinite;
            border-top: 3px solid #EFEFFA;
		}
    }
`;


export function Loading(props) {
    const { isNav } = props;
    return <Container isNav={isNav}>
        <Loader>
            <span />
            <span />
            <span />
        </Loader>
    </Container>;
}

interface LoadingModalProps {
    isNav?: boolean
}
@observer
export default class LoadingModal extends React.Component<LoadingModalProps, {}> {
    static defaultProps: LoadingModalProps = {
        isNav: true
    };
    loadingStore = getStore();
    render() {
        const { isLoading } = this.loadingStore;
        return isLoading ? <Loading isNav={this.props.isNav} /> : null;
    }
}
