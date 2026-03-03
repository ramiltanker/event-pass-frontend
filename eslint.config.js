import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  // что не нужно линтить
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // базовые рекомендации
  js.configs.recommended,

  // TypeScript (flat config, recommended)
  ...tseslint.configs.recommended,

  // React hooks + react-refresh (Vite)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // чуть практичнее для фронта
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // ВАЖНО: последним — чтобы отключить правила, конфликтующие с Prettier
  eslintConfigPrettier,
];