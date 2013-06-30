/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

process.stdout.setEncoding('utf8');
process.stderr.setEncoding('utf8');

process.stdout.write("STDOUT Message");
process.stderr.write("STDERR Message");
