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
      getProjectDetail();
    }

    function getProjectDetail() {
      ProjectFactory.getProjectDetail().get({
				id:project_id
			})
			.$promise
			.then(function(response){
              console.log($stateParams);

				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
          console.log(data);
					$scope.projectName = data.name;
                    $scope.projectPath = data.namespace.path;
          $scope.projectPath = data.namespace.path;

				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }

   function resetProject(){
       ProjectFactory.resetProject().put({
           id:project_id
       })
   }
        

}]);
