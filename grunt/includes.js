'use strict';

module.exports = function(grunt){
    return {
        js: {
            options: {
                includePath: '<%= paths.jsparts %>',
                includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
                duplicates: false,
                debug: true
            },
            files: [{
                cwd: '.',
                src: './*.user.js',
                dest: './',
            }],
        }
    };
};