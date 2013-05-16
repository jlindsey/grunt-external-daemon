module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['tasks/*.js'],
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
      }
    },

    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['jshint', 'watch']);
};
