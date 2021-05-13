import React, { useContext } from "react";
import { db } from "../firebaseSetup";
import { useAuth } from "./AuthContext";

const TaskContext = React.createContext();

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskManager({ children }) {
    const { currentUser } = useAuth();

    function createTask(title, body) {
        // create a new document
        db.collection("tasks").doc().set({
            body: body,
            done: false,
            title: title,
            // setting the uid to identify which user the task belongs to
            uid: currentUser["uid"],
        });
    }

    /**
     * retrieve task by a given id, returns a json object containing the information,
     * if the id is invalid and the task does not exist, return null
     * @param {string} id
     */
    function retrieveTask(id) {
        // create a new document
        let elementRef = db.collection("tasks").doc(id);
        elementRef.get().then((doc) => {
            if (doc.exists) {
                console.log(JSON.stringify(doc.data()));
                return doc.data();
            } else {
                return null;
            }
        });
    }
    /**
     * update a given task with id `id` using the given json object `options` structured as follows:
     *
     * ```javascript
     * options = {
     *     newTitle: String,
     *     newBody: String,
     * }
     * ```
     *
     * Returns true if success, and false otherwise
     *
     * @param {string} id
     * @param {JSON} options
     */
    function updateTask(id, options) {
        let elementRef = db.collection("tasks").doc(id);
        elementRef
            .update(options)
            .then(() => {
                return true;
            })
            .catch((err) => {
                return false;
            });
    }

    /**
     * Mark a given task with `id` as done, returns a promise
     * @param {string} id
     * @param {*} options
     */
    function markAsDone(id) {
        let elementRef = db.collection("tasks").doc(id);
        return elementRef.update({
            done: true,
        });
    }

    /**
     * Deletes a task with the given id, returns true if success, and false otherwise
     * @param {string} id
     */
    function deleteTask(id) {
        return db.collection("tasks").doc(id).delete();
    }

    /**
     * Returns a promise, which then is going to be dealt as follows:
     *
     * ```js
     * call.then((snapshot) => {
                let res = [];
                snapshot.forEach((doc) => {
                    // include the doc id in each returned object
                    let buffer = doc.data();
                    buffer["id"] = doc.id;
                    res.push(buffer);
                });
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.error("Error retrieving tasks: ", err);
            });
     * ```
     * @param {String} uid
     */
    function retrieveTasksOfUser(uid) {
        // get all tasks where the uid equals the given value
        return db.collection("tasks").where("uid", "==", uid).get();
    }

    const value = {
        createTask,
        retrieveTask,
        updateTask,
        deleteTask,
        retrieveTasksOfUser,
        markAsDone,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
}
