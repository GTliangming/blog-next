import * as React from "react";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});
export default class Test extends React.Component {

    render() {
        const output = marked("#### 五、CleanWebpackPlugin   ``` npm i clean-webpack-plugin --save-dev```");
        return (
            <div style={{ width: "300px" }} dangerouslySetInnerHTML={{ __html: output }} />
        );
    }

}