const asyncLockPlugin = require('../../src/index')

module.exports = {
  presets: [
    // ['@babel/preset-env', { debug: true }],

    '@babel/preset-react'
  ],
  plugins: [
    [asyncLockPlugin]
  ]
}
