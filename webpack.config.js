const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/
        },{
            test: /\.(png|jpg|jpeg|mp3|eot|woff2|woff|svg|ttf)$/i,
            use: 'file-loader',
            exclude: /node_modules/ 
        }]
    },
    resolve: { // not used currently. no `.js` used.
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true
      }
};