'use strict';

module.exports = function (grunt) {
    return {
        s: {
            files: ['<%= paths.jsparts %>*.js'],
            tasks: [
                'concat:userscript',
                'uglify:userscript',
            ],
            options: {
                spawn: false
            }
        }
    };
};