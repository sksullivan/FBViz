var express = require('express');
var router = express.Router();
var request = require('request');
var cookie = require('cookies.txt');

/* GET users listing. */
router.get('/fb', function(req, res) {
	res.render('fbtest');
});

router.get('/map', function(req, res) {
	res.render('maptest');
});

router.get('/kml', function(req, res) {
	console.log('running dem jsonCookies');
	cookie.parse('/assets/cookies.txt', function(jsonCookies) {
		console.log("try?");
		console.log(jsonCookies);
		request.get(
			{
				url: 'https://maps.google.com/locationhistory/b/0/kml?startTime=1407470400000&endTime=1410062400000',
				jar: true,
				encoding: null,
				headers: {
					Cookie:cookie.getCookieString('https://maps.google.com/locationhistory/b/0/kml?startTime=1407470400000&endTime=1410062400000')
				}
			},
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body);
					res.send(body);
				}
			}
		);
	});
});

module.exports = router;
