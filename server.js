#!/usr/bin/env nodejs

'use strict';

const Hapi = require('hapi');
const Handlebars = require('handlebars');
const Vision = require('vision');

const server = new Hapi.Server();
server.connection({
	port: 3000,
	host: 'localhost'
});

server.register(
	[
		require('./server/routes/config'),
		require('./server/routes/api'),
		require('./server/routes/home'),
		Vision
	],

	(err) => {
		if (err) {
			throw err;
		}

		server.views({
			engines: {
				html: Handlebars
			},
			path: __dirname + '/client',
			layoutPath: __dirname + '/client/layout',
			layout: 'default'
		});

		// Start the server
		server.start((err) => {
			console.log('Server running at:', server.info.uri);
		});
	}
)
