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
    fs    = require('fs');

function read(fn) {


  if (process.versions.node.indexOf('0.8') === 0) {
    return fs.readFileSync(fn, 'utf-8');
  } else {
    return fs.readFileSync(fn, { encoding: 'utf-8' });
  }
}

exports.stdout_test = function(test) {
  test.expect(1);

  exec('grunt external_daemon:output_server_1', function(err, stdout, stderr) {
    var check = read('test/OUTPUT').indexOf('STDOUT Message');
    test.ok(check > -1, 'correct output in file');
    test.done();
  });
};

exports.stderr_test = function(test) {
  test.expect(1);

  exec('grunt external_daemon:output_server_2', function(err, stdout, stderr) {
    var check = read('test/OUTPUT').indexOf('STDERR Message');
    test.ok(check > -1, 'correct output in file');
    test.done();
  });
};
