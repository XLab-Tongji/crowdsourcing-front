'use strict';

app.controller('GroupManagerController', ['$scope', '$state', 'ToasterTool', 'GroupFactory', 'HttpResponseFactory', 'ErrorHandlerFactory',  function($scope,
    $state, ToasterTool, GroupFactory, HttpResponseFactory, ErrorHandlerFactory) {

    var errorHandler = ErrorHandlerFactory.handle;
    $scope.groups = [];
    $scope.groups1 = [];
    $scope.groups2 = [];
    $scope.groups3 = [];
    init();

    function init(){
      console.log($state);
      getGroupList();
    }

    function getGroupList(){
      GroupFactory.getGroupList().get({
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
          for (var i = 0; i < data.length; i++) {
            if(i%3 == 0){
              $scope.groups1.push(data[i]);
            }else if (i%3 == 1) {
              $scope.groups2.push(data[i]);
            }else if (i%3 == 2) {
              $scope.groups3.push(data[i]);
            }
          }
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }

}]);
