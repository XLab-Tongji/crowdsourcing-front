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
      if (data.success) {
        angular.copy(data.data, $scope.projects);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getProjectListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }

    function codeAnalysis(name){
        var name = $scope.name;
        name = name.replace(" ","");
        name = name.replace(" ","");

        var archivePath = "http://115.159.55.131/" + name + "/repository/archive.zip?ref=master";
        console.log(archivePath);

        CodeAnalysisFactory.codeAnalysis().post({
            'path':'test',
            'archivePath':archivePath            

        }).$promise
          .then(function (data) {
            if (data.success) {
                console.log(data.data);
            } else {
                ToasterTool.error('错误', data.message);
            }
        });

    }

    

}]);

