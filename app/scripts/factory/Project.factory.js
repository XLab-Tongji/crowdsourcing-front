'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('ProjectFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    return {
      getProjectContent: function(){
        return $resource(baseUrl+ '/projects/:id/repository/tree', {id:'@id'}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers(),
            isArray: true
          }
        });
      }
    };
  });