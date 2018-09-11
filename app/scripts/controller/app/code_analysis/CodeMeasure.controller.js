'use strict';

app.controller('CodeMeasureController' ,['$scope', '$sce', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $sce, $http,  $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    $scope.codeAnalysis = codeAnalysis;
    
    init();


    function init(){
      var baseUrl = "http://120.79.15.205/";
      if($state.current.url == "/sonarqube") {
        
        if($stateParams.projectUrl != null) {
          console.log(baseUrl + "dashboard?id=" + $stateParams.projectUrl)
          $scope.sonarqubeUrl = $sce.trustAsResourceUrl(baseUrl + "dashboard?id=" + $stateParams.projectUrl);
        } else {
          $scope.sonarqubeUrl = $sce.trustAsResourceUrl(baseUrl);
        }
      }
      
      getCheckedProjects();
      getProjects();

    }

    //TODO: 添加refresh参数boolean self/auto
    // 主动刷新的话 提示正在刷新
    // auto刷新的话 setInterval和clearInterval
    // 同时需要决策终止条件是--> 无分析中项目 两秒轮询一次
    function refresh() {
      getCheckedProjects()
      if(hasClass(document.getElementById("refreshBtn"), 'rotate')) {
        console.log("have")
        document.getElementById("refreshBtn").classList.remove("rotate")
      }
      // 需要设置延时才能旋转
      setTimeout(function() {
        document.getElementById("refreshBtn").classList.add("rotate")
        }, 10)
      // document.getElementById("refreshBtn").animate()
      ToasterTool.success("正在为您刷新~")
    }

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  

    $scope.refresh = refresh

  
    function getCheckedProjects() {
      var url = "http://120.79.15.205:8080/api/tasks"

      $http.get(url, {
        headers : {'authorization': '1_95ea71c38f0a476e87e4ac5dfa0ad394'}
      }).success(function(results){
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

        // var ip = "http://172.16.101.91:8000/proxy";
        // var archivePath = ip + "/" + name + "/-/archive/master/test-master.zip"
        // mock地址 因为内网无法访问的原因
        // var archivePath = "https://github.com/jaki2012/springboot-mybatis/archive/master.zip";
        // archivePath = "https://github.com/jaki2012/SoftwareMetricsAnalyse/archive/master.zip";
        var archivePath = "https://github.com/jaki2012/SwQualityAssessment/archive/master.zip";
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
            refresh()
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

