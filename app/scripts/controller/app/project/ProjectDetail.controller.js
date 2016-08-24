'use strict';

app.controller('ProjectDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    var project_id = $stateParams.id;
	  var errorHandler = ErrorHandlerFactory.handle;
    $scope.tab = 1;
    $scope.members = [];
    init();

    $scope.issueBoxShow = {
      list: true,
      detail: false
    }

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='xtd sb!';
      $scope.selectIssue = selectIssue;
      $scope.showIssueList = showIssueList;
      $scope.getProjectCommits = getProjectCommits;
      $scope.getProjectTasks = getProjectTasks;
      $scope.getProjectIssues = getProjectIssues;
      $scope.getProjectFiles = getProjectFiles;
      $scope.getProjectMembers = getProjectMembers;
      $scope.getProjectSettings = getProjectSettings;
    }

    function selectIssue(issueId){
      $scope.issueBoxShow.list = false;
      $scope.issueBoxShow.detail = true;
    }

    function showIssueList(){
      $scope.issueBoxShow.list = true;
      $scope.issueBoxShow.detail = false;
    }

    function getProjectCommits(){
      $scope.tab = 1;
    }

    function getProjectTasks(){
      $scope.tab = 2;
    }

    function getProjectIssues(){
      $scope.tab = 3;
    }

    function getProjectFiles(){
      $scope.tab = 4;
    }

    function getProjectMembers(){
      $scope.tab = 5;
      ProjectFactory.getProjectMembers().get({
				id:project_id
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
					angular.copy(data[0]['members'], $scope.members);
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }

    function getProjectSettings(){
      $scope.tab = 6;
    }


}]);
