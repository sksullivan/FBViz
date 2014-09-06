var fbVizApp = angular.module('fbVizApp',[]);

fbVizApp.controller('fbtestcontroller', function ($scope) {
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
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
	        				console.log("resp = ");
	        				console.log(response);
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
    $scope.test = "Click above...";
    $scope.init();
});