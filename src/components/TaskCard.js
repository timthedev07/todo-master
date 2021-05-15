import { useState } from "react";
import { TaskDetails } from "./TaskDetails";
import { Button } from "react-bootstrap";
import { deleteTaskLocal, updateTaskLocal } from "../helpers/LocalTasks";
import { ReactComponent as DoneIcon } from "../icons/done.svg";
import { ReactComponent as NotDoneIcon } from "../icons/not-done.svg";
import { ReactComponent as Trash } from "../icons/trash.svg";
import { ReactComponent as MarkAsDone } from "../icons/mark-as-done.svg";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";

const TITLE_CHARS_THRESHOLD = 12;
const BODY_CHARS_THRESHOLD = 80;

export function TaskCard(props) {
    const [displayDetails, setDisplayDetails] = useState("none");
    const { currentUser } = useAuth();
    const { deleteTask, markAsDone } = useTasks();
    const [displayTitle, setTitle] = useState(() => props.object.title);
    const [displayBody, setBody] = useState(() => props.object.body);
    const [done, setDone] = useState(() => props.object.done);
    const forceUpdate = props.updater;

    function handleClick() {
        setDisplayDetails("block");
    }

    function resetAddPopupState() {
        setDisplayDetails("none");
    }

    function changeDisplayAttr(val) {
        setDisplayDetails(val);
    }

    const updateContent = (title, body) => {
        console.log(title, body);
        console.log("UPDATING");
        setTitle(title);
        setBody(body);
    };

    function toggleDone() {
        if (currentUser) {
            markAsDone(props.object.id).catch((err) => {
                console.log("Failed: ", err);
            });
        } else {
            updateTaskLocal({
                id: props.object.id,
                done: true,
            });
        }
        forceUpdate();
        setDone((prev) => !prev);
    }

    async function handleDeleteRequest() {
        if (window.confirm("Are you sure to PERMANENTLY delete this task?")) {
            if (currentUser) {
                await deleteTask(props.object.id).catch((error) => {
                    console.error("Error removing task: ", error);
                });
            } else {
                deleteTaskLocal(props.object.id);
            }
            forceUpdate();
            if (currentUser) window.location.reload();
        }
    }

    let img;
    if (done) {
        img = <DoneIcon className="task-card-icon" />;
    } else {
        img = <NotDoneIcon className="task-card-icon" />;
    }

    // Decide how to display the title, if it's too long, just replace the rest with ...
    let title;
    let orig_title = displayTitle;
    if (
        orig_title.trim().indexOf(" ") < 0 /**if there is no space */ &&
        orig_title.length > TITLE_CHARS_THRESHOLD
    ) {
        title = `${orig_title.trim().slice(0, TITLE_CHARS_THRESHOLD)}...`;
    } else {
        title = orig_title;
        for (
            let i = 0, sequence = title.split(" "), l = sequence.length;
            i < l;
            i++
        ) {
            if (sequence[i].length > TITLE_CHARS_THRESHOLD || l > 4) {
                title = `${orig_title
                    .trim()
                    .slice(0, TITLE_CHARS_THRESHOLD)}...`;
                break;
            }
        }
    }

    // Decide how to display the body, if it's too long, just replace the rest with ...
    let body;
    let orig_body = displayBody;
    if (
        orig_body.trim().indexOf(" ") < 0 &&
        orig_body.length > BODY_CHARS_THRESHOLD
    ) {
        body = `${orig_body.trim().slice(0, BODY_CHARS_THRESHOLD)}...`;
    } else {
        body = orig_body;
        for (
            let i = 0, sequence = body.split(" "), l = sequence.length;
            i < l;
            i++
        ) {
            if (sequence[i].length > BODY_CHARS_THRESHOLD || body.length > 90) {
                body = `${orig_body.trim().slice(0, BODY_CHARS_THRESHOLD)}...`;
                break;
            }
        }
    }

    return (
        <div className="card">
            <div className="face face1">
                <div className="card-content">
                    {img}
                    <h3 className="task-title">{title}</h3>
                </div>
            </div>
            <TaskDetails
                display={displayDetails}
                title={displayTitle}
                body={displayBody}
                id={props.object.id}
                bindingStateHandler={resetAddPopupState}
                updateContent={updateContent}
                stateModifier={changeDisplayAttr}
            />
            <div className="face face2">
                <div className="card-content">
                    <p>{body}</p>
                    <Button variant="info" onClick={() => handleClick()}>
                        Details
                    </Button>
                    <div className="task-card-control">
                        <MarkAsDone
                            onClick={() => toggleDone()}
                            data-toggle="tooltip"
                            title="Mark as Done"
                            className="control-icons"
                        />
                        <Trash
                            onClick={() => handleDeleteRequest()}
                            data-toggle="tooltip"
                            title="Delete"
                            className="control-icons"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
