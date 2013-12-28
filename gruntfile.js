module.exports = function(grunt) {

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['public/js/**', 'app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'public/js/**/*.js', 'test/mocha/**/*.js', 'test/karma/**/*.js', 'app/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon:dev', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                files: {
                    'public/prod/osc.js' : [
                        'public/lib/angular/angular.js',
                        'public/lib/angular-cookies/angular-cookies.js',
                        'public/lib/angular-resource/angular-resource.js',
                        'public/lib/angular-route/angular-route.js',
                        'public/lib/angular-bootstrap/ui-bootstrap.js',
                        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                        'public/js/app.js',
                        'public/js/config.js',
                        'public/js/directives.js',
                        'public/js/services/*.js',
                        'public/js/constrollers/*.js',
                        'public/js/init.js',
                    ]
                }
            }
        },
        cssmin:  {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                files: {
                    'public/prod/osc.css' : [
                        'public/lib/bootstrap/docs/assets/css/bootstrap.css',
                        'public/lib/bootstrap/docs/assets/css/bootstrap-responsive.css',
                        'public/css/common.css',
                        'public/css/views/**/*.css'
                    ]
                }
            }
        },

        forever: {
            options: {
                index: 'server.js',
                logDir: 'logs'
            }
        }
    });

    // Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-forever');


    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Development
    grunt.registerTask('default', ['jshint', 'concurrent']);

    // Test
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    // Production
    grunt.registerTask('production', ['jshint', 'cssmin', 'uglify', 'forever:start']);
};
