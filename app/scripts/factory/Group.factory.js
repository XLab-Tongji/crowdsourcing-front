'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('GroupFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url+'/group';
    return {

      getGroupList: function() {
        return $resource(XbaseUrl+ '/groups', {}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers()
          }
        });
      },


    };
  });
