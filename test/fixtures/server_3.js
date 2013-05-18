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

setTimeout(function () { console.log("Message 1"); }, 1000);
setTimeout(function () { console.log("Message 2"); }, 1200);
setTimeout(function () { console.log("Message 3"); }, 1400);
setTimeout(function () { console.log("Message 4"); }, 1600);

app.listen(8345);
