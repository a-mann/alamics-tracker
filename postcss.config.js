const webpack = require('webpack');

module.exports = {
    plugins: [
        require('postcss-import')({ addDependencyTo: webpack }),
        // require('postcss-partial-import')({
        //     path: 'src/pcss/',
        //     dirs: ['src/pcss/'],
        //     addDependencyTo: webpack
        // }),
        //require('postcss-custom-properties')(),
        require('postcss-apply')(),
        require('postcss-cssnext')({
            browsers: [
                'last 2 versions'
            ],
            warnForDuplicates: false
        }),
        require('postcss-nested')({
            bubble: ['@nest']
        }),
        require('cssnano')({
            safe: true
        })
    ]
};