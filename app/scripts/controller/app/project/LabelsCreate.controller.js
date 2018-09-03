'use strict';

app.controller('ProjectLabelsCreate', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'generalService', function ($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, generalService) {

    var project_id = $stateParams.project_id;

    var errorHandler = ErrorHandlerFactory.handle;
  
    init();

    function init() {
        $scope.createLabels=createLabels;
    }

    //创建label
    function createLabels() {
        ProjectFactory.createLabels().post({
            id: project_id,
            "name": $scope.labelname,
            "description": $scope.description,
            "color": $scope.color
        })
            .$promise
            .then(function (response) {
                if(response){
                    ToasterTool.success('创建成功','');
                    $state.go('app.issue-create',{
                        'project_id':project_id
                    })
                    
                }
              
            })
            .catch(errorHandler);
    }








}]);
