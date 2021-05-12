import { Component, createRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

export class AddPopup extends Component {
    constructor(props) {
        super(props);
        this.titleRef = createRef();
        this.contentRef = createRef();
    }

    handleClick = () => {
        this.resetAddPopup();
    };

    resetAddPopup = () => {
        this.props.bindingStateHandler();
        this.titleRef.current.value = "";
        this.contentRef.current.value = "";
        this.props.stateModifier("none");
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const title = this.titleRef.current.value;
        const body = this.contentRef.current.value;
        // if the array of jsons(representing the tasks) does not yet exist in local storage
        if (!localStorage.getItem("tasks")) {
            localStorage.setItem("tasks", JSON.stringify([]));
        }
        // TODO:
        // createTask(title, body);
        this.resetAddPopup();
    };

    render() {
        let display_style = this.props.display;

        return (
            <Container
                className="popup-container"
                style={{ display: display_style.toLowerCase() }}
            >
                <div id="close-icon-wrapper" onClick={() => this.handleClick()}>
                    <CloseIcon />
                </div>
                <Form>
                    <Form.Group>
                        <Form.Control
                            className="mono bg-dark"
                            ref={this.titleRef}
                            placeholder="Title"
                            id="new-task-title"
                            type="text"
                            maxLength={32}
                        />
                        <Form.Control
                            className="markdown ta-form mono bg-dark"
                            maxLength="500"
                            ref={this.contentRef}
                            as="textarea"
                            placeholder="something about the task..."
                            rows="14"
                        />
                    </Form.Group>
                    <Button
                        onClick={(event) => this.handleSubmit(event)}
                        variant="primary"
                    >
                        Add
                    </Button>
                </Form>
            </Container>
        );
    }
}
