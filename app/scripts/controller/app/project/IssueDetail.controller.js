'use strict';

app.controller('IssueDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'SessionService', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, SessionService) {

    var errorHandler = ErrorHandlerFactory.handle;

    var project_id = $stateParams.id;

    var issue_id = $stateParams.issueId;

    $scope.issueDetail = {};

    $scope.currentUser = SessionService.getCurrentUser();

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='xtd sb!';
      $scope.goBack = goBack;
      getDetail();
    }

    function goBack(){
      $state.go('app.project-detail.issues');
    }

    function getDetail(){
      ProjectFactory.getProjectIssues().get({
				id: project_id
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){

					var data = HttpResponseFactory.getResponseData(response);

          

          angular.copy(data, $scope.issueDetail);
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }


}]);
