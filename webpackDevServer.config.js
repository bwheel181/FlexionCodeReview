const paths = require('./config/paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const public = process.env.PUBLIC || 'localhost'

// Development environment configuration. Here we:
// 1) Configure the  Webpack Dev Server. Its worth noting that if you are working in a remote dev
//    environment you will need to set the PUBLIC variable in a .env file to point to your public
//    facing IP in order for the webserver to work. If you are getting an 'Invalid host header'
//    error, you more than likely need to fix this.

module.exports = {
    public: public,
    https: protocol === 'https',
    contentBase: paths.build,
    hot: true,
    inline: true,
    stats: {
        colors: true
    }
}

    // // Dev server doesn't yet support proxies
    // devServer: {
    //     // public: PUBLIC,
    //     // contentBase: paths.build,
    //     // hot: true,
    //     // publicPath: ASSET_PATH,
    //     // clientLogLevel: 'none',
    //     // compress: true,
    //     // headers: {
    //     //     "Access-Control-Allow-Origin": "*",
    //     //     "Access-Control-Allow-Methods": "PUT, GET, OPTIONS, HEAD"
    //     // },
    //     // https: PROTOCOL === 'https',
    //     // quiet: true,
    //     // open: true,
    //     // useLocalIp: true,
    //     contentBase: paths.build,
    //     public: process.env.PUBLIC || 'localhost',
    // },