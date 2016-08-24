'use strict';

app.controller('ProjectDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool',  function($scope,
    $state, $stateParams, ToasterTool) {

    $scope.tab = 1;

    $scope.projectName = $stateParams.data;

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
      $state.go('app.project-detail.codes.commits');
    }

    function getProjectTasks(){
      $scope.tab = 2;
      $state.go('app.project-detail.tasks');
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
    }


}]);
