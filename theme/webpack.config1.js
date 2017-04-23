const getWebpackConfig = require('webpackcc/lib/getWebpackDefaultConfig');
const util = require('util');
const program = {
    cwd:process.cwd()

};

let config = getWebpackConfig(program,true);
 config.entry={
 	 main: '../tmp/entry.index.js'
        // main: './template/Layout/index.jsx'//, //唯一入口文件
        // vendor: ['react']
    },
console.log(util.inspect(config,{showHidden:true,depth:4}));

module.exports = config;
