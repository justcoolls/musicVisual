const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = (env) => {
    return {
        entry: {
            'index': './static/src/apps/main.js',
        },
        mode: env,
        devtool: env === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
        output: {
            filename: env === 'development' ? 'js/[name].bundle.js' : 'js/[name].[chunkhash:5].bundle.js',
            path: path.resolve(__dirname, 'build'),
            chunkFilename: 'js/chunck/[chunkhash:8].chunk.js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.json', '*'],
        },
        module: {
            rules: [
                {
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['env', 'react', 'stage-0'],
                        }
                    },
                    exclude: /node_modules/
                },{
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                        {loader: 'less-loader'}
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['build'], {
                root: __dirname,
                verbose: true,
                dry: false
            }),
            new HtmlWebpackPlugin({
                chunks: ['index'],
                template: './static/templates/index.html',
                filename: './templates/index.html',
            }),
            new CopyWebpackPlugin([ // 复制插件
                {
                    from: path.join(__dirname,'/static/public'),
                    to:  path.join(__dirname,'build/public')
                }
            ]),
        ],
        performance: {
            hints: env === 'production' ? false : 'warning',
        },
    };
};
