'use strict'

const home = require('../controllers/home');

exports.register = (server, options, next) => {

	server.route({
		method: 'GET',
		path: '/',
		handler: function(request, reply) {
			home.index(request, reply);
		}
	});

	return next();
}

exports.register.attributes = {
	name: 'routes-home'
};
