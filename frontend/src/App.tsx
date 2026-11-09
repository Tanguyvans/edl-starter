import { useState, useEffect } from 'react';
import { api } from './api/api';
import { Task, TaskCreate } from './types/index';
import { SimpleTaskList } from './components/SimpleTaskList';
import { TaskForm } from './components/TaskForm';
import { countByStatus, completionRate } from './utils/tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Charge les tâches une seule fois, au premier affichage
  useEffect(() => {
    api.getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err as Error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateTask = async (taskData: TaskCreate) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdateTask = async (taskId: number, updates: Partial<TaskCreate>) => {
    try {
      const updatedTask = await api.updateTask(taskId, updates);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await api.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Erreur de Connexion</h2>
        <p>Impossible de se connecter au backend.</p>
        <p>Démarrez le backend: <code>cd backend && uv run uvicorn src.app:app --reload</code></p>
      </div>
    );
  }

  const counts = countByStatus(tasks);

  return (
    <div className="app">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestionnaire de Tâches</p>
        <p className="stats">
          {counts.todo} à faire · {counts.in_progress} en cours · {counts.done} terminées
          ({completionRate(tasks)} % terminé)
        </p>
      </header>

      <main>
        <TaskForm
          task={editingTask}
          onSubmit={(data) => {
            if (editingTask) {
              handleUpdateTask(editingTask.id, data);
            } else {
              handleCreateTask(data);
            }
          }}
          onCancel={editingTask ? () => setEditingTask(null) : undefined}
        />

        <SimpleTaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
