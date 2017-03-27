'use strict';

module.exports = function(grunt){
    return {
        js: {
            options: {
                includePath: '<%= paths.jsparts %>',
                includeRegexp: /^\s*\/\/\s*jsimport\s+['"]?([^'"]+)['"]?\s*$/,
                duplicates: false,
                debug: true
            },
            files: [{
                cwd: '.',
                src: './*.user.js',
                dest: './',
            }],
        },
        css: {
            options: {
                includePath: 'css-parts/',
                includeRegexp: /\/\/\s*cssimport\s+['"]?(.*.css)/,
                duplicates: false,
                debug: false,
                banner: ''
            },
            files: [{
                cwd: '.',
                src: './*.user.js',
                dest: './',
            }],
        }
    };
};