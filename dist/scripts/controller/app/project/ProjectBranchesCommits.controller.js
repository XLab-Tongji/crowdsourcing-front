'use strict';

app.controller('ProjectBranchesCommitsController', ['$scope', '$state', '$stateParams', '$location', 'ToasterTool', 'ProjectFactory', function ($scope,
  $state, $stateParams, $location, ToasterTool, ProjectFactory) {

  var project_id = $stateParams.id;
  $scope.projectsId = project_id;

  var branch_name = $stateParams.branch_name;
  $scope.branch_name = branch_name;

  init();

  function init() {

    $scope.getProjectBranchDetail = getProjectBranchDetail;

    $scope.getProjectBranchFileDetail = getProjectBranchFileDetail;

    var path = $stateParams.path;
    $scope.dispalyPath = path;

    getProjectBranchDetail(project_id, path, branch_name);

    // getProjectBranchFileDetail(project_id, path, branch_name);

    $scope.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      readOnly: 'nocursor'
    };


  }

  //查看分支文件代码信息
  function getProjectBranchFileDetail(id, path, branch_name) {
    ProjectFactory.getProjectBranchFileDetail().get({
      id: id,
      path: path,
      ref_name: branch_name
    }).$promise.then(function (data) {

      if (data.data.length == 0) {
        return;
      } else {
        $scope.codeDetail = data.data;
        $scope.refresh = false;//刷新问题
      }

    });
  }


  function getProjectBranchDetail(id, path, branch_name) {
    ProjectFactory.getProjectBranchDetail().get({
      id: id,
      path: path,
      ref_name: branch_name
    }).$promise.then(function (data) {
      $scope.contents = data;
    })
  }





}]);
