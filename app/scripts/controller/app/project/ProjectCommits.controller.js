'use strict';

app.controller('ProjectCommitsController', ['$scope', '$state', '$stateParams', '$location', 'ToasterTool', 'ProjectFactory', function ($scope,
    $state, $stateParams, $location, ToasterTool, ProjectFactory) {

    var project_id = $stateParams.id;
    $scope.projectsId = project_id;

    init();

    function init() {
      

        $scope.getgetProjectContentTest = getProjectContentTest;

        $scope.getProjectFileDetail = getProjectFileDetail;

        $scope.goBranchList = goBranchList;

        var path = $stateParams.path;
        $scope.dispalyPath = path;

        var branch_name = $stateParams.branch_name;
        $scope.branch_name = branch_name;


        getProjectContentTest(project_id, path);


        getProjectFileDetail(project_id, path);


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

//获取项目路径
    function getProjectContentTest(id, path) {
        ProjectFactory.getProjectContent().get({
            id: id,
            path: path
        }).$promise.then(function (data) {
            $scope.contents = data.data;
            // if(data.data.length==0){
            //     $state.go('app.project-detail.codes.nocontent');
            // }
        })
    }

    function goBranchList() {
        $state.go("app.project-detail.codes.branches", {
            "project_id": project_id
        });
    }

}]);
