import { useState } from 'react';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';

type TodoInformation = {
  id: number;
  task: string;
  isDone: string;
};

function TodoList() {
  const [task, setTask] = useState<TodoInformation[]>([]);
  const [addTodo, setAddTodo] = useState('');

  const addMoreTodo = () => {
    const nanoId = task.length + 1;
    setTask((prev) => [...prev, { id: nanoId, task: addTodo, isDone: 'false' }]);
    setAddTodo('');
  };

  const deleteTodo = (id: number) => {
    setTask(task.filter((i) => i.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTask(
      task.map((item) =>
        item.id === id ? { ...item, isDone: item.isDone === 'true' ? 'false' : 'true' } : item
      )
    );
  };

  const updateTodo = (id: number, newTodo: string) => {
    setTask(task.map((item) => (item.id === id ? { ...item, task: newTodo } : item)));
  };

  const editClicked = (id: number) => {
    const newTodo = prompt('Enter new todo');
    if (newTodo) {
      updateTodo(id, newTodo);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <h1 className="text-center my-4">My ToDo List</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new task"
              value={addTodo}
              onChange={(e) => setAddTodo(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addMoreTodo}>
              Add ToDo
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {task.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.task}</td>
                  <td>{item.isDone === 'true' ? 'Completed' : 'Pending'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteTodo(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => toggleCompleted(item.id)}
                    >
                      {item.isDone === 'true' ? 'Mark as Pending' : 'Mark as Completed'}
                    </button>
                    <button className="btn btn-warning btn-sm" onClick={() => editClicked(item.id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
