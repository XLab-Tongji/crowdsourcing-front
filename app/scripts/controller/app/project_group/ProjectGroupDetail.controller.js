'use strict';

app.controller('ProjectGroupDetailController', ['$scope', '$state', 'ToasterTool', 'ProjectGroupFactory', '$stateParams', function($scope,
    $state, ToasterTool, ProjectGroupFactory,$stateParams) {

    $scope.group = {};
    // $scope.members = [];
    $scope.deleteProjectGroup = deleteProjectGroup;
    $scope.groupid = $stateParams.id;

    init();

    function init(){
      console.log($state);
      console.log('ProjectGroupDetailController Init');
      getProjects();
    }

    function getProjects(data){
      ProjectGroupFactory.getProjectGroupDetail().get({
        'id':$scope.groupid
      },  getProjectGroupDetailSuccess, getProjectGroupDetailFailed);

      //  var members = data.members;

    }

    function getProjectGroupDetailSuccess(data) {
      if (data.success) {
        angular.copy(data.data, $scope.group);
        // angular.copy(data.data.members,$scope.members);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getProjectGroupDetailFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }


    function deleteProjectGroup(id){
      //console.log( ProjectGroupFactory.deleteProjectGroup().)
      ProjectGroupFactory.deleteProjectGroup().delete({
        'id':$scope.groupid
      }, deleteProjectGroupSuccess, deleteProjectGroupFailed);
    }

    function deleteProjectGroupSuccess (data) {
      if(data.success) {
        location.reload();
        ToasterTool.message('删除项目组成功');
      } else {
        ToasterTool.error('错误', data.message);
      }
    }

    function deleteProjectGroupFailed(error) {
      ToasterTool.error('错误', '删除项目组失败');
    }


}]);
