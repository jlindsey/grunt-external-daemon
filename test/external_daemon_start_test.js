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
    spawn = require('child_process').spawn;

var child;

exports.start_test = {
  setUp: function(done) {
    child = spawn('grunt', ['external_daemon:server_1', '--stack']);
    child.stdout.setEncoding('utf-8');

    // Wait for half a second to give the command time to start.
    setTimeout(done, 500);
  },

  tearDown: function(done) {
    child.on('exit', function() { done(); });
    child.kill();
  },

  correct_output: function(test) {
    test.expect(1);

    child.stdout.on('data', function(data) {
      var check = data.indexOf('Started server_1');
      
      if (check > -1) {
        test.ok(true, 'correct output');
        test.done();
        child.stdout.removeAllListeners('data');
      }
    });
  },

  starts_successfully: function(test) {
    test.expect(1);

    exec("ps -ef | grep node | grep -v grep", function(err, stdout, stderr) {
      var check = /node.*?server_1\.js/.test(stdout);
      test.ok(check, 'server_1 process not started');
      test.done();
    });
  }
};
