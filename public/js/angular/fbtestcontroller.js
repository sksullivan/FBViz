var fbVizApp = angular.module('fbVizApp',['uiSlider']);

fbVizApp.controller('fbtestcontroller', function ($scope, $http) {
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
		$scope.posts = [{story:"Click above..."}];
		L.mapbox.accessToken = 'pk.eyJ1IjoiYndhbmcxOSIsImEiOiIyMXFLVW1VIn0.qrzAS2lCItHR6CaqxqY3pA';
		$scope.map = L.mapbox.map('map', 'bwang19.je7fg9i6');
		// $scope.runLayer = omnivore.kml('/js/history.kml');
    	$scope.rangeMin = 0;
    	$scope.rangeMax = 100;
	};
	$scope.login = function () {
		FB.getLoginStatus(function (response) {
			console.log("getting status");
			if (response.status === 'connected') {
				console.log("status was connected");
				FB.api(
	    			"/me/posts",
	    			function (response) {
	    				console.log("got response for posts");
	      				if (response && !response.error) {
	        				$scope.test = "welcome!";
	        				$scope.$apply(function () {
	        					$scope.posts = response.data;
	        				});
	        				console.log($scope.posts[0]);
	      				}
	    			}
				);
				return;
			} else {
				console.log('status was not connected');
			}
			access_token = "";
			FB.login(function (response) {
				console.log("loggin in manually");
				if (response.authResponse) {
					console.log(FB.getAuthResponse());
					access_token = FB.getAuthResponse()['accessToken'];
				} else {
					console.log('FB LOGIN ERROR: User cancelled login or did not fully authorize.');
				}
			}, { scope: '' }); // The specific permissions we need from FB
		});
	}
	$scope.$watch('rangeMin',function() {

	});
	$scope.test = function () {
		var x2js = new X2JS();
		if (x2js == undefined) {
			return;
		}
		$http.get('/js/history.kml').success(function (data) {
			$scope.kmlJSON = x2js.xml_str2json(data);

			var coordList = [];
			var dataPoints = 100;
			for (var i=0;i<dataPoints;i++) {
				var coord = $scope.kmlJSON.kml.Document.Placemark.Track.coord[i].__text.split(' ')
				coordList.push([parseFloat(coord[0]), parseFloat(coord[1])]);
			}
			console.log(coordList);

			var myLines = [{
				"type": "LineString",
				"coordinates": coordList
			}];

			var myStyle = {
				"color": "#ff7800",
				"weight": 5,
				"opacity": 0.65
			};

			L.geoJson(myLines, {
				style: myStyle
			}).addTo($scope.map);
		});
	}
    $scope.init();
});