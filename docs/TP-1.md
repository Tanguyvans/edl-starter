# 🎓 TP 1 : Tests Unitaires Backend & Frontend

**Objectif :** Apprendre les tests unitaires avec Python (pytest), puis voir que les mêmes principes s'appliquent en TypeScript (Vitest)

---

## Phase 1 : Installation & Configuration

### Étape 1.1 : Forker le Dépôt

1. Allez sur `https://github.com/umons-ig/edl-starter`
2. Cliquez sur **"Fork"**

   ![Fork Button](img/fork.png)

3. Clonez votre fork :

   ```bash
   git clone https://github.com/VOTRE_NOM/edl-starter
   cd edl-starter
   ```

### Étape 1.2 : Installer les Dépendances Python (2 Options)

**Option A : Avec UV (Recommandé - Plus Rapide) ⚡**

UV est un gestionnaire de paquets Python moderne et ultra-rapide.

**Installation UV :**

*macOS/Linux :*

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

*Windows :*

```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Installer les dépendances :**

```bash
cd backend
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv sync
```

---

**Option B : Avec pip (Classique) 🐍**

Si vous préférez pip ou avez déjà Python installé :

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

---

**Dans le reste de l'atelier :**

- Si vous utilisez **UV** : `uv run pytest`
- Si vous utilisez **pip** : `pytest`

---

## Phase 2 : Explorer l'Application

### Étape 2.1 : Lancer le Serveur

```bash
uv run uvicorn src.app:app --reload
```

### Étape 2.2 : Tester dans le Navigateur

Visitez :

- **API :** <http://localhost:8000>
- **Documentation interactive :** <http://localhost:8000/docs>
- **Santé :** <http://localhost:8000/health>

### Étape 2.3 : Tester avec Swagger UI

1. Allez sur <http://localhost:8000/docs>
2. Cliquez sur **POST /tasks**
3. Cliquez sur **"Try it out"**
4. Entrez :

   ```json
   {
     "title": "Ma première tâche",
     "description": "Apprendre FastAPI"
   }
   ```

5. Cliquez sur **"Execute"**
6. Vous devriez voir un code `201 Created`

### Étape 2.4 : Explorer le Code

Ouvrez `backend/src/app.py` dans votre éditeur :

- **Lignes 27-36 :** Énumérations (TaskStatus, TaskPriority)
- **Lignes 39-68 :** Modèles Pydantic
- **Lignes 76-77 :** Stockage en mémoire (dictionnaire simple)
- **Lignes 180-205 :** Endpoint pour créer une tâche
- **Lignes 144-160 :** Endpoint pour lister les tâches

**Important :** Ce backend utilise un **stockage en mémoire** (un simple dictionnaire Python) pour les TP 1 & 2. Vous utiliserez PostgreSQL dans le TP 3.

---

## Phase 3 : Comprendre les Tests

### Étape 3.1 : Explorer les Fichiers de Test

Ouvrez ces fichiers :

- `backend/tests/conftest.py` → Fixtures de test
- `backend/tests/test_api.py` → Tests

### Étape 3.2 : Qu'est-ce qu'une Fixture ?

Dans `conftest.py`, regardez :

```python
@pytest.fixture(autouse=True)
def clean_tasks():
    """Nettoie les tâches avant et après chaque test"""
    clear_tasks()
    yield
    clear_tasks()

@pytest.fixture
def client():
    """Fournit un client HTTP de test"""
    with TestClient(app) as test_client:
        yield test_client
```

**Pourquoi c'est utile ?**

- `clean_tasks` : Nettoie automatiquement le stockage en mémoire avant chaque test
- `client` : Vous n'avez pas à créer un client dans chaque test
- pytest les injecte automatiquement quand vous écrivez `def test_xxx(client):`

### Étape 3.3 : Lancer les Tests Existants

```bash
uv run pytest -v
```

Vous devriez voir :

```text
tests/test_api.py::test_root_endpoint PASSED
tests/test_api.py::test_health_check PASSED
tests/test_api.py::test_create_task PASSED
tests/test_api.py::test_list_tasks PASSED
tests/test_api.py::test_get_task_by_id PASSED
... (19 tests au total)

