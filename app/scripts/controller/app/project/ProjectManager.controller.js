'use strict';

app.controller('ProjectManagerController', ['$scope', '$state', 'ToasterTool', 'ProjectFactory', '$stateParams', function($scope,
    $state, ToasterTool, ProjectFactory,$stateParams) {

    $scope.projects = [];
    $scope.deleteProject = deleteProject;

    $scope.deleteProject = deleteProject;
    var id = $stateParams.id;


    init();

    function init(){
      console.log($state);
      console.log('ProjectManagerController Init');

      getProjects();
    }

    function getProjects(data){
      ProjectFactory.getProjectList().get({
        // 'members':members
      },  getProjectListSuccess, getProjectListFailed);

      //  var members = data.members;

    }

    function deleteProject(){

      ProjectFactory.deleteProject().delete({
        id:id
      });
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
}]);
