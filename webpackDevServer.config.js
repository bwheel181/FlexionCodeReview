const paths = require('./config/paths');
const chalk = require('chalk');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const public = process.env.PUBLIC || 'localhost';
const port = process.env.PORT || 8080;

// Development environment configuration. Here we:
// 1) Configure the  Webpack Dev Server. Its worth noting that if you are working in a remote dev
//    environment you will need to set the PUBLIC variable in a .env file to point to your public
//    facing IP in order for the webserver to work. If you are getting an 'Invalid host header'
//    error, you more than likely need to fix this.

module.exports = {
    public: public,
    contentBase: paths.build,
    hot: true,
    inline: true,
    stats: {
        colors: true
    },
}
