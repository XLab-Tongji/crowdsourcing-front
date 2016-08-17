'use strict';

app.controller('GroupManagerController', ['$scope', '$state', 'ToasterTool',  function($scope,
    $state, ToasterTool) {

    init();

    function init(){
      console.log($state);
    }

}]);
