
import { Component } from "react";

export class Alert extends Component {
    render() {
        const visibility = {
            visibility: this.props.visibility
        }
        return (
            <div style={visibility} id="info-alert" className={`alert alert-${this.props.alertType}`}>
                {this.props.message}
            </div>
        )
    }
}