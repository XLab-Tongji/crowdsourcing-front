'use strict';

app.controller('ProjectIssueCreateController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'generalService', function ($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, generalService) {

    var project_id = $stateParams.project_id;

    var errorHandler = ErrorHandlerFactory.handle;


    init();

    function init() {
     
        $scope.goLabelsCreate = goLabelsCreate;
        $scope.createProjectIssue = createProjectIssue;

        getLabelsList();
        getProjectMembers();

    }


    //跳转到label创建页面
    function goLabelsCreate() {
        $state.go('app.labels-create', {
            "project_id": project_id
        })
        console.log(project_id);
    }

    //创建新issue
    function createProjectIssue() {


        ProjectFactory.createProjectIssue().post({
            id: project_id,
            "title": $scope.title,
            "description": $scope.description,
            "assignee": $scope.assignee,
            "milestone": $scope.milestone,
            "labels": $scope.labels

        }).$promise.then(function (response) {
            if (HttpResponseFactory.isResponseSuccess(response)) {
                var data = HttpResponseFactory.getResponseData(response);
            }
            else {
                errorHandler(response)
            }
        })
    }
    //获取标签列表
    function getLabelsList() {

        ProjectFactory.getProjectIssueLabels().get({
            id: project_id
        }).$promise.then(function (response) {
            if (HttpResponseFactory.isResponseSuccess(response)) {
                var data = HttpResponseFactory.getResponseData(response);
                $scope.labelslist=data;
                
            }
            else {
                errorHandler(response)
            }
        })

    }

    //获取项目member
 
  function getProjectMembers() {

    ProjectFactory.getProjectDetail().get({
      id: project_id
    })
      .$promise.then(function (response) {

        var data = response.data;
        $scope.members = data.members;
      })

  }




}]);
