var fbVizApp = angular.module('fbVizApp',[]);

fbVizApp.controller('fbtestcontroller', function ($scope) {
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
		$scope.posts = [{story:"Click above..."}];
		L.mapbox.accessToken = 'pk.eyJ1IjoiYndhbmcxOSIsImEiOiIyMXFLVW1VIn0.qrzAS2lCItHR6CaqxqY3pA';
		var map = L.mapbox.map('map', 'bwang19.je7fg9i6');
		var runLayer = omnivore.kml('/js/history.kml').on('ready', function() {
        	map.fitBounds(runLayer.getBounds());
    	}).addTo(map);
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
    $scope.init();
});