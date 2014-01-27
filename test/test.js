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

var expected = {context: {foo: 'bar'}, content: '', original: '---\nfoo: bar\n---'};
var complexExpected = {
  context: {"foo": 'bar', "version": 2},
  content: '\n\n<span class="alert alert-info">This is an alert</span>\n',
  original: '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n'
};
var customDelims = {
  context: {"foo": 'bar', "version": 2},
  content: '\n\n<span class="alert alert-info">This is an alert</span>\n',
  original: '~~~\nfoo: bar\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n'
};
var empty = {
  "context": {},
  "content": "",
  "original": ""
};

var contentOnly = {
  "context": {},
  "content": "# This file doesn't have YFM!",
  "original": "# This file doesn't have YFM!"
};


describe('Read from strings:', function() {
  var yfmOnly = '---\nfoo: bar\n---';
  var yfmAndContent = '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';

  it('should extract YAML front matter directly from a string when with "read: false" is defined', function(done) {
    var actual = yfm(yfmOnly);
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should extract YAML front matter and content directly from a string when with "read: false" is defined', function(done) {
    var actual = yfm(yfmAndContent);
    expect(actual).to.deep.equal(complexExpected);
    done();
  });
});


describe('Read from file system:', function() {
  it('should extract YAML front matter from files with content.', function(done) {
    var actual = yfm.read('./test/fixtures/alpha.hbs');
    expect(actual).to.deep.equal(complexExpected);
    done();
  });

  it('should have no problem with complex content.', function(done) {
    var actual = yfm.read('./test/fixtures/complex.md');
    var expected = file.readJSONSync('./test/expected/complex.json');
    expect(actual).to.deep.equal(expected);
    done();
  });
});


describe('Use custom delimiters:', function() {
  it('should use custom delimiters.', function(done) {
    var actual = yfm.read('./test/fixtures/custom-delims.md', ['~~~', '~~~']);
    expect(actual).to.deep.equal(customDelims);
    done();
  });
});


describe('Read empty files:', function() {
  it('should return an object, even if the file is empty.', function(done) {
    var actual = yfm.read('./test/fixtures/empty.md');
    expect(actual).to.deep.equal(empty);
    done();
  });
});

describe('Read files with no YFM:', function() {
  it('should correctly parse files that have content but no YAML front matter.', function(done) {
    var actual = yfm.read('./test/fixtures/content-only.md');
    expect(actual).to.deep.equal(contentOnly);
    done();
  });
});

describe('Read YAML files:', function() {
  it('should parse YAML directly from .yaml files. e.g. files with no content.', function(done) {
    var actual = yfm.read('./test/fixtures/metadata.yml');
    expect(actual).to.deep.equal(file.readJSONSync('test/expected/metadata.json'));
    done();
  });
});


describe('Custom delimiters:', function() {
  it('should use custom delimiters to read YAML front matter.', function(done) {
    var actual = yfm.read('./test/fixtures/alpha.hbs');
    expect(actual).to.deep.equal(complexExpected);
    done();
  });
});


describe('Check for YFM:', function() {
  it('should return true or false if YAML front matter exists.', function(done) {
    var actual = yfm.exists('./test/fixtures/alpha.hbs');
    expect(actual).to.equal(true);
    done();
  });
});

