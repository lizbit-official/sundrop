const nextJest = require('next/jest');
const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {},
  moduleNameMapper: {
    ...moduleNameMapper,
    ...createJestConfig.moduleNameMapper,
  },
};

async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!ahooks)/';
  return nextJestConfig;
}

module.exports = jestConfig;

// module.exports = createJestConfig({
//   ...customJestConfig,
//   transformIgnorePatterns: [
//     'node_modules/ahooks/',
//     '^.+\\.module\\.(css|sass|scss)$',
//   ],
// });
//module.exports = configureNextJestPreview(createJestConfig(customJestConfig));
