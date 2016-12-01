'use strict';

app.controller('ProjectCommitsController', ['$scope', '$state', '$stateParams', '$location', 'ToasterTool', 'ProjectFactory', function ($scope,
    $state, $stateParams, $location, ToasterTool, ProjectFactory) {

    var project_id = $stateParams.id;
    $scope.projectsId = project_id;

    init();

    function init() {
        console.log($state);
        console.log('ready to get yardstick code content!');

        //$scope.getProjectContent = getProjectContent;

        $scope.getgetProjectContentTest = getProjectContentTest;

        $scope.getProjectFileDetail = getProjectFileDetail;

        $scope.goBranchList = goBranchList;

        var path = $stateParams.path;
        $scope.dispalyPath = path;

        var branch_name = $stateParams.branch_name;
        $scope.branch_name = branch_name;

        if (branch_name == null) {
            getProjectContentTest(project_id, path);


            $scope.editorOptions = {
                lineWrapping: true,
                lineNumbers: true,
                readOnly: 'nocursor'
            };


            getProjectFileDetail(project_id, path);


        } else {
            getProjectBranchDetail(project_id, path, branch_name);

            getProjectBranchFileDetail(project_id, path, branch_name);

        }



        $scope.editorOptions = {
            lineWrapping: true,
            lineNumbers: true,
            readOnly: 'nocursor'
        };


    }

    //查看文件代码信息
    function getProjectFileDetail(id, path) {
        ProjectFactory.getProjectFileDetail().get({
            id: id,
            path: path
        }).$promise.then(function (data) {

            if (data.data.length == 0) {
                return;
            } else {
                $scope.codeDetail = data.data;
                $scope.refresh = false;//刷新问题
            }

        });
    }


    function getProjectContentTest(id, path) {
        ProjectFactory.getProjectContent().get({
            id: id,
            path: path
        }).$promise.then(function (data) {
            $scope.contents = data.data;
        })
    }

    function goBranchList() {
        $state.go("app.project-detail.codes.branches", {
            "project_id": project_id
        });
    }


    //查看分支文件代码信息
    function getProjectBranchFileDetail(id, path, branch_name) {
        ProjectFactory.getProjectBranchFileDetail().get({
            id: id,
            path: path,
            ref_name: branch_name
        }).$promise.then(function (data) {

            if (data.data.length == 0) {
                return;
            } else {
                $scope.codeDetail = data.data;
                $scope.refresh = false;//刷新问题
            }

        });
    }


    function getProjectBranchDetail(id, path, branch_name) {
        ProjectFactory.getProjectBranchDetail().get({
            id: id,
            path: path,
            ref_name: branch_name
        }).$promise.then(function (data) {
            $scope.contents = data.data;
        })
    }




}]);
