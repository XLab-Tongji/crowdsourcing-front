'use strict';

app.controller('MainController', ['$scope', '$state', 'ToasterTool', 'SessionService',  function($scope,
    $state, ToasterTool, SessionService) {

    $scope.data = "xtd sb!";

    init();

    function init(){
      // if (SessionService.getToken()) {
      //   ToasterTool.success('登录成功','欢迎回到众包平台!');
      // }
    }

}]);
