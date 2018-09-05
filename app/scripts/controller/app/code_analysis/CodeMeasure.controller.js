'use strict';

app.controller('CodeMeasureController' ,['$scope', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
    $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    $scope.codeAnalysis = codeAnalysis;
    init();


    function init(){
      console.log($state);
      console.log('CodeMeasureController Init');

      getProjects();
    }


     function getProjects(data){
      ProjectFactory.getProjectList().get({
      },  getProjectListSuccess, getProjectListFailed);
    }

    function getProjectListSuccess(data) {
      if (data) {
        angular.copy(data, $scope.projects);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getProjectListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }

    function codeAnalysis(name){
        var name = $scope.name;

        var ip = "http://10.60.38.173:18080";
        var archivePath = ip + "/" + name + "/-/archive/master/test-master.zip"
        console.log(archivePath);

        CodeAnalysisFactory.codeAnalysis().post({
            // 'name':name,
            'path':'test',
            'archivePath':archivePath            

        }).$promise
          .then(function (data) {
            if (data.success) {
              $scope.detectedProject = name;
              $scope.metric = data.data.SoftwareMetrics[0][0].metricsData;
              console.log(data.data.SoftwareMetrics[0]);
              console.log(data.data.SoftwareMetrics[0][0]);
              console.log($scope.metric);
            } else {
                ToasterTool.error('错误', data.message);
            }
        });

    }

    

}]);

