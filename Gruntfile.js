/*
 * YFM: A YAML Front-Matter Library
 * https://github.com/assemble/yfm
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: ['Gruntfile.js', '*.js', 'test/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Pull down a list of repos from Github.
    repos: {
      helpers: {
        options: {username: 'assemble'},
        files: {
          'docs/assemble-utils.json': ['repos?page=1&per_page=100']
        }
      }
    },

    readme: {
      options: {
        metadata: ['docs/*.json']
      }
    },

    // Run mocha tests.
    mochaTest: {
      options: {reporter: 'spec'},
      files: ['test/*.js']
    },

    clean: {
      tests: ['test/actual/*.json']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-repos');
  grunt.loadNpmTasks('grunt-sync-pkg');

  // Docs
  grunt.registerTask('docs', ['repos', 'readme', 'sync']);

  // Tests to be run
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'test', 'readme', 'sync']);

};
