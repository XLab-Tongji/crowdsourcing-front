'use strict';

app.controller('MilestoneDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', function($scope,

    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    $scope.tab = 1;

    var project_id = $stateParams.id;
    var milestoneId = $stateParams.milestoneId;
    
    $scope.projectName = "";

    var errorHandler = ErrorHandlerFactory.handle;

    init();

    function init(){
      console.log('ready to get yardstick code content!');
      
      getMilestoneDetail();

    }

    function getMilestoneDetail() {
      ProjectFactory.getMilestoneDetails().get({
				'id':project_id,
        'milestoneId':milestoneId
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
          $scope.milestone = data.milestone;
          getMilestoneLabels();
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }

    
    function getMilestoneLabels(){
      ProjectFactory.getMilestoneLabels().get({
        'id':project_id,
        'milestone':$scope.milestone.title
      })
      .$promise
      .then(function(response){
        if(HttpResponseFactory.isResponseSuccess(response)){
          var data = HttpResponseFactory.getResponseData(response);
          $scope.backlog = data[0];
          $scope.ongoing = data[1];
          $scope.completed = data[2];

          for(var x = 0; x < $scope.backlog.length; x ++) {
            $scope.backlog[x].index = x;
          }
          for(var x = 0; x < $scope.backlog.length; x ++) {
            $scope.ongoing[x].index = x;
          }
          for(var x = 0; x < $scope.backlog.length; x ++) {
            $scope.completed[x].index = x;
          }

        }else{
          errorHandler(response);
        }
      })
      .catch(errorHandler);
    }
        
    $scope.sortableOptions = {
        connectWith: ".connectList",
        update: function (event, ui){ 
          if (ui.item.sortable.received){
            console.log("aaa");
          //   ProjectFactory.updateMilestoneIssue().put({
          //   'id':project_id,
          //   'issue_id':$scope.issue.id,

          // })
      }    
     
    }
    };

  
}]);