const barturl = 'http:\/\/api.bart.gov/api';
const bartkey = 'key=MW9S-E7SL-26DU-VV8V';
const bartjson = 'json=y';

const http = require('http');

const httpCall = (url) => {
	http.get(url, (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                let error;
                if (statusCode !== 200) {
                        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
			error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
                }

                if (error) {
                        console.error(error.message);
                        // consume response data to free up memory
                        res.resume();
                        return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                        try {
                                const parsedData = JSON.parse(rawData);
                                return parsedData;
                        } catch (e) {
                                return e.message;
                        }
                });
        }).on('error', (e) => {
                return "Got error: ${e.message}";
        });
}

// Gets a list of BART stations using BART API as JSON
const stations = (request, reply) => {
        let myurl = barturl + '/stn.aspx?cmd=stns&' + bartkey + '&' + bartjson;
	httpCall(myurl, function(res) {
                return reply(res);
        }); 
}

// Gives a details list of information for trains between supplied
// Source and Destination
// expected param: source, dest
const trips = (request, reply) => {
	var params = request.query
	var source = params.source
	var dest = params.dest
	var date = params.date || 'today';

	// error handler if either is null
	if (source == undefined || dest == undefined) {
		return reply('some variable is not there');
	}

	// if the content is not on the list?

	let myurl = barturl + '/sched.aspx?cmd=fare&' + bartkey + '&' + bartjson + '&orig=' + source + '&dest=' + dest + '&date=' + date;
	return httpCall(myurl, reply);
}

// Gives information about supplied station
// Expected param: source
const station = (request, reply) => {
	var params = request.query
	var source = params.source
	// error handler if source is null
	if (source == undefined) {
		return reply('Source is not available');
	}
	// error handler the station is not in the list?

	let myurl = barturl + '/stn.aspx?cmd=stninfo&' + bartkey + '&' + bartjson + '&orig=' + source; 
	return httpCall(myurl, reply);
}

module.exports = {
	stations: stations,
	trips: trips,
	station: station
}
