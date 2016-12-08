'use strict';

app.controller('MilestoneManagerController', ['$scope', '$state', 'ToasterTool', 'ProjectFactory', '$stateParams', function($scope,
    $state, ToasterTool, ProjectFactory,$stateParams) {

    $scope.milestone = [];
    $scope.deleteMilestone = deleteMilestone;


    init();

    function init(){
      console.log($state);
      console.log('MilestoneManagerController Init');

      getMilestoneList();
    }

    function getMilestoneList(data){
      ProjectFactory.getProjectList().get({
        
      },  getMilestoneListSuccess, getMilestoneListFailed);

      

    }

    function getMilestoneListSuccess(data) {
      if (data.success) {
        angular.copy(data.data, $scope.projects);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getMilestoneListFailed(error){
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
