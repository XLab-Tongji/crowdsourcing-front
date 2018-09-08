'use strict';

app.controller('ProjectDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', '$localStorage', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, $localStorage) {

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
      // console.log('ready to get yardstick code content!');
      $scope.getProjectCommits = getProjectCommits;
      $scope.getProjectTasks = getProjectTasks;
      $scope.getProjectIssues = getProjectIssues;
      $scope.getProjectMilestones = getProjectMilestones;
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
				if(response){
					var data = response;
					$scope.projectName = data.name;
          $scope.projectid  = data.id;
          var path = data.path_with_namespace;
          var ip = "http://172.16.101.91:80/";
          $scope.gitUrl = ip + path + ".git";
          $scope.access_level = data.permissions.project_access.access_level;

				}
			})
      .catch(function(error) {
        delete $localStorage.gitUrl;
      });
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
    function getProjectMilestones(){
      $scope.tab = 4;
      $state.go('app.milestone', {
        "id":project_id
      });
    }
    function getProjectFiles(){
      $scope.tab = 5;
      $state.go('app.project-detail.files');
    }

    function getProjectMembers(){
      $scope.tab = 6;
      $state.go('app.project-detail.members');
    }

    function getProjectSettings(){
      $scope.tab = 7;
      $state.go('app.project-reset', {
        "id":project_id
      });
    }
        

}]);