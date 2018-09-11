'use strict';

app.controller('MainController', ['$scope', '$state', 'ToasterTool', 'SessionService',  function($scope,
    $state, ToasterTool, SessionService) {

    $scope.data = "欢迎来到托管平台!";

    init();

    function init(){
      $scope.goBranch=goBranch;
      // if (SessionService.getToken()) {
      //   ToasterTool.success('登录成功','欢迎回到众包平台!');
      // }
    }

    function goBranch(){
      $state.go("app.project-detail.codes.branches",{
        "project_id":id
      })
    }

}]);
