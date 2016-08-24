'use strict';

app.controller('ProjectMembersController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    var project_id = $stateParams.id;
	  var errorHandler = ErrorHandlerFactory.handle;
    $scope.members = [];

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      getProjectMembers(project_id);
    }

    function getProjectMembers( id ){

      ProjectFactory.getProjectMembers().get({
				id:project_id
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
					angular.copy(data, $scope.members);
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }


}]);
