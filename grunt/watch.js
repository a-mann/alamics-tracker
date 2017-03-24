'use strict';

module.exports = function (grunt) {
    return {
        js: {
            files: ['./*.js', '<%= paths.jsparts %>*.js'],
            tasks: [
                'copy',
                'include-file',
                //'uglify:userscript',
                'commands'
            ],
            options: {
                spawn: false
            }
        }
    };
};