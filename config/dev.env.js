var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APPOINTMENTGURU_API_ROOT: '"http://localhost:8000"'
})
