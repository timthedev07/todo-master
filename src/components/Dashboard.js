import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Popup } from "./Popup.js";
import { AddPopup } from "./addPopup";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";

export function Dashboard(props) {
    const tipPopup = localStorage.getItem("showtip-addTask");
    const [addPopup, setAddPopup] = useState("none");
    const { retrieveTasksOfUser } = useTasks();
    const { currentUser } = useAuth();
    const forceUpdate = useForceUpdate();

    function changeDisplayAttr(val) {
        setAddPopup(val);
    }

    function handleClickAddPopup() {
        displayAddPopup();
    }

    function displayAddPopup() {
        setAddPopup("block");
    }

    function useForceUpdate() {
        const [v, setV] = useState(false);
        return () =>
            setV((prevV) => {
                return 1 < 3 ? !prevV : v;
            });
    }

    const updater = async () => {
        forceUpdate();
    };
    // :
    // console.log(currentUser["providerData"][0]["providerId"] || null);

    const resetAddPopupState = async () => {
        setAddPopup("none");
        forceUpdate();
        if (currentUser) window.location.reload();
    };

    const retrieveTasks = async () => {
        let res = [];
        if (currentUser !== null) {
            const snapshot = await retrieveTasksOfUser(currentUser["uid"]);
            await snapshot.forEach((doc) => {
                let buffer = doc.data();
                buffer["id"] = doc.id;
                res.push(buffer);
            });
        } else {
            res = JSON.parse(localStorage.getItem("tasks"));
        }
        localStorage.setItem("buffer", JSON.stringify(res));
    };

    let PopupDisplay;
    if (tipPopup === "true" || tipPopup === "null" || tipPopup === null) {
        PopupDisplay = <Popup />;
    }

    let tasks_render = [];
    retrieveTasks();
    let tasks = JSON.parse(localStorage.getItem("buffer"));

    if (tasks === null || tasks === undefined || tasks.length < 1) {
        tasks_render.push(
            <h5 key="no-tasks" style={{ textAlign: "center", color: "white" }}>
                No Tasks To Do Yet...
            </h5>
        );
    } else {
        let l = tasks.length;
        for (let i = 0; i < l; i++) {
            tasks_render.push(
                <TaskCard
                    updater={updater}
                    object={tasks[i]}
                    key={tasks[i].id.toString()}
                />
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
