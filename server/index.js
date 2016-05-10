require('babel-core/register')();

var koa = require('koa');
var fs = require('fs');

var ReactServer = require('react-dom/server');
var React = require('react');

var Layout = require('../client/Layout.jsx').default;
var App = require('../client/App.jsx').default;

var app = koa();

module.exports = function (bundleJsContent) {
    app.use(function * () {
        if (this.path === '/bundle.js') {
            this.body = bundleJsContent;
            this.set("Content-Type", 'application/x-javascript; char-set=utf-8');
            this.set("Content-Length", bundleJsContent.length);
        } else if (this.path.indexOf('/users') === 0) {
            this.body = JSON.stringify({
                name: 'react-server-render'
            });
        } else {
            var props = {
                html: ReactServer.renderToString(React.createElement(App))
            };
            this.body = ReactServer.renderToString(React.createElement(Layout, props));
        }
    });

    app.listen('1234', function () {
        console.log('Start server with port 1234')
    });
};

