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

      SessionFactory.login().post(loginForm)
      .$promise
      .then(function (data) {
        if (data.access_token) {
          SessionFactory.getUser().get({username: loginForm.username})
            .$promise
            .then(function(response) {
              SessionService.saveUser({
                'id': response[0].id,
                'username':loginForm.username,
                'avatar': response[0].avatar_url
              });
            });

          SessionService.saveToken(data.access_token);
          ToasterTool.success('登录成功','欢迎回到众包平台!');
        } else {
          ToasterTool.error('登录失败',error.message);
        }
      })
      .catch(function (error) {
        ToasterTool.error('登录失败',error.message);
      })

      // function loginSuccess(data){
        

      // }
      // function loginFailed(error){
      //   AlertTool.error({title:'失败',text:'用户名或者密码错误'}).then(function() {
      //   });
      // }
      //ToasterTool.success('登录成功','欢迎回到众包平台!');
    }

}]);
