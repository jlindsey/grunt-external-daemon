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

exports.missing_cmd = function(test) {
  test.expect(1);

  exec('grunt external_daemon:server_4', function(err, stdout, stderr) {
    var check = stdout.indexOf('Warning: You must specify "cmd" for task server_4');
    test.ok((check > -1), 'correct error');
    test.done();
  });
};

exports.wrong_args = function(test) {
  test.expect(1);

  exec('grunt external_daemon:server_4a', function(err, stdout, stderr) {
    var check = stdout.indexOf('Warning: You must specify "args" as an array for task server_4a');
    test.ok((check > -1), 'correct error');
    test.done();
  });
};

exports.bad_start_check = function(test) {
  test.expect(1);
  
  exec('grunt external_daemon:server_4b', function(err, stdout, stderr) {
    var check = stdout.indexOf('Warning: You must specify "startCheck" as a function for task server_4b');
    test.ok((check > -1), 'correct error');
    test.done();
  });
};
