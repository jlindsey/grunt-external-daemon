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
    $     = require('jquery');

var child;

exports.verbose_test = {
  setUp: function(done) {
    child = spawn('grunt', ['external_daemon:server_3', '--stack']);
    child.stdout.setEncoding('utf-8');

    // Wait for half a second to give the command time to start.
    setTimeout(done, 500);
  },

  tearDown: function(done) {
    child.on('exit', function() { done(); });
    child.kill();
  },

  verbose_output: function(test) {
    var message_1 = $.Deferred(),
        message_2 = $.Deferred(),
        message_3 = $.Deferred(),
        message_4 = $.Deferred();

    test.expect(4);

    $.when(message_1, message_2, message_3, message_4).then(function () {
      child.removeAllListeners('data');
      test.done();
    });

    child.stdout.on('data', function(data) {
      if (data.indexOf('Message 1') > -1) {
        test.ok(true, "message 1");
        message_1.resolve();
      }

      if (data.indexOf('Message 2') > -1) {
        test.ok(true, "message 2");
        message_2.resolve();
      }

      if (data.indexOf('Message 3') > -1) {
        test.ok(true, "message 3");
        message_3.resolve();
      }

      if (data.indexOf('Message 4') > -1) {
        test.ok(true, "message 4");
        message_4.resolve();
      }
    });
  }
};
