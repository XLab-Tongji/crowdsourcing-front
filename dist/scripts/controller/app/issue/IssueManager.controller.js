'use strict';

app.controller('IssueManagerController', ['$scope', '$state', 'ToasterTool', 'IssueFactory', '$stateParams', function($scope,
    $state, ToasterTool, IssueFactory,$stateParams) {

    $scope.issues = [];
    $scope.projectid;
    
    init();

    $scope.getIssueDetail = getIssueDetail;
    $scope.getProjectDetail = getProjectDetail;

    function init(){
      getIssues();
      
    }

    function getIssues(data){
      IssueFactory.getIssueList().get({
      },  getIssueListSuccess, getIssueListFailed);
    }



    function getIssueListSuccess(data) {
      if (data && data.length) {
        // console.log(data);
       
        angular.copy(data, $scope.issues);
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

    function getProjectDetail(id){
      $state.go('app.project-detail.issues',{
        'id':id
      })
    }


    


}]);
