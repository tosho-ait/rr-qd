var path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'rr-qd',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|lib)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: path.resolve(__dirname, 'src'),
            },
        ]
    },
    externals: {
        "react": true,
        "moment": true,
        "react-dom": true,
        "react-redux": true,
        "redux": true,
        "redux-api-middleware": true,
        "redux-thunk": true
    }
}