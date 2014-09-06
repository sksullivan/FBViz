var fbVizApp = angular.module('fbVizApp',[]);

fbVizApp.controller('fbtestcontroller', function ($scope, $http, $filter) {
	
	$scope.init = function () {
		FB.init({
			appId: '166064833600885'
		});
	};

	$scope.dataList = new Array(5); // this will hold the response later

	$scope.dataSetSize;

	$scope.num = 10; 

	$scope.otherArr = new Array();


	$scope.getCollection = function(num){ 
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
	        				console.log("resp = ");

	        				$scope.tempDataHolder = response; 
	        				console.log($scope.tempDataHolder.data);
	        				for(var i = 0; i < $scope.dataList.length; i++){
	        					$scope.dataList[i] = $scope.tempDataHolder.data; 
	        					console.log($scope.dataList[i]); 
	        					//$http.get($scope.tempDataHolder.paging.next, function(data){
	        					//	;
	        					//yay we're good now
	        					$http.get($scope.tempDataHolder.paging.next)
	        						.success(function(data){
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
			access_token = "";
			FB.login(function (response) {
				console.log("loggin in manually");
				if (response.authResponse) {
					var myEl = angular.element(document.querySelector('.login' )).text("Logged in! Now, get posts");
					console.log(FB.getAuthResponse());
					access_token = FB.getAuthResponse()['accessToken'];
				} else {
					console.log('FB LOGIN ERROR: User cancelled login or did not fully authorize.');
				}
			}, { scope: 'read_stream'}); // The specific permissions we need from FB
		});
	}

	
	var k = 0;
	//this is honestly the ugliest way to do this, but whatever
	$scope.updateTimes = function(){
		for(var i = 0; i < $scope.dataList.length; i++){
			for(var j = 0; j < $scope.dataList[i].length; j++){
				// for debugging purposes
				//bless nick's soul
				$scope.dataList[i][j].created_time = (new Date($scope.dataList[i][j].created_time)).getTime();
				//console.log($scope.otherArr.push($scope.dataList[i][j].created_time)); 
				//$scope.otherArr[k] = Date.parse($scope.otherArr[k]);
				//$scope.dataList[i][j] = $scope.otherArr[k];
				//k++;
				//$scope.dataList[i][j].created_time = (Date.parse($scope.dataList[i][j].created_time));
			}
		}
	}

    $scope.test = "Click above...";
    $scope.init();
});