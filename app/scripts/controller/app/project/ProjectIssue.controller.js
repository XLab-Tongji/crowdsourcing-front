'use strict';

app.controller('ProjectIssuesController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'generalService', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, generalService) {

    var project_id = $stateParams.id;

    var errorHandler = ErrorHandlerFactory.handle;
    $scope.issues = [];
    $scope.paginator = angular.copy(generalService.DEFAULT_PAGINATOR_TEMPLATE);

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='xtd sb!';
      $scope.getDetail = getDetail;
      $scope.pageChanged = getProjectIssues;
      getProjectIssues();
    }

    function getDetail(){
      $state.go('app.project-detail.issues-detail',{data:"test"});
    }

    function getProjectIssues() {
      ProjectFactory.getProjectIssues().get({
				id:project_id,
        pageSize:generalService.pageSize(),
        pageNum:$scope.paginator.page
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
					angular.copy(data, $scope.issues);
          $scope.paginator = HttpResponseFactory.getResponsePaginator(response);
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }


}]);
