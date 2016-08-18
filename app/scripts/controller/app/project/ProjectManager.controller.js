'use strict';

app.controller('ProjectManagerController', ['$scope', '$state', 'ToasterTool',  function($scope,
    $state, ToasterTool) {

    init();

    function init(){
      console.log($state);
      console.log('ProjectManagerController Init');
    }



}]);
