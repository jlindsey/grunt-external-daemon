/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

process.stdout.setEncoding('utf-8');
process.stderr.setEncoding('utf-8');

process.stdout.write("STDOUT Message\n");
process.stderr.write("STDERR Message\n");
