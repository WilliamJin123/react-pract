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
            return draft.filter(item => item.id !== action.id)
            break
        case "add":
            draft.unshift({
                id: 0,
                checked: false,
                value: action.value
            })
            for (let i = 0; i < draft.length; i++){
                draft[i].id++
            }
            break
        default:
            console.log("invalid dispatch")
            break
    }
}

