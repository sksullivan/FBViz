var fbVizApp = angular.module('fbVizApp',['uiSlider']);

fbVizApp.controller('fbtestcontroller', function ($scope, $http, $filter) {
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
		$scope.posts = [{story:"Click above..."}];
		L.mapbox.accessToken = 'pk.eyJ1IjoiYndhbmcxOSIsImEiOiIyMXFLVW1VIn0.qrzAS2lCItHR6CaqxqY3pA';
		$scope.map = L.mapbox.map('map', 'bwang19.je7fg9i6');
    	$scope.rangeMin = 0;
    	$scope.rangeMax = 1000;
    	$scope.endRange = new Date();
    	$scope.startRange = new Date();
    	$scope.getKML();
		$scope.pathStyle = {
			"color": "#ff7800",
			"weight": 5,
			"opacity": 0.65
		};
		$scope.$watch('rangeMin',function() {
			$scope.updateRange();
		});
		$scope.$watch('rangeMax',function() {
			$scope.updateRange();
		});
		$scope.hideMap = true;
		$scope.addPostAnnotations();
	};

	$scope.getKML = function() {
		var x2js = new X2JS();
    	$http.get('/assets/history.kml').success(function (data) {
			$scope.kmlJSON = x2js.xml_str2json(data);
			$scope.updateRange();
			$scope.haveData = false;
		}).error(function () {
			console.log("404");
		});
	}

	$scope.clear = function () {
		request.post('/clear');
	}

	$scope.dataSetSize;

	$scope.num = 10; 

	$scope.otherArr = new Array();


	$scope.getCollection = function (num) { 
		return new Array(num);
	};

	$scope.updateRange = function () {
		if ($scope.kmlJSON == undefined) {
			return;
		}
		if ($scope.pathLayer != undefined) {
			$scope.map.removeLayer($scope.pathLayer);
		}

		var coordList = [];
		var max = parseInt($scope.rangeMax/1000 * $scope.kmlJSON.kml.Document.Placemark.Track.coord.length);
		var min = parseInt($scope.rangeMin/1000 * $scope.kmlJSON.kml.Document.Placemark.Track.coord.length);

		$scope.startDate = ($scope.kmlJSON.kml.Document.Placemark.Track.when[min]).substr(0,10);
		$scope.endDate = ($scope.kmlJSON.kml.Document.Placemark.Track.when[max-1]).substr(0,10);

		for (var i=min;i<max;i++) {
			var coord = $scope.kmlJSON.kml.Document.Placemark.Track.coord[i].__text.split(' ')
			coordList.push([parseFloat(coord[0]), parseFloat(coord[1])]);
		}
		coordList = L.LineUtil.simplify(coordList);

		$scope.path = [{
			"type": "LineString",
			"coordinates": coordList
		}];

		$scope.pathLayer = L.geoJson($scope.path, {
			style: $scope.pathStyle
		});
		$scope.pathLayer.addTo($scope.map);
		$scope.map.fitBounds($scope.pathLayer.getBounds());
	}

	/*$scope.refineArray = function (array) {
		ret = [];

	}*/

	$scope.addPostAnnotations = function () {
		$http.get('/c/getFB').success(function (data) {
			console.log(data);
			$scope.markers = [];
			for(var i=0;i<data.length;i++) {
				for(var j=0;j<data[i].length;j++) {
					var marker = L.marker([51.5, -0.09]);
					$scope.markers.push(marker);
					marker.addTo($scope.map);
				}
			}
		});
	};

    $scope.test = "Click 'log-in' to get started!";
    $scope.init();
});