import style from './List.module.css';
import plus from '../assets/plus.svg';
import clipboard from '../assets/Clipboard.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Task } from './Task';

export function List() {
  const [tasks, setTasks] = useState(['']);
  const [tasksText, setTasksText] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, tasksText]);
    setTasksText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setTasksText(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task !== taskToDelete);
    setTasks(tasksWithoutDeletedOne);
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleToggleTask(isDone: boolean) {
    setCounter((prevCounter) => (isDone ? prevCounter + 1 : prevCounter - 1));
  }

  const [counter, setCounter] = useState(0);

  return (
    <div className={style.container}>
      <form className={style.listMenu} onSubmit={handleCreateNewTask}>
        <textarea
          onChange={handleNewTaskChange}
          value={tasksText}
          className={style.textArea}
          placeholder="Adicione uma nova tarefa"
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
            <span className={style.concludedCount}>{`${counter} de ${tasks.length - 1}`}</span>
          </div>
        </div>

        {tasks && tasks.length > 1 ? (
          <p>Texto 1</p>
        ) : (
          <div className={style.taskList}>
            <img className={style.clipboard} src={clipboard} alt="" />
            <p className={style.emptyList}>
              <br />
              <span>Você ainda não tem tarefas cadastradas</span>
            </p>
            Crie tarefas e organize seus itens a fazer
          </div>
        )}

        <div>
          {tasks.map((task, index) => {
            if (task !== '') {
              return (
                <Task
                  key={index}
                  task={task}
                  onDeleteTask={deleteTask}
                  onToggleTask={handleToggleTask}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
