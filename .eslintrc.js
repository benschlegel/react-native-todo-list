module.exports = {
  "extends": "react-native-wcandillon",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "prefer-destructuring": [
      "error",
      {
        "object": true,
        "array": false
      }
    ],
    "no-bitwise": "off",
    "no-multiple-empty-lines": 1,
    "no-var": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": "error",
    "reanimated/js-function-in-worklet": 0,
    // 'prettier/prettier': 0,
  }
}
