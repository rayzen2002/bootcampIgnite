import style from './List.module.css'
import plus from '../assets/plus.svg'
import clipboard from '../assets/Clipboard.svg'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Task } from './Task';


export function List(){
  let counter = 0;
  const [tasks , setTasks] = useState(['']);
  const [tasksText, setTasksText] = useState('')
  const [taskCounter, setTaskCounter] = useState(0);
 

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, tasksText]);
    setTasksText('');
  }
  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.preventDefault();
    setTasksText(event.target.value)
    console.log(tasks)
  }
  
  function deleteTask(taskToDelete: string){
    const tasksWithoutDeletedOne = tasks.filter(task =>{
      return task !== taskToDelete
    })
    setTasks(tasksWithoutDeletedOne)
  }
 
  return (
      <div className={style.container}> 
        <form 
        className={style.listMenu}
        onSubmit={handleCreateNewTask}
        >
          <textarea 
          onChange={handleNewTaskChange}
          value={tasksText}
          className={style.textArea}
          placeholder='Adicione uma nova tarefa'
          required
          />
          <button className={style.createButton}>
            Criar
            <img src={plus} alt="" />
          </button>
        </form>
        <div className={style.tasksContainer}>
        <div className={style.tasks}>
          <div className={style.createdTasksContainer}>
            <span className={style.createdTasks}>Tarefas criadas</span>
            <span className={style.concludedCount}>{tasks.length - 1}</span>
          </div>
          <div className={style.concludedTasksContainer}>
            <span className={style.concludedTasks}>Concluídas</span>
            <span className={style.concludedCount}>{counter}</span>
          </div>
        </div>
        {/* <div className={style.taskList}>
          <img className={style.clipboard} src={clipboard} alt="" />
          <p className={style.emptyList}>
          </p>
          <br />
          <span>Você ainda não tem tarefas cadastradas</span>
          Crie tarefas e organize seus itens a fazer
         
        </div> */}
        <div >
          {tasks.map(task => {
            if(task !== ''){
            return <Task key={task} task={task}  onDeleteTask={deleteTask} counter={counter} />}
          })}
        </div>
    </div>
    </div>
  )
}