========== 19 passed in 0.45s ==========
```

### Étape 3.4 : Comprendre un Test

Regardez `test_create_task` dans `test_api.py` :

```python
def test_create_task(client):
    # ARRANGE : Préparer les données
    new_task = {
        "title": "Acheter des courses",
        "description": "Lait, œufs, pain"
    }

    # ACT : Faire la requête
    response = client.post("/tasks", json=new_task)

    # ASSERT : Vérifier
    assert response.status_code == 201
    assert response.json()["title"] == "Acheter des courses"
```

**Pattern Arrange-Act-Assert :**

1. **Arrange** → Préparer
2. **Act** → Agir
3. **Assert** → Vérifier

---

## Phase 4 : Implémenter les Fonctions Backend

### ✍️ Exercice 1 : Implémenter `delete_task()`

**🎯 Objectif :** Compléter la fonction `delete_task()` dans `backend/src/app.py`

Ouvrez `backend/src/app.py` et trouvez la fonction `delete_task()` (ligne ~240).

**Les tests existent déjà !** Regardez dans `test_api.py` :

- `test_delete_task` : Supprime une tâche et vérifie qu'elle a disparu
- `test_delete_nonexistent_task` : Vérifie le 404

**Votre mission :**

Implémentez les 3 étapes décrites dans le TODO :

```python
@app.delete("/tasks/{task_id}", status_code=204)
async def delete_task(task_id: int):
    # TODO: Votre code ici
    # 1. Vérifier que la tâche existe
    # 2. La supprimer de tasks_db
    # 3. Retourner None
```

**Vérifier votre code :**

```bash
cd backend
uv run pytest tests/test_api.py::test_delete_task -v
```

✅ Si le test passe → **Bravo !**

❌ Si le test échoue → Lisez l'erreur et corrigez

---

### ✍️ Exercice 2 : Implémenter `update_task()`

**🎯 Objectif :** Compléter la fonction `update_task()` dans `backend/src/app.py`

Trouvez la fonction `update_task()` (ligne ~207).

**Les tests existent déjà !** Regardez :

- `test_update_task` : Change le titre d'une tâche
- `test_update_task_status` : Change le statut
- `test_update_nonexistent_task` : Vérifie le 404

**Votre mission :**

Implémentez les 7 étapes décrites dans le TODO.

**Indices :**

1. C'est similaire à `create_task` mais avec une tâche existante
2. Utilisez `updates.model_dump(exclude_unset=True)` pour obtenir les champs fournis
3. Utilisez `update_data.get("field", existing_task.field)` pour garder les anciennes valeurs si non mises à jour

**Vérifier votre code :**

```bash
uv run pytest tests/test_api.py::test_update_task -v
```

---

### ✍️ Exercice 3 : Écrire un Test de Suppression Inexistante

**🎯 Objectif :** Tester qu'on ne peut pas supprimer une tâche qui n'existe pas

Ouvrez `backend/tests/test_api.py` et trouvez la section DELETE TASK TESTS.

Ajoutez ce test après `test_delete_task` :

```python
def test_delete_nonexistent_task_returns_404(client):
    """Deleting a task that doesn't exist should return 404."""
    # TODO: Votre code ici
    # 1. Essayer de supprimer une tâche avec un ID qui n'existe pas (ex: 9999)
    # 2. Vérifier que ça retourne 404
    # 3. Vérifier le message d'erreur contient "not found"
```

**Vérifier :**

```bash
uv run pytest tests/test_api.py::test_delete_nonexistent_task_returns_404 -v
```

---

### ✍️ Exercice 4 : Écrire un Test de Validation

**🎯 Objectif :** Tester qu'on ne peut pas mettre à jour une tâche avec une priorité invalide

Ouvrez `backend/tests/test_api.py` et trouvez la fonction `test_update_task_with_invalid_priority`.

```python
def test_update_task_with_invalid_priority(client):
    """Updating a task with an invalid priority should fail."""
    # TODO: Votre code ici
    # 1. Créer une tâche valide
    # 2. Essayer de la mettre à jour avec priority="urgent" (invalide)
    # 3. Vérifier que ça retourne 422 (Erreur de Validation)
