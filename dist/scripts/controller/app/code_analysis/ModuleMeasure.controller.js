'use strict';

app.controller('ModuleMeasureController', ['$scope', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $http, $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    init();

    function init(){
      console.log($state)
      $scope.projectId = $stateParams.id;
      $scope.projectName = $stateParams.name;

      $scope.isCollapsed = true;

      $scope.coled = function () {
        // console.log("collapsed");
      }
      $scope.coling = function () {
          // console.log("collapsing");
      }
      $scope.exped = function () {
          // console.log("expanded");
      }
      $scope.exping = function () {
          // console.log("expanding");
      }
      getModuleMeasures();
    }

    function getModuleMeasures() {
      var url = "http://120.79.15.205:8080/api/testjoin/" + $scope.projectId;

      $http.get(url, {
        
      }).success(function(results){
        $scope.moduleMeasures = results.shit;
        console.log(results)
      });

    }

}]);

