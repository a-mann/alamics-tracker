module.exports = {
    plugins: [
        require('postcss-import')({ addDependencyTo: 'webpack' }),
        require('postcss-partial-import')({
            path: 'src/pcss/',
            dirs: ['src/pcss/']
        }),
        require('postcss-cssnext')({
            browsers: [
                'last 2 versions'
            ],
            warnForDuplicates: false
        }),
        require('postcss-apply')(),
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
        require('postcss-nested')({
            bubble: ['@nest']
        }),
        require('cssnano')({
            safe: true
        })
    ]
};