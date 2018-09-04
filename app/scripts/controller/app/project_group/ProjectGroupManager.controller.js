'use strict';

app.controller('ProjectGroupManagerController', ['$scope', '$state', 'ToasterTool', 'ProjectGroupFactory', '$stateParams','SessionService', function($scope,
    $state, ToasterTool, ProjectGroupFactory,$stateParams,SessionService) {

    $scope.groups = [];
    $scope.user = SessionService.getCurrentUser();
  
    // $scope.deleteGroup = deleteGroup;


    init();

    function init(){
      console.log($state);
      console.log('ProjectGroupManagerController Init');
      // $scope.visible = buttonshow;
      getProjectGroups();
     
    }

    function getProjectGroups(data){
      ProjectGroupFactory.getProjectGroupList().get({
        // 'members':members
      },  getProjectGroupListSuccess, getProjectGroupListFailed);

      //  var members = data.members;

    }

    function getProjectGroupListSuccess(data) {
        angular.copy(data, $scope.groups);
        console.log($scope.groups);
    }

    function getProjectGroupListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }

   


    // function deleteProject(id){
    //   ProjectFactory.deleteProject().delete({
    //     id:id
    //   }, deleteProjectSuccess, deleteProjectFailed);
    // }

    // function deleteProjectSuccess (data) {
    //   if(data.success) {
    //     location.reload();
    //     ToasterTool.message('删除项目成功');
    //   } else {
    //     ToasterTool.error('错误', data.message);
    //   }
    // }

    // function deleteProjectFailed(error) {
    //   ToasterTool.error('错误', '删除项目失败');
    // }


}]);
