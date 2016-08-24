'use strict';

app.controller('ProjectIssuesController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory) {

    var project_id = $stateParams.id;

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='xtd sb!';
      $scope.getDetail = getDetail;
    }

    function getDetail(){
      $state.go('app.project-detail.issues-detail',{data:"test"});
    }


}]);
