'use strict';

app.controller('ProjectCreateController' ,['$scope', '$state', 'ToasterTool', 'ProjectFactory','ProjectGroupFactory','SessionService', function($scope,
    $state, ToasterTool, ProjectFactory, ProjectGroupFactory,SessionService) {


    init();


    function init(){
      console.log($state);
      console.log('ProjectCreateController Init');
      
      
      var namespace  = $scope.namespace;
      
      $scope.user = SessionService.getCurrentUser();
      $scope.createproject = createproject;
    
      getProjectGroups();
      var groups = $scope.groups = [] ;
      $scope.createproject = createproject;

      console.log($scope.user);
      // $scope.getType = getType;
      
    }

    function getProjectGroups(data){
      ProjectGroupFactory.getProjectGroupList().get({
        // 'members':members
      },  getProjectGroupListSuccess, getProjectGroupListFailed);

      //  var members = data.members;

    }

    function getProjectGroupListSuccess(data) {
      if (data.success) {
        angular.copy(data.data, $scope.groups);
      }else{
        console.log("错误","data.message");
        // ToasterTool.error('错误',data.message);
      }

    }

    function getProjectGroupListFailed(error){
      console.log("失败");
      // ToasterTool.error('错误','获取项目列表失败');
    }

    // function getType(groups,namespace){
    //   for (var i = 0; i < groups.length; i++) {
    //     if (groups[i].name==namespace) {
    //       return groups[i].type;
    //     }else if (groups[i].name==null) {
    //       return groups[i].type==null;
    //     }
    //   }

    // }

    function createproject(){


      
       var project_name = $scope.project_name;
       var visibility_level = $scope.visibility_level;
       var type = '';
       var namespace = $scope.namespace;

       
       console.log($scope.user.username);
        if(namespace == $scope.user.username) {
          type = 'user';
        } else {
          type = 'group';
        }

        ProjectFactory.createProject().post({
            'type':type,
            'namespace':namespace,
            'name': project_name,
            'visibility_level':visibility_level.value,
            

        }).$promise
          .then(function (data) {
            console.log(data.success);
            if (data.success) {
                ToasterTool.success('新建成功！');
                $state.go('app.project');
            } else {
                ToasterTool.error('错误', data.message);
            }
        });

    }

}]);
