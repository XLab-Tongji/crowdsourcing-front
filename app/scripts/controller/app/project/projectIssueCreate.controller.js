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
        var assignee_id = assignee? assignee.id : null;
        var milestone_id = milestone? milestone.id : null;
        var title = $scope.title;
        var description = $scope.description;

        var labels = $scope.labels ? $scope.labels: [];
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
            if(response){
                ToasterTool.success('问题创建成功','');
                $state.go("app.project-detail.issues",{
                    "id": project_id
                });
            }
         
        })
    }
    //获取标签列表
    function getLabelsList() {

        ProjectFactory.getProjectIssueLabels().get({
            id: project_id
        }).$promise.then(function (response) {
            if ( response && response.length>0) {
                var data = response;
                $scope.labelslist = data;

            }
        })

    }

    //获取项目member

    function getProjectMembers() {

        ProjectFactory.getProjectMembers().get({
            id: project_id
        })
            .$promise.then(function (response) {

                var data = response;
                $scope.members = data;
            })

    }

    //获取项目milestone
    function getProjectMilstone() {
        ProjectFactory.getMilestonelist().get({
            id: project_id
        })
        .$promise.then(function (response) {
            $scope.milestones = response;

        })
    }






}]);
