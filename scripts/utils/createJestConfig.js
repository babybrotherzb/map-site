"use strict";

const fs = require("fs");
const chalk = require("react-dev-utils/chalk");
const paths = require("../../config/paths");
const modules = require("../../config/modules");

module.exports = (resolve, rootDir, isEjecting) => {
  //使用这个而不是“路径”。testsSetup '以避免放置
  //在弹出后，绝对文件名进入配置。
  const setupTestsMatches = paths.testsSetup.match(/src[/\\]setupTests\.(.+)/);
  const setupTestsFileExtension =
    (setupTestsMatches && setupTestsMatches[1]) || "js";
  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? `<rootDir>/src/setupTests.${setupTestsFileExtension}`
    : undefined;

  const config = {
    roots: ["<rootDir>/src"],

    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],

    setupFiles: [
      isEjecting
        ? "react-app-polyfill/jsdom"
        : require.resolve("react-app-polyfill/jsdom")
    ],

    setupFilesAfterEnv: setupTestsFile ? [setupTestsFile] : [],
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    testEnvironment: "jest-environment-jsdom-fourteen",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": isEjecting
        ? "<rootDir>/node_modules/babel-jest"
        : resolve("config/jest/babelTransform.js"),
      "^.+\\.css$": resolve("config/jest/cssTransform.js"),
      "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": resolve(
        "config/jest/fileTransform.js"
      )
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    modulePaths: modules.additionalModulePaths || [],
    moduleNameMapper: {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
      ...(modules.jestAliases || {})
    },
    moduleFileExtensions: [...paths.moduleFileExtensions, "node"].filter(
      ext => !ext.includes("mjs")
    ),
    watchPlugins: [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  const overrides = Object.assign({}, require(paths.appPackageJson).jest);
  const supportedKeys = [
    "collectCoverageFrom",
    "coverageReporters",
    "coverageThreshold",
    "coveragePathIgnorePatterns",
    "extraGlobals",
    "globalSetup",
    "globalTeardown",
    "moduleNameMapper",
    "resetMocks",
    "resetModules",
    "snapshotSerializers",
    "transform",
    "transformIgnorePatterns",
    "watchPathIgnorePatterns"
  ];
  if (overrides) {
    supportedKeys.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(overrides, key)) {
        if (Array.isArray(config[key]) || typeof config[key] !== "object") {
          // 对于数组或基本类型，直接重写配置键
          config[key] = overrides[key];
        } else {
          // 对于对象类型，可以优雅地扩展
          config[key] = Object.assign({}, config[key], overrides[key]);
        }

        delete overrides[key];
      }
    });
    const unsupportedKeys = Object.keys(overrides);
    if (unsupportedKeys.length) {
      const isOverridingSetupFile =
        unsupportedKeys.indexOf("setupFilesAfterEnv") > -1;

      if (isOverridingSetupFile) {
        console.error(
          chalk.red(
            "We detected " +
              chalk.bold("setupFilesAfterEnv") +
              " in your package.json.\n\n" +
              "Remove it from Jest configuration, and put the initialization code in " +
              chalk.bold("src/setupTests.js") +
              ".\nThis file will be loaded automatically.\n"
          )
        );
      } else {
        console.error(
          chalk.red(
            "\nOut of the box, Create React App only supports overriding " +
              "these Jest options:\n\n" +
              supportedKeys
                .map(key => chalk.bold("  \u2022 " + key))
                .join("\n") +
              ".\n\n" +
              "These options in your package.json Jest configuration " +
              "are not currently supported by Create React App:\n\n" +
              unsupportedKeys
                .map(key => chalk.bold("  \u2022 " + key))
                .join("\n") +
              "\n\nIf you wish to override other Jest options, you need to " +
              "eject from the default setup. You can do so by running " +
              chalk.bold("npm run eject") +
              " but remember that this is a one-way operation. " +
              "You may also file an issue with Create React App to discuss " +
              "supporting more options out of the box.\n"
          )
        );
      }

      process.exit(1);
    }
  }
  return config;
};