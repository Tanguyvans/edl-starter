# Exercices Java - Version Starter

Exercices basés sur Workshop-1.pdf

## Exercice I : Calculs Géométriques (30 min)

**Dossier :** `calculs-geo/`

**À faire :**
1. Implémenter `Produit.mult()`
2. Implémenter `Surface.surf()` (utilise `Produit.mult()`)
3. Implémenter `Perimetre.perim()` (utilise `Addition.add()` et `Produit.mult()`)

**Lancer les tests :**
```bash
cd calculs-geo
make test
```

## Exercice II : Money (20 min)

**Dossier :** `money/`

**À faire :**
1. Implémenter `Money.add(Money m)` dans `Money.java` (le test `testAddSameCurrency()` est fourni)
2. Écrire les tests `testCurrency()` et `testAddDifferentCurrency()` dans `MoneyTest.java`

**Lancer les tests :**
```bash
cd money
make test
```

## Résultat Attendu

Au début, les tests échouent :
```
FAILURES!!!
Tests run: X,  Failures: Y
```

Après implémentation, tous les tests passent :
```
OK (X tests)
```
