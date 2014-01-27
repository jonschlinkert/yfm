var yfm = require('../index');
var file = require('fs-utils');


var content = yfm.read('./test/fixtures/complex.md');
file.writeJSONSync('test/expected/complex.json', content);