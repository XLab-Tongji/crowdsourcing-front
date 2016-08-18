'use strict';

app.controller('ProjectDetailController', ['$scope', '$state', 'ToasterTool',  'ProjectFactory',  function($scope,
    $state, ToasterTool, ProjectFactory) {

    init();

    function init(){
      console.log($state);
      console.log('ready to get yardstick code content!');
      $scope.content ='py sb!';
      $scope.getProjectContent = getProjectContent;
      getProjectContent('2');
    }

    function getProjectContent( project_id ){
      // var id = project_id;

   //    SessionFactory.getProjectContent().get({
   //    		id:'2'
   //    	})
	  // 	.$promise
	  //   .then(function(response){
			// $scope.content.data = response.data;
	  //   	ToasterTool.success('获取成功','666!');
	  //   });
      ProjectFactory.getProjectContent().get({
      		id:project_id
      	}, getProjectContentSuccess, getProjectContentFailed);

      function getProjectContentSuccess(data){
        $scope.content = data;
        ToasterTool.success('获取成功','666!');
      }
      function getProjectContentFailed(error){
        AlertTool.error({title:'失败',text:'无法获取到项目目录'}).then(function() {
        });
      }
      //ToasterTool.success('登录成功','欢迎回到众包平台!');
    }


}]);
