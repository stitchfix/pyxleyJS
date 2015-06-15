module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'pyxley.js',
        library: 'Pxyley',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ }
        ]
    },
    externals: [
        {
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    ]

};