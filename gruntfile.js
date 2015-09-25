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
        },
        watch : {
            js : {
                files : ['app/components/js/*.js'],
                tasks : ['uglify:dev']
            },
            css: {
                files : ['app/components/scss/*.scss'],
                tasks: ['sass:dev']
            }
        },
        sass : {
            build : {
                files : {
                    'app/app.css' : 'app/components/scss/main.scss'
                }
            },
            dev : {
                files : {
                    'app/app.css' : 'app/components/scss/main.scss'
                }
            },
        }
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //run grunt watch to start watching
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //register tasks
    grunt.registerTask('build', ['uglify:build','sass:build']);
    grunt.registerTask('dev', ['uglify:dev','sass:dev']);
}
