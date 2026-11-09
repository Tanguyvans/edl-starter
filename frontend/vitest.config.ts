import { defineConfig } from 'vitest/config';

// Les tests du TP ne touchent que du code TypeScript (fonctions et appels API),
// pas de composants React : un environnement Node suffit.
export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      // skipFull: false affiche aussi les fichiers couverts à 100 %
      reporter: [['text', { skipFull: false }], 'html'],
    },
  },
});
