var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'pyxley.js',
        library: 'pxyley',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    externals: [
        {
            "datamaps": "Datamap"
        },
        {
            "jquery": "jQuery"
        },
        {
            "plotly\.js": "Plotly"
        },
        {
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
          'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
          }
        }
    ],
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        })
    ]

};
