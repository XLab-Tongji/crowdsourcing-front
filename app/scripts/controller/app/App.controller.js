'use strict';

app.controller('AppController', ['$scope', '$state', 'ToasterTool', 'SessionService',  function($scope,
    $state, ToasterTool, SessionService) {

    init();

    function init(){
      $scope.logout = logout;
      $scope.user = SessionService.getCurrentUser();
    }

    function logout(){
      SessionService.delToken();
    }

}]);
