import type { JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.app.json";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Aliases do tsconfig para funcionar nos testes
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/src/",
    }),
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