```

**Rappel :** Les priorités valides sont `"low"`, `"medium"`, `"high"` (voir `TaskPriority` dans `app.py`)

**Vérifier :**

```bash
uv run pytest tests/test_api.py::test_update_task_with_invalid_priority -v
```

---

### ✍️ Exercice 5 : Écrire un Test de Filtrage

**🎯 Objectif :** Tester le filtrage avec plusieurs critères

Ajoutez ce test dans la section FILTER TASKS TESTS :

```python
def test_filter_by_multiple_criteria(client):
    """Filtering by status AND priority should work."""
    # TODO: Votre code ici
    # 1. Créer 3 tâches avec différents status et priority
    # 2. Filtrer avec GET /tasks?status=todo&priority=high
    # 3. Vérifier qu'on reçoit seulement les bonnes tâches
```

**Vérifier :**

```bash
uv run pytest tests/test_api.py::test_filter_by_multiple_criteria -v
```

---

### Étape 4.6 : Lancer TOUS les Tests

Une fois que vous avez terminé les 5 exercices, lancez tous les tests :

```bash
uv run pytest -v
```

**Résultat attendu :**

```text
tests/test_api.py::test_root_endpoint PASSED
tests/test_api.py::test_health_check PASSED
tests/test_api.py::test_create_simple_task PASSED
...
tests/test_api.py::test_delete_task PASSED
tests/test_api.py::test_update_task PASSED
tests/test_api.py::test_delete_nonexistent_task_returns_404 PASSED
tests/test_api.py::test_update_task_with_empty_title PASSED
tests/test_api.py::test_filter_by_multiple_criteria PASSED
...
========== 22+ passed in 0.5s ==========
```

🎉 **Tous les tests passent ?** Vous avez réussi !

---

## Phase 5 : Couverture de Code

### Étape 5.1 : Lancer les Tests avec Couverture

```bash
uv run pytest --cov
```

Résultat :

```text
---------- coverage: platform darwin, python 3.12.7 -----------
Name                Stmts   Miss  Cover
---------------------------------------
src/app.py            156      6    96%
---------------------------------------
TOTAL                 156      6    96%
```

![Backend Coverage Report](img/backend-coverage.png)

### Étape 5.2 : Générer un Rapport HTML

```bash
uv run pytest --cov --cov-report=html
```

Ouvrir le rapport :

```bash
open htmlcov/index.html  # macOS
start htmlcov/index.html  # Windows
```

---

## Phase 6 : Tests Frontend

Le frontend est écrit en **TypeScript**, mais vous n'avez pas besoin de connaître ce langage : les tests ressemblent beaucoup à ceux que vous venez d'écrire en Python.

### Étape 6.1 : Ce qu'on va tester

```
frontend/src/
├── utils/
│   ├── tasks.ts          # Petites fonctions de calcul ← ON TESTE ÇA
│   └── tasks.test.ts     # Leurs tests (exemples + exercice)
├── api/
│   ├── api.ts            # Appels au backend
│   └── api.test.ts       # Tests déjà écrits (pour aller plus loin)
└── App.tsx               # Page principale
```

Ouvrez `frontend/src/utils/tasks.ts`. Il contient deux fonctions :

| Fonction | Ce qu'elle fait | Exemple |
|----------|-----------------|---------|
| `countByStatus(tasks)` | Compte les tâches de chaque statut | 2 `todo` + 1 `done` → `{ todo: 2, in_progress: 0, done: 1 }` |
| `completionRate(tasks)` | Pourcentage de tâches terminées | 1 `done` sur 4 → `25` |

Ce sont des fonctions **pures** : elles reçoivent une liste et renvoient un résultat, sans appeler le backend. Elles servent à afficher le compteur en haut de l'application (« 2 à faire · 0 en cours · 1 terminées »).

### Étape 6.2 : Installer et lancer les tests

```bash
cd frontend
npm install
npm test
```

`npm test` reste ouvert et relance les tests à chaque sauvegarde (quittez avec `q`). Au départ, vous devez voir :

```text
 ✓ src/api/api.test.ts (5)
 ❯ src/utils/tasks.test.ts (5)
   ✓ countByStatus (2)
   ❯ completionRate (3)
     × calcule le pourcentage de tâches terminées
     × renvoie 100 quand toutes les tâches sont terminées
     × renvoie 0 pour une liste vide
...
 FAIL  src/utils/tasks.test.ts > completionRate > calcule le pourcentage de tâches terminées
Error: Test à écrire (TP 1 - Exercice 6)
...
      Tests  3 failed | 7 passed (10)
