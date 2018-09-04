'use strict';

app.controller('ProjectMembersController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'ErrorHandlerFactory', function ($scope,
  $state, $stateParams, ToasterTool, ProjectFactory, ErrorHandlerFactory) {

  var project_id = $stateParams.id;
  var errorHandler = ErrorHandlerFactory.handle;
  $scope.members = [];

  init();

  function init() {
    console.log($state);
    console.log('ready to get yardstick code content!');
    getProjectMembers(project_id);
    $scope.goDetailPage = goDetailPage;
  }

  function goDetailPage(userid) {
    $state.go("app.memberDetail", {
      "userid": userid
    });
  }


  function getProjectMembers(id) {

    ProjectFactory.getProjectMembers().get({
      id: project_id
    })
      .$promise.then(function (response) {
        $scope.data = {members: null};
        $scope.data.members = response;
      })

  }


}]);
