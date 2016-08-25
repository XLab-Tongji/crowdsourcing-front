'use strict';

app.controller('ProjectIssuesController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    var project_id = $stateParams.id;

    var errorHandler = ErrorHandlerFactory.handle;
    $scope.issues = [];

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='xtd sb!';
      $scope.getDetail = getDetail;
      getProjectIssues();
    }

    function getDetail(){
      $state.go('app.project-detail.issues-detail',{data:"test"});
    }

    function getProjectIssues() {
      ProjectFactory.getProjectIssues().get({
				id:project_id
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
					angular.copy(data, $scope.issues);
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }


}]);
