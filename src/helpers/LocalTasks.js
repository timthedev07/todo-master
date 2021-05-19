/**
 * Creates a task.
 * @param {*} title
 * @param {*} body
 */
export function createTaskLocal(title, body) {
    let ls = localStorage.getItem("tasks");
    let tasks;
    if (!ls || ls === "null") {
        tasks = [];
    } else {
        tasks = JSON.parse(ls);
    }
    let id = tasks.length + 3;
    tasks.push({
        id: id,
        title: title,
        body: body,
        done: false,
    });
    if (localStorage.getItem("num_tasks") === null) {
        localStorage.setItem("num_tasks", "0");
    } else {
        localStorage.setItem(
            "num_tasks",
            `${parseInt(localStorage.getItem("num_tasks")) + 1}`
        );
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 *
 *
 *
 * ```javascript
 * options = {
 *     id: Number,
 *     newTitle: String,
 *     newBody: String,
 *     done: Boolean,
 *     newTags: Array,
 *     tagsToRemove: Array
 * }
 * ```
 *  @param {JSON} options accepts the structure above
 */
export function updateTaskLocal(options) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === options.id) {
            // if no input is provided, then keep the previous one
            tasks[i].title = options.newTitle || tasks[i].title;
            tasks[i].body = options.newBody || tasks[i].body;
            if (options.done !== null) {
                tasks[i].done = options.done;
            }
            break;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function deleteTaskLocal(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let new_tasks = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            new_tasks.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(new_tasks));
}

/**
 * Returns a json object representing a task:
 *
 * ```
 * task: {
 *     id: Number,
 *     title: String,
 *     body: String
 * }
 * ```
 * @param {int} id
 * @returns
 */
export function retrieveTaskLocal(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            return tasks[i];
        }
    }
}
