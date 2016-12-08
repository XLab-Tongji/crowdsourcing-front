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
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
					$scope.projectName = data.name;
          $scope.projectPath = data.namespace.name;
				}else{
	        errorHandler(response);
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
      'visibility_level': visibility_level,
    }).$promise
    .then(function(data){
      if (data.success) {
        console.log("success reset");
        // $state.go('app.project-detail.codes.commits({'id': project_id})');
        $state.go('app.project-detail.codes.commits', {
        "id":project_id
        });
      }else{
        ToasterTool.error('权限不足');
      }
    });
  }
        

}]);
