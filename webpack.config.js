var path = require('path');

module.exports = {
    context: __dirname + "/app",
    entry: {
        javascript: "./app.js",
        html: "./index.html"
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader?{'presets':['react','es2015']}"]
                /* "query" funkar inte med multipla loaders i en lista - query param syntax i stället!!
                query: {
                    presets: ['react', 'es2015']
                }
                */
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass?includePaths[]=' +
                    (path.resolve(__dirname, "./node_modules"))
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    }
}