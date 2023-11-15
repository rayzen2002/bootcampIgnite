import {  useState } from 'react';
import trash from '../assets/trash.svg'
import style from './Task.module.css'
import check from '../assets/check.svg'
import concluded from '../assets/concluded.svg'

interface TasksProps {
  id?: number;
  task: string;
  onDeleteTask: (task: string , isDone : boolean) => void;
  onToggle: (isDone: boolean) => void;
}

export function Task(props: TasksProps){
   const [doneTask,setDoneTask] = useState(false);
  function handleDeleteTask(){
    props.onDeleteTask(props.task , doneTask)
  }
  function handleDoneTasks(){
   doneTask ? setDoneTask(false) : setDoneTask(true);
   props.onToggle(doneTask)
  }
  return(
    <div className={style.taskContainer}>
      <button className={style.doneButton} onClick={handleDoneTasks}>
        { doneTask ?  
       
        <img src={concluded} alt="" /> 
      
       
        :  
      
        <img src={check} alt="" />
       
        
        }   
      </button>
      {doneTask ? 
       <p className={style.doneTask}>{props.task}</p>
      :
      <p >{props.task}</p>
    }
      {/* <input type="checkbox" /> */}
      
      <button className={style.trashButton} onClick={handleDeleteTask}> 
        <img src={trash} alt="" />
      </button>
    </div>
  )
}

