'use strict';

app.controller('ProjectCommitsController', ['$scope', '$state', '$stateParams','$location','ToasterTool',  'ProjectFactory',  function($scope,
    $state, $stateParams, $location,ToasterTool, ProjectFactory) {

    var project_id = $stateParams.id;
    $scope.projectsId = project_id;

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.getProjectContent = getProjectContent;
      var path = $stateParams.path;
      getProjectContent(project_id,path);
    }

    function getProjectContent(id,path){
      ProjectFactory.getProjectContent().get({
      		id:id,
          path:path
      	},
        getProjectContentSuccess, getProjectContentFailed);
    }


    function getProjectContentSuccess(data){
      $scope.contents = data.data;
      // ToasterTool.success('获取成功','666!');
    }
    function getProjectContentFailed(error){
      AlertTool.error({title:'失败',text:'无法获取到项目目录'}).then(function() {
      });
    }
    //ToasterTool.success('登录成功','欢迎回到众包平台!');



}]);