```

Les 3 tests rouges sont ceux que vous allez écrire.

### Étape 6.3 : Lire un test exemple

Ouvrez `frontend/src/utils/tasks.test.ts` :

```typescript
it('compte les tâches de chaque statut', () => {
  // ARRANGE : préparer une liste de tâches
  const tasks = [
    { status: 'todo' as const },
    { status: 'todo' as const },
    { status: 'done' as const },
  ];

  // ACT : appeler la fonction à tester
  const counts = countByStatus(tasks);

  // ASSERT : vérifier le résultat
  expect(counts).toEqual({ todo: 2, in_progress: 0, done: 1 });
});
```

C'est le même pattern **Arrange-Act-Assert** qu'en Python. Seule la syntaxe change :

| Python (pytest) | TypeScript (Vitest) |
|-----------------|---------------------|
| `def test_xxx(client):` | `it('xxx', () => { ... });` |
| `x = 3` | `const x = 3;` |
| `assert resultat == 50` | `expect(resultat).toBe(50);` |
| `assert resultat == {"todo": 2}` | `expect(resultat).toEqual({ todo: 2 });` |

- `toBe` compare une valeur simple (nombre, texte, booléen).
- `toEqual` compare le contenu d'un objet ou d'un tableau.
- `'todo' as const` indique à TypeScript que c'est exactement le statut `'todo'` (et pas n'importe quel texte). Recopiez-le tel quel.

---

### ✍️ Exercice 6 : Tester `completionRate()` (15 min)

**🎯 Objectif :** Écrire les 3 tests de `completionRate()` dans `frontend/src/utils/tasks.test.ts`.

Chaque test contient déjà ses étapes en commentaire et une ligne `throw new Error(...)` qui le fait échouer. Pour chaque test :

1. Supprimez la ligne `throw new Error(...)`
2. Écrivez ARRANGE / ACT / ASSERT en suivant les commentaires

| Test | Données (ARRANGE) | Résultat attendu (ASSERT) |
|------|-------------------|---------------------------|
| calcule le pourcentage de tâches terminées | 4 tâches dont 2 `'done'` | `50` |
| renvoie 100 quand toutes les tâches sont terminées | 2 tâches `'done'` | `100` |
| renvoie 0 pour une liste vide | `[]` | `0` |

**Indice :** `completionRate` renvoie un nombre → utilisez `toBe`.

**Vérifier :** dans le terminal où tourne `npm test`, les 3 tests doivent passer au vert :

```text
 ✓ src/api/api.test.ts (5)
 ✓ src/utils/tasks.test.ts (5)

 Test Files  2 passed (2)
      Tests  10 passed (10)
```

💡 Le 3e test vérifie un **cas limite** : sans le `if (tasks.length === 0)` dans `tasks.ts`, la fonction diviserait par zéro. Essayez de supprimer ce `if` : votre test doit échouer. Remettez-le ensuite.

---

### Étape 6.4 : Couverture Frontend

```bash
npm run test:coverage
```

`tasks.ts` doit être couvert à 100 %.

### Étape 6.5 : Pour aller plus loin — tester les appels au backend (lecture)

`api.ts` appelle le backend avec `fetch()`. Pour le tester sans lancer de serveur, `api.test.ts` remplace `fetch()` par une **fausse fonction** (un *mock*) qui renvoie une réponse choisie à l'avance :

```typescript
const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve([{ id: 1, title: 'Test Task', status: 'todo' }]),
});
vi.stubGlobal('fetch', mockFetch);   // fetch() est maintenant notre fausse fonction

const tasks = await api.getTasks();  // api.ts appelle le faux fetch()

