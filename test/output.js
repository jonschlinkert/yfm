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

glob.find('./fixtures/**/*.{md,hbs}').map(function(filepath) {
  console.log("Has YFM?:", yfm.hasYFM(filepath));

  var obj = yfm.readYFMSync(filepath, {open: ['~~~', '---'], close: ['~~~', '---']});
  var name = file.basename(filepath);
  file.writeDataSync('./actual/json/' + name + '.json', obj);
});