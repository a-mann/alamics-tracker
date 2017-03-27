'use strict';

module.exports = function (grunt) {
    return {
        js: {
            files: ['./userscript.js', '<%= paths.jsparts %>*.js','css-parts/*.css'],
            tasks: [
                'copy',
                'include-file:js',
                'include-file:css',
                //'uglify:userscript',
                'commands'
            ],
            options: {
                spawn: false
            }
        },
        css: {
            files: ['css/*.pcss'],
            tasks: [
                'postcss'
            ],
            options: {
                spawn: false
            }
        }
    };
};