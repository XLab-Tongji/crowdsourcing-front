'use strict';

app.controller('MilestoneManagerController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    $scope.milestones = [];
    $scope.milestoneId = -1;
    $scope.getMilestoneDetail = getMilestoneDetail;
    // $scope.deleteMilestone = deleteMilestone;
    var project_id = $stateParams.id;


    init();

    function init(){
      console.log($state);
      console.log('MilestoneManagerController Init');

      getMilestoneList();
    }

    function getMilestoneList(data){
      ProjectFactory.getMilestonelist().get({
        'id' : project_id
      },  getMilestoneListSuccess, getMilestoneListFailed);

      

    }

    function getMilestoneListSuccess(data) {
      if (data.success) {
        angular.copy(data.data.milestones, $scope.milestones);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getMilestoneListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }

    function getMilestoneDetail(id) {
      console.log(project_id + " " + id);
      $state.go('app.milestone-detail', {
        "id":project_id,
        "milestone_id":id
      });
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
