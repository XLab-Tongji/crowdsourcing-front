'use strict';

app.controller('ProjectIssueCreateController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'generalService', function ($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, generalService) {

    var project_id = $stateParams.project_id;

    var errorHandler = ErrorHandlerFactory.handle;

    var membersData;
    var milestonesData;


    init();

    function init() {

        $scope.goLabelsCreate = goLabelsCreate;
        $scope.createProjectIssue = createProjectIssue;

        getLabelsList();
        getProjectMembers();
        getProjectMilstone();

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

        var assignee = $scope.assignee;
        var milestone = $scope.milestone;
        var assignee_id = assignee.id;
        var milestone_id = milestone.id;
        var title = $scope.title;
        var description = $scope.description;

        var labels = $scope.labels;
        var labelsArrayList = "";

        for (var i = 0; i < labels.length; i++) {

            labelsArrayList +=labels[i].name+",";

        }

        ProjectFactory.createProjectIssue().post({
            id: project_id,
            "title": title,
            "description": description,
            "assignee_id": assignee_id,
            "milestone_id": milestone_id,
            "labels": labelsArrayList

        }).$promise.then(function (response) {
            if(response.code==201){
                ToasterTool.success('问题创建成功','');
                $state.go("app.project-detail.issues",{
                    "id": project_id
                });
            }
            else{
                ToasterTool.error('问题创建失败','');
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
                $scope.labelslist = data.labels;

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
                $scope.membersData = data;

                $scope.members = data.members;
            })

    }

    //获取项目milestone
    function getProjectMilstone() {
        ProjectFactory.getMilestonelist().get({
            id: project_id
        })
            .$promise.then(function (response) {
                var data = response.data;
                $scope.milestonesData = data;
                $scope.milestones = data.milestones;

            })
    }






}]);
