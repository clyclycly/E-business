/* html */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* 输出css */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/* css兼容 */
const autoprefixer = require('autoprefixer');
/* vue 15版本以上必带 */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/* devServer必带 */
const webpack = require('webpack');
/* 配置静态目录,打包后的就不配置了,自己上传 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log(process.env.BRANCH_ENV)


module.exports = {
    /* 模式 */
    mode: 'development',
    /* 入口 */
    entry: './src/spa.js',
    /* 输入文件 */
    output: {
        publicPath: "/", // 默认./, 设置/是因为history模式id子路由会找不到css、js等
        filename: 'main.js',
        path: __dirname + '/dist'
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
    /* 生成文件类型，谷歌可以查看来源，前端这块不能关闭 */
    devtool: 'heap-module-eval-source-map',
    /* 热更新 */
    devServer: {
        historyApiFallback: true, // 访问路由时返回首页
        clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
        hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
        contentBase: __dirname + '/dist', // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
        compress: true, // 一切服务都启用gzip 压缩
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。0.0.0.0是本机所有的ip可以访问
        port: 8080, // 端口
        open: false, // 是否打开浏览器
        overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
            warnings: true,
            errors: true
        },
        publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
        proxy: { // 设置代理
            /*"/api": { // 访问api开头的请求，会跳转到  下面的target配置
                target: "http://192.168.0.103:8080"
            }*/
        },
        quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
        watchOptions: { // 监视文件相关的控制选项
            ignored: /node_modules/, // 忽略监控的文件夹,正则
            poll: true, // 使用文件系统获取文件改动的通知，也可以一秒一次，poll: 1000
            aggregateTimeout: 300 // 默认值，会在重新构建前增加延迟
        }
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
        /* html */
        new HtmlWebpackPlugin({
            title: 'demo', // 默认值：Webpack App
            filename: 'index.html', // 默认值： 'index.html'
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true, // 移除属性的引号
            },
            template: __dirname + '/src/spa.html'
        }),
        /* css */
        new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'}),
        /* vue */
        new VueLoaderPlugin(),
        /* 静态目录 */
        new CopyWebpackPlugin(
            [{
                from: __dirname + '/static',
                to: 'static',
                ignore: ['.*']
            }]
        ),
        new webpack.NamedModulesPlugin(), // 热加载时直接返回更新文件名
        new webpack.HotModuleReplacementPlugin() // 开启热更新
    ]
};