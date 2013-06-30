# grunt-external-daemon [![Build Status](https://travis-ci.org/jlindsey/grunt-external-daemon.png?branch=master)](https://travis-ci.org/jlindsey/grunt-external-daemon)

Grunt Task to start external background processes.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-external-daemon --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-external-daemon');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*

## External Daemon task
_Run this task with the `grunt external_daemon` command._

Different daemons to run and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Params
#### cmd
Type: `string`

The command to run. If passed in a path, this will be normalized first. Can be a [Grunt template](http://gruntjs.com/configuring-tasks#templates).

#### args
Type: `Array[String]`

Arguments to pass to the command. This is passed to the underlying node `child_process.spawn` function.

Array items will be processed as Grunt templates.

### Options

#### verbose
Type: `boolean`
Default: `false`

Print stderr and stdout output from the daemon process with the Grunt output. Even with this disabled, output can be viewed by 
running Grunt with the `--verbose` flag.

#### nodeSpawnOptions
Type: `object`
Default: `{}`

List of options to pass to the underlying node `child_process.spawn` command. See the [node docs](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for more details.

#### startCheck
Type: `function(stdout, stderr)`
Default: `function () { return true; }`

A function to check whether the process has started up and is ready. It should return `true` when whatever criteria used to determine
readiness are met. The default is a function that simply returns `true`, meaning it will assume your process is immediately ready to go
upon starting. The task will block until this process returns true or the timeout has elapsed (see below).

This is useful when you are starting a daemon process in the middle of a Grunt task chain and subsequent tasks require this daemon to be 
running before executing themselves. For instance, starting a node server with [grunt-develop](https://github.com/edwardhotchkiss/grunt-develop)
that requires a running CouchDB instance.

#### startCheckInterval
Type: `float`
Default: `0.5`

The interval in seconds between `startCheck` invocations.

#### startCheckTimeout
Type `float`
Default: `5.0`

The time in seconds before the task times out if `startCheck` has not yet returned `true`.

Setting this to `false` disables the timeout.

#### killSignal
Type: `string`
Default: `SIGTERM`

The signal sent to the process to kill it.

#### stdout
Type: `fd`
Default: `undefined`

An open file descriptor to write stdout of the daemon process to.

#### stderr
Type: `fd`
Default: `undefined`

An open file descriptor to write stderr of the daemon process to. Can be the same stream as `options.stdout`.

### Usage Examples

Launch a CouchDB instance and wait for it to fully boot.

```js
external_daemon: {
  couchdb: {
    options: {
      startCheck: function(stdout, stderr) {
        return /Apache CouchDB has started on/.test(stdout);
      }
    },
    cmd: "couchdb"
  }
}
```

Launch a Redis server and get the config path from the Grunt config.

```js
external_daemon: {
  redis: {
    cmd: "redis-server",
    args: ["<%= grunt.config.redis_config_file %>"]
  }
}
```

Launch a verbose Memcached server and print the output.
```js
external_daemon: {
  memcached: {
    options: {
      verbose: true,
      startCheck: function(stdout, stderr) {
        return /server listening/.test(stdout);
      }
    },
    cmd: "memcached",
    args: ['-vv']
  }
}
```

## License

Copyright (c) 2013 Joshua Lindsey. See LICENSE for details.
