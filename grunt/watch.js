'use strict';

module.exports = function (grunt) {
    return {
        js: {
            files: ['./dart-support.user.js'],
            tasks: [
                'commands'
            ],
            options: {
                spawn: false
            }
        }
    };
};