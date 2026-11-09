import { describe, it, expect } from 'vitest';
import { countByStatus, completionRate, HasStatus } from './tasks';

/**
 * Tests des fonctions utilitaires (tasks.ts)
 *
 * Même structure qu'en Python avec pytest :
 *
 *   Python (pytest)                       TypeScript (Vitest)
 *   def test_xxx():                       it('xxx', () => { ... });
 *   tasks: list[HasStatus] = [...]        const tasks: HasStatus[] = [...];
 *   assert resultat == 3                  expect(resultat).toBe(3);
 *   assert resultat == {"a": 1}           expect(resultat).toEqual({ a: 1 });
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
    const tasks: HasStatus[] = [
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
// PARTIE 2 : À VOUS ! (TP 1 - Exercice 4)
// =============================================================================
//
// Écrivez les 3 tests de completionRate().
// Pour chaque test : supprimez la ligne `throw new Error(...)`,
// puis écrivez ARRANGE / ACT / ASSERT comme dans les exemples ci-dessus.
//
// Lancer les tests : npm test

describe('completionRate', () => {
  it('calcule le pourcentage de tâches terminées', () => {
    // ARRANGE : 4 tâches, dont 2 avec le statut 'done'
    // ACT     : appeler completionRate(tasks)
    // ASSERT  : le résultat doit valoir 50
    throw new Error('Test à écrire (TP 1 - Exercice 4)');
  });

  it('renvoie 100 quand toutes les tâches sont terminées', () => {
    // ARRANGE : 2 tâches, toutes les deux 'done'
    // ACT     : appeler completionRate(tasks)
    // ASSERT  : le résultat doit valoir 100
    throw new Error('Test à écrire (TP 1 - Exercice 4)');
  });

  it('renvoie 0 pour une liste vide', () => {
    // ARRANGE : une liste vide []
    // ACT     : appeler completionRate([])
    // ASSERT  : le résultat doit valoir 0
    throw new Error('Test à écrire (TP 1 - Exercice 4)');
  });
});
