const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
    '!<rootDir>/src/**/*.stories.tsx',
    '!<rootDir>/src/**/*.css.ts', // Exclude .css.ts files from coverage
  ],
  moduleNameMapper: {
    // Handle CSS Modules first
    '^.+.module.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle Vanilla Extract files (.css, .scss, .css.ts)
    // Match .css or .scss NOT preceded by .module
    '^.+.(css|scss)$(?<!.module.(css|scss))$':
      '<rootDir>/__mocks__/vanillaExtractMock.js',
    // Match .css.ts
    '^.+.css.ts$': '<rootDir>/__mocks__/vanillaExtractMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases conditionally
    ...(compilerOptions.paths
      ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
      : {}),
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  // The transformIgnorePatterns section remains commented out for now
  // transformIgnorePatterns: [ ... ],
  // coveragePathIgnorePatterns is also potentially redundant if coverage collection excludes .css.ts correctly
  // coveragePathIgnorePatterns: [
  //   '/node_modules/',
  //   '.css.ts',
  // ],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
