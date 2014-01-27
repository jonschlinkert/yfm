/**
 * YAML Front-Matter
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var YAML = require('js-yaml');
var delim = require('delims');
var file = require('fs-utils');
var _ = require('lodash');


// Parse the given string
var yfm = function (src, delims) {
  delims = delims || ['---','---'];
  var metadata = {};

  // Store the original string
  var content = src;

  // Use "delims" library to dynamically construct
  // RegExp based on the given delimiters
  var delimiters = delim(delims).evaluate;

  // File object
  var fileObject = content.match(delimiters);

  if (fileObject && fileObject.length === 3) {
    metadata = YAML.load(fileObject[1]);
    content = fileObject[2];
  }

  return {
    context: metadata,
    content: content,
    original: src
  };
};


// Read the file, then parse
yfm.read = function(src, delims, options) {
  return yfm(file.readFileSync(src, options), delims);
};


// Does YAML front matter exist?
yfm.exists = function(src, delims, options) {
  var obj = yfm.read(src, delims, options).context;
  return _.keys(obj).length > 0;
};

module.exports = yfm;