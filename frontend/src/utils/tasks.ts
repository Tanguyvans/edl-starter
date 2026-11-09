import { TaskStatus } from '../types/index';

/**
 * Fonctions utilitaires sur les tâches.
 *
 * Ce sont des fonctions "pures" : elles reçoivent des données et renvoient
 * un résultat, sans appel réseau ni effet de bord. Elles sont donc très
 * simples à tester (voir tasks.test.ts).
 *
 * Elles n'ont besoin que du statut de chaque tâche : on peut donc leur passer
 * de vraies tâches (Task) ou, dans les tests, de simples objets { status: 'todo' }
 * (type HasStatus).
 */
export type HasStatus = { status: TaskStatus };

// Compte les tâches de chaque statut.
// Exemple : countByStatus([{ status: 'todo' }, { status: 'done' }])
//           → { todo: 1, in_progress: 0, done: 1 }
export function countByStatus(tasks: HasStatus[]): Record<TaskStatus, number> {
  const counts = { todo: 0, in_progress: 0, done: 0 };
  for (const task of tasks) {
    counts[task.status] += 1;
  }
  return counts;
}

// Pourcentage de tâches terminées, arrondi à l'entier.
// Exemple : 1 tâche terminée sur 4 → 25
// Une liste vide donne 0 (on ne divise pas par zéro).
export function completionRate(tasks: HasStatus[]): number {
  if (tasks.length === 0) {
    return 0;
  }
  const done = countByStatus(tasks).done;
  return Math.round((done / tasks.length) * 100);
}
