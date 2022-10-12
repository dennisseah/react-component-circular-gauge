module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
    + "|react-navigation-tabs"
    + "|react-native-splash-screen"
    + "|react-native-screens"
    + "|react-native-reanimated"
    + "|d3"
    + "|d3-array"
    + ")/)",
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.ts"
  ]
}