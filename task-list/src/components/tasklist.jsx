import "./tasklist.css"
import { useImmer, useImmerReducer } from "use-immer"
import { getTasksContext, getTasksDispatchContext } from "./taskContext";
import { useContext } from "react";



function Task({ task }) {

    const dispatchTask = getTasksDispatchContext()
    const tasks = getTasksContext()

    const [isEditing, setIsEditing] = useImmer(false);

    function handleChange(event) {
        const { type, value, checked } = event.target
        switch (type) {
            case "text": //editing a list item
                dispatchTask({
                    type: "edit",
                    value: value,
                    id: task.id
                })
                break
            case "checkbox": //toggling check on a list item
                dispatchTask({
                    type: "checkbox",
                    checked: checked,
                    id: task.id
                })
                break
            case "submit": // deleting a list item
                dispatchTask({
                    type: "delete",
                    id: task.id
                })
                break
            default:
                console.log("not a valid operation")
                console.log(event)
                break
        }
    }



    let taskContent;
    if (isEditing) {
        taskContent = (
            <div>
                <input type="text"
                    value={task.value}
                    name={task.value}
                    onChange={e => handleChange(e)}
                ></input>
                <button onClick={() => setIsEditing(false)}>Save</button>
            </div>
        )
    } else {
        taskContent = (
            <div>
                {task.value}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        )
    }


    return (
        <div className="main-list">
            {/* <label htmlFor={task.value}>{task.value}</label> */}
            <input
                type="checkbox"
                checked={task.checked}
                onChange={e => handleChange(e)}
            ></input>
            {taskContent}
            <button
                onClick={e => handleChange(e)}
            >Delete</button>
        </div>
    )
}

export function TaskList() {

    const dispatchTask = getTasksDispatchContext()
    const tasks = getTasksContext()

    const taskListItems = tasks.map(task => (
        <li key={task.id}>
            <Task task={task} />
        </li>
    ))

    return (
        <ul>
            {taskListItems}
        </ul>
    )
}




export function AddTaskInput() {
    const [taskValue, setTaskValue] = useImmer("")

    const dispatchTask = getTasksDispatchContext()
    const tasks = getTasksContext()
    function handleChange(event) {
        dispatchTask({
            type: "add",
            value: taskValue
        })
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Add task"
                name="add-task"
                value={taskValue}
                onChange={e => setTaskValue(e.target.value)}
            ></input>
            <button onClick={e => handleChange(e)}>Add</button>
        </div>
    )
}