fbVizApp.controller('uploadcontroller', function ($scope, $http) {
	$scope.init = function () {
		$( "#edatepicker" ).datepicker();
		$( "#sdatepicker" ).datepicker();
	};

	
    $scope.init();
});