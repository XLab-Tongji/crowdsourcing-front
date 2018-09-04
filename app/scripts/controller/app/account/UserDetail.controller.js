'use strict';

app.controller('UserDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'UserFactory', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'SessionService', function ($scope,
    $state, $stateParams, ToasterTool, UserFactory, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, SessionService) {

    var errorHandler = ErrorHandlerFactory.handle;

    $scope.currentUser = SessionService.getCurrentUser();



    init();

    function init() {
        var userid = $stateParams.userid;
        console.log($stateParams);
        getDetail(userid);
    }

 

    function getDetail(userid) {
        UserFactory.getUserbyId().get({
            userid: userid
        })
            .$promise
            .then(function (response) {

                $scope.userdetail=response;

            })
            .catch(errorHandler);
    }

}]);
