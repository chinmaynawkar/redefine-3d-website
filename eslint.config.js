import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  // Ignore configuration
  { 
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '*.config.js',
      'eslint.config.js'
    ] 
  },
  
  // Base JavaScript/React configuration
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    
    // Plugins to enhance linting
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    
    // Recommended settings with some relaxed rules
    rules: {
      // Basic JavaScript best practices
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',
      
      // React-specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',
      
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility warnings
      'react/jsx-no-target-blank': 'warn'
    },
    
    settings: {
      react: { version: 'detect' }
    }
  }
]
