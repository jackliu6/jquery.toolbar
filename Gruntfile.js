module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less : {
            demo : {
                src : 'less/demo.less',
                dest : 'demo/css/demo.css'
            },
            demo_ie67 : {
                src : 'less/demo_ie67.less',
                dest : 'demo/css/demo_ie67.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less']);
};