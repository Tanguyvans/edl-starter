import { describe, it, expect } from 'vitest';
import { countByStatus, completionRate, filterByStatus } from './tasks';

/**
 * Tests des fonctions utilitaires (tasks.ts)
 *
 * Ces tests sont écrits en JavaScript : même structure qu'en Python avec pytest :
 *
 *   Python (pytest)                       JavaScript (Vitest)
 *   from tasks import completionRate      import { completionRate } from './tasks';
 *   class TestCompletionRate:             describe('completionRate', () => { ... });
 *   def test_xxx():                       it('xxx', () => { ... });
 *   tasks = [...]                         const tasks = [...];
 *   assert resultat == 3                  expect(resultat).toBe(3);
 *   assert resultat == {"a": 1}           expect(resultat).toEqual({ a: 1 });
 *
 * () => { ... } est une fonction sans nom : l'équivalent d'un def.
 *
 * toBe    → compare une valeur simple (nombre, texte, booléen)
 * toEqual → compare le contenu d'un objet ou d'un tableau
 */

// =============================================================================
// PARTIE 1 : TESTS EXEMPLES (lisez-les !)
// =============================================================================

describe('countByStatus', () => {
  it('compte les tâches de chaque statut', () => {
    // ARRANGE : préparer une liste de tâches
    const tasks = [
      { status: 'todo' },
      { status: 'todo' },
      { status: 'done' },
    ];

    // ACT : appeler la fonction à tester
    const counts = countByStatus(tasks);

    // ASSERT : vérifier le résultat
    expect(counts).toEqual({ todo: 2, in_progress: 0, done: 1 });
  });

  it('renvoie des zéros pour une liste vide', () => {
    const counts = countByStatus([]);

    expect(counts).toEqual({ todo: 0, in_progress: 0, done: 0 });
  });
});

// =============================================================================
// PARTIE 2 : SOLUTION (TP 1 - Exercice 4)
// =============================================================================

describe('completionRate', () => {
  it('calcule le pourcentage de tâches terminées', () => {
    const tasks = [
      { status: 'done' },
      { status: 'done' },
      { status: 'todo' },
      { status: 'in_progress' },
    ];

    const rate = completionRate(tasks);

    expect(rate).toBe(50);
  });

  it('renvoie 100 quand toutes les tâches sont terminées', () => {
    const tasks = [{ status: 'done' }, { status: 'done' }];

    expect(completionRate(tasks)).toBe(100);
  });

  it('renvoie 0 pour une liste vide', () => {
    expect(completionRate([])).toBe(0);
  });
});

// =============================================================================
// BONUS : filterByStatus, écrit en TDD
// =============================================================================

describe('filterByStatus', () => {
  it('garde seulement les tâches du statut demandé', () => {
    const tasks = [
      { title: 'A', status: 'done' },
      { title: 'B', status: 'todo' },
      { title: 'C', status: 'done' },
    ];

    const done = filterByStatus(tasks, 'done');

    expect(done).toEqual([
      { title: 'A', status: 'done' },
      { title: 'C', status: 'done' },
    ]);
  });

  it('renvoie une liste vide si aucune tâche ne correspond', () => {
    expect(filterByStatus([{ status: 'todo' }], 'done')).toEqual([]);
  });
});
