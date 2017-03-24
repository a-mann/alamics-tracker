'use strict';

module.exports = function(grunt){
    return {
        'js': {
            files: [
                {
                    expand: true,
                    cwd: './',
                    src: ['userscript.js'],
                    dest: './',
                    rename: function(dest, src) {
                        return 'dart-support.user.js';
                    },
                    ext: '.js'
                }
            ]
        },
    };
};