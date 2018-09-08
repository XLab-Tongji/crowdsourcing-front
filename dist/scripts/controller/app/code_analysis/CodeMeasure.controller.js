'use strict';

app.controller('CodeMeasureController' ,['$scope', '$sce', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $sce, $http,  $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    $scope.codeAnalysis = codeAnalysis;
    $scope.sonarqubeUrl = "http://120.79.15.205/";
    $scope.sonarqubeUrl = $sce.trustAsResourceUrl('http://120.79.15.205/');
    init();


    function init(){
      // if($state.current.url == "/records/:id") {
      //   console.log($stateParams.id)
      //   $scope.projectId = $stateParams.id;
      //   $scope.projectName = $stateParams.name;
      // }
      getCheckedProjects();
      getProjects();

    }

    function getCheckedProjects() {
      var url = "http://120.79.15.205:8080/api/tasks"
      // var cfg = {
       
      // }

      // $http.get(url, {}, cfg).then(function (res) {
      //   console.log(res)
      // });

      $http.get(url, {
        headers : {'authorization': '1_0ecdf26882d34204be661c4051d00a2f'}
      }).success(function(results){
        // console.log(results.RESULT_DATA.result)
        console.log(results)
        $scope.detectedProject = results.RESULT_DATA.result
      });

      
    }

    function getProjects(data){
      ProjectFactory.getProjectList().get({
      },  getProjectListSuccess, getProjectListFailed);
    }

    function getProjectListSuccess(data) {
      if (data) {
        angular.copy(data, $scope.projects);
      }else{
        ToasterTool.error('错误',data.message);
      }

    }

    function getProjectListFailed(error){
      ToasterTool.error('错误','获取项目列表失败');
    }

    function codeAnalysis(name){
        var name = $scope.name;

        // var ip = "http://172.16.101.90:8080";
        // var archivePath = ip + "/" + name + "/-/archive/master/test-master.zip"
        // mock地址 因为内网无法访问的原因
        var archivePath = "https://github.com/jaki2012/springboot-mybatis/archive/master.zip";
        // archivePath = "https://github.com/jaki2012/SoftwareMetricsAnalyse/archive/master.zip";
        CodeAnalysisFactory.codeAnalysis().post({
          'projectName':name,
          'projectVersion':"1.0",
          'path':'test',
          // 必须是integer 否则无法自动转换
          'userID' : 0,
          'archivePath':archivePath           
        }).$promise
          .then(function (data) {
            ToasterTool.success('成功', "您的评测任务已提交到后台分析队列中！\n请稍后来查看结果哦~")
            // if (data.success) {
            //   // $scope.detectedProject = name;
            //   $scope.metric = data.data.SoftwareMetrics[0][0].metricsData;
            //   console.log(data.data);
            // } else {
            //     ToasterTool.error('错误', data.message);
            // }
        });

    }

    

}]);

