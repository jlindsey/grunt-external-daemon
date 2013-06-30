/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

var touch = require('touch');

process.stdin.resume();

process.on('SIGUSR2', function() { 
  touch.sync('test/SIGUSR2');
  process.exit(0);
});

process.on('SIGTERM', function() { 
  touch.sync('test/SIGTERM');
  process.exit(0);
});
