'use strict';

app.controller('TaskRecordController' ,['$scope', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $http, $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    init();

    function init(){
      console.log($state)
      $scope.projectId = $stateParams.id;
      $scope.projectName = $stateParams.name;
      getTaskDetail();
    }

    function getTaskDetail() {
      var url = "http://120.79.15.205:8080/api/task/" + $scope.projectId;

      $http.get(url, {
        headers : {'authorization': '1_7a387e078ff047aeb513a1b0cb5f4686'}
      }).success(function(results){
        $scope.taskDetail = results.RESULT_DATA.result;
      });

    }

}]);

