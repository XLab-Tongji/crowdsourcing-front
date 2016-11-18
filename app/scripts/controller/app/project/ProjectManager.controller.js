'use strict';

app.controller('ProjectManagerController', ['$scope', '$state', 'ToasterTool', 'ProjectFactory', '$stateParams', function($scope,
    $state, ToasterTool, ProjectFactory,$stateParams) {

    $scope.projects = [];
    $scope.deleteProject = deleteProject;

    $scope.deleteProject = deleteProject;

    //$scope.currentUser = SessionService.getCurrentUser();

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


    function deleteProject(id){
      ProjectFactory.deleteProject().delete({
        id:id
      }, deleteProjectSuccess, deleteProjectFailed);
    }

    function deleteProjectSuccess (data) {
      if(data.success) {
        location.reload();
        ToasterTool.message('删除项目成功');
      } else {
        ToasterTool.error('错误', data.message);
      }
    }

    function deleteProjectFailed(error) {
      ToasterTool.error('错误', '删除项目失败');
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
