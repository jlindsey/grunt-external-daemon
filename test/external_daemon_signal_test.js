/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt'),
    exec  = require('child_process').exec;

exports.default_signal = function(test) {
  test.expect(1);

  exec('grunt external_daemon:signal_server_1', function(err, stdout, stderr) {
    test.ok(grunt.file.isFile('test/SIGTERM'), 'correct signal sent');
    test.done();
  });
};

exports.custom_signal = function(test) {
  test.expect(1);

  exec('grunt external_daemon:signal_server_2', function(err, stdout, stderr) {
    test.ok(grunt.file.isFile('test/SIGUSR2'), 'correct signal sent');
    test.done();
  });
};
