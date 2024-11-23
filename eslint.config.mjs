import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import preferArrow from 'eslint-plugin-prefer-arrow';
import noNull from 'eslint-plugin-no-null';
import { fixupPluginRules } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['projects/**/*.\\{js,css,json}'],
  },
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:prettier/recommended',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
    })),
  {
    files: ['**/*.ts'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
      'prefer-arrow': preferArrow,
      'no-null': noNull,
    },

    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: false,
        },
      },

      'import/external-module-folders': ['../node_modules', 'node_modules'],
    },

    rules: {
      '@angular-eslint/no-input-rename': ['off'],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: 'ngt',
          style: 'kebab-case',
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ngt',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/no-empty-lifecycle-method': ['warn'],
      'newline-before-return': ['off'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': ['off'],
      'no-shadow': ['off'],
      'no-underscore-dangle': ['off'],

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],

      'class-methods-use-this': ['off'],
      'no-prototype-builtins': ['warn'],
      'no-case-declarations': ['warn'],
      'no-useless-escape': ['warn'],
      'no-constant-condition': ['warn'],
      'no-useless-catch': ['warn'],
      'no-global-assign': ['warn'],
      'no-async-promise-executor': ['warn'],
      '@typescript-eslint/no-shadow': ['off'],
      '@typescript-eslint/quotes': ['off'],

      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowedNames: [
            'ngOnChanges',
            'ngOnInit',
            'ngAfterViewInit',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewChecked',
            'ngDoCheck',
            'ngOnDestroy',
          ],

          allowExpressions: true,
        },
      ],

      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-inferrable-types': ['off'],
      '@typescript-eslint/prefer-readonly': ['warn'],

      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'angle-bracket',
        },
      ],

      '@typescript-eslint/typedef': ['off'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
      ],

      '@typescript-eslint/member-ordering': ['warn'],
      '@typescript-eslint/ban-ts-comment': ['warn'],
      '@typescript-eslint/no-empty-function': ['warn'],
      '@typescript-eslint/prefer-as-const': ['warn'],
      '@typescript-eslint/no-this-alias': ['warn'],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],

          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'src/**/*',
              position: 'after',
              group: 'internal',
            },
          ],

          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },

          'newlines-between': 'always',
          distinctGroup: true,
        },
      ],

      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-useless-path-segments': 'warn',
    },
  },
  ...compat.extends('plugin:@angular-eslint/template/recommended').map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  {
    files: ['**/*.html'],
    rules: {},
  },
  ...compat.extends('plugin:prettier/recommended').map((config) => ({
    ...config,
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],
  })),
  {
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],

    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],

    rules: {
      '@typescript-eslint/dot-notation': 'off',
    },
  },
];
