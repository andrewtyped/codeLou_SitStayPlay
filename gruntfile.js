module.exports = function(grunt) {

    //configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build : {
                src: 'app/components/js/*.js',
                dest: 'app/app.min.js'
                },
            dev : {
                options: {
                    beautify : true,
                    mangle : false,
                    compress : false,
                    preserveComments : 'all'
                },
                src : 'app/components/js/*.js',
                dest : 'app/app.min.js'
            }
        }
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //register tasks
    grunt.registerTask('build', ['uglify:build']);
    grunt.registerTask('dev', ['uglify:dev']);
