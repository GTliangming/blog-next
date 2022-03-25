import * as React from "react";

import { Button } from "antd";
export default class Fors extends React.Component {
    static COMMON_PAGE = true;
    render() {
        return (
            <React.Fragment>
                <Button>上传</Button>
            </React.Fragment>
        );
    }
}