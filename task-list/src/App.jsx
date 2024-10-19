import "./App.css"
import {useImmerReducer} from "use-immer"
import {TaskList, AddTaskInput} from "./components/tasklist.jsx"
import { TaskDispatcher } from "./components/taskContext.jsx"
export default function App(){
  return(
    
    <TaskDispatcher>
      <h1>Vacation Plans</h1>
      <AddTaskInput/>
      <TaskList/>
    </TaskDispatcher>
  )
}