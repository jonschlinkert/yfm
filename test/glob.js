/**
 * YFM
 * https://github.com/assemble/YFM
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var glob = require('globule');
var file = require('fs-utils');

// Local libs
var yfm = require('../');


// From the project root, run "node test/glob". This will generate a
// JSON file for each fixture.
glob.find('./fixtures/assortment/**/*.{md,hbs}').map(function(filepath) {
  console.log("Has YFM?:", yfm.exists(filepath));

  var obj = yfm.read(filepath, {open: ['~~~', '---'], close: ['~~~', '---']});
  var name = file.basename(filepath);
  file.writeDataSync('./actual/json/' + name + '.json', obj);
});