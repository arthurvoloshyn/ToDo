module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  setupTestFrameworkScriptFile: '<rootDir>/testSetup',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/stylesMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
