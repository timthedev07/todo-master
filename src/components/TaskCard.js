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
    const forceUpdate = props.updater;

    function handleClick() {
        setDisplayDetails("block");
    }

    function resetAddPopupState() {
        setDisplayDetails("none");
        forceUpdate();
    }

    function changeDisplayAttr(val) {
        setDisplayDetails(val);
    }

    async function toggleDone() {
        if (currentUser) {
            await markAsDone(props.object.id)
                .then(() => {
                    console.log("Marked as done");
                })
                .catch((err) => {
                    console.log("Failed: ", err);
                });
        } else {
            await updateTaskLocal({
                id: props.object.id,
                done: true,
            });
        }
        forceUpdate();
        if (!currentUser) window.location.reload();
    }

    async function handleDeleteRequest() {
        if (window.confirm("Are you sure to PERMANENTLY delete this task?")) {
            if (currentUser) {
                await deleteTask(props.object.id)
                    .then(() => {
                        console.log("Removed");
                        return true;
                    })
                    .catch((error) => {
                        console.error("Error removing task: ", error);
                        return false;
                    });
            } else {
                deleteTaskLocal(props.object.id);
            }
            forceUpdate();
            if (!currentUser) window.location.reload();
        }
    }

    let img;
    let task_info = props.object;
    if (task_info.done) {
        img = <DoneIcon className="task-card-icon" />;
    } else {
        img = <NotDoneIcon className="task-card-icon" />;
    }

    // Decide how to display the title, if it's too long, just replace the rest with ...
    let title;
    if (
        task_info.title.trim().indexOf(" ") < 0 /**if there is no space */ &&
        task_info.title.length > TITLE_CHARS_THRESHOLD
    ) {
        title = `${task_info.title.trim().slice(0, TITLE_CHARS_THRESHOLD)}...`;
    } else {
        title = task_info.title;
        for (
            let i = 0, sequence = title.split(" "), l = sequence.length;
            i < l;
            i++
        ) {
            if (sequence[i].length > TITLE_CHARS_THRESHOLD || l > 4) {
                title = `${task_info.title
                    .trim()
                    .slice(0, TITLE_CHARS_THRESHOLD)}...`;
                break;
            }
        }
    }

    // Decide how to display the body, if it's too long, just replace the rest with ...
    let body;
    if (
        task_info.body.trim().indexOf(" ") < 0 &&
        task_info.body.length > BODY_CHARS_THRESHOLD
    ) {
        body = `${task_info.body.trim().slice(0, BODY_CHARS_THRESHOLD)}...`;
    } else {
        body = task_info.body;
        for (
            let i = 0, sequence = body.split(" "), l = sequence.length;
            i < l;
            i++
        ) {
            if (sequence[i].length > BODY_CHARS_THRESHOLD || body.length > 90) {
                body = `${task_info.body
                    .trim()
                    .slice(0, BODY_CHARS_THRESHOLD)}...`;
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
                title={props.object.title}
                body={props.object.body}
                id={props.object.id}
                done={props.object.done}
                updater={props.updater}
                bindingStateHandler={resetAddPopupState}
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
