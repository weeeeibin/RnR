const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProductionMode = process.env.NODE_ENV === 'production';


module.exports = {
    entry: './src/main.tsx',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        historyApiFallback: true,
        compress: true,
        port: 8080,
        proxy: {
            "/api": {
                target: "https://mrmd.xyz", // 被替换的目标地址，即把 /api 替换成这个
                // pathRewrite: { "^/api": "" },
                secure: false, // 若代理的地址是https协议，需要配置这个属性
            }
        }
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')// 打包生成的文件夹
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.css?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpe?g)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]'
                }
            },
            {
                test: /\.ttf?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[hash][ext][query]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React',
            filename: 'index.html',
            template: './public/index.html',
            chunks: ['component', 'style']
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ]
}
