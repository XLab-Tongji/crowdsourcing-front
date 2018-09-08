'use strict';

app.controller('MilestoneManagerController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    $scope.milestones = [];
    $scope.milestoneId = -1;
    $scope.getMilestoneDetail = getMilestoneDetail;
    $scope.createMilestone = createMilestone;
    $scope.closeMilestone = closeMilestone;
    $scope.refresh = refresh;
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
      angular.copy(data, $scope.milestones);
      for(var x = 0; x < data.length; x ++) {
        if($scope.milestones[x].state == 'closed') {
          $scope.milestones[x].visible = false;
        } else {
          $scope.milestones[x].visible = true;
        }
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
      $state.go('app.milestone-create',{
        "id":project_id
      });
    }

    function closeMilestone(id){
      ProjectFactory.closeMilestone().put({
        "id":project_id,
        "milestoneId":id,
        "state_event":'close'
        
      }, closeMilestoneSuccess, closeMilestoneFailed);
    }

    function closeMilestoneSuccess (data) {
      location.reload();
      ToasterTool.success('关闭里程碑成功');
      state.go(app.milestone-detail)
    }

    function closeMilestoneFailed(error) {
      ToasterTool.error('错误', '删除项目失败');
    }

    function refresh () {
      location.reload();
    }

}]);
