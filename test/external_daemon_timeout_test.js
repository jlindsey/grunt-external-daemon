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

var child;

exports.timeout_test = {
  setUp: function(done) {
    child = spawn('grunt', ['external_daemon:server_2', '--stack']);
    child.stdout.setEncoding('utf-8');

    // Wait for half a second to give the command time to start.
    setTimeout(done, 500);
  },

  tearDown: function(done) {
    child.on('exit', function() { done(); });
    child.kill();
  },

  timeout: function(test) {
    test.expect(1);

    child.stdout.on('data', function(data) {
      var check = data.indexOf('Command timed out');
      if (check > -1) {
        test.ok(true, 'timeout correct');
        child.stdout.removeAllListeners('data');
        test.done();
      }
    });
  }
};

exports.no_timeout_test = {
  setUp: function(done) {
    child = spawn('grunt', ['external_daemon:server_2a', '--stack']);
    child.stdout.setEncoding('utf-8');

    // Wait for half a second to give the command time to start.
    setTimeout(done, 500);
  },

  tearDown: function(done) {
    child.on('exit', function() { done(); });
    child.kill();
  },

  no_timeout: function(test) {
    test.expect(1);

    setTimeout(function() {
      test.ok(true, 'no timeout correct');
      child.stdout.removeAllListeners('data');
      test.done();
    }, 3000);

    child.stdout.on('data', function(data) {
      var check = data.indexOf('Command timed out');
      if (check > -1) {
        test.ok(false, 'should not have timed out');
        child.stdout.removeAllListeners('data');
        test.done();
      }
    });
  }
};
