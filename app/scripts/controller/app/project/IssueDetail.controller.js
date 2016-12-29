'use strict';

app.controller('IssueDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'SessionService', function ($scope,
  $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, SessionService) {

  var project_id = $stateParams.id;
  var issue_id = $stateParams.issueId;

  $scope.issueDetail = {};
  // $scope.currentUser = SessionService.getCurrentUser();
  $scope.issueComment = [];

  init();

  function init() {
    console.log("test");
    console.log('ready to get yardstick code content!');

    getIssueDetail();

    getIssueComment();
    $scope.postNewComment=postNewComment;

  }


  function getIssueDetail() {
    console.log(project_id + " " + issue_id)
    ProjectFactory.getProjectIssueDetail().get({
      id: project_id,
      issueId: issue_id
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {

          var data = HttpResponseFactory.getResponseData(response);
          angular.copy(data, $scope.issueDetail);
        } else {
          ToasterTool(response);
        }
      })
  }

  //获取动态列表
  function getIssueComment() {
    ProjectFactory.getIssueComment().get({
      id: project_id,
      issue_id: issue_id
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          angular.copy(data, $scope.issueComment);

        } else {
          ToasterTool.error(response);
        }
      })
  }
  //  发布新评论
  function postNewComment() {
    console.log($scope.commentContent);

    ProjectFactory.postIssueComment().post({
      id: project_id,
      issue_id: issue_id,
      body: $scope.commentContent
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          //刷新
          getIssueComment();
        } else {
          ToasterTool.error(response);
        }
      })

  }


}]);
