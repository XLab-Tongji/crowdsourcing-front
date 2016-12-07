'use strict';

app.controller('ProjectIssuesController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'generalService', function ($scope,
  $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, generalService) {

  var project_id = $stateParams.id;

  var errorHandler = ErrorHandlerFactory.handle;
  $scope.issues = [];
  $scope.paginator = angular.copy(generalService.DEFAULT_PAGINATOR_TEMPLATE);
  $scope.labels = [];
  $scope.authernames = [];



  init();

  function init() {
    console.log($state);
    console.log('ready to get yardstick code content!');

    $scope.getDetail = getDetail;
    $scope.pageChanged = getProjectIssues;
    getProjectIssues();
    getProjectIssuesLabels();
  }

  function getDetail(id) {
    $state.go('app.project-detail.issues-detail', { issueId: id });
  }

  function getProjectIssues() {
    ProjectFactory.getProjectIssues().get({
      id: project_id,
      pageSize: generalService.pageSize(),
      pageNum: $scope.paginator.page
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          angular.copy(data, $scope.issues);
          for (var i in data) {
            $scope.authernames.push(data[i].author.name);
          }
          $scope.authernames = arrayNoRepeat($scope.authernames);
          $scope.paginator = HttpResponseFactory.getResponsePaginator(response);
        } else {
          errorHandler(response);
        }
      })
      .catch(errorHandler);
  }

  function getProjectIssuesLabels() {
    ProjectFactory.getProjectIssueLabels().get({
      id: project_id
    })
      .$promise.then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          angular.copy(data, $scope.labels);

        }
        else {
          errorHandler(response)
        }
      })
      .catch(errorHandler);
  }

  //去重
  function arrayNoRepeat(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) == -1) {
        result.push(arr[i])
      }
    }
    return result;
  }

}]);
