/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */

'use strict';

var connect = require('connect');
var app = connect().use(function (req, res) { res.end(); });

console.log('Waiting 3 seconds...');

setTimeout(function() {
  app.listen(8234);
  console.log('Listening on 8234');
}, 3000);
