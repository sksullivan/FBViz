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
    	$scope.rangeMax = 1000;
    	var x2js = new X2JS();
    	$http.get('/js/history.kml').success(function (data) {
			$scope.kmlJSON = x2js.xml_str2json(data);
		});
		$scope.pathStyle = {
			"color": "#ff7800",
			"weight": 5,
			"opacity": 0.65
		};
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
		$scope.test();
	});
	$scope.$watch('rangeMax',function() {
		$scope.test();
	});
	$scope.test = function () {
		if ($scope.pathLayer != undefined) {
			console.log("removing");
			$scope.map.removeLayer($scope.pathLayer);
		}

		var coordList = [];
		var max = parseInt($scope.rangeMax/1000 * $scope.kmlJSON.kml.Document.Placemark.Track.coord.length);
		var min = parseInt($scope.rangeMin/1000 * $scope.kmlJSON.kml.Document.Placemark.Track.coord.length);

		var secStartDate = Date.parse($scope.kmlJSON.kml.Document.Placemark.Track.when[min]);
		var date1 = Date(secStartDate);
		$scope.startDate = date1.toString().substr(4,11);

		var secEndDate = Date.parse($scope.kmlJSON.kml.Document.Placemark.Track.when[max]);
		var date2 = Date(secEndDate);
		$scope.endDate = date2.toString().substr(4,11);

		console.log(date1);
		console.log(secStartDate);

		for (var i=min;i<max;i++) {
			var coord = $scope.kmlJSON.kml.Document.Placemark.Track.coord[i].__text.split(' ')
			coordList.push([parseFloat(coord[0]), parseFloat(coord[1])]);
		}
		L.LineUtil.simplify(coordList);
		console.log("changing dat");

		$scope.path = [{
			"type": "LineString",
			"coordinates": coordList
		}];

		$scope.pathLayer = L.geoJson($scope.path, {
			style: $scope.pathStyle
		})
		$scope.pathLayer.addTo($scope.map);
	}
    $scope.init();
});