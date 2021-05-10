import { Component, createRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { updateTask } from "../helpers/Tasks";

export class TaskDetails extends Component {
    constructor(props) {
        super(props);
        this.titleRef = createRef();
        this.contentRef = createRef();
        this.state = {
            title: this.props.title,
            body: this.props.body,
            infoUpdated: false,
        };
    }

    handleCloseClick = () => {
        // when use clicks the close button, do check for any unsaved edits.
        this.resetAddPopup(true);
    };

    resetFields = () => {
        this.setState({
            title: this.props.title,
            body: this.props.body,
        });
    };

    resetAddPopup = (check) => {
        if (check) {
            if (
                this.state.title !== this.props.title ||
                this.state.body !== this.props.body
            ) {
                if (
                    window.confirm(
                        "You have unsaved changes, sure want to leave?"
                    )
                ) {
                    this.resetFields();
                    this.props.bindingStateHandler();
                    this.props.stateModifier("none");

                    return;
                }
            } else {
                this.resetFields();
                this.props.bindingStateHandler();
                this.props.stateModifier("none");
            }
        } else {
            this.resetFields();
            this.props.bindingStateHandler();
            this.props.stateModifier("none");
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const title = this.titleRef.current.value;
        const body = this.contentRef.current.value;
        let id = this.props.id;
        updateTask({
            id: id,
            newTitle: title,
            newBody: body,
        });
        this.resetAddPopup(false);
        this.setState(this.state);
    };

    // field on change handlers
    handleBodyChange = (event) => {
        this.setState({
            body: event.target.value,
        });
    };
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    render() {
        let display_style = this.props.display;

        return (
            <div
                id="add-popup-container"
                className="popup-container"
                style={{
                    display: display_style.toLowerCase(),
                }}
            >
                <Container className="add-task-container">
                    <div
                        id="close-icon-wrapper"
                        onClick={() => this.handleCloseClick()}
                    >
                        <CloseIcon />
                    </div>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                value={this.state.title}
                                className="mono bg-dark"
                                ref={this.titleRef}
                                placeholder="Title - pick a short and memorable one"
                                id="new-task-title"
                                type="text"
                                maxLength={32}
                                onChange={(event) =>
                                    this.handleTitleChange(event)
                                }
                            />
                            <Form.Control
                                value={this.state.body}
                                className="markdown ta-form mono bg-dark"
                                maxLength="500"
                                ref={this.contentRef}
                                as="textarea"
                                placeholder="Something about the task..."
                                rows="14"
                                onChange={(event) =>
                                    this.handleBodyChange(event)
                                }
                            />
                        </Form.Group>
                        <Button
                            onClick={(event) => this.handleSubmit(event)}
                            variant="primary"
                        >
                            Edit
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}
