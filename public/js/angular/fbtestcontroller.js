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
    	$scope.startRange = new Date(); //default range, 1 day
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
	};

	$scope.getKML = function() {
		var x2js = new X2JS();
    	$http.get('/js/history.kml').success(function (data) {
			$scope.kmlJSON = x2js.xml_str2json(data);
			$scope.updateRange();
		});
	}

	$scope.updateDate = function() {
		$scope.startRange = new Date($scope.startRange).getTime();
		$scope.endRange = new Date($scope.endRange).getTime();
		$scope.getKML();
	}

	$scope.dataList = new Array(5); // this will hold the response later

	$scope.dataSetSize;

	$scope.num = 10; 

	$scope.otherArr = new Array();


	$scope.getCollection = function (num) { 
		return new Array(num);
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

	        				$scope.tempDataHolder = response; 
	        				console.log($scope.tempDataHolder.data);
	        				for(var i = 0; i < $scope.dataList.length; i++){
	        					$scope.dataList[i] = $scope.tempDataHolder.data; 
	        					console.log($scope.dataList[i]); 
	        					//$http.get($scope.tempDataHolder.paging.next, function(data){
	        					//	;
	        					//yay we're good now
	        					$http.get($scope.tempDataHolder.paging.next)
	        						.success(function (data) {
	        							$scope.tempDataHolder = data; 
	        							console.log($scope.tempDataHolder);
	        						}); 
	        				}
	        				$scope.dataSetSize = $scope.dataList[0].length;
	        				$scope.updateTimes();
	        				angular.element(document.querySelector('.login' )).text("Posts were retrieved!");
	      				}
	    			}
				);
				return;
			} else {
				console.log('status was not connected');
			}
			FB.login(function (response) {
				console.log("loggin in manually");
				if (response.authResponse) {
					var myEl = angular.element(document.querySelector('.login' )).text("Logged in! Now, get posts");
					console.log(FB.getAuthResponse());
					access_token = FB.getAuthResponse()['accessToken'];
				} else {
					console.log('FB LOGIN ERROR: User cancelled login or did not fully authorize.');
				}
			}, { scope: 'read_stream' }); // The specific permissions we need from FB
		});
	}

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
		L.LineUtil.simplify(coordList);

		$scope.path = [{
			"type": "LineString",
			"coordinates": coordList
		}];

		$scope.pathLayer = L.geoJson($scope.path, {
			style: $scope.pathStyle
		})
		$scope.pathLayer.addTo($scope.map);
	}
	
	var k = 0;
	//this is honestly the ugliest way to do this, but whatever
	$scope.updateTimes = function() {
		for(var i = 0; i < $scope.dataList.length; i++) {
			for(var j = 0; j < $scope.dataList[i].length; j++) {
				$scope.dataList[i][j].created_time = (new Date($scope.dataList[i][j].created_time)).getTime();
			}
		}
	}

    $scope.test = "Click 'log-in' to get started!";
    $scope.init();
});