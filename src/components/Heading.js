import { Component } from "react";

export class Heading extends Component {
    
    render() {
        return (
            <h1 id="page-heading" style={{textAlign: this.props.alignment}}>Todo Master</h1>
        )
    }
}
