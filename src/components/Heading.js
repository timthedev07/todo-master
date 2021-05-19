import { Component } from "react";

export class Heading extends Component {

    render() {
        let style = { textAlign: this.props.alignment };
        if (this.props.fontSize) {
            style.fontSize = this.props.fontSize;
        }
        return (
            <a href="/" id="heading-link"><h1 id="page-heading" style={style}>Todo Master</h1></a >
        )
    }
}
