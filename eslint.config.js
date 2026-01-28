import svelte from '@sveltejs/eslint-config';

/*
  ESLint configuration for a SvelteKit project.
  Uses the official Svelte ESLint config as a base and extends it with project-specific rules.
*/
export default [
  // Spread in the official Svelte ESLint config.
  // This includes recommended rules for .svelte files, TypeScript, and general best practices.
  ...svelte,

  // ---------------------------------------------------
  // Ignore generated and dependency files
  // ---------------------------------------------------
  {
    ignores: [
      '.svelte-kit/', // SvelteKit build folder
      'build/',       // Vite build folder
      'dist/',        // Distribution folder (optional)
      'node_modules/' // External dependencies
    ]
  },

  // ---------------------------------------------------
  // Global rule overrides for all JS/TS files
  // ---------------------------------------------------
  {
    rules: {
      // Warn when functions become too complex
      // Cyclomatic complexity > 10 triggers a warning
      complexity: ['warn', 10],
      // Warn on console statements, except these three allowed methods
      // - console.error: for actual errors
      // - console.warn: for warnings
      // - console.info: for informational messages
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],

      // Error on debugger statements
      'no-debugger': 'error',

      // Enforce consistent quotes (single or double depending on @stylistic/quotes config)
      '@stylistic/quotes': 'warn',

      // Prefer const over let/var where possible
      'prefer-const': 'error',

      // Disallow unused variables in TypeScript files
      '@typescript-eslint/no-unused-vars': 'error',

      // Warn when comments contain TODO or FIXME
      // Helps catch unfinished code or reminders before shipping
      'no-warning-comments': [
        'warn',
        { terms: ['todo', 'fixme'] }
      ]
    }
  },

  // ---------------------------------------------------
  // Svelte-specific rules for .svelte files only
  // ---------------------------------------------------
  {
    files: ['**/*.svelte'],
    rules: {
      // Disable requiring `key` on each block
      'svelte/require-each-key': 'off',

      // Warn when using `goto()` without resolve() in hooks or load functions
      // Ensures proper SvelteKit navigation handling
      'svelte/no-navigation-without-resolve': 'warn',
    }
  }
];
