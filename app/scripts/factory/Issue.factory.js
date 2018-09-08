'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('IssueFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = 'http://172.16.101.91:80/proxy/api/v4/todos';
    return {

      getIssueList: function() {
        return $resource(XbaseUrl, {}, {
          'get': {
            method: 'GET',
            isArray: true,
            headers: SessionService.headers()
          }
        });
      },


    };
  });
