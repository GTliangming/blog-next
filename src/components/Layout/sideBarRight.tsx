import * as React from "react";
import { SideBarRightContent, SideBarRight } from "./common";



export default class RightSideBar extends React.Component {


    render() {
        const { children } = this.props;
        return (
            <SideBarRightContent>
                <SideBarRight>
                    {children}
                </SideBarRight>
            </SideBarRightContent>

        );
    }

}