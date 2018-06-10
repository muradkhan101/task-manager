const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const extractCss = new CssExtractPlugin({
    filename: './dist/assets/app.css'
});

module.exports = {
    entry: {
        'main': path.resolve(__dirname, '../src/index.tsx'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: /src/,
                exclude: /node_modules/
            },
            {
                test: /.html$/,
                use: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
                use: [
                    CssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            common: path.resolve(__dirname, 'src/common/'),
            board: path.resolve(__dirname, 'src/boards/Board'),
            task: path.resolve(__dirname, 'src/boards/Task')
        }
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 1,
                    reuseExistingChunk: true
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CssExtractPlugin({
            filename: '[name].[chunkHash].css',
            chunkFilename: '[name].[id].css'
        }),
        new UglifyPlugin({
            include: /\.tsx?$/,
            uglifyOptions: {
                ecma: 8,
                warnings: true,
                mangle: true,
                compress: {
                    dropDebugger: true,
                    deadCode: true,
                },
                output: {
                    beautify: false,
                }
            },
        })
    ],
    output: {
        filename: '[name].[chunkHash].js',
        path: path.resolve(__dirname, '../dist')
    }
}