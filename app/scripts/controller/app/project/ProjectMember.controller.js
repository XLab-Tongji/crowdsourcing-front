'use strict';

app.controller('ProjectMembersController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'ErrorHandlerFactory', function ($scope,
  $state, $stateParams, ToasterTool, ProjectFactory, ErrorHandlerFactory) {

  var project_id = $stateParams.id;
  var errorHandler = ErrorHandlerFactory.handle;
  $scope.members = []
  $scope.users = []
  $scope.user = null
  $scope.access = null
  $scope.levels = [
    {value : 10, name : "Guest access"},
    {value : 30, name : "Developer access"},
    {value : 40, name : "Maintainer access"}
  ]

  init();

  function init() {
    console.log($state);
    console.log('ready to get yardstick code content!');
    getUsers();
    getProjectMembers(project_id);
    $scope.goDetailPage = goDetailPage;
    $scope.addProjectMember = addProjectMember;
    $scope.updateProjectMemberAccessLevel = updateProjectMemberAccessLevel;
  }

  function getUsers() {
    ProjectFactory.getUserList().get()
    .$promise.then(function (response) {

      $scope.users = response;
    })
  }

  function goDetailPage(userid) {
    $state.go("app.memberDetail", {
      "userid": userid
    });
  }


  function getProjectMembers() {

    ProjectFactory.getProjectMembers().get({
      id: project_id
    })
      .$promise.then(function (response) {
        $scope.data = {members: null};
        $scope.data.members = response;
      })

  }

  function addProjectMember() {

    ProjectFactory.addProjectMember().post({
      id: project_id,
      user_id : $scope.user.id,
      access_level : $scope.access.value
    }).$promise.then(function (response) {
      if (response) {
        ToasterTool.success('添加成功!');
        $state.go("app.project-detail.members", {}, {"reload": true})
      }
    })
  }

  function updateProjectMemberAccessLevel(member_id, member_access_level) {
    ProjectFactory.updateProjectMemberAccessLevel().put({
      id: project_id,
      user_id: member_id,
      access_level: member_access_level
    }).$promise.then(function(response) {
      if (response) {
        ToasterTool.success('更新成员权限成功！')
      }
    }).catch(function(error) {
      ToasterTool.error("权限不足")
    });
  }


}]);
