import { useState, useEffect } from 'react'
import { Todo, TodoInfo, MetaResponse } from './Interface/Interfase'
import './App.css'
import { fetchGet, fetchPost } from './API/fetch'
import {Task} from './Components/Task/Task'

function App() {
  const [tasksList, setTasksList] = useState<Todo[]>([])
  const [taskStatus, setTaskStatus] = useState<TodoInfo>()
  const [inputData, setInputData] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const [completionStatus, setCompletionStatus] = useState("All");
  //const [validate, setValidate] = useState(true);

  const getData = () => {
    fetchGet().then((data: MetaResponse<Todo, TodoInfo>)  => {
      console.log(data.data)
      setTasksList(data.data)
      setTaskStatus(data.info)
    })
  }

  useEffect(() => {
    getData()
    console.log("asd")
  }, [flag]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
    //setValidate(true)
    e.target.setCustomValidity("");
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputData.length < 2 || inputData.length > 64){
      //setValidate(false)
      //throw new Error ("Error");
      alert("ХХХ")
    }
    else {
      fetchPost(false, inputData).then(() => {
        setFlag(!flag)
      })
    }
    
  }

  return (
    <div className="main">
      <div className="input__form">
        <form action="" onSubmit={(e: React.FormEvent) => addTask(e)}>
          <input type="text" required minLength={2} maxLength={64} className='input__form-task__new' placeholder='Task To Be Done...' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} />
          <button className='input__form-task__add' onClick={(e: React.FormEvent) => addTask(e)}>Add</button>
        </form>
      </div>
      <div className="filter">
        <button className={completionStatus === "All" ? "filter-btn filter-btn__active" : "filter-btn"} onClick={() => setCompletionStatus("All")} autoFocus>Все({taskStatus?.all})</button>
        <button className={completionStatus === "false" ? "filter-btn filter-btn__active" : "filter-btn"} onClick={() => setCompletionStatus("false")}>В прогрессе({taskStatus?.inWork})</button>
        <button className={completionStatus === "true" ? "filter-btn filter-btn__active" : "filter-btn"} onClick={() => setCompletionStatus("true")}>Завершенные({taskStatus?.completed})</button>
      </div>
      <div className="task__list">
        {tasksList?.map((item: Todo) => {
          if (completionStatus === "All") {
            return <Task task={item} updateState={getData}/>
          }
          else if (item.isDone === JSON.parse(completionStatus)) {
            return <Task task={item} updateState={getData}/>
          } 
        })}
      </div>
    </div>
  )
}

export default App
