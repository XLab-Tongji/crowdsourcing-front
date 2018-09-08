'use strict';

app.controller('ProjectCodesController', ['$scope', '$state', '$stateParams', '$location', 'ToasterTool', 'ProjectFactory', function ($scope,
  $state, $stateParams, $location, ToasterTool, ProjectFactory) {

  var project_id = $stateParams.id;
  $scope.projectsId = project_id;

  init();

  function init() {
   
    $scope.goBranchList = goBranchList;
    $scope.goCommitStatistic=goCommitStatistic;

  }


  function goBranchList() {
    $state.go("app.project-detail.codes.branches", {
      "project_id": project_id
    });
  }

  function goCommitStatistic(){
    $state.go("app.project-detail.codes.commitStatistic",{
      "project_id": project_id
    })
  }

}]);
