import {  useState } from 'react';
import trash from '../assets/trash.svg'
import style from './Task.module.css'
import check from '../assets/check.svg'
import concluded from '../assets/concluded.svg'

interface TasksProps {
  id?: number;
  task: string;
  counter: number;
  onDeleteTask: (task: string) => void;
}

export function Task(props: TasksProps){
    const [counter,setCounter] = useState (0);
   const [doneTask,setDoneTask] = useState(false);
  function handleDeleteTask(){
    props.onDeleteTask(props.task)
  }
  function handleDoneTasks(){
    if(doneTask){
      setDoneTask(false)
      setCounter(counter - 1)
   
    }else if (!doneTask){
      setDoneTask(true)
      setCounter(counter + 1)
    }
    console.log(props.counter)
    console.log(counter)
   return props.counter;
  }
  return(
    <div className={style.taskContainer}>
      <button className={style.doneButton} onClick={handleDoneTasks}>
        { doneTask ?  <img src={concluded} alt="" /> :  <img src={check} alt="" />}   
      </button>
      {/* <input type="checkbox" /> */}
      <p>{props.task}</p>
      <button className={style.trashButton} onClick={handleDeleteTask}> 
        <img src={trash} alt="" />
      </button>
    </div>
  )
}

