import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { createTaskLocal } from "../helpers/LocalTasks";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

export function AddPopup(props) {
    const titleRef = useRef();
    const contentRef = useRef();

    const { createTask } = useTasks();
    const { currentUser } = useAuth();

    function handleClick() {
        resetAddPopup();
    }

    function resetAddPopup() {
        props.bindingStateHandler();
        titleRef.current.value = "";
        contentRef.current.value = "";
        props.stateModifier("none");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = titleRef.current.value;
        const body = contentRef.current.value;
        if (currentUser) {
            await createTask(title, body);
        } else {
            createTaskLocal(title, body);
        }
        resetAddPopup();
    };

    let display_style = props.display;

    return (
        <Container
            className="popup-container"
            style={{ display: display_style.toLowerCase() }}
        >
            <div id="close-icon-wrapper" onClick={() => handleClick()}>
                <CloseIcon />
            </div>
            <Form.Group>
                <Form.Group>
                    <Form.Control
                        className="mono bg-dark"
                        ref={titleRef}
                        placeholder="Title"
                        id="new-task-title"
                        type="text"
                        maxLength={32}
                    />
                    <Form.Control
                        className="markdown ta-form mono bg-dark"
                        maxLength="500"
                        ref={contentRef}
                        as="textarea"
                        placeholder="something about the task..."
                        rows="14"
                    />
                </Form.Group>
                <Button
                    onClick={(event) => handleSubmit(event)}
                    variant="primary"
                >
                    Add
                </Button>
            </Form.Group>
        </Container>
    );
}
