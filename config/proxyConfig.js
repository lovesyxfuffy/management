module.exports = {
    proxy: {
        '/': {
            target: 'http://103.202.110.58:8080',
            changeOrigin: true
        }
    }
}
