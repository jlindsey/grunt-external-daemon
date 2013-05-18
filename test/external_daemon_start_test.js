/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt'),
    spawn = require('child_process').spawn,
    http  = require('http'),
    _     = require('underscore');

var child;

exports.output_test = {
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
  }
};

exports.start_test = {
  setUp: function(done) {
    child = spawn('grunt', ['external_daemon:server_1', '--stack']);
    child.stdout.setEncoding('utf-8');

    setTimeout(done, 1100);
  },

  tearDown: function(done) {
    child.on('exit', function() { done(); });
    child.kill();
  },

  starts_successfully: function(test) {
    test.expect(2);

    http.get('http://127.0.0.1:8123/', function(res) {
      res.setEncoding('utf-8');
      
      res.on('data', function(data) {
        var obj = JSON.parse(data);

        test.ok(_.isObject(obj), 'parsed object correctly');
        test.equal(obj.hello, 'world', 'object contains correct data');
        test.done();
      });
    });
  }
};
