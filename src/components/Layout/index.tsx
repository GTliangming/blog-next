import React from "react";
import cx from "classnames";
import { UserInfo } from "utils/constant";
interface EzShipHeaderNav {
	title: string;
	link?: string;
	needLogin?: boolean;
	subs?: EzShipHeaderNav[];
	class?: string;
}

const navList = (): EzShipHeaderNav[] => {
	return [
		{
			title: "Home Page",
			link: "/",
		},
		{
			title: "Warehouse Info",
			link: "/warehouse",
			needLogin: true,
		},
		{
			title: "Shipping",
			link: "/order/new",
		},
		{
			title: "Orders",
			link: "/order",
			needLogin: true,
		},
		{
			title: "Freight Estimate",
			link: "/calculator",
		},
		{
			title: "Help Center",
			link: "/help/orderrelated/list",
		},
	];
}

interface LayoutProps {
	path: string;
	query: Record<string, string>;
	userInfo?: UserInfo;
	showHeader: boolean;
	hideUser: boolean;
	language: string;
}

export default class Layout extends React.Component<LayoutProps> {
	static defaultProps = {
		showHeader: true,
		hideUser: false
	};

	show = (isRegister?: boolean) => {
		// LoginAndRegisterModal.show({ language: this.props.language, isRegister }, () => window.location.reload());
	};

	logOut = () => {
		// Logout({}).then(() => {
		// 	Constant.customerInfo = undefined;
		// 	location.reload();
		// });
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
		const { showHeader, children } = this.props;

		return (
			<div >
				{showHeader && (
					<header >
						<div>
							<ul >
								{navList().map((item, index) => (
									<li
										key={index}
									>
										<a {...(item.needLogin ? { onClick: () => this.jumpLink(item.link) } : { href: item.link })}>{item.title}</a>
									</li>
								))}
							</ul>


						</div>
					</header>
				)
				}
				<main
					style={{ minHeight: !showHeader ? `calc(100vh - 40px)` : undefined }}
				>
					{children}
				</main>
				<footer >
					<p>Copyright © 2021 www.ezbuy.com All Rights Reserved.</p>
				</footer>
			</div >
		);
	}
}
