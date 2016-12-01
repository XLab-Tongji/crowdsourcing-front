'use strict';

app.controller('ProjectGroupCreateController', ['$scope', '$state', 'ToasterTool', 'ProjectGroupFactory','SessionService', function($scope,
    $state, ToasterTool, ProjectGroupFactory, SessionService) {


    init();

    function init(){
      console.log($state);
      console.log('ProjectGroupCreateController Init');
      $scope.createprojectgroup = createprojectgroup;
      $scope.user = SessionService.getCurrentUser();
    }



    function createprojectgroup(){
       var projectgroup_name = $scope.projectgroup_name;
       var visibility_level = $scope.visibility_level;



           ProjectGroupFactory.createProjectGroup().post({
                'name': projectgroup_name,
                'visibility_level':visibility_level

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
