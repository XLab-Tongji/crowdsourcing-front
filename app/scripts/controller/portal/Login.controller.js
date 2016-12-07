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
        if (data.success) {
          SessionService.saveUser({
            'username':data.data.username,
            'name':data.data.name,
            'avatarUrl':data.data.avatar_url,
            'email':data.data.email
          });
          SessionService.saveToken(data.data.private_token);
          ToasterTool.success('登录成功','欢迎回到众包平台!');
        }else {
          ToasterTool.success('登录失败',data.message);
        }

      }
      function loginFailed(error){
        AlertTool.error({title:'失败',text:'用户名或者密码错误'}).then(function() {
        });
      }
      //ToasterTool.success('登录成功','欢迎回到众包平台!');
    }

}]);
