'use strict';

app.controller('ProjectCommitsController', ['$scope', '$state', '$stateParams', 'ToasterTool',  'ProjectFactory',  function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory) {

    var project_id = $stateParams.id;

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.contents ='xtd sb!';
      $scope.getProjectContent = getProjectContent;
      getProjectContent(project_id);
    }

    function getProjectContent(id){

      ProjectFactory.getProjectContent().get({
      		id:id
      	}, getProjectContentSuccess, getProjectContentFailed);
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