expect(tasks).toHaveLength(1);
```

On peut aussi vérifier **comment** le faux `fetch()` a été appelé (URL, méthode HTTP…). Les 5 tests du fichier sont déjà écrits et commentés : lisez-les, il n'y a rien à compléter.

### Étape 6.6 : Lancer l'Application Complète

**Terminal 1 - Backend :**

```bash
cd backend
uv run uvicorn src.app:app --reload
```

**Terminal 2 - Frontend :**

```bash
cd frontend
npm install  # Si pas déjà fait
npm run dev
```

**Ouvrir dans le navigateur :** <http://localhost:3000>

Vous devriez voir l'application TaskFlow fonctionner :

![TaskFlow Application](img/working-app.png)

---

## 🎁 Exercices Bonus : Java avec JUnit

**Objectif :** Voir que les principes de TDD s'appliquent à tous les langages !

Les exercices Java sont dans le dossier [`java-exercises/`](../java-exercises/).

---

### Prérequis : Installer Java

```bash
# Vérifier si déjà installé
java -version    # Devrait afficher Java 17+
```

**Si pas installé :**

- **macOS :** `brew install openjdk@17`
- **Linux :** `sudo apt install openjdk-17-jdk`
- **Windows :** Installer depuis [adoptium.net](https://adoptium.net/)

**Commandes de base :**

Chaque exercice utilise un Makefile pour simplifier la compilation et l'exécution :

```bash
make test     # Compiler + Exécuter les tests + Nettoyer
make compile  # Compiler uniquement
make clean    # Supprimer les fichiers .class
```

---

### ✍️ Exercice 1 : Calculs Géométriques (Composition de Fonctions)

**🎯 Objectif :** Implémenter des opérations mathématiques en composant des fonctions simples

Ouvrez le dossier `edl-starter/java-exercises/calculs-geo/`

**Fichiers du projet :**

- `Addition.java` : Classe d'exemple déjà implémentée
- `Produit.java` : À compléter (multiplication)
- `Surface.java` : À compléter (surface rectangle)
- `Perimetre.java` : À compléter (périmètre)
- Tests : `AdditionTest.java`, `ProduitTest.java`, `SurfaceTest.java`, `PerimetreTest.java`

**Votre mission - Partie 1 : Implémenter `Produit.mult()`**

Ouvrez `Produit.java` et complétez la méthode :

```java
public class Produit {
    public static int mult(int a, int b) {
        // TODO: Retourner le produit de a et b
        return 0;
    }
}
```

**Test correspondant** (`ProduitTest.java`) :

```java
@Test
public void testMult() {
    assertEquals(6, Produit.mult(2, 3));
    assertEquals(0, Produit.mult(0, 5));
    assertEquals(-6, Produit.mult(-2, 3));
}
```

**Indice :** Utilisez l'opérateur `*` pour multiplier deux nombres.

**Vérifier votre code :**

```bash
cd edl-starter/java-exercises/calculs-geo
make test
```

**Résultat attendu après implémentation :**

```
JUnit version 4.13.2
..E.E
Time: 0.006
There were 2 failures:
...
Tests run: 4,  Failures: 2
```

Le test `ProduitTest` devrait maintenant passer !

---

**Votre mission - Partie 2 : Implémenter `Surface.surf()`**

Ouvrez `Surface.java` et complétez la méthode :

```java
public class Surface {
    public static int surf(int a, int b) {
        // TODO: Utiliser Produit.mult() pour calculer la surface d'un rectangle
        return 0;
    }
}
```

**Test correspondant** (`SurfaceTest.java`) :

```java
@Test
public void testSurf() {
    assertEquals(6, Surface.surf(2, 3));
    assertEquals(0, Surface.surf(0, 5));
    assertEquals(12, Surface.surf(3, 4));
}
```

**Indice :** La surface d'un rectangle = longueur × largeur. Réutilisez la fonction `Produit.mult()` que vous venez d'écrire.

**Exemple de solution :**

```java
return Produit.mult(a, b);
```

**Vérifier :**

```bash
make test
```

Maintenant 2 tests sur 4 devraient passer.

---

**Votre mission - Partie 3 : Implémenter `Perimetre.perim()`**

Ouvrez `Perimetre.java` et complétez la méthode :

```java
public class Perimetre {
    public static int perim(int a, int b, int c) {
        // TODO: Calculer (a+b)*c en utilisant Addition.add() et Produit.mult()
        return 0;
    }
}
```

**Test correspondant** (`PerimetreTest.java`) :

```java
@Test
public void testPerim() {
    assertEquals(10, Perimetre.perim(2, 3, 2));  // (2+3)*2 = 10
    assertEquals(0, Perimetre.perim(0, 0, 5));
    assertEquals(14, Perimetre.perim(3, 4, 2));  // (3+4)*2 = 14
}
```

**Indice :**

1. Commencez par additionner `a` et `b` avec `Addition.add(a, b)`
2. Multipliez le résultat par `c` avec `Produit.mult()`

**Exemple de solution :**

```java
int somme = Addition.add(a, b);
return Produit.mult(somme, c);
```

**Vérifier :**

```bash
make test
```

**Résultat final attendu :**

```
JUnit version 4.13.2
....
Time: 0.006

