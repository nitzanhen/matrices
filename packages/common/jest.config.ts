export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  roots: [
    'test'
  ],
  collectCoverageFrom: [
    'src/**/*'
  ]
};