module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    Logger: true,
    performance: true,
  },
  ignorePatterns: ['scripts', 'metro.config.js'],
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', '@react-native-community'],
  rules: {
    // eslint
    semi: 'off',
    curly: ['warn', 'multi-or-nest', 'consistent'],
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'no-async-promise-executor': 'warn',
    'require-await': 'warn',
    'no-return-await': 'warn',
    'no-await-in-loop': 'warn',
    'no-console': 'error',
    'comma-dangle': 'off', // prettier already detects this
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message:
          "Enums have various disadvantages, use TypeScript's union types instead.",
      },
    ],
    // prettier
    'prettier/prettier': ['warn'],
    // typescript
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    // react plugin
    'react/no-unescaped-entities': 'off',
    // react native plugin
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'off',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 'warn',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNullableObject: false,
        allowNumber: false,
        allowNullableBoolean: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',

    // react hooks
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks:
          '(useStyle|useDerivedValue|useAnimatedStyle|useAnimatedProps|useWorkletCallback|useFrameProcessor|useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],

    // forbit some react components
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          {
            element: 'Text',
            message: 'use <PandaText> from @components/text/PandaText instead',
          },
          {
            element: 'TextInput',
            message: 'use <PandaTextInput> from @components/text/PandaTextInput instead',
          },
          {
            element: 'StatusBar',
            message: 'use <PandaStatusBar> from @components/PandaStatusBar instead',
          },
          {
            element: 'TouchableOpacity',
            message: 'use <PressableOpacity> instead',
          },
          {
            element: 'TouchableHighlight',
            message: 'use <PressableOpacity> instead',
          },
          {
            element: 'TouchableNativeFeedback',
            message: 'use <PressableNativeFeedback> instead',
          },
          {
            element: 'TouchableWithoutFeedback',
            message: 'use <Pressable> instead',
          },
          {
            element: 'Modal',
            message: 'use a separate modal page (react-navigation) instead.',
          },
          {
            element: 'Button',
            message: 'use a custom themed <PressableOpacity> instead.',
          },
          {
            element: 'VirtualizedList',
            message: 'use <FlatList> or <FastList> instead.',
          },
          {
            element: 'Image',
            message: 'use <FastImage> instead.',
          },
        ],
      },
    ],
  },
}
