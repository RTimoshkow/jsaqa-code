const config = {
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/coverage/**',
    ],
    coveragePathIgnorePatterns: ['jest.config.js'],
};

module.exports = config;