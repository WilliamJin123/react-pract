import { useContext, createContext} from "react";
import { useImmerReducer } from "use-immer";

const tasksContext = createContext(null);
const tasksDispatchContext = createContext(null)

export function getTasksContext() {
    return useContext(tasksContext)
}
export function getTasksDispatchContext() {
    return useContext(tasksDispatchContext)
}

const initialTasks = [
    { id: 0, value: 'Philosopher’s Path', checked: true },
    { id: 1, value: 'Visit the temple', checked: false },
    { id: 2, value: 'Drink matcha', checked: false }
  ];


export function TaskDispatcher({children}){
    const [tasks, dispatch] = useImmerReducer(handleDispatchTask, initialTasks)
    return(
        <tasksContext.Provider value={tasks}>
            <tasksDispatchContext.Provider value={dispatch}>
                {children}
            </tasksDispatchContext.Provider>
        </tasksContext.Provider>
    )
}




export function handleDispatchTask(draft, action) {
    switch (action.type){
        case "edit":
            draft.find(item => item.id === action.id).value = action.value
            break

        case "checkbox":
            draft[action.id].checked = !action.checked
            break
        case "delete":
            const index = draft.findIndex(item => item.id === action.id);
            if (index !== -1) {
                draft.splice(index, 1);
            }
            break
        case "add":
            draft.unshift({
                id: draft.length,
                checked: false,
                value: action.value
            })
            
            break
        default:
            console.log("invalid dispatch")
            break
    }
}

