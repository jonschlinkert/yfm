/**
 * YAML Front-Matter
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var YAML = require('js-yaml');
var file = require('fs-utils');
var _ = require('lodash');


// Build RegExp patterns for delimiters
var buildRegexGroup = function (re) {
  re = !Array.isArray(re) ? [re] : _.compact(re);
  re = (re.length > 0) ? re.join('|') : re;
  return '(?:' + re + ')';
};

// Read YAML front matter synchronously
var readYFMSync = exports.readYFMSync = function (src, options) {
  var opts = _.extend({read: true, open: '---', close: '---'}, options);
  var metadata = {};

  // Content
  src = opts.read ? file.readFileSync(src) : src;
  var content = src;

  // Construct RegExp based on delimiters
  var open = buildRegexGroup(opts.open);
  var yfm = '\\s([\\s\\S]+?)';
  var close = buildRegexGroup(opts.close);
  var body = '(\\s[\\s\\S]+|\\s?)$';
  var re = new RegExp('^' + open + yfm + close + body);

  // File object
  var fileObject = content.match(re);
  if (fileObject && fileObject.length === 3) {
    metadata = YAML.load(fileObject[1]);
    content = fileObject[2];
  }
  return {
    metadata: metadata,
    content: content,
    original: src
  };
};

// Does the file have YAML front matter?
var hasYFM = exports.hasYFM = function (src, options) {
  var yfm = readYFMSync(src, options).metadata;
  return _.keys(yfm).length > 0;
};