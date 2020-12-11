const fs = require('fs')

const schema = require('./data/index.js')

function resolveRefs(obj, defs) {
  Object.keys(obj).forEach(function (prop, index, array) {
    var def = obj[prop]

    if (def.$ref) {
      var ref = def.$ref.replace(/^#\/definitions\//, '')
      obj[prop] = JSON.parse(JSON.stringify(defs[ref]))
    } else if (typeof def === 'object') {
      resolveRefs(def, defs)
    }
  })
}

resolveRefs(schema, schema.definitions)
resolveRefs(schema, schema.definitions)

fs.writeFileSync(
  '../jsonform/export.js',
  `window.SCHEMA = ${JSON.stringify(schema, null, 2)}`
)
