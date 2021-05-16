import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { updateTaskLocal } from "../helpers/LocalTasks";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { useTasks } from "../context/TasksContext";

export function TaskDetails(props) {
    const titleRef = useRef();
    const contentRef = useRef();
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    const { currentUser } = useAuth();
    const { updateTask } = useTasks();
    const forceUpdate = props.updater;

    useEffect(() => {
        titleRef.current.value = title;
        contentRef.current.value = body;
    });

    function handleCloseClick() {
        // when user clicks the close button, check for any unsaved edits.
        resetAddPopup(true);
    }

    function resetFields() {
        console.log("Resetting");
        setTitle(props.title);
        setBody(props.body);
    }

    function resetAddPopup(check) {
        if (check) {
            if (title !== props.title || body !== props.body) {
                if (
                    window.confirm(
                        "You have unsaved changes, sure want to leave?"
                    )
                ) {
                    resetFields();
                    props.bindingStateHandler();
                    props.stateModifier("none");

                    return;
                }
            } else {
                resetFields();
                props.bindingStateHandler();
                props.stateModifier("none");
            }
        } else {
            props.bindingStateHandler();
            props.stateModifier("none");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // get new values and id
        const new_title = titleRef.current.value;
        const new_body = contentRef.current.value;
        let id = props.id;
        if (currentUser) {
            updateTask(id, { title: new_title, body: new_body }).catch(
                (err) => {
                    console.error("ERROR: ", err);
                }
            );
        } else {
            updateTaskLocal({
                id: id,
                newTitle: new_title,
                newBody: new_body,
            });
        }
        props.updateContent(new_title, new_body);
        resetAddPopup(false);
        forceUpdate();
    }

    let display_style = props.display;

    return (
        <div
            id="add-popup-container"
            className="popup-container"
            style={{
                display: display_style.toLowerCase(),
            }}
        >
            <Container className="add-task-container">
                <div id="close-icon-wrapper" onClick={() => handleCloseClick()}>
                    <CloseIcon />
                </div>
                <Form>
                    <Form.Group>
                        <Form.Control
                            className="mono bg-dark"
                            ref={titleRef}
                            placeholder="Title - pick a short and memorable one"
                            id="new-task-title"
                            type="text"
                            maxLength={32}
                        />
                        <Form.Control
                            className="markdown ta-form mono bg-dark"
                            maxLength="500"
                            ref={contentRef}
                            as="textarea"
                            placeholder="Something about the task..."
                            rows="14"
                        />
                    </Form.Group>
                    <Button
                        onClick={(event) => handleSubmit(event)}
                        variant="primary"
                    >
                        Edit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
