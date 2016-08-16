'use strict';

app.controller('LoginController', ['$scope', '$state', '$rootScope', 'AlertTool', 'ToasterTool', function($scope,
    $state, $rootScope, AlertTool, ToasterTool) {

    init();

    function init(){
      $scope.login = login;
    }

    function login(){
      var name = $scope.loginName;
      var password = $scope.loginPassword;

      // AlertTool.error({title:'失败',text:name+";"+password}).then(function() {
      // });

      // ToasterTool.error("自动登录失败", "请重新登录");
      ToasterTool.success('登录成功','欢迎回到众包平台!');
    }

}]);
