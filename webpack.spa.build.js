/* html */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* 输出css */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/* css兼容 */
const autoprefixer = require('autoprefixer');
/* 压缩css */
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
/* js压缩 */
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
/* vue-loader 15版本以上必带 */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/* 清理dist目录 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
/* 查看打包情况 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    devtool: 'heap-module-eval-source-map',
    /* 模式 */
    mode: 'production',
    /* 入口 */
    entry: './src/spa.js',
    /* 输出 */
    output: {
        publicPath: "/src/",
        filename: 'main.js',
        path: __dirname + '/dist/src' // js输出路径，以及其他文件默认路径
    },
    /* 解析路径 */
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': __dirname + '/src'
        }
    },
    /* webpack不运行以下对象 */
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'js-md5': 'md5'
    },
    /* 模块处理 */
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            /* js */
            {
                test: /\.js$/,
                exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
                // include:__dirname + '/src' 只找某个目录
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            /* css */
            {
                test: /\.(css|styl|stylus)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true  // 告诉你css的来源
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})// 自动添加css前缀
                            ]
                            /*plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]*/
                        }
                    },
                    'stylus-loader'
                ]
            },
            /* 图片处理 */
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192 // 8kb打包成base64
                        }
                        /* image-webpack-loader可以优化图片，但是我还是选择原图，url-loader依赖file-loader */
                    }
                ]
            }
        ]
    },
    /* 插件 */
    plugins: [
        new HtmlWebpackPlugin({
            title: 'demo', // 默认值：Webpack App
            filename: '../index.html', // 默认值： 'index.html'
            template: __dirname + '/src/spa.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true, // 移除标签属性的引号
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename: 'main.css'}),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    /* 优化 */
    optimization: {
        minimizer: [
            /* css压缩 */
            new OptimizeCSSAssetsPlugin({}),
            /* js压缩 */
            new UglifyJsPlugin({
                uglifyOptions: {  //新版不需要在设置 safari10了
                    ie10: true
                },
                cache: true, // 缓存
                parallel: true,  // 多进程
                sourceMap: false // 来源
            })
        ]
    }
};