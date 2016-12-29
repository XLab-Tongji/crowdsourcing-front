'use strict';

app.controller('ProjectCommitStatisticController', ['$scope', '$state', '$stateParams', '$location', 'ToasterTool', 'ProjectFactory', function ($scope,
    $state, $stateParams, $location, ToasterTool, ProjectFactory) {


    $scope.project_id = $stateParams.project_id;
    $scope.result = [];
    //member list
    $scope.labels = [];
    //commit list 
    $scope.series = ['Series A'];
    //commit times 
    $scope.data = [];


    init();

    function init() {

        console.log($scope.project_id);
        getCommitStatisticData();


    }

    function getCommitStatisticData() {
        ProjectFactory.getCommitStatistic().get({
            project_id: $scope.project_id
        })
            .$promise.then(function (data) {
                if (data.code = 200) {
                    $scope.result = data.data;
                    dataParse($scope.result);
                } else {
                    ToasterTool.error("获取失败");
                }
            })
    }

    function dataParse(data){

        for(var i=0;i<data.length;i++){
            $scope.labels.push(data[i].name);
            $scope.data.push(data[i].commits);
        }

    }





}]);
