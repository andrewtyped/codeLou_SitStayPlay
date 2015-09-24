module.exports = function(grunt) {

    //configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    //load plugins
    grunt.loadNpmTasks( );

    //register tasks
    grunt.registerTask('default', []);
