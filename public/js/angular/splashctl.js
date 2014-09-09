var fbVizApp = angular.module('fbVizApp',[]);

fbVizApp.controller('splashctl', function ($scope, $http) {
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
		$scope.startRange;
		$scope.endRange;
		$scope.go = true;
	};

	$scope.dataList = new Array(2);

	$scope.updateTimes = function() {
		for(var i = 0; i < $scope.dataList.length; i++) {
			for(var j = 0; j < $scope.dataList[i].length; j++) {
				$scope.dataList[i][j].created_time = (new Date($scope.dataList[i][j].created_time)).getTime();
			}
		}
	}

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
	        				$scope.tempDataHolder = response; 
	        				console.log($scope.tempDataHolder.data);
	        				var reqs = 2;
	        				callback = function () {
	        					$http.post('/postFB', {data: $scope.dataList}).success(function (data) {
	        						$scope.checks[2] = "check";
	        						console.log(data);
	        					});
	        				}
	        				for(var i = 0; i < 2; i++) {
	        					$scope.dataList[i] = $scope.tempDataHolder.data; 
	        					console.log($scope.dataList[i]);
	        					$http.get($scope.tempDataHolder.paging.next)
	        						.success(function (data) {
	        							$scope.tempDataHolder = data; 
	        							console.log($scope.tempDataHolder);
	        							$scope.dataSetSize = $scope.dataList[0].length;
	        							$scope.updateTimes();
	        							if (--reqs == 0) {
	        								callback();
	        							}
	        						}); 
	        				}
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

	$scope.updateDate = function () {
		$scope.startSecs = Date.parse($scope.startRange);
		$scope.endSecs = Date.parse($scope.endRange);
	}

	$scope.download = function () {
		$scope.updateDate();
		$scope.checks[0] = "check";
	}

	$scope.checks = ["x","x","x"];

	$scope.upload = function () {
		$scope.go = false;
		$scope.checks[0] = "check";
	}
	$scope.submit = function () {
		$scope.checks[1] = "check";
	}

    $scope.init();
});