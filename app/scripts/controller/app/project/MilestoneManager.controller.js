'use strict';

app.controller('MilestoneManagerController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    $scope.milestones = [];
    $scope.milestoneId = -1;
    $scope.getMilestoneDetail = getMilestoneDetail;
    $scope.createMilestone = createMilestone;
    $scope.closeMilestone = closeMilestone;
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
   
      $state.go('app.milestone-detail', {
        "id":project_id,
        "milestoneId":id
      });
    }

    function createMilestone(){
      console.log("test");
      
      
      $state.go('app.milestone-create',{
        "id":project_id
      });
      

    }


    function closeMilestone(id){
      var state_event = ''

      ProjectFactory.closeMilestone().put({
        "id":project_id,
        "milestoneId":id,
        "state_event":'close'

      }, closeMilestoneSuccess, closeMilestoneFailed);
    }

    function closeMilestoneSuccess (data) {
      if(data.success) {
        location.reload();
        ToasterTool.message('更改里程碑状态成功');

      } else {
        ToasterTool.error('错误', data.message);
      }
    }

    function closeMilestoneFailed(error) {
      ToasterTool.error('错误', '更改里程碑状态失败');
    }


}]);
