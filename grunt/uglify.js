'use strict';

module.exports = function(grunt){
    return {
        options: {
            compress: true,
            mangle: true
        },
        'userscript': {
            files: {
                'dart-support.user.js': 'dart-support.user.js'
            }
        }
    };
};