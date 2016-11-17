'use strict';

app.controller('ProjectCreateController', ['$scope', '$state', 'ToasterTool', 'ProjectFactory','SessionService', function($scope,
    $state, ToasterTool, ProjectFactory, SessionService) {


    init();

    function init(){
      console.log($state);
      console.log('ProjectCreateController Init');
      $scope.createproject = createproject;
      $scope.user = SessionService.getCurrentUser();
    }



    function createproject(){
       var project_name = $scope.project_name;
       var visibility_level = $scope.visibility_level;



           ProjectFactory.createProject().post({
                'name': project_name,
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
