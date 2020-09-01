import React, { useState, useEffect } from 'react';

import { TaskRow } from './components/TaskRow'
import { TaskBanner } from './components/TaskBanner'
import { TaskCreator } from './components/TaskCreator'
import { VisibilityControl } from './components/VisibilityControl'


//import logo from './logo.svg';
//import './App.css';
function App() {

  const [userName, setUserName] = useState('Ivan');
  const [taskItems, setTaskItems] = useState([
    { name: 'Tarea 1', done: true },
    { name: 'Tarea 2', done: false },
    { name: 'Tarea 3', done: true },
    { name: 'Tarea 4', done: false }

  ])

const [showCompleted, setShowCompleted] = useState(true)

useEffect(()=>{
let data =localStorage.getItem('Ivan');
if(data != null){
  setTaskItems(JSON.parse(data));

}else {
  setUserName('Ejemplo de Ivan')
  setTaskItems ([
    { name: 'Tarea 1', done: false },
    { name: 'Tarea 2', done: false },
    { name: 'Tarea 3', done: true },
    { name: 'Tarea 4', done: false }
  ])

  setShowCompleted(true);
}

},[]);

useEffect(() => {
  localStorage.setItem('task',JSON.stringify(taskItems));
},[taskItems])


  const createNewTask = taskName => {
    if(!taskItems.find(t=>t.name === taskName)) {
       setTaskItems([...taskItems, {name : taskName, done: false}])
    }


  }
  const toggleTask = task =>
  setTaskItems(taskItems.map (t => (t.name === task.name ? {...t,done: ! t.done } : t ) )
  
  )
  const taskTableRow = (doneValue) =>
  taskItems
  .filter(task => task.done === doneValue)
    .map(task => (
     <TaskRow task={task} key={task.name} toggleTask = {toggleTask} />
   ))

  return (
    <div >
   <TaskBanner userName={userName} taskItems={taskItems}/>

   <TaskCreator callback = {createNewTask} />
      <table className = "table table-striped table-bordered">
        <thead>
          <tr>
            <th> Descripcion</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRow(false)}
        </tbody>
      </table>
      <div className = ".bg-secondary-text-white text-center p-2">

        <VisibilityControl description="Completed Tasks" isChecked = {showCompleted} callback = {checked => setShowCompleted (checked)}
        />
      </div  >
      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripcion</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {taskTableRow(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
