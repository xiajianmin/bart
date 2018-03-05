'use strict'

const Inert = require('inert'),
	path = require('path');

exports.register = (server, options, next) => {
	server.register(
		[
			Inert
		],

		(err) => {
			if (err) {
				return next(err);
			}

			// allow access to public files
			server.route({
				method: 'GET',
				path: '/public/{path*}',
				handler: {
					directory: {
						path: './public',
						listing: false,
						index: false
					}
				}
			});

			server.ext('onPostHandler', (request, reply) => {
				const response = request.response;
				if (response.isBoom && response.output.statusCode === 404) {
					return reply.file('client/index.html')
				}
				return reply.continue();
			});

			return next();
		}
	);
};

exports.register.attributes = {
	name: 'system-config'
};
