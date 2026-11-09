import { useState } from 'react';
import { Task, TaskCreate, TaskUpdate, TaskStatus, TaskPriority } from '../types/index';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: TaskCreate & TaskUpdate) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading = false }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskCreate & TaskUpdate>({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submit if creating new task
    if (!task) {
      setFormData({ title: '', description: '', status: 'todo', priority: 'medium' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{task ? 'Modifier' : 'Nouvelle Tâche'}</h2>

      <input
        type="text"
        required
        placeholder="Titre *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <textarea
        placeholder="Description (optionnel)"
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={2}
      />

      <div className="form-row">
        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}>
          <option value="todo">À Faire</option>
          <option value="in_progress">En Cours</option>
          <option value="done">Terminé</option>
        </select>

        <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}>
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Enregistrement...' : task ? 'Mettre à Jour' : 'Créer'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="btn-secondary">Annuler</button>}
      </div>
    </form>
  );
}
