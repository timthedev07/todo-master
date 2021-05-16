import React, { useContext } from "react";
import { db } from "../firebaseSetup";
import { useAuth } from "./AuthContext";

const TaskContext = React.createContext();

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskManager({ children }) {
    const { currentUser } = useAuth();

    /**
     *
     * Returns an promise
     *
     * @param {String} title
     * @param {String} body
     * @returns
     */
    function createTask(title, body) {
        // create a new document
        return db.collection("tasks").add({
            body: body || "There's nothing because i'm lazy",
            done: false,
            title: title || "Not even a title?",
            // setting the uid to identify which user the task belongs to
            uid: currentUser["uid"],
        });
    }
    /**
     * update a given task with id `id` using the given json object `options` structured as follows:
     *
     * ```javascript
     * options = {
     *     title: String,
     *     body: String,
     * }
     * ```
     *
     * Returns a promise
     *
     * @param {string} id
     * @param {JSON} options
     */
    function updateTask(id, options) {
        let copy = { ...options };
        if (copy.body === "" || copy.body === null)
            copy.body = "There's nothing because i'm lazy";
        if (copy.title === "" || copy.title === null)
            copy.title = "Still no title :)";
        return db.collection("tasks").doc(id).update(copy);
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
     * Returns a promise
     *
     * @param {String} uid
     */
    function retrieveTasksOfUser(uid) {
        // get all tasks where the uid equals the given value
        return db.collection("tasks").where("uid", "==", uid).get();
    }

    const value = {
        createTask,
        updateTask,
        deleteTask,
        retrieveTasksOfUser,
        markAsDone,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
}
