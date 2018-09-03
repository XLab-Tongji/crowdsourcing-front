'use strict';

app.controller('ProjectManagerController', ['$scope', '$state', 'ToasterTool', 'ProjectFactory', '$stateParams', 'SessionService', function($scope,
    $state, ToasterTool, ProjectFactory,$stateParams) {

    $scope.projects = [];
    $scope.deleteProject = deleteProject;


    init();

    function init(){
      console.log($state);
      console.log('ProjectManagerController Init');

      $scope.refreshContent=refreshContent;

      getProjects();
    }

    function getProjects(){
      ProjectFactory.getProjectList().get({}, getProjectListSuccess, getProjectListFailed);
    }

    function getProjectListSuccess(data) {
      console.log(data)

      angular.copy(data, $scope.projects);

    }

    function getProjectListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
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

    //刷新
    function refreshContent(){
      $route.reload();
    }

    //跳转:)
    // function goProjectDetail(){
    //   $state.go("")
    // }


}]);
