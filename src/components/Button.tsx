import styled, { css, keyframes } from "styled-components";
import { Font, themeStyle } from "utils/css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "orange" | "blue" | "white"; // 默认orange
    size?: "small" | "large"; // 默认small
    margin?: string | number;
    width?: string | number;
    showShadow?: boolean;
    disabled?: boolean;
    orangeDisabled?: boolean;
    isLoading?: boolean;
    isBottomFixed?: boolean;
}

const spin = keyframes`
	0% {
	  transform: rotate(0deg)
	}
	50% {
	  transform: rotate(180deg)
	}
	100% {
	  transform: rotate(360deg)
	}
`;

const StyledButton = styled.button`
	position: relative;
	box-sizing: border-box;
	border-radius: 4px;
	width: ${(props: ButtonProps) => props.width};
	margin: ${(props: ButtonProps) => props.margin || 0};
	padding: 0 8px;
	color: #fff;
	background: linear-gradient(133deg, #FF7200 0%, #FF5A00 100%);
	border: none;
	height: 36px;
	font-size: 14px;
	font-family: ${Font.Medium};
	outline: none;

	${(props: ButtonProps) =>
        props.size === "large" &&
        css`
			width: 100%;
			height: 44px;
			padding: 0 16px;
			font-size: 16px;
		`}
	${(props: ButtonProps) =>
        props.theme === "orange" &&
        css`
			color: #fff;
			background: linear-gradient(133deg, #FF7200 0%, #FF5A00 100%);
		`}
	${(props: ButtonProps) =>
        props.theme === "blue" &&
        css`
			color: #fff;
			background: linear-gradient(306deg, #2B77F8 0%, #4388FF 100%);
			box-shadow: ${props.showShadow ? "0px 0px 16px 0px rgba(62, 130, 247, 0.2)" : "none"} ;
		`}
	${(props: ButtonProps) =>
        props.theme === "white" &&
        css`
			border: 1px solid #DEDEDE;
			color: #666666;
			background: #FFFFFF;
		`}
	${(props: ButtonProps) =>
        props.disabled &&
        css`
			border-color: ${themeStyle.text4};
			background: ${themeStyle.text4};
		`}
	${(props: ButtonProps) =>
        props.orangeDisabled &&
        css`
			opacity: 0.3;
		`}
	${(props: ButtonProps) =>
        props.isLoading &&
        css`
			opacity: 0.3;
			pointer-events: none;
			user-select: none;
			&::after {
				content: "";
				position: absolute;
				left: 50%;
				top: 50%;
				z-index: 3;
				width: 14px;
				height: 14px;
				margin-left: 14px;
				margin-top: -8px;
				border-radius: 50%;
				border: 2px solid #fff;
				border-top-color: transparent;
				border-bottom-color: transparent;
				animation: ${spin} 0.8s linear infinite;
			}
		`};
`;

export function Button(props: Partial<ButtonProps>) {
    return <StyledButton {...props} />;
}