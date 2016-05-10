var webpack = require('webpack');
var MemoryFs = require('memory-fs');

var mfs = new MemoryFs();
var path = require('path');

var compiler = webpack({
    context: path.join(__dirname, 'client'),
    entry: './App.jsx',
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: "babel-loader",
            query: {
                presets: ['es2015']
            }
        }]
    }
});

compiler.outputFileSystem = mfs;
compiler.run(function () {
    bundleJsContent = mfs.readFileSync(path.join(__dirname, 'bundle.js'));
    require('./server/')(bundleJsContent);    
});

