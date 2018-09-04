'use strict';

app.controller('ProjectResetController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {


    var project_id = $stateParams.id;

    $scope.projectName = "";


    var errorHandler = ErrorHandlerFactory.handle;

    init();

    $scope.issueBoxShow = {
      list: true,
      detail: false
    }

    function init(){
      console.log('ready to get yardstick code content!');
      $scope.resetProject = resetproject;
      getProjectDetail();
    }

    function getProjectDetail() {
      ProjectFactory.getProjectDetail().get({
				id:project_id
			})
			.$promise
			.then(function(response){
				if(response){
					var data = response;
					$scope.projectName = data.name;
          $scope.projectPath = data.namespace.name;
          $scope.visibility_level = data.visibility;
				}
			})
      .catch(errorHandler);
    }

  function resetproject(){
    var projectName = $scope.projectName;
    var visibility_level = $scope.visibility_level;
    ProjectFactory.resetProject().put({
      'id': project_id,
      'name': projectName,
      'visibility': visibility_level,
    }).$promise
    .then(function(data){
      if (data) {
        console.log("success reset");
        // $state.go('app.project-detail.codes.commits({'id': project_id})');
        $state.go('app.project-detail.codes.commits', {
          "id":project_id
        });
        ToasterTool.success('重置成功');
      }
    })
    .catch(function(error){
      ToasterTool.error('重置失败');
    });
  }
        

}]);
