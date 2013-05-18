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

console.log('Waiting 1 second...');

setTimeout(function() { 
  app.listen(8123);
  console.log("Listening on 8123");
}, 1000);
