import "./App.css"
import {useImmer, useImmerReducer} from 'use-immer'


function handleChangeReducer(draft, action){
  switch(action.type){
    case 'setField':
      draft[action.name] = action.value
      break
    default:
      console.log("nothing done")
      break
    case 'reset':
      Object.keys(draft).forEach(key =>{
        draft[key] = ""
      })
      
  }
}
export default function App() {

  const [form, dispatch] = useImmerReducer(handleChangeReducer, {
    email: "",
    firstName: "",
    lastName: "",
  })
  // const [form, setForm] = useImmer ({
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  // })
  
  function handleChange(event) {
    const {name, value} = event.target;
    dispatch({
      type: 'setField',
      name: name,
      value: value
    })
  }
  function handleSubmit(event){
    event.preventDefault();
    dispatch({
      type: 'reset'
    })

    //backend wtv:

  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Subscribe</h1>
      <label htmlFor = "email">Email Address: </label>
      <input name = "email" value = {form.email} onChange={handleChange}/> <br/>
      <label htmlFor="firstName">First Name: </label>
      <input name = "firstName" value = {form.firstName} onChange={handleChange}/>
      <label htmlFor="lastName">Last Name: </label>
      <input name = "lastName" value = {form.lastName} onChange={handleChange}/> <br/>
      <input type="submit" value="subscribe!" />
    </form>
  )
}