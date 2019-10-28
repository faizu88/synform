module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  globals: {
    'ts-jest': {
      diagnostics: {
        //ignoreCodes: [151001]
      }
    }
  }
};
