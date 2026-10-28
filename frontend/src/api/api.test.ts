import { describe, it, expect, vi, afterEach } from 'vitest';
import { api } from './api';

/**
 * Tests du module API — EXEMPLES DÉJÀ ÉCRITS (pour aller plus loin)
 *
 * Vous n'avez rien à écrire dans ce fichier : lisez-le pour voir comment on
 * teste du code qui appelle le backend.
 *
 * Le problème : api.ts utilise fetch() pour parler au backend. Dans un test,
 * on ne veut pas dépendre d'un vrai serveur.
 *
 * La solution : un "mock". On remplace fetch() par une fausse fonction qui
 * renvoie la réponse qu'on choisit, puis on vérifie comment elle a été appelée.
 *
 *   vi.fn(...)                    crée une fausse fonction qui enregistre ses appels
 *   vi.stubGlobal('fetch', mock)  remplace fetch() par cette fausse fonction
 *   vi.unstubAllGlobals()         remet le vrai fetch() après chaque test
 *
 * Comme fetch() est asynchrone, ces tests utilisent async / await.
 */

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('API Module', () => {
  it('récupère la liste des tâches', async () => {
    // ARRANGE : fetch renverra une liste contenant une tâche
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 1, title: 'Test Task', status: 'todo' }]),
    });
    vi.stubGlobal('fetch', mockFetch);

    // ACT
    const tasks = await api.getTasks();

    // ASSERT
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('crée une tâche', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'New Task', status: 'todo' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const created = await api.createTask({ title: 'New Task' });

    expect(created.id).toBe(1);
    expect(created.title).toBe('New Task');
  });

  it("lève une erreur quand le backend répond 500", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });
    vi.stubGlobal('fetch', mockFetch);

    await expect(api.getTasks()).rejects.toThrow('API error: 500 Server Error');
  });

  it('supprime une tâche avec la bonne URL et la méthode DELETE', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 204 });
    vi.stubGlobal('fetch', mockFetch);

    await api.deleteTask(1);

    // En développement, api.ts ajoute le préfixe /api devant chaque URL.
    // On ne vérifie que la méthode : expect.objectContaining ignore les autres options.
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/tasks/1',
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('met à jour une tâche avec la méthode PUT', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'Updated Title', status: 'todo' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await api.updateTask(1, { title: 'Updated Title' });

    expect(result.title).toBe('Updated Title');
    // Le corps de la requête est envoyé sous forme de texte JSON.
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/tasks/1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ title: 'Updated Title' }),
      })
    );
  });
});
