import svelte from '@sveltejs/eslint-config';

export default [
  ...svelte,

  // Ignore generated files
  {
    ignores: ['.svelte-kit/', 'build/', 'dist/', 'node_modules/']
  },

  // Global rule overrides
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      '@stylistic/quotes': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },

  // Svelte-specific rules
  {
    files: ['**/*.svelte'],
    rules: {
      'svelte/require-each-key': 'off',
      'svelte/no-navigation-without-resolve': 'warn',
    }
  }
];