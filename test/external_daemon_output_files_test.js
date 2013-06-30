/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt'),
    exec  = require('child_process').exec,
    read  = require('fs').readFileSync;

function readFile(fn) {
  return read(fn, { encoding: 'utf8' });
}

exports.stdout_test = function(test) {
  test.expect(1);

  exec('grunt external_daemon:output_server_1', function(err, stdout, stderr) {
    var check = readFile('test/OUTPUT').indexOf('STDOUT Message');
    test.ok(check > -1, 'correct output in file');
    test.done();
  });
};

exports.stderr_test = function(test) {
  test.expect(1);

  exec('grunt external_daemon:output_server_2', function(err, stdout, stderr) {
    var check = readFile('test/OUTPUT').indexOf('STDERR Message');
    test.ok(check > -1, 'correct output in file');
    test.done();
  });
};
