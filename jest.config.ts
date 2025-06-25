import type { JestConfigWithTsJest } from "ts-jest";
import { readFileSync } from "fs";
const tsconfig = JSON.parse(readFileSync("./tsconfig.app.json", "utf-8"));
const compilerOptions = tsconfig.compilerOptions;

import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.app.json", // aponta explicitamente para seu tsconfig
      isolatedModules: true,
    },
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
