'use strict';

module.exports = function (grunt) {
    return {
        js: {
            files: ['dist/dart-support.user.js'],
            tasks: [
                'commands'
            ],
            options: {
                spawn: false
            }
        }
    };
};