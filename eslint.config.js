import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';

// Flat-config migration of the former `eslintConfig` block (which only
// extended `plugin:storybook/recommended`). The TypeScript parser is added so
// .ts/.tsx files parse at all — without it ESLint's default parser rejects
// `import`/`export` and every file errored. Rule scope is intentionally kept
// to storybook's recommended set (as before); the full typescript-eslint
// ruleset is not enabled to avoid introducing new, unreviewed failures.
export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'storybook-static/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}', '.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  ...storybook.configs['flat/recommended'],
);
