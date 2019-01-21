module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "collectCoverageFrom": [
      "**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/lib/**",
      "!**/vendor/**"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 0,
        "functions": 0,
        "lines": 0,
        "statements": -1000
      }
    }
  };