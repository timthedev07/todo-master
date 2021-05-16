import { Form } from "react-bootstrap";
import { Component, createRef } from "react";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { Redirect } from "react-router-dom";

export class Popup extends Component {
    constructor(props) {
        super(props);
        this.checkboxRef = createRef();
        this.state = {
            displayPopup: "block",
            redirect: false,
            location: "",
        };
    }

    handleRedirect = () => {
        this.setState({
            redirect: true,
            location: "/register",
        });
    };

    handleClick = () => {
        let checked = this.checkboxRef.current.checked;
        localStorage.setItem("showtip-addTask", `${!checked}`);
        this.setState({
            displayPopup: "none",
        });
    };

    render() {
        return !this.state.redirect ? (
            <div
                className="popup-container"
                style={{ display: this.state.displayPopup }}
            >
                <div id="close-icon-wrapper" onClick={() => this.handleClick()}>
                    <CloseIcon />
                </div>
                <h4 style={{ margin: "4%", color: "yellow" }}>Pro tips:</h4>
                <div className="tip-container" id="tip1">
                    <span className="tip-start">Tip 1:</span>&nbsp;&nbsp;&nbsp;
                    It is powered by cache and cookies, thus the data is not
                    persistent, to keep it safe, please register/login{" "}
                    <a onClick={this.handleRedirect} href="/register">
                        here
                    </a>{" "}
                    if not already a member
                </div>
                <div className="tip-container" id="tip2">
                    <span className="tip-start">Tip 2:</span>&nbsp;&nbsp;&nbsp;
                    Short and simple titles are brilliant.
                </div>
                <div className="tip-container" id="tip3">
                    <span className="tip-start">Tip 3:</span>&nbsp;&nbsp;&nbsp;
                    Click the sync button to get the latest changes.
                </div>
                <div id="popup-dontshow">
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Don't show again"
                            ref={this.checkboxRef}
                        />
                    </Form.Group>
                </div>
            </div>
        ) : (
            <Redirect to={this.state.location}></Redirect>
        );
    }
}
