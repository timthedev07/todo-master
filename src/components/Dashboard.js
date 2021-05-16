import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Popup } from "./Popup.js";
import { AddPopup } from "./addPopup";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import Nav from "./Nav.js";

export function Dashboard(props) {
    const tipPopup = localStorage.getItem("showtip-addTask");
    const [addPopup, setAddPopup] = useState("none");
    const { retrieveTasksOfUser } = useTasks();
    const { currentUser } = useAuth();
    const forceUpdate = useForceUpdate();

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

    // console.log(currentUser["providerData"][0]["providerId"] || null);

    const resetAddPopupState = () => {
        setAddPopup("none");
        forceUpdate();
    };

    const retrieveTasks = async () => {
        let res = [];
        if (currentUser) {
            // retrieve all tasks from the database
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

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("newTask") === "true") {
                localStorage.setItem("newTask", "false");
                forceUpdate();
            }
        }, 1000);
    });

    let PopupDisplay;
    if (tipPopup === "true" || tipPopup === "null" || tipPopup === null) {
        PopupDisplay = <Popup />;
    }

    let tasks_render = [];
    retrieveTasks();
    let tasks = JSON.parse(localStorage.getItem("buffer"));
    if (localStorage.getItem("newTask") === "true") {
        forceUpdate();
        localStorage.setItem("newTask", "false");
        localStorage.setItem("reload", "true");
        localStorage.setItem("reload-count", "0");
    }

    if (!tasks || tasks.length < 1) {
        tasks_render.push(
            <h5 key="no-tasks" style={{ textAlign: "center", color: "white" }}>
                No Tasks To Do Yet...
            </h5>
        );
    } else {
        let l = tasks.length;
        // console.log("======================================");
        for (let i = 0; i < l; i++) {
            // console.log(tasks[i]);
            tasks_render.push(
                <TaskCard
                    updater={forceUpdate}
                    object={tasks[i]}
                    key={tasks[i].id.toString()}
                />
            );
        }
        // console.log("======================================");
    }

    return (
        <>
            <Nav forceUpdate={forceUpdate} />
            <div id="dashboard-container">
                {PopupDisplay}
                <AddPopup
                    display={addPopup}
                    bindingStateHandler={resetAddPopupState}
                    stateModifier={setAddPopup}
                    updater={forceUpdate}
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
                        onClick={() => displayAddPopup()}
                    >
                        Add a New Task
                    </Button>
                </Container>
                <br />

                <div className="flex-wrapper">
                    <div id="tasks-container">{tasks_render}</div>
                </div>
            </div>
        </>
    );
}
