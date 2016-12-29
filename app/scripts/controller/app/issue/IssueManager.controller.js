'use strict';

app.controller('IssueManagerController', ['$scope', '$state', 'ToasterTool', 'IssueFactory', '$stateParams', function($scope,
    $state, ToasterTool, IssueFactory,$stateParams) {

    $scope.issues = [];
    $scope.projectid;
    
    init();

    $scope.getIssueDetail = getIssueDetail;

    function init(){
      getIssues();
      
    }

    function getIssues(data){
      IssueFactory.getIssueList().get({
      },  getIssueListSuccess, getIssueListFailed);
    }



    function getIssueListSuccess(data) {
      if (data.success) {
        console.log(data);
       
        angular.copy(data.data, $scope.issues);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getIssueListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }

    function getIssueDetail(id, issueId){
      $state.go('app.project-issues-detail',{
        'id':id,
        'issueId' : issueId
      })
    }


    


}]);
