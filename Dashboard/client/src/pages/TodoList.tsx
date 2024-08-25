import React, {useState} from 'react'
import SideBar from './SideBar'

type todoInformation = {
    id: number,
    task: string,
    isDone: string
  }

function TodoList() {

    const [task, setTask] = useState<todoInformation[]>([])
    const [addTodo, setAddTodo] = useState('')
  
    const addMoreTodo = () => {
      const nanoId = task.length + 1
      setTask((prev) => [...prev, {id:nanoId, task:addTodo, isDone:'false'}])
      setAddTodo('')
    }
  
    const deleteTodo = (id:number) => {
      setTask(task.filter((i) => {
        return i.id != id
      }))
    }
  
    const toggleCompleted = (id:number) => {
      setTask(task.map((item) => (
        item.id === id ? {...item, isDone:item.isDone === 'true'? 'false': 'true'} : item
      )))
    }
  
    const updateTodo = (id: number,newTodo: string) => {
      setTask(task.map((item) => (
        item.id === id ? {...item, task:newTodo} : item
      )))
    }
  
    const editClicked = (id: number) => {
      const newTodo = prompt('Enter new todo')
      if(newTodo) {
        updateTodo(id,newTodo)
      }
    }


  return (
    <>
    <SideBar/>
      <h1> My ToDo List </h1>
      <input type="text" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} />
      <button onClick={addMoreTodo}> add ToDo </button>
      {task.map((item,index) => (
        <table>
          <tbody>
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.task}</td>
              <td>{item.isDone}</td>
              <button onClick={() => deleteTodo(item.id)}>delete</button>
              <button onClick={() => toggleCompleted(item.id)}>completed</button>
              <button onClick={() => editClicked(item.id)}>Edit</button>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  )
}

export default TodoList