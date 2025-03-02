import React, {useState} from "react" ; 

const TodoApp= ()=>{
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask =() => {
    if(newTask.trim()=== "") return;
    setTasks([...tasks, {id:Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask =(id)=>{
    setTasks (tasks.map(task => task.id === id?{...task, completed: !task.completed} : task));

  };

  const deleteTask =(id) =>{
    setTasks (tasks.filter(task=> task.id !== id ));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
      type="text"
      placeholder=" add a new task"
      value = {newTask}
      onChange = {(e) => setNewTask(e.target.value)}
      />
      <button onClick = {addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key ={task.id} style= {{textDecoration: task.completed ? "line-through" : "none"}}>
           {task.text}
            <button onClick={() => toggleTask(task.id)}>Toggle</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;