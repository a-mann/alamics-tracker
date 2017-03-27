'use strict';

module.exports = function (grunt) {
    return {
        options: {
            map: false,
            processors: [
                require('postcss-partial-import')({
                    path: 'css/',
                    //extension: '.pcss',
                    dirs: ['css/'],
                    addDependencyTo: grunt
                }),
                require('postcss-cssnext')({
                    browsers: [
                        'last 2 versions'
                    ],
                    warnForDuplicates: false
                }),
                require('postcss-bem')({
                    style: 'bem',
                    bem: {
                        separators: {
                            namespace: '-',
                            descendent: '__',
                            modifier: '_'
                        }
                    },
                    shortcuts: {
                        component: 'b',
                        descendent: 'e',
                        modifier: 'm'
                    }
                }),
                require('cssnano')({
                    safe: true
                })
            ]
        },
        dev: {
            expand: true,
            flatten: true,
            src: ['css/*.pcss'],
            dest: 'css-parts/',
            ext: '.css'
        }
    };
};