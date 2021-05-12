import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Popup } from "./Popup.js";
import { AddPopup } from "./addPopup";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../context/TasksContext";

export function Dashboard(props) {
    const tipPopup = localStorage.getItem("showtip-addTask");
    const [addPopup, setAddPopup] = useState("none");
    const { retrieveTask } = useTasks();

    function changeDisplayAttr(val) {
        setAddPopup(val);
    }

    function handleClickAddPopup() {
        displayAddPopup();
    }

    function displayAddPopup() {
        setAddPopup("block");
    }

    function resetAddPopupState() {
        setAddPopup("none");
    }

    let PopupDisplay;
    if (tipPopup === "true" || tipPopup === "null" || tipPopup === null) {
        PopupDisplay = <Popup />;
    }

    let tasks_render = [];
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks === null) {
        tasks_render.push(
            <h5 key="no-tasks" style={{ textAlign: "center", color: "white" }}>
                No Tasks To Do Yet...
            </h5>
        );
    } else {
        let l = tasks.length;
        for (let i = 0; i < l; i++) {
            tasks_render.push(
                <TaskCard object={tasks[i]} key={tasks[i].id.toString()} />
            );
        }
    }

    return (
        <div id="dashboard-container">
            {PopupDisplay}
            <AddPopup
                display={addPopup}
                bindingStateHandler={resetAddPopupState}
                stateModifier={changeDisplayAttr}
            />
            <Container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    style={{ marginTop: "40px" }}
                    id="add-popup-trigger-button"
                    variant="info"
                    onClick={() => handleClickAddPopup()}
                >
                    Add a New Task
                </Button>
            </Container>
            <br />
            <Container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            ></Container>
            <div className="flex-wrapper">
                <div id="tasks-container">{tasks_render}</div>
            </div>
        </div>
    );
}
