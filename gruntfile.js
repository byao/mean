'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true
                }
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
                src: [
                    'gruntfile.js',
                    'server.js',
                    'config/**/*.js',
                    'public/js/**/*.js',
                    'test/mocha/**/*.js',
                    'test/karma/**/*.js',
                    'app/**/*.js'
                ],
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
            dev: {
                NODE_ENV: 'development'
            },
            test: {
                NODE_ENV: 'test'
            },
            production: {
                NODE_ENV: 'production'
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
                        'public/lib/angular-ui-utils/modules/route/route.js',
                        'public/js/app.js',
                        'public/js/config.js',
                        'public/js/directives.js',
                        'public/js/filters.js',
                        'public/js/services/*.js',
                        'public/js/controllers/*.js',
                        'public/js/init.js'
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

        shell: {
            'forever-start': {
                command: 'forever start server.js'
            }
        }
    });

    // Development
    grunt.registerTask('default', ['env:dev', 'jshint', 'concurrent']);

    // Test
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    // Production
    grunt.registerTask('prepare', ['env:production', 'jshint', 'cssmin', 'uglify']);
    grunt.registerTask('prod-start', ['prepare', 'shell:forever-start']);
};
