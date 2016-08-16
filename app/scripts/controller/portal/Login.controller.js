'use strict';

app.controller('LoginController', ['$scope', '$state', 'AlertTool', 'ToasterTool', 'SessionFactory', 'SessionService', function($scope,
    $state, AlertTool, ToasterTool, SessionFactory, SessionService) {

    init();

    function init(){
      $scope.login = login;
    }

    function login(){
      var name = $scope.loginName;
      var password = $scope.loginPassword;

      var loginForm = {
        'login': name,
        'password': password
      }

      SessionFactory.login().post(loginForm, loginSuccess, loginFailed);

      function loginSuccess(data){
        SessionService.saveUser({
          'name':data.name,
          'avatarUrl':data.avatar_url,
          'email':data.email
        });
        SessionService.saveToken(data.private_token);
      }
      function loginFailed(error){
        AlertTool.error({title:'失败',text:'用户名或者密码错误'}).then(function() {
        });
      }
      //ToasterTool.success('登录成功','欢迎回到众包平台!');
    }

}]);
