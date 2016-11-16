'use strict';

app.controller('ProjectManagerController', ['$scope', '$state', 'ToasterTool', 'ProjectFactory', function($scope,
    $state, ToasterTool, ProjectFactory) {

    $scope.projects = [];

    init();

    function init(){
      console.log($state);
      console.log('ProjectManagerController Init');
    
      getProjects();
    }

    function getProjects(){
      ProjectFactory.getProjectList().get({},  getProjectListSuccess, getProjectListFailed);
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
