const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api',createProxyMiddleware({
        target: 'http://192.168.50.35:9983',
        changeOrigin: true
	}))
	app.use('/admin', createProxyMiddleware({
		target: 'http://192.168.50.35:9983',
		changeOrigin: true
	}))
    // app.use(proxy('/api', {
    //     target: 'http://192.168.50.149:19830',
    //     changeOrigin: true
    // }))
}