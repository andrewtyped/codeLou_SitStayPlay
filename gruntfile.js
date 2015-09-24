module.exports = function(grunt) {

    //configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build : {
                src: 'app/components/js/*.js',
                dest: 'app/app.min.js'
                }
            }
    });

    //load plugins
    grunt.loadNpmTasks( );

    //register tasks
    grunt.registerTask('default', []);
