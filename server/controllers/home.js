const api = require('./api');
const googleKey = "AIzaSyAeHd8YCGXmPjRLvokoUdFIyIT9XQHfZ7M"

const index = (request, reply) => {
	var res = {};
	res.mykey = googleKey 
	res.title = "List of BART stations";
	api.stations(request, function(d) {
		res.data = d.root.stations.station;
		reply.view('index', res)
	});
}

module.exports = {
	index: index,
}
