'use strict';

app.controller('TaskRecordController' ,['$scope', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $http, $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    init();

    function init(){
      $scope.projectId = $stateParams.id;
      $scope.projectName = $stateParams.name;
      getTaskDetail();
    }

    // 正则表达式获取对应的sonarqube报表url
    function jumpToSonarqube(url) {
      var pattern = /id=(.*)/
      var result = pattern.exec(url)
      if(url.search(pattern) != -1) {
        $state.go('app.codeAnalysis.sonarqube', {projectUrl: result[1]})
      } else {
        $state.go('app.codeAnalysis.sonarqube')
      }
    }

    $scope.jumpToSonarqube = jumpToSonarqube

    function getTaskDetail() {
      var url = "http://120.79.15.205:8080/api/task/" + $scope.projectId;

      $http.get(url, {
        headers : {'authorization': '1_95ea71c38f0a476e87e4ac5dfa0ad394'}
      }).success(function(results){
        $scope.taskDetail = results.RESULT_DATA.result;
      });

    }

}]);

