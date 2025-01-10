/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest",{useESM: true,}],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["/nodemodules/", "/dist"],
  moduleNameMapper: {'(.+)\\.js': '$1'},
};