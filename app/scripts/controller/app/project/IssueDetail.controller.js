'use strict';

app.controller('IssueDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory) {

    var data = $stateParams.data;

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='xtd sb!';
      $scope.goBack = goBack;
    }

    function goBack(){
      $state.go('app.project-detail.issues');
    }


}]);
