import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
  taskId: number;
  completed: boolean;
  onHandleDeleteTask: (id:number) => void;
  onHandleCompleteTask: (id:number) => void;
}

export function Task({taskContent, onHandleDeleteTask, completed, taskId, onHandleCompleteTask}: TaskProps){
  const handleDeleteTask = () => {
    onHandleDeleteTask(taskId);
  }

  const handleCompleteTask = () => {
    onHandleCompleteTask(taskId);
  }

  return(
    <>
      <div className={styles.task}>
        <input 
          type="checkbox"
          name="complete"
          checked={completed}
          onChange={handleCompleteTask}
          className={completed ? styles.isChecked : ''}
        />
        <p>{taskContent}</p>
        <button onClick={handleDeleteTask}> <Trash size={24}/></button>
      </div>
    </>
  )
} 