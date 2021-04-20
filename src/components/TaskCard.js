import { Component } from "react";
import { TaskDetails } from "./TaskDetails";
// import ReactMarkdown from 'react-markdown';
import { Button } from "react-bootstrap";

import { ReactComponent as DoneIcon } from "../icons/done.svg";
import { ReactComponent as NotDoneIcon } from "../icons/not-done.svg";
import { ReactComponent as Trash } from "../icons/trash.svg";
import { ReactComponent as MarkAsDone } from "../icons/mark-as-done.svg";

import { deleteTask, updateTask } from "../helpers/Tasks";

const TITLE_CHARS_THRESHOLD = 12;
const BODY_CHARS_THRESHOLD = 80;



export class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDetails: 'none'
        };
    }

    handleClick = () => {
        this.setState({
            displayDetails: 'block'
        });
        
    }

    resetAddPopupState = () => {
        this.setState({
            displayDetails: 'none'
        });
        window.location.reload();
    }

    changeDisplayAttr = (val) => {
        this.setState({
            displayDetails: val
        });
    }

    markAsDone = () => {
        updateTask({
            id: this.props.id,
            done: true
        });
        window.location.reload();
    }

    handleDeleteRequest = () => {
        if (window.confirm('Are you sure to PERMANENTLY delete this task?')) {
            deleteTask(this.props.object.id);
            window.location.reload();
        }
    }

    render() {
        let img;
        let task_info = this.props.object;
        if (task_info.done) {
            img = (<DoneIcon className="task-card-icon" />);
        } else {
            img = (<NotDoneIcon className="task-card-icon" />);
        }

        // Decide how to display the title, if it's too long, just replace the rest with ...
        let title;
        if (task_info.title.trim().indexOf(' ') < 0 && task_info.title.length > TITLE_CHARS_THRESHOLD) {
            title = `${task_info.title.trim().slice(0, TITLE_CHARS_THRESHOLD)}...`;
        } else {
            title = task_info.title;
            for (let i = 0, sequence = title.split(' '), l = sequence.length; i < l; i++) {
                if (sequence[i].length > TITLE_CHARS_THRESHOLD) {
                    title = `${task_info.title.trim().slice(0, TITLE_CHARS_THRESHOLD)}...`;
                }
            }
        }

        // Decide how to display the body, if it's too long, just replace the rest with ...
        let body;
        if (task_info.body.trim().indexOf(' ') < 0 && task_info.body.length > BODY_CHARS_THRESHOLD) {
            body = `${task_info.body.trim().slice(0, BODY_CHARS_THRESHOLD)}...`;
        } else {
            body = task_info.body;
            for (let i = 0, sequence = body.split(' '), l = sequence.length; i < l; i++) {
                if (sequence[i].length > BODY_CHARS_THRESHOLD || body.length > 200) {
                    body = `${task_info.body.trim().slice(0, BODY_CHARS_THRESHOLD)}...`;
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
                    display={this.state.displayDetails}
                    title={this.props.object.title}
                    body={this.props.object.body}
                    id={this.props.object.id}
                    bindingStateHandler={this.resetAddPopupState}
                    stateModifier={this.changeDisplayAttr} />
                
                <div className="face face2">
                    <div className="card-content">
                        <p>{body}</p>
                        <Button variant="info" onClick={() => this.handleClick()}>Details</Button>
                        <div className="task-card-control">
                            <MarkAsDone onClick={() => this.markAsDone()} data-toggle="tooltip" title="Mark as Done" className="control-icons" />
                            <Trash onClick={() => this.handleDeleteRequest()} data-toggle="tooltip" title="Delete" className="control-icons" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}