const asyncLockPlugin = require('../../src/index')

module.exports = {
  presets: [
    // ['@babel/preset-env', { debug: true }],

    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-transform-async-to-generator', asyncLockPlugin]
}
