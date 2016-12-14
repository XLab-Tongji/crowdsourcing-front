'use strict';

app.controller('IssueDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory', 'HttpResponseFactory', 'SessionService', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, SessionService) {

    var project_id = $stateParams.id;
    var issue_id = $stateParams.issueId;

    $scope.issueDetail = {};
    // $scope.currentUser = SessionService.getCurrentUser();

    init();

    function init(){
      console.log("test");
      console.log('ready to get yardstick code content!');

      getIssueDetail();
    }


    function getIssueDetail(){
      console.log(project_id + " " + issue_id)
      ProjectFactory.getProjectIssueDetail().get({
				id: project_id, 
        issueId: issue_id
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){

					var data = HttpResponseFactory.getResponseData(response);

          

          angular.copy(data, $scope.issueDetail);
				}else{
          ToasterTool(response);
				}
			})
    }


}]);
