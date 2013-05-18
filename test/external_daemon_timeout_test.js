/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt'),
    spawn = require('child_process').spawn;

var child_1, child_2;

exports.timeout_test = {
  setUp: function(done) {
    child_1 = spawn('grunt', ['external_daemon:server_2', '--stack']);
    child_1.stdout.setEncoding('utf-8');

    // Wait for half a second to give the command time to start.
    setTimeout(done, 500);
  },

  tearDown: function(done) {
    child_1.on('exit', function() { done(); });
    child_1.kill();
  },

  timeout: function(test) {
    test.expect(1);

    child_1.stdout.on('data', function(data) {
      var check = data.indexOf('Command timed out');
      if (check > -1) {
        test.ok(true, 'timeout correct');
        child_1.stdout.removeAllListeners('data');
        test.done();
      }
    });
  }
};

exports.no_timeout_test = {
  setUp: function(done) {
    child_2 = spawn('grunt', ['external_daemon:server_2a', '--stack']);
    child_2.stdout.setEncoding('utf-8');

    // Wait for half a second to give the command time to start.
    setTimeout(done, 500);
  },

  tearDown: function(done) {
    child_2.on('exit', function() { done(); });
    child_2.kill();
  },

  no_timeout: function(test) {
    test.expect(1);

    setTimeout(function() {
      test.ok(true, 'no timeout correct');
      child_2.stdout.removeAllListeners('data');
      test.done();
    }, 3000);

    child_2.stdout.on('data', function(data) {
      var check = data.indexOf('Command timed out');
      if (check > -1) {
        test.ok(false, 'should not have timed out');
        child_2.stdout.removeAllListeners('data');
        test.done();
      }
    });
  }
};
