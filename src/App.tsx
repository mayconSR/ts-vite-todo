import Clipboard from './assets/clipboard.svg';
import styles from './App.module.css'
import Logo from '/logo.svg';
import { PlusCircle } from 'phosphor-react';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Task {
  id: number;
  content: string;
  completed: boolean;
}

function App() {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ nextID, setNextID ] = useState(0);
  const [ newTaskText, setNewTaskText ] = useState('');
  const [completedCount, setCompletedCount] = useState(0);

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();
    setTasks([...tasks, {id: nextID, content: newTaskText, completed: false}]);
    setNextID(nextID + 1);
    console.log(tasks);
  } 

  function handleTaskTextChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(e.target.value);
  }

  function handleDeleteTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    updateCompletedCount(updatedTasks);
  }

  function updateCompletedCount(tasks: Task[]) {
    const completedTasks = tasks.filter(task => task.completed);
    setCompletedCount(completedTasks.length);
  }
  
  function handleCompleteTask(id: number) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateCompletedCount(updatedTasks);
  }
  return (
    <>
      <main>
        <div className={styles.background}>
          <img src={Logo}></img>
        </div>
        <form>
          <input 
            type="text" 
            name="newTask" 
            id="newTask" 
            placeholder='Adicione uma nova tarefa'
            value={newTaskText}
            onChange={handleTaskTextChange}
          />
          <button onClick={handleCreateNewTask} type="submit">
            <span>Criar <PlusCircle/></span>
          </button>
        </form>
        <div className={styles.tasks}>
          <div className={styles.info}>
            <p>Tarefas criadas <span>{tasks.length}</span></p>
            <p>Concluídas <span>{completedCount} de {tasks.length}</span></p>
          </div>
          {
          tasks.length > 0 ? 
            <div className={styles.list}>
            {tasks.map(task => <Task key={task.id} taskContent={task.content} onHandleDeleteTask={handleDeleteTask} completed={task.completed} taskId={task.id} onHandleCompleteTask={handleCompleteTask} />)}
          </div> : 
          <div className={styles.empty}>
              <img src={Clipboard} alt="ClipboardText" />
              <div>
                <p>Voce ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
          </div>
          }
        </div>
      </main>
    </>
  )
}

export default App
