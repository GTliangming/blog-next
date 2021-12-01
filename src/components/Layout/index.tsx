import { Button } from "components/Button";
import React from "react";
import { UserInfo } from "utils/constant";
import { Footer, MainCounter, Nav, NavContent, NavItem } from "./common";
import LeftSideBar from "./sideBarLeft";
import RightSideBar from "./sideBarRight";
interface EzShipHeaderNav {
	title: string;
	link?: string;
	needLogin?: boolean;
	// subs?: EzShipHeaderNav[];
	class?: string;
}

// const navList = (): EzShipHeaderNav[] => {
// 	return [
// 		{
// 			title: "首页",
// 			link: "/",
// 		},
// 		{
// 			title: "测试",
// 			link: "/test",
// 			needLogin: true,
// 		},
// 		{
// 			title: "留言",
// 			link: "/news",
// 		},
// 		{
// 			title: "关于",
// 			link: "/fors",
// 			needLogin: true,
// 		},
// 		{
// 			title: "我的",
// 			link: "/mine",
// 		},
// 		{
// 			title: "设置",
// 			link: "/help/orderrelated/list",
// 		},
// 	];
// }

interface LayoutProps {
	path: string;
	query: Record<string, string>;
	userInfo?: UserInfo;
	hideUser: boolean;
	language: string;
	isShowNav: boolean;
}

export default class Layout extends React.Component<LayoutProps> {
	static defaultProps = {
		showHeader: true,
		hideUser: false,
		isShowNav: false
	};
	jumpLink = (link: string) => {
		// if (!Constant.customerInfo) {
		// 	LoginAndRegisterModal.show({ language: this.props.language }, () => {
		// 		location.href = link;
		// 	});
		// } else {
		// 	location.href = link;
		// }
		location.href = link;
	}
	render() {
		const { children, isShowNav } = this.props;
		return (
			<div style={{ width: "100%" }}>
				{/* <LeftSideBar /> */}
				{/* {isShowNav && <Nav>
					<NavContent>
						{navList().map((item, index) => (
							<NavItem
								key={index}
							>
								<a {...(item.needLogin ? { onClick: () => this.jumpLink(item.link) } : { href: item.link })}>{item.title}</a>
							</NavItem>
						))}
					</NavContent>
				</Nav>} */}
				{/* <RightSideBar> */}
				{/* <Button>点击出现</Button> */}
				<MainCounter isShowNav={isShowNav}>
					{children}
				</MainCounter>
				<Footer>
					<a href="http://www.beian.miit.gov.cn" target="_blank" rel="nofollow">陕ICP备19024533号-3</a>
				</Footer>
				{/* </RightSideBar> */}

			</div >
		);
	}
}
