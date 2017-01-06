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
        // for(var x = 0;x < data.data.length;x++){
        //     // console.log(data.data[x].name_with_namespace);
        //     $scope.projects.push(data.data[x].name_with_namespace);
        // }
        // console.log($scope.projects);
        // $scope.test="test";
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
            console.log(data.success);
            if (data.success) {
                // ToasterTool.success('新建成功！');
                // $state.go('app.milestone',{
                //     'id':project_id
                // });
            } else {
                ToasterTool.error('错误', data.message);
            }
        });

    }

    

}]);

