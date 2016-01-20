'use strict';
module.exports = function(grunt) {
    // configure
    grunt.initConfig({
        compass: {                  // Task
            dist: {                   // Target
              options: {              // Target options
                sassDir: 'FrontEnd/sass',
                cssDir: 'FrontEnd/css',
                environment: 'production',
                outputStyle: 'expanded' //nested, expanded, compact, compressed.
              }
            }
        },
        imagemin:{
            dynamic:{
                options:{
                    optimizationLevel: 7
                },
                files:[{
                    expand: true,
                    cwd: 'FrontEnd/images/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'FrontEnd/images/'
                }]
            }
        },
         watch:{
            files: 'FrontEnd/sass/**/*.scss',
            tasks: ['compass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'FrontEnd/js/*.js',
                        'FrontEnd/css/*.css',
                        'FrontEnd/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './FrontEnd'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');    
    grunt.loadNpmTasks('grunt-browser-sync');
    
    grunt.registerTask('image', ['imagemin']);
    
    grunt.registerTask('default', ['browserSync', 'compass', 'watch']);
};