'use strict';

module.exports = function (grunt) {
    return {
        js: {
            files: ['./userscript.js', '<%= paths.jsparts %>*.js', 'css/*.pcss'],
            tasks: [
                'copy',
                'postcss',
                'include-file:js',
                'include-file:css',
                'commands'
            ],
            options: {
                spawn: false
            }
        }
    };
};