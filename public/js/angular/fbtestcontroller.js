var fbVizApp = angular.module('fbVizApp',[]);

fbVizApp.controller('fbtestcontroller', function ($scope) {
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
	};
	$scope.login = function () {
		FB.getLoginStatus(function (response) {
			console.log(response);
			if (response.status === 'connected') {
				id = response.authResponse.userID;
				access_token = response.authResponse.accessToken;
				FB.api(
	    			"/me",
	    			function (response) {
	      				if (response && !response.error) {
	        				$scope.test = "welcome "+response.first_name;
	      				}
	    			}
				);
				return;
			} else {
				console.log('not');
			}
			access_token = "";
			FB.login(function (response) {
				if (response.authResponse) {
					console.log(FB.getAuthResponse());
					access_token = FB.getAuthResponse()['accessToken'];
				} else {
					console.log('FB LOGIN ERROR: User cancelled login or did not fully authorize.');
				}
			}, { scope: 'publish_actions,publish_stream' }); // The specific permissions we need from FB
		});
	}
    $scope.test = "Click above...";
    $scope.init();
});