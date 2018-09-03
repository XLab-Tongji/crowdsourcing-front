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
        "grant_type": "password",
        'username': name,
        'password': password
      }

      SessionFactory.login().post(loginForm, loginSuccess, loginFailed);

      function loginSuccess(data){
        if (data.access_token) {
          SessionService.saveUser({
            'username':loginForm.username
          });
          SessionService.saveToken(data.access_token);
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
