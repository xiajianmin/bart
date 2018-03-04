'use strict'

const api = require('../controllers/api');

exports.register = (server, options, next) => {

	server.route({
		method: 'GET',
		path: '/stations',
		handler: function(request, reply) {
			api.stations(request, reply);
		}
	});

	server.route({
		method: 'GET',
		path: '/trips',
		handler: function(request, reply) {
			api.trips(request, reply)
		}
	});

	server.route({
		method: 'GET',
		path: '/station',
		handler: function(request, reply) {
			api.station(request, reply)
		}
	});

	return next();
}

exports.register.attributes = {
	name: 'routes-api'
};
