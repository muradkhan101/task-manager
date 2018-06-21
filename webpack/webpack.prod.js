const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCss = new CssExtractPlugin({
    filename: path.resolve(__dirname, '../dist/assets/app.css')
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
                test: /\.s?css$/,
                // include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
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
            "@app/common": path.resolve(__dirname, '../src/common/'),
            "@app/board": path.resolve(__dirname, '../src/boards/Board'),
            "@app/task": path.resolve(__dirname, '../src/boards/Task'),
            "@app/login": path.resolve(__dirname, '../src/login'),
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
        new CleanWebpackPlugin(
            [path.resolve(__dirname, '../dist')],
            {
                root: path.resolve(__dirname, '../'),
            }
        ),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
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
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: path.resolve(__dirname, '../dist'),
            }
        ]),
    ],
    output: {
        filename: '[name].[chunkHash].js',
        path: path.resolve(__dirname, '../dist/app')
    }
}