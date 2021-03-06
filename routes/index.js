var express = require('express');
var router = express.Router();
var fs = require('fs');
var busboy = require('connect-busboy');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/splash');
});

router.get('/splash', function(req, res) {
	try {
		fs.unlinkSync(__dirname + '/../public/assets/history.kml');
		console.log('successfully deleted '+__dirname + '/../public/assets/history.kml');
	} catch (e) {
		console.log('it wasnt there');
	}
	res.render('splash');
});

router.get('/fbtest', function(req, res){
	res.render('fbtest');
})

router.post('/upload', function(req, res) {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
		console.log("Uploading: " + filename);
			fstream = fs.createWriteStream(__dirname + '/../public/assets/history.kml');
			file.pipe(fstream);
			fstream.on('close', function () {
				console.log("Upload Finished of " + filename);              
				res.render('fbtest');
			});
		});
});

router.post('/postFB', function(req, res) {
	data = req.body.data
	res.send("bueno");
});

router.get('/getFB', function(req, res) {
	console.log('doin it');
	res.send(data);
});

module.exports = router;
