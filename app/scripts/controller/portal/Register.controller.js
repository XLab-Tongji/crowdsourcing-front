'use strict';

app.controller('RegisterController', ['$scope', '$state', '$rootScope', 'AlertTool', 'ToasterTool', 'SessionFactory', function($scope,
    $state, $rootScope, AlertTool, ToasterTool, SessionFactory) {

    init();

    function init(){
      $scope.register = register;
    }

    function register(){
      var name = $scope.registerName;
      var username = $scope.registerUserName;
      var password = $scope.registerPassword;
      var email = $scope.registerEmail;

      SessionFactory.register().post({
        'name': name,
        'username': username,
        'password': password,
        'email': email,
      }).$promise
        .then(function(data){

        });

    }

}]);
