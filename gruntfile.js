module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
        src: 'public/js/*.js',
        options: {
          specs: 'spec/jasmine-jquery/*Spec.js',
          keepRunner: false,
          vendor: ['http://code.jquery.com/jquery-2.1.4.min.js', 'http://raw.githubusercontent.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js', 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.0/angular.min.js']
        }
      }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
