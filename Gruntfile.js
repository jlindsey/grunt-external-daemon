/*
 * grunt-external-daemon
 * https://github.com/jlindsey/grunt-external-daemon
 *
 * Copyright (c) 2013 Joshua Lindsey
 * Licensed under the MIT license.
 */
 
'use strict';

var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      test: ['test/TEST_SUCCESSFUL', 'test/SIGTERM', 'test/SIGUSR2', 'test/OUTPUT']
    },

    jshint: {
      options: {
        "laxcomma": true,
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true,
        "node": true,
        "es5": true
      },
      
      files: ['Gruntfile.js', 'tasks/*.js', 'test/**/*.js']
    },

    // Configs for testing
    external_daemon: {
      server_1: {
        options: {
          startCheckInterval: 1.0,
          startCheck: function(stdout, stderr) {
            return (stdout.indexOf("Listening on 8123") > -1);
          }
        },
        cmd: 'node',
        args: ['test/fixtures/server_1.js']
      },
      server_2: {
        options: {
          startCheck: function(stdout, stderr) {
            return (stdout.indexOf("Listening on 8234") > -1);
          },
          startCheckTimeout: 1.0
        },
        cmd: 'node',
        args: ['test/fixtures/server_2.js']
      },
      server_2a: {
        options: {
          startCheck: function() { return false; },
          startCheckTimeout: false
        },
        cmd: 'node',
        args: ['test/fixtures/server_2.js']
      },
      server_3: {
        options: {
          verbose: true,
          startCheck: function() { return false; },
          startCheckTimeout: 5.0
        },
        cmd: 'node',
        args: ['test/fixtures/server_3.js']
      },
      server_4: {},
      server_4a: {
        cmd: 'echo',
        args: 'hello'
      },
      server_4b: {
        options: {
          startCheck: false
        },
        cmd: 'echo'
      },
      signal_server_1: {
        cmd: 'node',
        args: ['test/fixtures/signal_server.js']
      },
      signal_server_2: {
        options: {
          killSignal: 'SIGUSR2'
        },
        cmd: 'node',
        args: ['test/fixtures/signal_server.js']
      },
      output_server_1: {
        options: {
          startCheck: function (stdout) { return (stdout.indexOf('STDOUT Message') > -1); },
          stdout: fs.openSync('test/OUTPUT', 'w')
        },
        cmd: 'node',
        args: ['test/fixtures/output_server.js']
      },
      output_server_2: {
        options: {
          startCheck: function (stdout) { return (stdout.indexOf('STDOUT Message') > -1); },
          stderr: fs.openSync('test/OUTPUT', 'w')
        },
        cmd: 'node',
        args: ['test/fixtures/output_server.js']
      }
    },

    nodeunit: {
      all: ['test/*_test.js']
    },

    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['default'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'jshint', 'nodeunit', 'clean']);
  grunt.registerTask('dev', ['default', 'watch']);
};
