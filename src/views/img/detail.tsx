import * as React from "react";

interface FolderDetailProps {
    name: string;
}

export default class FolderDetail extends React.Component<FolderDetailProps, {}>{

    componentDidMount() {
        console.log(222, this.props)
    }


    render() {
        return (
            <div>11</div>
        )
    }
}