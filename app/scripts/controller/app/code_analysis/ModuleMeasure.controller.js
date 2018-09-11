'use strict';

app.controller('ModuleMeasureController', ['$scope', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $http, $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    init();

    function init(){
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
      var url = "http://120.79.15.205:8080/api/testjoin/" + $scope.projectId + "?pageNum=1&pageSize=5";

      $http.get(url, {
        
      }).success(function(results){
        $scope.moduleMeasures = results.shit;
        console.log(results)
      });

    }

}]);

