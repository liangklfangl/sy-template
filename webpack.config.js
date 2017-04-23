module.exports = {
	devServer:{
      publicPath:'/',
      open :true,
      port:8090,
      historyApiFallback: {
	  rewrites: [
	    { from: "/docs/react/common.js", to: '/common.js' },
	    { from: "/docs/react/index.js", to: '/index.js' },
       { from: "/docs/pattern/common.js", to: '/common.js' },
      { from: "/docs/pattern/index.js", to: '/index.js' },
       { from: "/docs/resource/common.js", to: '/common.js' },
      { from: "/docs/resource/index.js", to: '/index.js' },
       { from: "/docs/spec/common.js", to: '/common.js' },
      { from: "/docs/spec/index.js", to: '/index.js' }
	  ]
	},
      contentBase:false,
      hot:false
    }
}