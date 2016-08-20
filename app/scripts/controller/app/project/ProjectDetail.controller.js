'use strict';

app.controller('ProjectDetailController', ['$scope', '$state', 'ToasterTool',  'ProjectFactory',  function($scope,
    $state, ToasterTool, ProjectFactory) {

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
    }

    function selectIssue(issueId){
      $scope.issueBoxShow.list = false;
      $scope.issueBoxShow.detail = true;
    }

    function showIssueList(){
      $scope.issueBoxShow.list = true;
      $scope.issueBoxShow.detail = false;
    }


}]);
