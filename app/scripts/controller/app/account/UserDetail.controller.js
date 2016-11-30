'use strict';

app.controller('UserDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'UserFactory', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'SessionService', function ($scope,
    $state, $stateParams, ToasterTool, UserFactory, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, SessionService) {

    var errorHandler = ErrorHandlerFactory.handle;

    $scope.currentUser = SessionService.getCurrentUser();



    init();

    function init() {
        var username = $stateParams.username;
        console.log($stateParams);

        getDetail(username);
    }

 

    function getDetail(username) {
        UserFactory.getUserListbyUserName().get({
            username: username
        })
            .$promise
            .then(function (response) {

                $scope.userdetail=response.data[0];

            })
            .catch(errorHandler);
    }

}]);
