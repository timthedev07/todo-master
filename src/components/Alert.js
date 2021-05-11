import { Component } from "react";
import { Alert as BootstrapAlert } from "react-bootstrap";

export class Alert extends Component {
    render() {
        const visibility = {
            visibility: this.props.visibility,
            height: "50px",
        };
        return (
            <BootstrapAlert
                style={visibility}
                id="info-alert"
                variant={this.props.type}
            >
                {this.props.message}
            </BootstrapAlert>
        );
    }
}
