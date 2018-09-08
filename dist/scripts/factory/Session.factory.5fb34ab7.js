'use strict';

/**
 * 登录 api
 */
angular.module('crowdsourcing')
  .factory('SessionFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = "http://172.16.101.90:8080";
    return {
      login: function(){
        return $resource(baseUrl+ '/oauth/token', {}, {
          'post': {
            method: 'POST'
          }
        });
      },

      getUser: function() {
        return $resource(baseUrl + '/api/v4/users?username=:username', {username: '@username'}, {
          'get': {
            method: 'get',
            isArray: true
          }
        })
      },

      register: function(){
        return $resource(XbaseUrl, {}, {
          'post': {
            method: 'POST'
          }
        });
      },

    };

  });
