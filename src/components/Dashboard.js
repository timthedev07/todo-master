import { Component, createRef } from "react";
import { Button, Container } from "react-bootstrap";
import { Popup } from "./Popup.js";
import { AddPopup } from "./addPopup";
import { TaskCard } from "./TaskCard";

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.titleRef = createRef();
        this.contentRef = createRef();
        this.state = {
            "tip-popup": localStorage.getItem('showtip-addTask'),
            "add-popup": "none"
        }
    }

    changeDisplayAttr = (val) => {
        this.setState({
            "add-popup": val
        });
    }

    handleClickAddPopup = () => {
        this.displayAddPopup();
    }

    displayAddPopup = () => {
        this.setState({
            "add-popup": 'block'
        });
    }

    resetAddPopupState = () => {
        this.setState({
            "add-popup": 'none'
        })
    }

    render() {
        let PopupDisplay;
        if (this.state["tip-popup"] === 'true' || this.state["tip-popup"] === 'null' || this.state["tip-popup"] === null) {
            PopupDisplay = <Popup />;
        }

        let tasks_render = [];
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks === null) {
            tasks_render.push(<h5 key="no-tasks" style={{ textAlign: 'center', color: 'white' }}>No Tasks To Do Yet...</h5>)
        } else {
            let l = tasks.length;
            for (let i = 0; i < l; i++) {
                tasks_render.push((
                    <TaskCard
                        object={tasks[i]}
                        key={tasks[i].id.toString()} />
                ))
            }
        }
        return (
            <div id="dashboard-container">
                {PopupDisplay}
                <AddPopup display={this.state["add-popup"]} bindingStateHandler={this.resetAddPopupState} stateModifier={this.changeDisplayAttr} />
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{ margin: 'auto' }} id="add-popup-trigger-button" variant="info" onClick={() => this.handleClickAddPopup()}>Add a New Task</Button>
                </Container>
                <br />
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </Container>
                <div className="flex-wrapper">
                    <div id="tasks-container">
                        {tasks_render}
                    </div>
                </div>
            </div>
        )
    }
}
