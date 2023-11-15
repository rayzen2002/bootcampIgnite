import { useState } from 'react';
import trash from '../assets/trash.svg';
import style from './Task.module.css';
import check from '../assets/check.svg';
import concluded from '../assets/concluded.svg';

interface TaskProps {
  task: string;
  onDeleteTask: (task: string) => void;
  onToggleTask: (isDone: boolean) => void;
}

export function Task(props: TaskProps) {
  const [doneTask, setDoneTask] = useState(false);

  function handleDoneTasks() {
    setDoneTask((prevDoneTask) => !prevDoneTask);
    props.onToggleTask(!doneTask);
  }

  return (
    <div className={style.taskContainer}>
      <button className={style.doneButton} onClick={handleDoneTasks}>
        {doneTask ? <img src={concluded} alt="" /> : <img src={check} alt="" />}
      </button>
      <p>{props.task}</p>
      <button className={style.trashButton} onClick={() => props.onDeleteTask(props.task)}>
        <img src={trash} alt="" />
      </button>
    </div>
  );
}
