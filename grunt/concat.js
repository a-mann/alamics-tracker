var jspath = 'public/js/scripts/';
var jspluginspath = 'public/js/plugins/';

module.exports = function (grunt) {
    return {
        'userscript': {
            src: ['<%= paths.jsparts %>*.js'],
            dest: 'dart-support.user.js'
        }
    };
};
