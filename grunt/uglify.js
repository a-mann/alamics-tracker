'use strict';

module.exports = function(grunt){
    return {
        options: {
            compress: true,
            mangle: false
        },
        'userscript': {
            files: {
                'dart-support.user.js': 'dart-support.user.js'
            }
        }
    };
};