import type { JestConfigWithTsJest } from "ts-jest";
import { readFileSync } from "fs";
const tsconfig = JSON.parse(readFileSync("./tsconfig.app.json", "utf-8"));
const compilerOptions = tsconfig.compilerOptions;

import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/src/",
    }),
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
