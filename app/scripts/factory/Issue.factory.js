'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('IssueFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url+'/issues/mine';
    return {

      getIssueList: function() {
        return $resource(XbaseUrl, {}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers()
          }
        });
      },


    };
  });
