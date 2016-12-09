'use strict';

app.controller('MilestoneCreateController',[],function(){

});

/*
app.controller('MilestoneCreateController' ,['$scope', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','SessionService', function($scope,
    $state, $stateParams,ToasterTool, ProjectFactory, SessionService) {

    var project_id = $stateParams.id;
    $scope.createmilestone= createmilestone;
        
    init();


    function init(){
      console.log($state);
      console.log('MilestoneCreateController Init');
      

    }

    function createmilestone(){

       var milestone_name = $scope.milestone_name;
       var discription = $scope.discription;
       var due_date = $scope.due_date;
       var start_time = $scope.start_time;
       
               

        ProjectFactory.createMilestone().post({
            'id':project_id,
            'title':milestone_name,
            'start_time': start_time,
            'due_date':due_date,
            'discription':discription,
            

        }).$promise
          .then(function (data) {
            console.log(data.success);
            if (data.success) {
                ToasterTool.success('新建成功！');
                $state.go('app.milestone',{
                    'id':project_id
                });
            } else {
                ToasterTool.error('错误', data.message);
            }
        });

    }

}]);

*/