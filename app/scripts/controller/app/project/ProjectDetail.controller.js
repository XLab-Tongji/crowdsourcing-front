'use strict';

app.controller('ProjectDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    $scope.tab = 1;

    var project_id = $stateParams.id;
    
    $scope.projectName = "";

    var errorHandler = ErrorHandlerFactory.handle;

    init();

    $scope.issueBoxShow = {
      list: true,
      detail: false
    }

    function init(){
      console.log('ready to get yardstick code content!');
      $scope.getProjectCommits = getProjectCommits;
      $scope.getProjectTasks = getProjectTasks;
      $scope.getProjectIssues = getProjectIssues;
      $scope.getProjectFiles = getProjectFiles;
      $scope.getProjectMembers = getProjectMembers;
      $scope.getProjectSettings = getProjectSettings;
      getProjectDetail();

    }

    function getProjectDetail() {
      ProjectFactory.getProjectDetail().get({
				id:project_id
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
					$scope.projectName = data.name;
          $scope.projectid  = data.id;
          console.log($scope.projectid);
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }

    function getProjectCommits(){
      $scope.tab = 1;
      $state.go('app.project-detail.codes.commits');
    }

    function getProjectTasks(){
      $scope.tab = 2;
      $state.go('app.task');
    }

    function getProjectIssues(){
      $scope.tab = 3;
      $state.go('app.project-detail.issues');
    }

    function getProjectFiles(){
      $scope.tab = 4;
      $state.go('app.project-detail.files');
    }

    function getProjectMembers(){
      $scope.tab = 5;
      $state.go('app.project-detail.members');
    }

    function getProjectSettings(){
      $scope.tab = 6;
      $state.go('app.project-reset', {
        "id":project_id
      });
    }
        

}]);