OK (4 tests)
```

Tous les tests passent ? Bravo ! Passez à l'exercice suivant.

---

### ✍️ Exercice 2 : Money - Addition avec Validation de Devises

**🎯 Objectif :** Implémenter une méthode d'addition qui valide que deux montants ont la même devise

Ouvrez le dossier `edl-starter/java-exercises/money/`

**Fichiers du projet :**

- `Money.java` : Classe avec méthode `add()` à implémenter
- `MoneyTest.java` : Tests JUnit (certains avec TODOs à compléter)

**Votre mission :**

Ouvrez `Money.java` et implémentez la méthode `add()` :

```java
public Money add(Money m) throws Exception {
    // TODO: Vérifier si this.currency().equals(m.currency())
    // TODO: Si oui, retourner new Money(this.amount() + m.amount(), this.currency())
    // TODO: Si non, throw new Exception("Not Same currency")
    return null;
}
```

**Règles métier :**

- On peut additionner deux montants de même devise : `12 EUR + 5 EUR = 17 EUR`
- On ne peut PAS additionner deux montants de devises différentes : `12 EUR + 5 USD` → Exception

**Tests correspondants** (`MoneyTest.java`) :

```java
@Test
public void testSimpleAdd() throws Exception {
    Money m12EUR = new Money(12, "EUR");
    Money m14EUR = new Money(14, "EUR");
    Money expected = new Money(26, "EUR");
    assertEquals(expected, m12EUR.add(m14EUR));
}

@Test(expected = Exception.class)
public void testAddDifferentCurrency() throws Exception {
    Money m12EUR = new Money(12, "EUR");
    Money m5USD = new Money(5, "USD");
    m12EUR.add(m5USD);  // Doit lever une exception
}
```

**Indices :**

1. Utilisez `this.currency()` pour obtenir la devise de l'objet courant
2. Utilisez `m.currency()` pour obtenir la devise du paramètre
3. Comparez avec `.equals()` (pas `==`)
4. Si les devises sont identiques, créez un nouveau `Money` avec la somme des montants
5. Si les devises sont différentes, lancez une exception avec `throw new Exception("Not Same currency")`

**Exemple de solution :**

```java
public Money add(Money m) throws Exception {
    if (this.currency().equals(m.currency())) {
        return new Money(this.amount() + m.amount(), this.currency());
    }
    throw new Exception("Not Same currency");
}
```

**Vérifier votre code :**

```bash
cd edl-starter/java-exercises/money
make test
```

**Résultat attendu :**

```
JUnit version 4.13.2
....
Time: 0.007

OK (4 tests)
```

Tous les tests passent ? Félicitations !

---

### 📚 Comprendre JUnit 4 - Les Bases

**Structure d'un test JUnit :**

```java
import org.junit.Test;
import static org.junit.Assert.*;

public class ExampleTest {

    @Test
    public void testMethodName() {
        // Arrange : Préparer les données
        int a = 2;
        int b = 3;

        // Act : Exécuter la méthode à tester
        int result = MyClass.add(a, b);

        // Assert : Vérifier le résultat
        assertEquals(5, result);
    }
}
```

**Annotations JUnit :**

- `@Test` : Indique qu'une méthode est un test
- `@Test(expected = Exception.class)` : Le test passe si l'exception est levée

**Méthodes d'assertion principales :**

```java
assertEquals(expected, actual);     // Vérifie que deux valeurs sont égales
assertTrue(condition);              // Vérifie qu'une condition est vraie
assertFalse(condition);             // Vérifie qu'une condition est fausse
assertNull(object);                 // Vérifie qu'un objet est null
assertNotNull(object);              // Vérifie qu'un objet n'est pas null
```

**Exemple de test d'exception :**

```java
@Test(expected = Exception.class)
public void testInvalidOperation() throws Exception {
    Money m1 = new Money(12, "EUR");
    Money m2 = new Money(5, "USD");
    m1.add(m2);  // Cette ligne doit lever une Exception
}
```
