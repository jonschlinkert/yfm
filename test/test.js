/**
 * YFM
 * https://github.com/assemble/YFM
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var expect = require('chai').expect;

// node_modules
var glob = require('globule');
var file = require('fs-utils');

// Local libs
var yfm = require('../');

var expected = {metadata: {foo: 'bar'}, content: '', original: '---\nfoo: bar\n---'};
var complexExpected = {
  metadata: {"foo": 'bar', "version": 2},
  content: '\n\n<span class="alert alert-info">This is an alert</span>\n',
  original: '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n'
};

describe('Read from file system:', function() {
  it('should extract YAML front matter from .yaml files with no content.', function(done) {
    var file = yfm.readYFMSync('./test/fixtures/yaml/double.yml');
    expect(file).to.deep.equal(expected);
    done();
  });

  it('should extract YAML front matter from files with content.', function(done) {
    var file = yfm.readYFMSync('./test/fixtures/alpha.hbs');
    expect(file).to.deep.equal(complexExpected);
    done();
  });

  it('should extract YAML front matter from files complex YAML data and content', function(done) {
    var file = yfm.readYFMSync('./test/fixtures/beta.hbs');
    expect(file).to.deep.equal(complexExpected);
    done();
  });
});

describe('Read from strings:', function() {
  var opts = {read: false};
  var yfmOnly = '---\nfoo: bar\n---';
  var yfmAndContent = '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';

  it('should extract YAML front matter directly from a string when with "read: false" is defined', function(done) {
    var file = yfm.readYFMSync(yfmOnly, opts);
    expect(file).to.deep.equal(expected);
    done();
  });

  it('should extract YAML front matter and content directly from a string when with "read: false" is defined', function(done) {
    var file = yfm.readYFMSync(yfmAndContent, opts);
    expect(file).to.deep.equal(complexExpected);
    done();
  });
});
