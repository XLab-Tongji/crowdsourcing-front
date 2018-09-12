'use strict';

app.controller('ModuleMeasureController', ['$scope', '$http', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','CodeAnalysisFactory','SessionService', function($scope,
  $http, $state, $stateParams,ToasterTool,ProjectFactory, CodeAnalysisFactory, SessionService) {

    $scope.projects = [];
    init();

    function init(){
      $scope.projectId = $stateParams.id;
      $scope.projectName = $stateParams.name;

      $scope.isCollapsed = true;
      // 子级模块
      $scope.isCollapsed1 = true;

      // 加载进度条
      $scope.loading = true;

      $scope.coled = function () {
        // console.log("collapsed");
      }
      $scope.coling = function () {
          // console.log("collapsing");
      }
      $scope.exped = function () {
          // console.log("expanded");
      }
      $scope.exping = function () {
          // console.log("expanding");
      }
      getModuleMeasures(1);
      // console.log(document.querySelector(".pagination li:nth-child(1)"))
    }

    function switchPage($event,pageNum){
      // document.getElementById("currentPage").classList.remove("active")
      // document.getElementById("currentPage").removeAttribute("id")
      // // 父节点添加
      // $event.target.parentNode.setAttribute("id", "currentPage");
      // $event.target.parentNode.classList.add("active")
      $scope.loading = true;
      getModuleMeasures(pageNum)
    }

    $scope.switchPage = switchPage

    function getModuleMeasures(pageNum) {
      $scope.currentPage = pageNum;
      var url = "http://120.79.15.205:8080/api/testjoin/" + $scope.projectId + "?pageNum=" + pageNum + "&pageSize=10";

      $http.get(url, {
        
      }).success(function(results){
        $scope.paged_result = results.paged_result;
        var pages = new Array();
        for(var i=results.paged_result.startPage; i<=results.paged_result.endPage; i++) {
          pages.push(i);
        }
        $scope.pages = pages;
        $scope.loading = false;
        // console.log(results)
      });
    }

}]);

