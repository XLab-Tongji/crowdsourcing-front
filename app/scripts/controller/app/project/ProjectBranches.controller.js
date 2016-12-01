'use strict';

app.controller('ProjectBranchesController', ['$scope', '$state', '$stateParams', '$location', 'ToasterTool', 'ProjectFactory', function ($scope,
    $state, $stateParams, $location, ToasterTool, ProjectFactory) {

    var project_id = $stateParams.project_id;
    $scope.projectsId = project_id;
  
    init();

    console.log(project_id)

    function init() {

        $scope.goCreate = goCreate;
        $scope.createBranch=createBranch;
        $scope.goBranchCommit=goBranchCommit;

        getProjectBranches(project_id);
        getProjectBranchesNames(project_id);


    }

    //查看项目分支信息列表
    function getProjectBranches(id) {
        ProjectFactory.getProjectBranchesList().get({
            id: id
        }).$promise.then(function (data) {
            var result = data;
            var branchlist = data.data;
            $scope.branchlist = branchlist;
            console.log(result);

        });
    }



    //获取项目分支名称列表
    function getProjectBranchesNames(id) {
        ProjectFactory.getProjectBranchesNameList().get({
            id: id
        }).$promise.then(function (data) {
            var result = data;
            var branchnamelist = data.data.name;
            $scope.branchnamelist = branchnamelist;
            console.log(branchnamelist);

        });
    }
    //跳转到创建页面
    function goCreate(project_id) {
        $state.go("app.branch-create", {
            "project_id": project_id
        });
    }
    //跳转分支文件查看页面
    function goBranchCommit(project_id,branch_name){
        $state.go("app.project-detail.codes.branchescommits",{
            "project_id":project_id,
            "branch_name":branch_name
        });
    }


    //新建分支
    function createBranch() {
        var branchname=$scope.branch_name;
        var ref=$scope.ref;

        
        ProjectFactory.createBranch().post({
            id: project_id,
            branchname: branchname,
            ref: ref
        }).$promise.then(function (data) {
            var result = data;
            if(data.name=branchname){
                ToasterTool.success("完成","创建分支成功");
                $state.go("app.project-detail.codes.branches",{
                    "project_id":project_id
                });
            }else{
                ToasterTool.error("失败","创建分支失败");
            }

        })

    }

}]);
